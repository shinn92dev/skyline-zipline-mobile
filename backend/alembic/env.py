from logging.config import fileConfig
from sqlalchemy import pool
from alembic import context

import os
import sys

# ✅ 프로젝트 루트 경로 추가
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
import db.models
# ✅ 내부 모듈 임포트
from db.database import Base
from core.config import settings

import pymysql
pymysql.install_as_MySQLdb()

# Alembic 설정 객체
config = context.config

# 로깅 설정
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# ✅ metadata 설정 (모든 모델이 인식되게)
target_metadata = Base.metadata

# ✅ DB URL에서 async 드라이버 제거 (alembic은 sync 필요)
def get_sync_url():
    return settings.SQLALCHEMY_DATABASE_URL.replace("+asyncmy", "")

# 📦 오프라인 마이그레이션
def run_migrations_offline() -> None:
    url = get_sync_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

# 📦 온라인 마이그레이션
def run_migrations_online() -> None:
    from sqlalchemy import create_engine

    connectable = create_engine(
        get_sync_url(),
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()

# 모드에 따라 실행
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
