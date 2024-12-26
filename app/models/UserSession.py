from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base

class UserSession(Base):
    __tablename__ = "user_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    session_token = Column(String, unique=True)
    expires_at = Column(Integer)  # الوقت الذي تنتهي فيه صلاحية الجلسة (يمكن استخدام Timestamp)

    user = relationship("User")  # العلاقة مع نموذج المستخدم

