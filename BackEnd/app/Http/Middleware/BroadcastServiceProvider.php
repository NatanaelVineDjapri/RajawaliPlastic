<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Pakai middleware custom
        Broadcast::routes(['middleware' => ['web', 'cors', 'broadcast.auth.token']]);

        require base_path('routes/channels.php');
    }
}
