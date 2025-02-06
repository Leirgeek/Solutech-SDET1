FROM phpdockerio/php:8.4-fpm
WORKDIR "/application"

RUN apt-get update \
    && apt-get -y --no-install-recommends install \
        git \
        php8.4-bcmath \
        php8.4-bz2 \
        php8.4-enchant \
        php8.4-gd \
        php8.4-gmagick \
        php8.4-intl \
        php8.4-mcrypt \
        php8.4-mysql \
        php8.4-odbc \
        php8.4-redis \
        nodejs \
        npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*
