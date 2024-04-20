#!/bin/bash

# Collect static files
echo "Collect static files"
python manage.py collectstatic --noinput

# Apply database migrations
# echo "Apply database migrations"
# python manage.py makemigrations
# python manage.py migrate

# Start Gunicorn
echo "Starting Gunicorn"
gunicorn myproject.wsgi:application --bind 0.0.0.0:8000