The Django Backend
===

This directory contains the Django backend for the Next.js + Django boilerplate template. The Django project's root is in the `src` directory, and the initial name for the Django project is `backend`. There is a script in the template root (one dir up from this readme) that can rename the Django project to something more meaningful for you.

You should usually be working inside the `backend` directory. For example, to add a new app, you would do `cd backend && poetry run ./manage.py startapp APP_NAME`.

## Running the development server
```bash
cd backend
poetry run ./manage.py runserver
```
