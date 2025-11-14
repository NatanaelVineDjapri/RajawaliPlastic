<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\Storage;
use League\Flysystem\Filesystem;
use Masbug\Flysystem\GoogleDriveAdapter; 
use Google\Client;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Support\Facades\Log; // Kita butuh ini buat nge-log

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // KOSONGIN INI
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        try {
            Storage::extend('google', function ($app, $config) {

                $folderId = $config['folder_id'];
                
                // (dd() UDAH DIHAPUS, INI BERSIH)

                $client = new Client();
                $client->setAuthConfig($config['key_file_location']); 
                $client->addScope(\Google\Service\Drive::DRIVE);
                $service = new \Google\Service\Drive($client);
                
                $adapter = new GoogleDriveAdapter(
                    $service, 
                    $folderId, // Pake $folderId yang udah dicek
                    ['supportsAllDrives' => true]
                );
                
                $driver = new Filesystem($adapter);

                return new FilesystemAdapter($driver, $adapter);
            });
        } catch (\Exception $e) {
            // Log the actual exception to the Laravel log file for debugging
            Log::error("Google Drive Setup Error: " . $e->getMessage());
        }
    }
}