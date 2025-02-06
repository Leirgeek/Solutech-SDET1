<?php

use App\Models\Employee;
use App\Models\EmployeeDocument;
use App\Models\Sms;
use App\Models\SupportedDocument;
use App\Models\Team;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Mail;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User;
use App\Models\SmtpSetting;

function ticket_number()
{
    return 'TCKT' . time();
}


