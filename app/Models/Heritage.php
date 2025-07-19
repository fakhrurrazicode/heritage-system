<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Heritage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'location',
        'heritage_type_id',
        'province_code',
        'city_code',
        'district_code',
        'village_code',
    ];

    public function type()
    {
        return $this->belongsTo(HeritageType::class, 'heritage_type_id');
    }

    public function files()
    {
        return $this->hasMany(HeritageFile::class);
    }

    // Relasi ke provinsi
    public function province()
    {
        return $this->belongsTo(\Laravolt\Indonesia\Models\Province::class, 'province_code', 'code');
    }

    // Relasi ke kota/kabupaten
    public function city()
    {
        return $this->belongsTo(\Laravolt\Indonesia\Models\City::class, 'city_code', 'code');
    }

    // Relasi ke kecamatan
    public function district()
    {
        return $this->belongsTo(\Laravolt\Indonesia\Models\District::class, 'district_code', 'code');
    }

    // Relasi ke desa/kelurahan
    public function village()
    {
        return $this->belongsTo(\Laravolt\Indonesia\Models\Village::class, 'village_code', 'code');
    }
}
