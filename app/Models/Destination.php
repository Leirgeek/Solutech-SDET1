<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Destination extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'slug'
    ];

    public function getCreatedAtAttribute($value)
    {
        return date('d M Y h:i a', strtotime($value));
    }

    public function tours()
    {
        return $this->hasMany(Tour::class);
    }
}
