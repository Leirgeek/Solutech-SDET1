# Setup Guide

This guide provides installation instructions for setting up the Laravel application both via CLI and Docker.

**Steps:**

1. Clone the repository: [https://github.com/Solutech-Limited/booking-challenge
   ](https://github.com/Solutech-Limited/booking-challenge)

## Installation via Docker

This is the recommended development platform.

### Prerequisites

Before running with Docker, ensure that the following dependencies are installed:

- docker. See [https://docs.docker.com/engine/installation](https://docs.docker.com/engine/installation)
- docker-compose. See [docs.docker.com/compose/install](https://docs.docker.com/compose/install/)

### Steps:

1. Clone the repository and navigate to the project folder:
    ```bash
    git clone https://github.com/Solutech-Limited/booking-challenge.git
   
    cd booking-challenge
    ```

2. Navigate to the `/docker` folder:
    ```bash
    cd docker
    ```
3. Build and start the containers:
    ```bash
    ./build.sh
     # Rebuilds container image
    ./start.sh
   # Starts containers in the background
    ```

* Fix for file permission issue when running on Linux or Mac
    ```bash
  sudo chmod +x *.sh 
  sudo chmod +x setup/setup.sh
    ```
* Sudo maybe required on Ubuntu to run the scripts

4. Configure application container default setup and seed database:
   ```bash
   ./config.sh
   ```
5. Stop containers:
    ```bash
    ./stop.sh
    ```
6. Connect to application container via Terminal:
    ```bash
    ./connect.sh
    # Opens a terminal inside the container
    ```

### External Services

These are web services running exposed for access outside container:

| Service    | Address (outside containers)            |
|------------|-----------------------------------------|
| Webserver  | [localhost:8000](http://localhost:8000) |
| PHPMyAdmin | [localhost:8002](http://localhost:8002) |
| Mailhog    | [localhost:8001](http://localhost:8001) |

These credentials are provided as the initial setup for accessing the booking challange application.

| **Username**      | **Password** |
|:------------------|--------------|
| admin@account.com | password     |

### Internal Services

Below are the hostnames and ports for the
internal services running as containers:

| Service        | Hostname | Port Number |
|----------------|----------|-------------|
| PHP-FPM        | php-fpm  | 9000        |
| MySQL          | mysql    | 3306        |
| Redis          | redis    | 6379        |
| SMTP (Mailhog) | mailhog  | 1025        |

### Application file permissions #

As in all server environments, your application needs the correct file permissions to work properly. You can change the
files throughout the container, so you won't care if the user exists or has the same ID on your host.

* Fix for public file permission

```bash
docker-compose exec booking-php-fpm chown -R www-data:www-data ./public
```

* Fix for public file permission

## Installation via CLI

### Prerequisite

Tools need to run via CLI

1. [Composer](https://getcomposer.org/download/)
2. PHP (preferably version 7.4 or above)
3. Node.js (for compiling assets)
4. Git

### Steps:

1. Clone the repository:
   `git clone https://github.com/Solutech-Limited/booking-challenge.git
   cd booking-challenge`

2. Install dependencies:
    * Install PHP dependencies with Composer:
      `composer install`
    * Install JavaScript dependencies:
      `npm install`
3. Set up environment variables:
   &Copy `.env.example` to `.env`:
   `cp .env.example .env`
4. Generate the application key:
   `php artisan key:generate`
5. Set up the database:
    * Run migrations and seed the database:
      `php artisan migrate:fresh --seed`
6. Compile assets:
   `npm run build`
7. Serve Laravel files:
   `php artisan serve`
