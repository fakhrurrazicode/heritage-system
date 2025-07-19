<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HeritageFile extends Model
{
    use HasFactory;

    protected $fillable = ['heritage_id', 'filename', 'file_type', 'path', 'uploaded_at'];

    public function heritage()
    {
        return $this->belongsTo(Heritage::class);
    }
}
