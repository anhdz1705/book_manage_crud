#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent
BACKEND_DIR = PROJECT_ROOT / "book-backend"


def main():
    """Run administrative tasks."""
    sys.argv[0] = str(PROJECT_ROOT / "manage.py")
    os.chdir(BACKEND_DIR)
    sys.path.insert(0, str(BACKEND_DIR))
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'book_manage.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
