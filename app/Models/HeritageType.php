<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HeritageType extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    public function heritages()
    {
        return $this->hasMany(Heritage::class);
    }
}
