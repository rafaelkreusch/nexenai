from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional
from uuid import uuid4

from sqlmodel import Field, Relationship, SQLModel


class MessageDirection(str, Enum):
    agent = "agent"
    debtor = "debtor"


class DeviceSessionStatus(str, Enum):
    pending = "pending"
    connected = "connected"
    disconnected = "disconnected"


class Organization(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    slug: str = Field(index=True, unique=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    uazapi_server_url: Optional[str] = Field(default=None)
    uazapi_admin_token: Optional[str] = Field(default=None)
    webhook_url: Optional[str] = Field(default=None)
    is_active: bool = Field(default=True)
    user_limit: int = Field(default=0)

    users: List["User"] = Relationship(back_populates="organization")
    conversations: List["Conversation"] = Relationship(back_populates="organization")
    sessions: List["DeviceSession"] = Relationship(back_populates="organization")


class OrganizationCreate(SQLModel):
    name: str
    slug: str


class OrganizationRead(SQLModel):
    id: int
    name: str
    slug: str
    created_at: datetime
    uazapi_server_url: Optional[str] = None
    has_uazapi_credentials: bool = False
    webhook_url: Optional[str] = None


class OrganizationCredentialsRead(SQLModel):
    uazapi_server_url: Optional[str] = None
    has_admin_token: bool = False


class OrganizationCredentialsUpdate(SQLModel):
    uazapi_server_url: Optional[str] = None
    uazapi_admin_token: Optional[str] = None
    webhook_url: Optional[str] = None


class CollaboratorOrganizationCreate(SQLModel):
    name: str
    slug: str
    admin_username: str
    admin_password: str
    admin_full_name: Optional[str] = None
    uazapi_server_url: Optional[str] = None
    uazapi_admin_token: Optional[str] = None
    user_limit: int = 0
    webhook_url: Optional[str] = None


class CollaboratorOrganizationRead(SQLModel):
    id: int
    name: str
    slug: str
    created_at: datetime
    uazapi_server_url: Optional[str] = None
    has_admin_token: bool = False
    default_admin_username: Optional[str] = None
    user_count: int = 0
    is_active: bool = True
    user_limit: int = 0
    webhook_url: Optional[str] = None


class OrganizationUpdate(SQLModel):
    is_active: Optional[bool] = None
    user_limit: Optional[int] = None


class ConversationBase(SQLModel):
    debtor_name: str = Field(index=True)
    debtor_phone: str = Field(index=True)
    notes: Optional[str] = None


class ConversationTagLink(SQLModel, table=True):
    conversation_id: Optional[int] = Field(
        default=None, foreign_key="conversation.id", primary_key=True
    )
    tag_id: Optional[int] = Field(
        default=None, foreign_key="tag.id", primary_key=True
    )
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Conversation(ConversationBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    organization_id: Optional[int] = Field(default=None, foreign_key="organization.id")
    owner_user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    organization: Optional[Organization] = Relationship(back_populates="conversations")
    owner: Optional["User"] = Relationship()
    messages: List["Message"] = Relationship(back_populates="conversation")
    tags: List["Tag"] = Relationship(
        back_populates="conversations", link_model=ConversationTagLink
    )


class ConversationCreate(ConversationBase):
    pass


class ConversationUpdate(SQLModel):
    debtor_name: Optional[str] = None


class ConversationRead(ConversationBase):
    id: int
    organization_id: int
    owner_user_id: Optional[int]
    active: bool
    created_at: datetime
    updated_at: datetime
    tags: List["TagRead"] = []
    avatar_url: Optional[str] = None
    avatar_updated_at: Optional[datetime] = None


class ConversationSummary(SQLModel):
    id: int
    debtor_name: str
    debtor_phone: str
    last_message_preview: Optional[str] = None
    last_message_at: Optional[datetime] = None
    owner_user_id: Optional[int] = None
    tags: List["TagRead"] = []
    unread_count: int = 0
    avatar_url: Optional[str] = None
    avatar_updated_at: Optional[datetime] = None


class ConversationAvatar(SQLModel, table=True):
    conversation_id: Optional[int] = Field(
        default=None, foreign_key="conversation.id", primary_key=True
    )
    media_path: Optional[str] = None
    media_content_type: Optional[str] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class ConversationNote(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    organization_id: int = Field(foreign_key="organization.id")
    conversation_id: int = Field(foreign_key="conversation.id")
    created_by_user_id: int = Field(foreign_key="user.id")
    text: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ConversationNoteCreate(SQLModel):
    text: str


class ConversationNoteRead(SQLModel):
    id: int
    conversation_id: int
    created_by_user_id: int
    text: str
    created_at: datetime
    author_name: Optional[str] = None


default_message_preview_length = 90


class MessageType(str, Enum):
    text = "text"
    audio = "audio"
    image = "image"
    document = "document"


class MessageBase(SQLModel):
    conversation_id: Optional[int] = Field(default=None, foreign_key="conversation.id")
    direction: MessageDirection = Field(default=MessageDirection.agent)
    content: str = Field(default="")
    via_session_id: Optional[int] = Field(default=None, foreign_key="devicesession.id")
    reply_to_message_id: Optional[int] = Field(default=None, foreign_key="message.id")
    message_type: MessageType = Field(default=MessageType.text)
    media_path: Optional[str] = None
    media_content_type: Optional[str] = None
    media_size_bytes: Optional[int] = None
    media_duration_seconds: Optional[float] = None


class Message(MessageBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    is_read: bool = Field(default=False)
    author_user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    integration_message_id: Optional[str] = Field(default=None, index=True)

    conversation: Optional[Conversation] = Relationship(back_populates="messages")
    session: Optional["DeviceSession"] = Relationship(back_populates="messages")
    author: Optional["User"] = Relationship()


class MessageCreate(MessageBase):
    conversation_id: int


class MessageRead(MessageBase):
    id: int
    timestamp: datetime
    is_read: bool
    media_url: Optional[str] = None


class IncomingMessagePayload(SQLModel):
    integration_message_id: Optional[str] = None
    quoted_integration_message_id: Optional[str] = None
    conversation_id: Optional[int] = None
    debtor_phone: Optional[str] = None
    debtor_name: Optional[str] = None
    content: str = ""
    session_code: Optional[str] = None
    message_type: MessageType = Field(default=MessageType.text)
    media_path: Optional[str] = None
    media_content_type: Optional[str] = None
    media_size_bytes: Optional[int] = None
    media_duration_seconds: Optional[float] = None
    media_blob: Optional[bytes] = None
    media_original_name: Optional[str] = None


class CallStartRequest(SQLModel):
    conversation_id: int
    phone_number: Optional[str] = None


class CallRejectRequest(SQLModel):
    conversation_id: Optional[int] = None
    phone_number: Optional[str] = None
    call_id: Optional[str] = None


class CallActionResponse(SQLModel):
    success: bool = True
    detail: Optional[str] = None
    provider_response: Optional[Dict[str, Any]] = None


class DeviceSession(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    organization_id: Optional[int] = Field(default=None, foreign_key="organization.id")
    owner_user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    provider: str = Field(default="evolution")
    session_label: str = Field(default="primary")
    session_code: str = Field(default_factory=lambda: str(uuid4()))
    status: DeviceSessionStatus = Field(default=DeviceSessionStatus.pending)
    qr_code_payload: Optional[str] = None
    integration_base_url: Optional[str] = None
    integration_instance_id: Optional[str] = None
    integration_token: Optional[str] = None
    webhook_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_synced_at: Optional[datetime] = None

    organization: Optional[Organization] = Relationship(back_populates="sessions")
    messages: List[Message] = Relationship(back_populates="session")


class SessionRead(SQLModel):
    id: int
    organization_id: int
    owner_user_id: Optional[int]
    provider: str
    session_label: str
    session_code: str
    status: DeviceSessionStatus
    qr_code_payload: Optional[str]
    created_at: datetime
    last_synced_at: Optional[datetime]
    integration_base_url: Optional[str] = None
    integration_instance_id: Optional[str] = None
    has_credentials: bool = False
    webhook_id: Optional[str] = None


class SessionRotateRequest(SQLModel):
    session_label: Optional[str] = None
    qr_code_payload: Optional[str] = None
    integration_base_url: Optional[str] = None
    integration_instance_id: Optional[str] = None
    integration_token: Optional[str] = None
    provider: Optional[str] = None
    auto_provision: Optional[bool] = None


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    organization_id: Optional[int] = Field(default=None, foreign_key="organization.id")
    username: str = Field(index=True, unique=True)
    password_hash: str
    full_name: Optional[str] = None
    is_active: bool = Field(default=True)
    is_admin: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    organization: Optional[Organization] = Relationship(back_populates="users")
    tokens: List["SessionToken"] = Relationship(back_populates="user")


class UserRead(SQLModel):
    id: int
    organization_id: Optional[int] = None
    username: str
    full_name: Optional[str]
    is_active: bool
    is_admin: bool
    created_at: datetime


class UserCreate(SQLModel):
    username: str
    password: str
    full_name: Optional[str] = None
    is_admin: bool = False


class UserUpdate(SQLModel):
    full_name: Optional[str] = None
    is_active: Optional[bool] = None
    password: Optional[str] = None
    is_admin: Optional[bool] = None


class AuthLogin(SQLModel):
    organization_slug: Optional[str] = None
    username: str
    password: str
    collaborator: bool = False


class AuthRegister(SQLModel):
    organization_name: str
    organization_slug: str
    username: str
    password: str
    full_name: Optional[str] = None


class AuthResponse(SQLModel):
    token: str
    user: UserRead
    organization: Optional[OrganizationRead] = None


class SessionToken(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    token: str = Field(index=True, unique=True)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: Optional[datetime] = None

    user: Optional[User] = Relationship(back_populates="tokens")


class Tag(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    organization_id: Optional[int] = Field(default=None, foreign_key="organization.id")
    owner_user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    name: str
    color: str = Field(default="#2f80ed")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    organization: Optional[Organization] = Relationship()
    conversations: List[Conversation] = Relationship(
        back_populates="tags", link_model=ConversationTagLink
    )


class TagRead(SQLModel):
    id: int
    name: str
    color: str


class TagCreate(SQLModel):
    name: str
    color: str


class Reminder(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    organization_id: Optional[int] = Field(default=None, foreign_key="organization.id")
    conversation_id: Optional[int] = Field(default=None, foreign_key="conversation.id")
    owner_user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    created_by_user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    title: str
    due_at: datetime
    is_done: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    conversation: Optional[Conversation] = Relationship()


class ReminderCreate(SQLModel):
    title: str
    due_at: datetime
    conversation_id: Optional[int] = None
    owner_user_id: Optional[int] = None


class ReminderRead(SQLModel):
    id: int
    title: str
    due_at: datetime
    is_done: bool
    conversation_id: Optional[int]
    owner_user_id: Optional[int]


class ReminderUpdate(SQLModel):
    title: Optional[str] = None
    due_at: Optional[datetime] = None
    is_done: Optional[bool] = None


class BulkCustomFieldMapping(SQLModel):
    key: str
    column: str


class BulkContactsMapping(SQLModel):
    phone: str
    name: Optional[str] = None
    custom_fields: List[BulkCustomFieldMapping] = Field(default_factory=list)


class BulkCampaign(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    organization_id: int = Field(foreign_key="organization.id")
    created_by_user_id: int = Field(foreign_key="user.id")
    name: str
    channel: str
    status: str = Field(default="running")
    folder_id: Optional[str] = Field(default=None, index=True)
    contacts_total: int = 0
    sent_count: int = 0
    failed_count: int = 0
    replied_count: int = 0
    cost_estimate: Optional[float] = None
    send_interval_seconds: Optional[int] = None
    message_template: str
    preview_text: Optional[str] = None
    mapping_schema: Optional[str] = None
    scheduled_for: Optional[datetime] = None
    started_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None
    last_synced_at: Optional[datetime] = None
    last_error: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class BulkCampaignRead(SQLModel):
    id: int
    name: str
    channel: str
    status: str
    contacts_total: int
    sent_count: int
    replied_count: int
    failed_count: int
    cost_estimate: Optional[float]
    folder_id: Optional[str]
    scheduled_for: Optional[datetime]
    started_at: Optional[datetime]
    finished_at: Optional[datetime]
    created_at: datetime
    last_synced_at: Optional[datetime]
    last_error: Optional[str]


class BulkCampaignCreate(SQLModel):
    name: str
    channel: str
    message_template: str
    preview_text: Optional[str] = None
    contacts_quantity: Optional[int] = None
    cost_estimate: Optional[float] = None
    send_interval_seconds: Optional[int] = None
    scheduled_for: Optional[datetime] = None
    mapping: BulkContactsMapping


__all__ = [
    "MessageDirection",
    "DeviceSessionStatus",
    "Organization",
    "OrganizationCreate",
    "OrganizationRead",
    "Conversation",
    "ConversationCreate",
    "ConversationUpdate",
    "ConversationRead",
    "ConversationSummary",
    "ConversationAvatar",
    "ConversationNote",
    "ConversationNoteCreate",
    "ConversationNoteRead",
    "MessageType",
    "Message",
    "MessageCreate",
    "MessageRead",
    "IncomingMessagePayload",
    "CallStartRequest",
    "CallRejectRequest",
    "CallActionResponse",
    "DeviceSession",
    "SessionRead",
    "SessionRotateRequest",
    "User",
    "UserRead",
    "AuthLogin",
    "AuthRegister",
    "AuthResponse",
    "SessionToken",
    "default_message_preview_length",
    "Tag",
    "TagRead",
    "TagCreate",
    "BulkCampaign",
    "BulkCampaignRead",
    "BulkCampaignCreate",
    "BulkContactsMapping",
    "BulkCustomFieldMapping",
    "ConversationTagLink",
    "Reminder",
    "ReminderCreate",
    "ReminderRead",
    "ReminderUpdate",
]
