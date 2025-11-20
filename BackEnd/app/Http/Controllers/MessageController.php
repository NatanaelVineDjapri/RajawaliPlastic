<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Events\MessageSent;

class MessageController extends Controller
{
    private function getAuthenticatedUser(Request $request)
    {
        $token = $request->cookie('authToken');
        if (!$token) return null;
        return User::where('api_token', $token)->first();
    }

    public function index($receiverId, Request $request)
    {
        $user = $this->getAuthenticatedUser($request);
        if (!$user) return response()->json(['error' => 'Unauthorized'], 401);
        
        $userId = $user->id;

        $messages = Message::where(function($query) use ($userId, $receiverId) {
                $query->where('sender_id', $userId)
                      ->where('receiver_id', $receiverId);
            })
            ->orWhere(function($query) use ($userId, $receiverId) {
                $query->where('sender_id', $receiverId)
                      ->where('receiver_id', $userId);
            })
            ->with(['sender', 'receiver'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $messages,
        ], 200);
    }

    public function store(Request $request)
    {
        $user = $this->getAuthenticatedUser($request);
        if (!$user) return response()->json(['error' => 'Unauthorized'], 401);

        $validator = Validator::make($request->all(), [
            'receiver_id' => 'required|exists:users,id',
            'message' => 'nullable|string|max:5000',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $senderId = $user->id;

        $imageUrl = null;
        if ($request->hasFile('image')) {
            $userFolder = 'messages/' . $senderId;
            $path = $request->file('image')->store($userFolder, 'public');
            $imageUrl = asset('storage/' . $path);
        }

        $message = Message::create([
            'sender_id' => $senderId,
            'receiver_id' => $data['receiver_id'],
            'message' => $data['message'] ?? '',
            'image_url' => $imageUrl,
            'is_read' => false,
        ]);

        $message->load(['sender', 'receiver']);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil dikirim',
            'data' => $message,
        ], 201);
    }

    public function getConversations(Request $request)
    {
        $user = $this->getAuthenticatedUser($request);
        if (!$user) return response()->json(['message' => 'Unauthorized'], 401);

        $latestMessages = Message::with(['sender', 'receiver'])
            ->orderBy('created_at', 'desc')
            ->get();

        $safeMessages = $latestMessages->filter(function ($message) {
            return $message->sender !== null && $message->receiver !== null;
        });

        $conversations = $safeMessages
            ->groupBy(function(Message $message) {
                $ids = [(string) $message->sender_id, (string) $message->receiver_id];
                sort($ids); 
                return implode('_', $ids);
            })
            ->map(function($group) use ($user) {
                $unreadCount = $group->where('receiver_id', $user->id)
                                    ->where('is_read', false)
                                    ->count();
                
                $latestMessage = $group->first();
                $latestMessage->unread_count = $unreadCount;

                return $latestMessage;
            })
            ->values()
            ->sortByDesc('created_at')
            ->values();

        return response()->json([
            'success' => true,
            'data' => $conversations,
        ], 200);
    }

    public function markAsRead($id, Request $request)
    {
        $user = $this->getAuthenticatedUser($request);
        if (!$user) return response()->json(['error' => 'Unauthorized'], 401);

        $message = Message::findOrFail($id);
        if ($message->receiver_id !== $user->id) {
            return response()->json(['error' => 'Tidak punya akses untuk mengubah status pesan ini'], 403);
        }

        $message->update(['is_read' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Pesan ditandai telah dibaca',
        ], 200);
    }

    public function destroy($id, Request $request)
    {
        $user = $this->getAuthenticatedUser($request);
        if (!$user) return response()->json(['error' => 'Unauthorized'], 401);

        $message = Message::findOrFail($id);

        if ($message->sender_id !== $user->id) {
            return response()->json(['error' => 'Tidak punya izin untuk menghapus pesan ini'], 403);
        }

        if ($message->image_url && str_contains($message->image_url, 'storage/')) {
            $oldPath = str_replace(asset('storage/') . '/', '', $message->image_url);
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        $message->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil dihapus',
        ], 200);
    }
}
