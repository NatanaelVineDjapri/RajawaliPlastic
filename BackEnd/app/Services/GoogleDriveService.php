<?php

namespace App\Services;

use Google\Client;
use Google\Service\Drive;
use Exception;

class GoogleDriveService
{
    protected $service;

    public function __construct()
    {
        $client = new Client();

        $client->setAuthConfig(storage_path('app/google/service-account.json'));
        $client->addScope(Drive::DRIVE);

        $this->service = new Drive($client);
    }

    public function upload($file, $folderId)
    {
        $fileMetadata = new Drive\DriveFile([
            'name' => time() . '_' . $file->getClientOriginalName(),
            'parents' => [$folderId]
        ]);

        $uploaded = $this->service->files->create(
            $fileMetadata,
            [
                'data' => file_get_contents($file->getRealPath()),
                'mimeType' => $file->getClientMimeType(),
                'uploadType' => 'multipart'
            ]
        );

        return $uploaded->id;
    }

    public function delete($fileId)
    {
        try {
            return $this->service->files->delete($fileId);
        } catch (\Google\Service\Exception $e) {
            throw new Exception("Google Drive delete error: " . $e->getMessage());
        }
    }

    public function getPublicUrl($fileId)
    {
        return "https://drive.google.com/uc?export=view&id={$fileId}";
    }
}
