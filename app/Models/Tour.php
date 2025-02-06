<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Tour extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'price',
        'slots',
        'destination_id',
    ];

    public function getCreatedAtAttribute($value)
    {
        return date('d M Y h:i a', strtotime($value));
    }

    public function destination()
    {
        return $this->belongsTo(Destination::class)
            ->withDefault([
                'name' => 'Destination not found'
            ]);
    }
}
