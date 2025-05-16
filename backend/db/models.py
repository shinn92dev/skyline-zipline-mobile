from db.database import Base
import enum
from sqlalchemy import (Column, Integer, String, DateTime, Boolean, ForeignKey)
from sqlalchemy.orm import relationship
from sqlalchemy import Enum as SqlEnum
from datetime import datetime

class UserRoleEnum(str, enum.Enum):
    admin = "admin"
    owner = "owner"
    manager = "manager"
    staff = "staff"

class Users(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String(100), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    role = Column(SqlEnum(UserRoleEnum), nullable=False)