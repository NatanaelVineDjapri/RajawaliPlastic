<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string|max:5000',
        ]);

        if ($validated['receiver_id'] == Auth::id()) {
            return response()->json(['error' => 'Tidak bisa mengirim pesan ke diri sendiri'], 422);
        }

        $message = Message::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $validated['receiver_id'],
            'message' => $validated['message'], // terenkripsi otomatis di model
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

        $message->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil dihapus',
        ]);
    }
}
