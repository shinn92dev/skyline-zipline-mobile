## 🧱 Alembic Migration Guide

This project uses Alembic to manage database migrations based on SQLAlchemy models.

### ✅ Creating a New Migration

Whenever you create or modify a SQLAlchemy model, generate a new migration with:

```bash
alembic revision --autogenerate -m "your message here"
```

Replace "your message here" with a short description of the change (e.g., "add users table" or "update role column").

### ✅ Applying Migrations

To apply all pending migrations to the database, run:

```bash
alembic upgrade head
```

This will bring the database schema up to the latest revision.

### 🧼 Rolling Back

If you need to undo the last migration:

```bash
alembic downgrade -1
```

To revert everything back to the initial state:

```bash
alembic downgrade base
```

### 🔍 Checking the Current Revision

```bash
alembic current
```

This shows the current revision applied to the database.
