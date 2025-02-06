<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'ticket_number'
    ];

    public function getCreatedAtAttribute($value)
    {
        //Use human readable format including time
        return date('d M Y h:i a', strtotime($value));
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class)
            ->withDefault([
                'name' => 'Booking not found',
                'status' => 'Booking not found'
            ]);
    }
}
