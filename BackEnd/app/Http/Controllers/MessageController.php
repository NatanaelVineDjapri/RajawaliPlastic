<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    public function index($receiverId)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $userId = Auth::id();

        $messages = Message::where(function ($q) use ($userId, $receiverId) {
                $q->where('sender_id', $userId)
                  ->where('receiver_id', $receiverId);
            })
            ->orWhere(function ($q) use ($userId, $receiverId) {
                $q->where('sender_id', $receiverId)
                  ->where('receiver_id', $userId);
            })
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $messages,
        ]);
    }

    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validator = Validator::make($request->all(), [
            'receiver_id' => 'required|exists:users,id',
            'message' => 'nullable|string|max:5000',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if ($data['receiver_id'] == Auth::id()) {
            return response()->json(['error' => 'Tidak bisa mengirim pesan ke diri sendiri'], 422);
        }

        $imageUrl = null;
        if ($request->hasFile('image')) {
            $userFolder = 'messages/' . Auth::id();
            $path = $request->file('image')->store($userFolder, 'public');
            $imageUrl = asset('storage/' . $path);
        }

        $message = Message::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $data['receiver_id'],
            'message' => $data['message'] ?? '',
            'image_url' => $imageUrl,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil dikirim',
            'data' => $message,
        ], 201);
    }

    public function markAsRead($id)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $message = Message::findOrFail($id);

        if ($message->receiver_id !== Auth::id()) {
            return response()->json(['error' => 'Tidak punya akses untuk mengubah status pesan ini'], 403);
        }

        $message->update(['is_read' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Pesan ditandai telah dibaca',
        ]);
    }

    public function destroy($id)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $message = Message::findOrFail($id);

        if ($message->sender_id !== Auth::id()) {
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
        ]);
    }
}
