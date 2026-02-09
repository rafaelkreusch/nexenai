const conversationListEl = document.getElementById("conversationList");

const messageListEl = document.getElementById("messageList");

const chatHeaderEl = document.getElementById("chatHeader");

const messageForm = document.getElementById("messageForm");

const messageInput = document.getElementById("messageInput");

const replyPreviewEl = document.getElementById("replyPreview");

const replyPreviewNameEl = document.getElementById("replyPreviewName");

const replyPreviewTextEl = document.getElementById("replyPreviewText");

const replyPreviewClearButton = document.getElementById("replyPreviewClear");

const newConversationForm = document.getElementById("newConversationForm");

const newConversationSection = document.querySelector(".new-conversation");

const toggleNewConversationButton = document.getElementById("toggleNewConversation");

const refreshButton = document.getElementById("refreshConversations");

const sessionInfoEl = document.getElementById("sessionInfo");

const rotateSessionButton = document.getElementById("rotateSession");
const rotateSessionButtonDefaultText =
  rotateSessionButton?.textContent?.trim() || "Gerar novo QR";
const rotateSessionButtonBusyText = "Gerando QR...";
const missingUazapiCredentialMessage =
  "Preencha a URL do servidor Uazapi e o token de administrador na tela de colaboradores para provisionar a instância automaticamente.";
let rotateSessionButtonLoading = false;

const loginView = document.getElementById("loginView");

const appView = document.getElementById("appView");

const loginForm = document.getElementById("loginForm");

const registerForm = document.getElementById("registerForm");

const loginErrorEl = document.getElementById("loginError");

const registerErrorEl = document.getElementById("registerError");

const queryParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;



if (queryParams && loginForm) {

  const organization = queryParams.get("organization");

  const usernameParam = queryParams.get("username");

  const passwordParam = queryParams.get("password");

  if (organization) {

    loginForm.organization.value = organization;

  }

  if (usernameParam) {

    loginForm.username.value = usernameParam;

  }

  if (passwordParam) {

    loginForm.password.value = passwordParam;

  }

  if (window.history?.replaceState) {

    window.history.replaceState({}, document.title, window.location.pathname);

  }

}



const settingsModal = document.getElementById("settingsModal");

const closeSettingsBtn = document.getElementById("closeSettings");
const settingsBackButton = document.getElementById("settingsBack");
const settingsHomeEl = document.getElementById("settingsHome");
const settingsSections = document.querySelectorAll("#settingsModal .settings-section");
const settingsNavItems = document.querySelectorAll("#settingsModal .settings-nav-item");

const settingsUserEl = document.getElementById("settingsUser");

const settingsOrgEl = document.getElementById("settingsOrg");

const userInfoEl = document.getElementById("userInfo");

const orgInfoEl = document.getElementById("orgInfo");

const authTabs = document.querySelectorAll("[data-auth-view]");

const userListEl = document.getElementById("userList");

const newUserForm = document.getElementById("newUserForm");

const newUserErrorEl = document.getElementById("newUserError");

const newUserUsernameInput = document.getElementById("newUserUsername");

const newUserFullNameInput = document.getElementById("newUserFullName");

const newUserPasswordInput = document.getElementById("newUserPassword");

const userAdminSection = document.getElementById("userAdminSection");

const scopeTabsEl = document.getElementById("scopeTabs");

const scopeButtons = document.querySelectorAll("[data-scope]");

const conversationTypeTabs = document.querySelectorAll("[data-conversation-type]");

const chatsCountEl = document.getElementById("chatsCount");

const groupsCountEl = document.getElementById("groupsCount");

const sideNavButtons = document.querySelectorAll(".side-nav button[data-panel]");

const workspace = document.querySelector(".workspace");

const newUserIsAdminInput = document.getElementById("newUserIsAdmin");

const conversationSearchInput = document.getElementById("conversationSearch");

const tagFilterButton = document.getElementById("tagFilterButton");

const tagFilterMenu = document.getElementById("tagFilterMenu");

const tagMenuToggle = document.getElementById("tagMenuToggle");

const tagMenu = document.getElementById("tagMenu");

const tagMenuList = document.getElementById("tagMenuList");

const newTagForm = document.getElementById("newTagForm");

const newTagNameInput = document.getElementById("newTagName");

const newTagColorInput = document.getElementById("newTagColor");

const quickReplyPanel = document.getElementById("quickReplyPanel");
const quickReplyListEl = document.getElementById("quickReplyList");
const quickReplyForm = document.getElementById("quickReplyForm");
const quickReplyShortcutInput = document.getElementById("quickReplyShortcut");
const quickReplyContentInput = document.getElementById("quickReplyContent");
const quickReplyClearButton = document.getElementById("quickReplyClear");
const quickReplyErrorEl = document.getElementById("quickReplyError");

const chatTitleEl = document.getElementById("chatTitle");

const chatSubtitleEl = document.getElementById("chatSubtitle");

const chatOwnerEl = document.getElementById("chatOwner");

const selectedTagsEl = document.getElementById("selectedTags");

const chatRemindersEl = document.getElementById("chatReminders");

const chatAvatarEl = document.getElementById("chatAvatar");

const callStartButton = document.getElementById("callStartButton");

const callRejectButton = document.getElementById("callRejectButton");

const reminderBell = document.getElementById("reminderBell");

const reminderBadge = document.getElementById("reminderBadge");

const reminderModal = document.getElementById("reminderModal");

const closeRemindersBtn = document.getElementById("closeReminders");

const reminderListEl = document.getElementById("reminderList");

const newReminderForm = document.getElementById("newReminderForm");

const reminderConversationSelect = document.getElementById("reminderConversationSelect");

const reminderTitleInput = document.getElementById("reminderTitle");

const reminderDueInput = document.getElementById("reminderDue");
const reminderFormError = document.getElementById("reminderFormError");
const reminderCreateButton = document.getElementById("reminderCreateButton");
if (reminderCreateButton) {
  reminderCreateButton.classList.remove("ghost", "small");
  reminderCreateButton.classList.add("reminder-trigger");
}
const noteCreateButton = document.getElementById("noteCreateButton");
const noteModal = document.getElementById("noteModal");
const closeNoteModalButton = document.getElementById("closeNoteModal");
const noteForm = document.getElementById("noteForm");
const noteTextInput = document.getElementById("noteText");
const noteFormError = document.getElementById("noteFormError");
const bulkPanel = document.getElementById("bulkPanel");

const bulkCampaignList = document.getElementById("bulkCampaignList");

const bulkSearchInput = document.getElementById("bulkSearchInput");

const bulkCreateButton = document.getElementById("bulkCreateButton");

const bulkFilterButtons = document.querySelectorAll("[data-bulk-filter]");

const bulkCreateModal = document.getElementById("bulkCreateModal");

const bulkCreateForm = document.getElementById("bulkCreateForm");

const bulkCampaignNameInput = document.getElementById("bulkCampaignName");

const bulkCampaignChannelSelect = document.getElementById("bulkCampaignChannel");

const bulkScheduleDateInput = document.getElementById("bulkScheduleDate");

const bulkScheduleTimeInput = document.getElementById("bulkScheduleTime");

const bulkContactsFileInput = document.getElementById("bulkContactsFile");

const bulkCampaignQuantityInput = document.getElementById("bulkCampaignQuantity");

const bulkMessageTemplateInput = document.getElementById("bulkMessageTemplate");

const bulkMessagePreviewInput = document.getElementById("bulkMessagePreview");
const bulkCampaignCostInput = document.getElementById("bulkCampaignCost");
const bulkSendIntervalInput = document.getElementById("bulkSendInterval");
const bulkCreateError = document.getElementById("bulkCreateError");
const bulkCreateCancel = document.getElementById("bulkCreateCancel");
const dashboardPanel = document.getElementById("dashboardPanel");
const dashboardRefreshButton = document.getElementById("dashboardRefreshButton");
const dashboardLastUpdated = document.getElementById("dashboardLastUpdated");
const dashboardTotalConversationsEl = document.getElementById("dashboardTotalConversations");
const dashboardUnreadConversationsEl = document.getElementById("dashboardUnreadConversations");
const dashboardPendingRemindersEl = document.getElementById("dashboardPendingReminders");
const dashboardActiveCampaignsEl = document.getElementById("dashboardActiveCampaigns");
const dashboardCampaignList = document.getElementById("dashboardCampaignList");
const dashboardReminderList = document.getElementById("dashboardReminderList");
const dashboardConversationList = document.getElementById("dashboardConversationList");
const calendarPanel = document.getElementById("calendarPanel");
const calendarGrid = document.getElementById("calendarGrid");
const calendarUpcomingList = document.getElementById("calendarUpcomingList");
const calendarPrevWeekButton = document.getElementById("calendarPrevWeek");
const calendarNextWeekButton = document.getElementById("calendarNextWeek");
const calendarTodayButton = document.getElementById("calendarTodayButton");
const calendarWeekLabel = document.getElementById("calendarWeekLabel");
const calendarNewEventButton = document.getElementById("calendarNewEventButton");
const bulkMappingSection = document.getElementById("bulkMappingSection");

const bulkMappingFileLabel = document.getElementById("bulkMappingFile");

const bulkMappingHead = document.getElementById("bulkMappingHead");

const bulkMappingBody = document.getElementById("bulkMappingBody");

const bulkColumnPhoneSelect = document.getElementById("bulkColumnPhone");

const bulkColumnNameSelect = document.getElementById("bulkColumnName");

const bulkCustomFieldsContainer = document.getElementById("bulkCustomFields");

const bulkAddCustomFieldButton = document.getElementById("bulkAddCustomField");

const bulkMappingError = document.getElementById("bulkMappingError");

const bulkPlaceholderList = document.getElementById("bulkPlaceholderList");

const bulkStepperItems = document.querySelectorAll(".bulk-stepper li");

const bulkStepPanels = document.querySelectorAll(".bulk-step");

const bulkStepPrev = document.getElementById("bulkStepPrev");

const bulkStepNext = document.getElementById("bulkStepNext");

const bulkStepFinish = document.getElementById("bulkStepFinish");

const closeBulkCreateBtn = document.getElementById("closeBulkCreate");

const integrationModal = document.getElementById("integrationModal");

const closeIntegrationBtn = document.getElementById("closeIntegration");

const integrationStatusDot = document.getElementById("integrationStatus");
const integrationStatusText = document.getElementById("integrationStatusText");
const integrationStatusDetail = document.getElementById("integrationStatusDetail");

const integrationQrImage = document.getElementById("integrationQrImage");

const integrationQrPayload = document.getElementById("integrationQrPayload");

const integrationProviderSelect = document.getElementById("integrationProvider");

const integrationBaseUrlInput = document.getElementById("integrationBaseUrl");

const integrationInstanceInput = document.getElementById("integrationInstanceId");

const integrationTokenInput = document.getElementById("integrationToken");

const integrationCredentialHint = document.getElementById("integrationCredentialHint");

const integrationAutoProvisionButton = document.getElementById("integrationAutoProvision");

const integrationAutoProvisionHint = document.getElementById("integrationAutoProvisionHint");

let cachedIntegrationQrPayload = "";

const messageSubmitButton =
  (messageForm?.querySelector('button[type="submit"]') || null);

const audioRecordButton = document.getElementById("audioRecordButton");

const audioStopButton = document.getElementById("audioStopButton");

const audioCancelButton = document.getElementById("audioCancelButton");
const audioStatusEl = document.getElementById("audioStatus");
const audioStatusText = document.getElementById("audioStatusText");
const audioFileInput = document.getElementById("audioFileInput");
const audioUploadLabel = document.getElementById("audioUploadLabel");
const audioSendButton = document.getElementById("audioSendButton");
const audioPreviewEl = document.getElementById("audioPreview");
const mediaFileInput = document.getElementById("mediaFileInput");
const mediaUploadLabel = document.getElementById("mediaUploadLabel");
const emojiToggleButton = document.getElementById("emojiToggleButton");
const emojiPickerPanel = document.getElementById("emojiPickerPanel");
const emojiPickerElement = emojiPickerPanel?.querySelector("emoji-picker");
const imagePreviewModal = document.getElementById("imagePreviewModal");
const imagePreviewImage = document.getElementById("imagePreviewImage");
const imagePreviewCaption = document.getElementById("imagePreviewCaption");
const imagePreviewDownload = document.getElementById("imagePreviewDownload");


const STORAGE_KEY = "chatdevalor_token";

const AVATAR_COLORS = [

  "#6d28d9",

  "#db2777",

  "#ea580c",

  "#16a34a",

  "#0ea5e9",

  "#2563eb",

  "#d97706",

  "#0891b2",

];

const AVATAR_REFRESH_MS = 1000 * 60 * 60 * 6;

const BULK_STATUS_LABELS = {

  running: "Em execução",

  scheduled: "Programada",

  done: "Concluída",

  paused: "Pausada",

  failed: "Com falha",

};



const state = {

  token: localStorage.getItem(STORAGE_KEY),

  user: null,

  organization: null,

  conversations: [],

  users: [],

  selectedConversation: null,

  pollHandle: null,

  conversationPollHandle: null,

  viewAllConversations: false,

  activeConversationType: "chats",

  tags: [],

  searchQuery: "",

  tagFilterId: null,

  session: null,

  reminders: [],

  reminderPollHandle: null,
  pendingReminderConversationId: null,
  messagesSignature: null,
  notesSignature: null,
  latestMessages: [],
  replyContext: null,
  emojiPickerOpen: false,
  quickReplyOpen: false,
  quickReplyIndex: 0,
  quickReplyMatches: [],
  conversationNotes: [],
  bulkCampaigns: [],

  bulkSearch: "",

  bulkStatusFilter: "all",

  bulkStepIndex: 0,
  bulkContactsPreview: null,
  bulkContactsMapping: {
    phone: "",
    name: "",
    customFields: [],
  },
  calendarWeekOffset: 0,
  calendarEvents: [],
  supportsRecording:

    typeof window !== "undefined" &&

    typeof navigator !== "undefined" &&

    typeof navigator.mediaDevices !== "undefined" &&

    typeof window.MediaRecorder !== "undefined",

  audio: {

    mediaRecorder: null,

    stream: null,

    chunks: [],

    timer: null,

    startTime: null,

    sending: false,

    cancelOnStop: false,

    preferredMime: null,

    pendingBlob: null,

    pendingDuration: null,

    pendingFilename: null,

    pendingUrl: null,

  },

  mediaSending: false,

  callInFlight: false,

  rejectingCall: false,

  avatars: {},

  avatarRequests: {},

  avatarTimestamps: {},

  imagePreviewOpen: false,

};

function getQuickRepliesStorageKey() {
  const orgId = state.organization?.id ?? "0";
  const userId = state.user?.id ?? "0";
  return `quickReplies:${orgId}:${userId}`;
}

function loadQuickReplies() {
  try {
    const raw = localStorage.getItem(getQuickRepliesStorageKey());
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((entry) => ({
        shortcut: String(entry.shortcut || "").trim().toLowerCase(),
        content: String(entry.content || "").trim(),
      }))
      .filter((entry) => entry.shortcut && entry.content);
  } catch {
    return [];
  }
}

function saveQuickReplies(replies) {
  const normalized = (replies || [])
    .map((entry) => ({
      shortcut: String(entry.shortcut || "").trim().toLowerCase(),
      content: String(entry.content || "").trim(),
    }))
    .filter((entry) => entry.shortcut && entry.content);
  localStorage.setItem(getQuickRepliesStorageKey(), JSON.stringify(normalized));
}

function renderQuickRepliesManager() {
  if (!quickReplyListEl) return;
  const replies = loadQuickReplies();
  quickReplyListEl.innerHTML = "";

  if (!replies.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "Nenhuma resposta rápida cadastrada ainda.";
    quickReplyListEl.appendChild(empty);
    return;
  }

  replies
    .slice()
    .sort((a, b) => a.shortcut.localeCompare(b.shortcut))
    .forEach((reply) => {
      const row = document.createElement("div");
      row.className = "quick-reply-row";
      const meta = document.createElement("div");
      meta.className = "meta";
      meta.innerHTML = `<strong>/${escapeHtml(reply.shortcut)}</strong><span>${escapeHtml(reply.content)}</span>`;
      const actions = document.createElement("div");
      actions.className = "actions";

      const editButton = document.createElement("button");
      editButton.type = "button";
      editButton.className = "ghost";
      editButton.textContent = "Editar";
      editButton.addEventListener("click", () => {
        if (quickReplyShortcutInput) quickReplyShortcutInput.value = reply.shortcut;
        if (quickReplyContentInput) quickReplyContentInput.value = reply.content;
        if (quickReplyErrorEl) quickReplyErrorEl.textContent = "";
        quickReplyShortcutInput?.focus();
      });

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "ghost";
      deleteButton.textContent = "Remover";
      deleteButton.addEventListener("click", () => {
        const confirmDelete = confirm(`Remover /${reply.shortcut}?`);
        if (!confirmDelete) return;
        const next = loadQuickReplies().filter((r) => r.shortcut !== reply.shortcut);
        saveQuickReplies(next);
        renderQuickRepliesManager();
      });

      actions.append(editButton, deleteButton);
      row.append(meta, actions);
      quickReplyListEl.appendChild(row);
    });
}

function clearQuickReplyForm() {
  if (quickReplyShortcutInput) quickReplyShortcutInput.value = "";
  if (quickReplyContentInput) quickReplyContentInput.value = "";
  if (quickReplyErrorEl) quickReplyErrorEl.textContent = "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSlashQueryAtCursor() {
  if (!messageInput) return null;
  const value = messageInput.value || "";
  const cursor = messageInput.selectionStart ?? value.length;
  let start = cursor;
  while (start > 0 && !/\s/.test(value[start - 1])) {
    start -= 1;
  }
  const token = value.slice(start, cursor);
  if (!token.startsWith("/")) return null;
  const query = token.slice(1).toLowerCase();
  return { start, cursor, query };
}

function closeQuickReplyPanel() {
  if (!quickReplyPanel) return;
  quickReplyPanel.classList.add("hidden");
  state.quickReplyOpen = false;
  state.quickReplyIndex = 0;
  state.quickReplyMatches = [];
}

function openQuickReplyPanel(matches) {
  if (!quickReplyPanel) return;
  quickReplyPanel.innerHTML = "";
  state.quickReplyMatches = matches;
  state.quickReplyOpen = true;
  state.quickReplyIndex = Math.min(state.quickReplyIndex, Math.max(matches.length - 1, 0));

  matches.forEach((reply, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quick-reply-item";
    if (index === state.quickReplyIndex) {
      button.classList.add("active");
    }
    button.setAttribute("role", "option");
    button.innerHTML = `<strong>/${escapeHtml(reply.shortcut)}</strong><span>${escapeHtml(reply.content)}</span>`;
    button.addEventListener("click", () => applyQuickReplyAtCursor(index));
    quickReplyPanel.appendChild(button);
  });

  quickReplyPanel.classList.remove("hidden");
}

function updateQuickReplyPanel() {
  if (!quickReplyPanel || !messageInput || messageInput.disabled) return;
  const slash = getSlashQueryAtCursor();
  if (!slash) {
    closeQuickReplyPanel();
    return;
  }
  const replies = loadQuickReplies();
  if (!replies.length) {
    closeQuickReplyPanel();
    return;
  }
  const query = slash.query;
  const matches = replies
    .filter((r) => (query ? r.shortcut.startsWith(query) : true))
    .slice(0, 8);
  if (!matches.length) {
    closeQuickReplyPanel();
    return;
  }
  openQuickReplyPanel(matches);
}

function applyQuickReplyAtCursor(index) {
  if (!messageInput) return;
  const slash = getSlashQueryAtCursor();
  if (!slash) return;
  const matches = state.quickReplyMatches || [];
  const selected = matches[index];
  if (!selected) return;

  const value = messageInput.value || "";
  const before = value.slice(0, slash.start);
  const after = value.slice(slash.cursor);
  const needsSpace = after.length && !/^\s/.test(after);
  const insertion = selected.content + (needsSpace ? " " : "");
  const nextValue = before + insertion + after;
  const nextCursor = (before + insertion).length;
  messageInput.value = nextValue;
  messageInput.selectionStart = messageInput.selectionEnd = nextCursor;
  messageInput.focus();
  closeQuickReplyPanel();
  scheduleMessageInputResize();
}



if (replyPreviewClearButton) {

  replyPreviewClearButton.addEventListener("click", () => {

    clearReplyContext();

  });

}



function getAvatarData(name, phone) {

  const baseLabel = (name || phone || "").trim() || "Contato";

  const initials = baseLabel

    .split(/\s+/)

    .filter(Boolean)

    .slice(0, 2)

    .map((part) => part[0])

    .join("")

    .toUpperCase();

  const seedSource = (phone || name || baseLabel).toLowerCase();

  let hash = 0;

  for (let i = 0; i < seedSource.length; i += 1) {

    hash = (hash + seedSource.charCodeAt(i) * 17) % AVATAR_COLORS.length;

  }

  return {

    initials: initials || "??",

    color: AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length],

  };

}



function getCachedAvatarUrl(conversationId) {

  if (!conversationId || !state.avatars) return undefined;

  if (Object.prototype.hasOwnProperty.call(state.avatars, conversationId)) {

    return state.avatars[conversationId];

  }

  return undefined;

}



function prefetchConversationAvatars(conversations, limit = 6) {

  if (!Array.isArray(conversations) || !conversations.length) return;

  let queued = 0;

  conversations.forEach((conversation) => {

    if (!conversation || !conversation.id) return;

    if (Object.prototype.hasOwnProperty.call(state.avatars, conversation.id)) return;

    if (queued >= limit) return;

    ensureConversationAvatar(conversation.id);

    queued += 1;

  });

}



function seedConversationAvatars(conversations = []) {

  if (!Array.isArray(conversations)) return;

  conversations.forEach((conversation) => {

    if (!conversation || typeof conversation.id === "undefined") {

      return;

    }

    const remoteUrl = typeof conversation.avatar_url === "string" ? conversation.avatar_url : "";

    const hasRemoteUrl = Boolean(remoteUrl);

    const rawTimestamp = conversation.avatar_updated_at;

    const hasRemoteTimestamp = Boolean(rawTimestamp);

    if (!hasRemoteUrl && !hasRemoteTimestamp) {

      return;

    }

    let remoteTimestamp = null;

    if (hasRemoteTimestamp) {

      const parsed = new Date(rawTimestamp).getTime();

      if (!Number.isNaN(parsed)) {

        remoteTimestamp = parsed;

      }

    }

    const existingTimestamp = state.avatarTimestamps?.[conversation.id] || 0;

    const shouldUpdate =

      remoteTimestamp === null

        ? Boolean(hasRemoteUrl)

        : !existingTimestamp || remoteTimestamp >= existingTimestamp;

    if (!shouldUpdate) {

      return;

    }

    if (remoteTimestamp !== null) {

      state.avatarTimestamps[conversation.id] = remoteTimestamp;

    } else if (hasRemoteUrl) {

      state.avatarTimestamps[conversation.id] = Date.now();

    }

    if (hasRemoteUrl) {

      state.avatars[conversation.id] = remoteUrl;

    } else if (remoteTimestamp !== null) {

      state.avatars[conversation.id] = null;

    }

  });

}



async function ensureConversationAvatar(conversationId, { force = false } = {}) {

  if (!conversationId) return null;

  const cached = getCachedAvatarUrl(conversationId);

  const lastFetched = state.avatarTimestamps?.[conversationId] || 0;

  const isFresh = Date.now() - lastFetched < AVATAR_REFRESH_MS;

  if (!force && cached !== undefined && isFresh) {

    return cached;

  }

  if (!force && state.avatarRequests?.[conversationId]) {

    return state.avatarRequests[conversationId];

  }

  const promise = (async () => {

    try {

      const response = await fetchJson(`/api/conversations/${conversationId}/avatar`);

      const url = response?.url || null;

      state.avatars[conversationId] = url;

       state.avatarTimestamps[conversationId] = Date.now();

      renderChatHeader();

      renderConversations();

      return url;

    } catch (error) {

      console.warn("Falha ao carregar avatar", error);

      state.avatars[conversationId] = null;

      state.avatarTimestamps[conversationId] = Date.now();

      return null;

    } finally {

      if (state.avatarRequests) {

        delete state.avatarRequests[conversationId];

      }

    }

  })();

  state.avatarRequests[conversationId] = promise;

  return promise;

}



function setToken(token) {

  state.token = token;

  if (token) {

    localStorage.setItem(STORAGE_KEY, token);

  } else {

    localStorage.removeItem(STORAGE_KEY);

  }

}



function showLogin(view = "login") {

  loginView.classList.remove("hidden");

  appView.classList.add("hidden");

  switchAuthView(view);

}



function showApp() {

  loginView.classList.add("hidden");

  appView.classList.remove("hidden");

}



function stopPolling() {

  if (state.pollHandle) {

    clearInterval(state.pollHandle);

    state.pollHandle = null;

  }

}



function stopReminderPolling() {

  if (state.reminderPollHandle) {

    clearInterval(state.reminderPollHandle);

    state.reminderPollHandle = null;

  }

}



function stopConversationPolling() {

  if (state.conversationPollHandle) {

    clearInterval(state.conversationPollHandle);

    state.conversationPollHandle = null;

  }

}



function handleUnauthorized() {

  stopPolling();

  stopReminderPolling();

  stopConversationPolling();

  setToken(null);

  state.user = null;

  state.organization = null;

  state.conversations = [];

  state.users = [];

  state.selectedConversation = null;

  state.viewAllConversations = false;

  state.activeConversationType = "chats";

  state.tags = [];

  state.searchQuery = "";

  state.tagFilterId = null;

  state.session = null;

  state.reminders = [];

  state.pendingReminderConversationId = null;

  state.callInFlight = false;

  state.rejectingCall = false;

  state.avatars = {};

  state.avatarRequests = {};

  state.avatarTimestamps = {};

  state.avatarTimestamps = {};

  resetChatArea();

  updateScopeControls();

  updateConversationTypeTabs([]);

  closeSettings();

  closeIntegration();

  closeReminderModal(true);

  closeTagMenus();

  updateIntegrationStatus(null);

  updateRotateSessionButtonAvailability();

  updateTagFilterButton();

  if (conversationSearchInput) {

    conversationSearchInput.value = "";

  }

  updateReminderBadge();

  setActiveNav("conversations");

  updateRotateSessionButtonAvailability();

  showLogin();

}



function closeTagMenus() {
  tagFilterMenu?.classList.add("hidden");
  tagMenu?.classList.add("hidden");
}

function openEmojiPicker() {
  if (!emojiPickerPanel || !emojiToggleButton || emojiToggleButton.disabled) return;
  emojiPickerPanel.classList.remove("hidden");
  state.emojiPickerOpen = true;
}

function closeEmojiPicker() {
  if (!emojiPickerPanel) return;
  emojiPickerPanel.classList.add("hidden");
  state.emojiPickerOpen = false;
}

function toggleEmojiPicker() {
  if (state.emojiPickerOpen) {
    closeEmojiPicker();
  } else {
    openEmojiPicker();
  }
}

function insertEmojiAtCursor(emoji) {
  if (!messageInput || messageInput.disabled) return;
  const start = messageInput.selectionStart ?? messageInput.value.length;
  const end = messageInput.selectionEnd ?? messageInput.value.length;
  const newValue =
    messageInput.value.slice(0, start) + emoji + messageInput.value.slice(end);
  messageInput.value = newValue;
  const caret = start + emoji.length;
  messageInput.selectionStart = messageInput.selectionEnd = caret;
  messageInput.focus();
  scheduleMessageInputResize();
}

function openNoteModal() {
  if (!state.user?.is_admin) {
    return;
  }
  if (!state.selectedConversation) {
    alert("Selecione uma conversa para adicionar uma nota interna.");
    return;
  }
  noteFormError.textContent = "";
  noteModal?.classList.remove("hidden");
  noteModal?.setAttribute("aria-hidden", "false");
  setTimeout(() => noteTextInput?.focus(), 50);
}

function closeNoteModal() {
  if (!noteModal) return;
  noteModal.classList.add("hidden");
  noteModal.setAttribute("aria-hidden", "true");
  if (noteTextInput) {
    noteTextInput.value = "";
  }
  if (noteFormError) {
    noteFormError.textContent = "";
  }
}

function setMessageFormAvailability(enabled) {
  messageInput.disabled = !enabled;
  messageSubmitButton.disabled = !enabled;
  if (!enabled) {
    messageInput.value = "";
    cancelPendingAudio();
    clearReplyContext();
    closeQuickReplyPanel();
  }
  setAudioControlsAvailability(enabled);
  setAttachmentControlsAvailability(enabled);
  updateNoteButtonState();
  if (emojiToggleButton) {
    emojiToggleButton.disabled = !enabled;
  }
  if (!enabled) {
    closeEmojiPicker();
  }
  scheduleMessageInputResize();
}

function resizeMessageInput() {
  if (!messageInput) return;
  messageInput.style.height = "auto";
  const computed = window.getComputedStyle(messageInput);
  const maxHeight = Number.parseFloat(computed.maxHeight);
  const maxPx = Number.isFinite(maxHeight) ? maxHeight : 168;
  const targetHeight = Math.min(messageInput.scrollHeight, maxPx);
  messageInput.style.height = `${targetHeight}px`;
  messageInput.style.overflowY = messageInput.scrollHeight > maxPx ? "auto" : "hidden";
}

let pendingMessageInputResize = 0;
function scheduleMessageInputResize() {
  if (!messageInput) return;
  if (pendingMessageInputResize) {
    window.cancelAnimationFrame(pendingMessageInputResize);
  }
  pendingMessageInputResize = window.requestAnimationFrame(() => {
    pendingMessageInputResize = 0;
    resizeMessageInput();
  });
}

function updateNoteButtonState() {
  if (!noteCreateButton) return;
  const isAdmin = Boolean(state.user?.is_admin);
  noteCreateButton.classList.toggle("hidden", !isAdmin);
  if (!isAdmin) {
    noteCreateButton.disabled = true;
    return;
  }
  noteCreateButton.disabled = !state.selectedConversation;
}


function setAudioControlsAvailability(enabled) {

  const hasPending = !!state.audio.pendingBlob;

  const disableRecord = !enabled || !state.supportsRecording || state.audio.sending || hasPending;

  if (audioRecordButton) {

    audioRecordButton.disabled = disableRecord;

  }

  if (audioFileInput) {

    audioFileInput.disabled = !enabled || state.audio.sending;

  }

  if (audioUploadLabel) {

    audioUploadLabel.classList.toggle("disabled", audioFileInput?.disabled);

  }

  if (audioSendButton) {

    audioSendButton.disabled = state.audio.sending || !state.audio.pendingBlob || !state.selectedConversation;

  }

  if (audioCancelButton) {

    audioCancelButton.disabled = state.audio.sending && !!state.audio.pendingBlob;

  }

  setAttachmentControlsAvailability(enabled);

}



function setAttachmentControlsAvailability(enabled) {

  const canUse = Boolean(enabled) && !!state.selectedConversation && !state.audio.sending && !state.mediaSending;

  if (mediaFileInput) {

    mediaFileInput.disabled = !canUse;

  }

  if (mediaUploadLabel) {

    mediaUploadLabel.classList.toggle("disabled", mediaFileInput?.disabled);

  }

}



function getConversationContactLabel() {

  if (state.selectedConversation?.debtor_name) {

    return state.selectedConversation.debtor_name;

  }

  if (state.selectedConversation?.debtor_phone) {

    return state.selectedConversation.debtor_phone;

  }

  return "Contato";

}



function buildMessageSummary(message) {

  if (!message) {

    return "Mensagem indispon?vel";

  }

  const text = (message.content || "").trim();

  if (text) {

    return text.length > 120 ? `${text.slice(0, 120)}...` : text;

  }

  switch (message.message_type) {

    case "audio": {

      const durationLabel = formatDurationLabel(message.media_duration_seconds);

      return durationLabel ? `?udio (${durationLabel})` : "?udio";

    }

    case "image":

      return "Imagem";

    case "document":

      return "Documento";

    default:

      return "Mensagem";

  }

}



function clearReplyContext() {

  state.replyContext = null;

  renderReplyPreview();

}



function setReplyContextFromMessage(message) {

  if (!message) {

    return;

  }

  state.replyContext = {

    id: message.id,

    direction: message.direction,

    message_type: message.message_type,

    content: message.content,

    media_duration_seconds: message.media_duration_seconds,

  };

  renderReplyPreview();

  if (!messageInput.disabled) {

    messageInput.focus();

  }

}



function renderReplyPreview() {

  if (!replyPreviewEl) return;

  if (!state.replyContext) {

    replyPreviewEl.classList.add("hidden");

    if (replyPreviewTextEl) {

      replyPreviewTextEl.textContent = "";

    }

    return;

  }

  const currentMessage =

    state.latestMessages.find((msg) => msg.id === state.replyContext.id) ||

    state.replyContext;

  const senderLabel =

    currentMessage.direction === "agent" ? "Voc?" : getConversationContactLabel();

  if (replyPreviewNameEl) {

    replyPreviewNameEl.textContent = senderLabel;

  }

  if (replyPreviewTextEl) {

    replyPreviewTextEl.textContent = buildMessageSummary(currentMessage);

  }

  replyPreviewEl.classList.remove("hidden");

}



function isVoiceCallSupported() {

  const provider = (state.session?.provider || "").toLowerCase();

  return provider === "uazapi" && Boolean(state.session?.has_credentials);

}



function updateCallButtonsAvailability() {

  if (!callStartButton || !callRejectButton) return;

  const hasConversation = Boolean(state.selectedConversation);

  const supported = isVoiceCallSupported();

  const startDisabled = !supported || !hasConversation || state.callInFlight;

  const rejectDisabled = !supported || !hasConversation || state.rejectingCall;

  callStartButton.disabled = startDisabled;

  callRejectButton.disabled = rejectDisabled;

  callStartButton.title = supported

    ? hasConversation

      ? "Iniciar chamada de voz"

      : "Selecione uma conversa para ligar."

    : "Disponivel apenas quando a integracao Uazapi estiver ativa.";

  callRejectButton.title = supported

    ? hasConversation

      ? "Rejeitar chamada recebida para esta conversa."

      : "Selecione uma conversa para rejeitar a chamada."

    : "Disponivel apenas quando a integracao Uazapi estiver ativa.";

}



async function handleCallStart() {

  if (!state.selectedConversation || state.callInFlight) return;

  state.callInFlight = true;

  updateCallButtonsAvailability();

  try {

    const payload = { conversation_id: state.selectedConversation.id };

    const response = await fetchJson("/api/calls/start", {

      method: "POST",

      body: JSON.stringify(payload),

    });

    if (response?.detail) {

      alert(response.detail);

    } else {

      alert("Chamada iniciada com sucesso.");

    }

  } catch (error) {

    console.error("Erro ao iniciar chamada", error);

    alert(error.message || "Nao foi possivel iniciar a chamada.");

  } finally {

    state.callInFlight = false;

    updateCallButtonsAvailability();

  }

}



async function handleCallReject() {

  if (!state.selectedConversation || state.rejectingCall) return;

  state.rejectingCall = true;

  updateCallButtonsAvailability();

  try {

    const payload = { conversation_id: state.selectedConversation.id };

    const response = await fetchJson("/api/calls/reject", {

      method: "POST",

      body: JSON.stringify(payload),

    });

    if (response?.detail) {

      alert(response.detail);

    } else {

      alert("Chamada rejeitada com sucesso.");

    }

  } catch (error) {

    console.error("Erro ao rejeitar chamada", error);

    alert(error.message || "Nao foi possivel rejeitar a chamada.");

  } finally {

    state.rejectingCall = false;

    updateCallButtonsAvailability();

  }

}



function openImagePreview(url, caption) {

  if (!url || !imagePreviewModal || !imagePreviewImage) return;

  imagePreviewImage.src = url;

  imagePreviewImage.alt = caption?.trim() || "Pré-visualização da imagem";

  if (imagePreviewCaption) {

    const hasCaption = Boolean(caption?.trim());

    imagePreviewCaption.textContent = hasCaption ? caption : "";

    imagePreviewCaption.classList.toggle("hidden", !hasCaption);

  }

  if (imagePreviewDownload) {

    imagePreviewDownload.href = url;

  }

  imagePreviewModal.classList.remove("hidden");

  imagePreviewModal.setAttribute("aria-hidden", "false");

  document.body?.classList.add("image-preview-open");

  state.imagePreviewOpen = true;

}



function closeImagePreview() {

  if (!imagePreviewModal) return;

  imagePreviewModal.classList.add("hidden");

  imagePreviewModal.setAttribute("aria-hidden", "true");

  document.body?.classList.remove("image-preview-open");

  if (imagePreviewImage) {

    imagePreviewImage.src = "";

    imagePreviewImage.alt = "";

  }

  state.imagePreviewOpen = false;

}



function setupAudioControls() {

  if (audioRecordButton && state.supportsRecording) {

    audioRecordButton.addEventListener("click", () => {

      if (state.audio.mediaRecorder && state.audio.mediaRecorder.state === "recording") {

        stopRecording(false);

      } else {

        startRecording();

      }

    });

  }

  audioStopButton?.addEventListener("click", () => stopRecording(false));

  audioSendButton?.addEventListener("click", sendPendingAudio);

  audioCancelButton?.addEventListener("click", () => cancelPendingAudio());

  audioFileInput?.addEventListener("change", handleAudioFileSelected);

  mediaFileInput?.addEventListener("change", handleMediaFileSelected);

  if (!state.supportsRecording && audioRecordButton) {

    audioRecordButton.disabled = true;

    audioRecordButton.title = "Seu navegador não suporta gravação de áudio.";

  }

}



function showAudioStatus(text) {

  if (!audioStatusEl || !audioStatusText) return;

  audioStatusText.textContent = text;

  audioStatusEl.classList.remove("hidden");

}



function hideAudioStatus() {

  if (!audioStatusEl) return;

  clearPendingAudio();

  audioStatusEl.classList.add("hidden");

}



function clearPendingAudio() {

  if (state.audio.pendingUrl) {

    try {

      URL.revokeObjectURL(state.audio.pendingUrl);

    } catch (error) {

      console.warn("Erro liberando URL de  udio:", error);

    }

  }

  state.audio.pendingUrl = null;

  state.audio.pendingBlob = null;

  state.audio.pendingDuration = null;

  state.audio.pendingFilename = null;

  if (audioPreviewEl) {

    audioPreviewEl.pause?.();

    audioPreviewEl.removeAttribute("src");

    audioPreviewEl.classList.add("hidden");

  }

  audioSendButton?.classList.add("hidden");

  audioStopButton?.classList.remove("hidden");

  const canUseControls = !messageInput.disabled;

  setAudioControlsAvailability(canUseControls);

}



function formatDurationLabel(duration) {

  if (!duration || Number.isNaN(duration)) {

    return null;

  }

  const rounded = Math.max(0, Math.round(duration));

  const minutes = String(Math.floor(rounded / 60)).padStart(2, "0");

  const seconds = String(rounded % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;

}



function preparePendingAudio(blob, { duration, filename }) {

  state.audio.pendingBlob = blob;

  state.audio.pendingDuration = duration;

  state.audio.pendingFilename = filename;

  if (state.audio.pendingUrl) {

    try {

      URL.revokeObjectURL(state.audio.pendingUrl);

    } catch (error) {

      console.warn("Erro liberando URL antiga:", error);

    }

  }

  if (blob) {

    state.audio.pendingUrl = URL.createObjectURL(blob);

    if (audioPreviewEl) {

      audioPreviewEl.src = state.audio.pendingUrl;

      audioPreviewEl.classList.remove("hidden");

      audioPreviewEl.load();

    }

  }

  const durationLabel = formatDurationLabel(duration);

  showAudioStatus(durationLabel ? `Audio ${durationLabel} pronto` : "Audio pronto");

  audioStopButton?.classList.add("hidden");

  audioSendButton?.classList.remove("hidden");

  setAudioControlsAvailability(true);

}



async function sendPendingAudio() {

  if (!state.audio.pendingBlob || !state.selectedConversation) {

    return;

  }

  const blob = state.audio.pendingBlob;

  const duration = state.audio.pendingDuration;

  const filename = state.audio.pendingFilename;

  clearPendingAudio();

  showAudioStatus("Enviando audio...");

  const controlsWereEnabled = !messageInput.disabled;

  setAudioControlsAvailability(false);

  try {

    await sendAudioBlob(blob, { duration, filename });

  } catch (error) {

    alert(error.message || "Não foi possível enviar o áudio.");

  } finally {

    hideAudioStatus();

    setAudioControlsAvailability(controlsWereEnabled);

  }

}



async function startRecording() {

  if (!state.supportsRecording || state.audio.sending || !state.selectedConversation) {

    return;

  }

  try {

    clearPendingAudio();

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    let mimeType = null;

    if (window.MediaRecorder?.isTypeSupported?.("audio/ogg;codecs=opus")) {

      mimeType = "audio/ogg;codecs=opus";

    }

    const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

    state.audio.stream = stream;

    state.audio.mediaRecorder = recorder;

    state.audio.chunks = [];

    state.audio.startTime = Date.now();

    state.audio.cancelOnStop = false;

    state.audio.preferredMime = mimeType || recorder.mimeType || null;

    recorder.ondataavailable = (event) => {

      if (event.data?.size) {

        state.audio.chunks.push(event.data);

      }

    };

    recorder.onstop = () => {

      const chunks = state.audio.chunks.slice();

      const startedAt = state.audio.startTime;

      cleanupRecorder();

      if (!chunks.length || state.audio.cancelOnStop) {

        hideAudioStatus();

        return;

      }

      const effectiveType = state.audio.preferredMime || chunks[0]?.type || "audio/webm";

      const blob = new Blob(chunks, { type: effectiveType });

      const extension = effectiveType.includes("ogg") ? "ogg" : "webm";

      const duration = startedAt ? (Date.now() - startedAt) / 1000 : undefined;

      preparePendingAudio(blob, {

        duration,

        filename: `gravacao-${Date.now()}.${extension}`,

      });

    };

    recorder.start();

    if (audioRecordButton) {

      audioRecordButton.classList.add("recording");

      audioRecordButton.innerHTML = "<span aria-hidden='true'>■</span><span>Parar</span>";

    }

    showAudioStatus("00:00");

    audioStopButton?.classList.remove("hidden");

  audioSendButton?.classList.add("hidden");

  audioPreviewEl?.classList.add("hidden");

  state.audio.timer = setInterval(updateRecordingTimer, 500);

  setAudioControlsAvailability(false);

  setAttachmentControlsAvailability(true);

} catch (error) {

  console.error(error);

  alert("Nao foi possivel iniciar a gravacao. Verifique as permissoes do microfone.");

}

}



function stopRecording(cancel = false) {

  if (!state.audio.mediaRecorder) {

    return;

  }

  state.audio.cancelOnStop = cancel;

  if (state.audio.mediaRecorder.state !== "inactive") {

    state.audio.mediaRecorder.stop();

  }

  if (audioRecordButton) {

    audioRecordButton.classList.remove("recording");

    audioRecordButton.innerHTML = "<span aria-hidden='true'>🎙️</span><span>Gravar áudio</span>";

  }

  if (state.audio.timer) {

    clearInterval(state.audio.timer);

    state.audio.timer = null;

  }

  if (cancel) {

    hideAudioStatus();

  }

}



function cleanupRecorder() {

  if (state.audio.stream) {

    state.audio.stream.getTracks().forEach((track) => track.stop());

  }

  state.audio.stream = null;

  state.audio.mediaRecorder = null;

  state.audio.chunks = [];

  state.audio.startTime = null;

  state.audio.timer = null;

  state.audio.cancelOnStop = false;

  state.audio.preferredMime = null;

}



function cancelPendingAudio() {

  if (state.audio.mediaRecorder && state.audio.mediaRecorder.state === "recording") {

    state.audio.cancelOnStop = true;

    stopRecording(true);

    return;

  }

  hideAudioStatus();

  setAudioControlsAvailability(true);

}



function updateRecordingTimer() {

  if (!state.audio.startTime || !audioStatusText) return;

  const elapsed = Math.round((Date.now() - state.audio.startTime) / 1000);

  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");

  const seconds = String(elapsed % 60).padStart(2, "0");

  audioStatusText.textContent = `${minutes}:${seconds}`;

}



async function handleAudioFileSelected(event) {

  if (!event.target?.files?.length || !state.selectedConversation) return;

  const file = event.target.files[0];

  audioFileInput.value = "";

  showAudioStatus("Enviando arquivo...");

  setAudioControlsAvailability(false);

  try {

    await sendAudioBlob(file, { filename: file.name });

  } catch (error) {

    alert(error.message || "Erro ao enviar o arquivo de áudio.");

  } finally {

    hideAudioStatus();

    setAudioControlsAvailability(true);

  }

}



async function sendAudioBlob(blob, { duration, filename }) {

  if (!state.selectedConversation) return;

  state.audio.sending = true;

  setAudioControlsAvailability(false);

  const form = new FormData();

  form.append("conversation_id", state.selectedConversation.id);

  if (state.replyContext?.id) {

    form.append("reply_to_message_id", state.replyContext.id);

  }

  if (duration) {

    form.append("duration", duration.toFixed(2));

  }

  const fallbackExt =

    blob?.type && blob.type.includes("ogg")

      ? "ogg"

      : blob?.type && blob.type.includes("mp3")

      ? "mp3"

      : "webm";

  form.append("file", blob, filename || `audio-${Date.now()}.${fallbackExt}`);

  try {

    const response = await fetch("/api/messages/audio", {

      method: "POST",

      headers: {

        Authorization: `Bearer ${state.token}`,

      },

      body: form,

    });

    if (!response.ok) {

      const text = await response.text();

      throw new Error(text || "Falha ao enviar áudio.");

    }

    await response.json();

    await loadMessages();

    clearReplyContext();

  } finally {

    state.audio.sending = false;

    setAudioControlsAvailability(true);

  }

}



function resetChatArea() {
  state.selectedConversation = null;
  state.messagesSignature = null;
  state.notesSignature = null;
  state.latestMessages = [];
  state.conversationNotes = [];
  stopPolling();
  messageListEl.innerHTML =
    '<p class="empty">Selecione uma conversa para continuar.</p>';
  setMessageFormAvailability(false);
  renderChatHeader();
  closeTagMenus();
  closeNoteModal();
  closeEmojiPicker();
  clearReplyContext();
  if (chatRemindersEl) {
    chatRemindersEl.classList.add("hidden");
    chatRemindersEl.innerHTML = "";
  }
  if (reminderCreateButton) {

    reminderCreateButton.disabled = true;

  }

}



async function fetchJson(url, options = {}) {

  const { skipAuth, ...rest } = options;

  const isFormData = rest.body instanceof FormData;

  const headers = {

    ...(isFormData ? {} : { "Content-Type": "application/json" }),

    ...(rest.headers || {}),

  };

  if (!skipAuth && state.token) {

    headers.Authorization = `Bearer ${state.token}`;

  }

  const response = await fetch(url, {

    ...rest,

    headers,

  });

  if (response.status === 401) {

    handleUnauthorized();

    throw new Error("Sessão expirada. Faça login novamente.");

  }

  if (!response.ok) {

    const detail = await response.json().catch(() => ({}));

    throw new Error(detail.detail || `Falha na requisição ${response.status}`);

  }

  return response.json();

}



function parseUtcDate(value) {

  if (!value) return null;

  if (value instanceof Date && !Number.isNaN(value.getTime())) {

    return value;

  }

  let parsedValue = value;

  if (typeof value === "string") {

    const trimmed = value.trim();

    const hasTimeZone = /[zZ]|[+-]\d{2}:?\d{2}$/.test(trimmed);

    parsedValue = hasTimeZone ? trimmed : `${trimmed.replace(" ", "T")}Z`;

  }

  const date = new Date(parsedValue);

  if (Number.isNaN(date.getTime())) {

    return null;

  }

  return date;

}



function formatTimestamp(value) {
  const date = value instanceof Date ? value : parseUtcDate(value);
  if (!date) return "";
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",

    hour: "2-digit",

    minute: "2-digit",

    timeZone: "America/Sao_Paulo",

  });
  return formatter.format(date);
}

const dashboardNumberFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 0,
});

function formatDashboardNumber(value) {
  return dashboardNumberFormatter.format(Number.isFinite(value) ? value : 0);
}

function getWeekDates(offset = 0) {
  const today = new Date();
  const weekday = today.getDay() === 0 ? 7 : today.getDay();
  const start = new Date(today);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (weekday - 1) + offset * 7);
  const days = [];
  for (let i = 0; i < 7; i += 1) {
    const next = new Date(start);
    next.setDate(start.getDate() + i);
    days.push(next);
  }
  return days;
}

function formatWeekRangeLabel(dates) {
  if (!dates?.length) return "";
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  });
  const first = formatter.format(dates[0]);
  const last = formatter.format(dates[dates.length - 1]);
  return `${first} · ${last}`.replaceAll(".", "");
}

function formatLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseCalendarDate(event) {
  if (!event?.date || !event?.start_time) return null;
  const [year, month, day] = event.date.split("-").map(Number);
  const [hours, minutes] = event.start_time.split(":").map(Number);
  return new Date(year, month - 1, day, hours || 0, minutes || 0, 0, 0);
}


function formatDayDividerLabel(value) {

  const date = value instanceof Date ? value : parseUtcDate(value);

  if (!date) return "";

  const today = new Date();

  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const messageDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffMs = todayStart.getTime() - messageDay.getTime();

  const msPerDay = 24 * 60 * 60 * 1000;

  if (diffMs === 0) {

    return "Hoje";

  }

  if (diffMs === msPerDay) {

    return "Ontem";

  }

  if (diffMs < 0 && Math.abs(diffMs) < msPerDay) {

    return "Hoje";

  }

  return messageDay.toLocaleDateString("pt-BR", {

    day: "2-digit",

    month: "2-digit",

    year: "numeric",

  });

}



function formatCurrency(value) {

  if (typeof value !== "number") return value || "R$ 0,00";

  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

}



function formatInteger(value) {

  if (value === undefined || value === null) return "0";

  const numeric = Number(value);

  if (Number.isNaN(numeric)) {

    return "0";

  }

  return numeric.toLocaleString("pt-BR");

}



function isGroupConversation(conversation) {

  if (!conversation) return false;

  const phone = String(conversation.debtor_phone || "").toLowerCase();

  if (!phone) return false;

  if (phone.includes("@g.us")) return true;

  const numericOnly = phone.replace(/[^0-9]/g, "");

  if (numericOnly.startsWith("120") && numericOnly.length >= 15) return true;

  return false;

}



function getConversationType(conversation) {

  return isGroupConversation(conversation) ? "groups" : "chats";

}



function updateConversationTypeTabs(list = state.conversations) {

  if (!conversationTypeTabs.length) return;

  const totalCounts = { chats: 0, groups: 0 };

  const unreadCounts = { chats: 0, groups: 0 };

  (list || []).forEach((conversation) => {

    if (!conversation) return;

    const typeKey = getConversationType(conversation);

    totalCounts[typeKey] += 1;

    if (Number(conversation.unread_count) > 0) {

      unreadCounts[typeKey] += 1;

    }

  });

  if (chatsCountEl) chatsCountEl.textContent = unreadCounts.chats;

  if (groupsCountEl) groupsCountEl.textContent = unreadCounts.groups;

  conversationTypeTabs.forEach((tab) => {

    const tabType = tab.dataset.conversationType || "chats";

    const isActive = tabType === state.activeConversationType;

    tab.classList.toggle("active", isActive);

    tab.setAttribute("aria-selected", isActive ? "true" : "false");

    const total = totalCounts[tabType] || 0;

    const unread = unreadCounts[tabType] || 0;

    tab.setAttribute(

      "title",

      unread

        ? `${unread} ${tabType === "groups" ? "grupos" : "conversas"} com novas mensagens de ${total} no total`

        : `Nenhuma nova ${tabType === "groups" ? "mensagem em grupos" : "conversa"}. ${total} no total`

    );

  });

}



function updateScopeControls() {

  if (!scopeTabsEl || !scopeButtons.length) return;

  const isAdmin = Boolean(state.user?.is_admin);

  if (!isAdmin && state.viewAllConversations) {

    state.viewAllConversations = false;

  }

  const activeScope = state.viewAllConversations ? "all" : "mine";

  scopeTabsEl.classList.toggle("scope-tabs--restricted", !isAdmin);

  scopeButtons.forEach((button) => {

    const scope = button.dataset.scope || "mine";

    const isAllOption = scope === "all";

    const isActive = scope === activeScope;

    button.classList.toggle("active", isActive);

    if (isAllOption && !isAdmin) {

      button.setAttribute("disabled", "true");

      button.setAttribute("aria-disabled", "true");

      button.title = "Disponivel apenas para administradores";

    } else {

      button.removeAttribute("disabled");

      button.removeAttribute("aria-disabled");

      button.removeAttribute("title");

    }

  });

}



function renderConversations(conversations = state.conversations) {

  conversationListEl.innerHTML = "";

  const list = conversations || [];

  updateConversationTypeTabs(list);

  const search = state.searchQuery.trim().toLowerCase();

  const tagFilterId = state.tagFilterId;

  const activeType = state.activeConversationType === "groups" ? "groups" : "chats";

  const filtered = list.filter((conversation) => {

    if (!conversation) {

      return false;

    }

    const haystack = [

      conversation.debtor_name,

      conversation.debtor_phone,

      conversation.last_message_preview,

    ]

      .filter(Boolean)

      .join(" ")

      .toLowerCase();

    const matchesSearch = !search || haystack.includes(search);

    const matchesTag =

      !tagFilterId ||

      (conversation.tags || []).some((tag) => tag.id === tagFilterId);

    const matchesType =

      activeType === "groups" ? isGroupConversation(conversation) : !isGroupConversation(conversation);

    return matchesSearch && matchesTag && matchesType;

  });



  if (!filtered.length) {

    const empty = document.createElement("p");

    empty.className = "empty";

    empty.textContent = list.length

      ? "Nenhuma conversa com os filtros atuais."

      : "Nenhuma conversa ainda.";

    conversationListEl.appendChild(empty);

    return;

  }



  filtered.forEach((conversation) => {

    const item = document.createElement("article");

    item.className = "conversation-item";

    if (state.selectedConversation && state.selectedConversation.id === conversation.id) {

      item.classList.add("active");

    }

    const unreadCount = Number(conversation.unread_count) || 0;

    if (unreadCount > 0) {

      item.classList.add("has-unread");

    }

    const avatarData = getAvatarData(conversation.debtor_name, conversation.debtor_phone);

    const avatar = document.createElement("div");

    avatar.className = "conversation-avatar";

    const avatarUrl = getCachedAvatarUrl(conversation.id);

    if (avatarUrl) {

      avatar.style.backgroundImage = `url(${avatarUrl})`;

      avatar.style.backgroundColor = "transparent";

      avatar.textContent = "";

      avatar.classList.add("has-photo");

    } else {

      avatar.style.backgroundImage = "";

      avatar.textContent = avatarData.initials;

      avatar.style.backgroundColor = avatarData.color;

      avatar.classList.remove("has-photo");

    }

    avatar.title = conversation.debtor_name || conversation.debtor_phone || "";



    const title = document.createElement("div");

    title.className = "conversation-title";

    title.textContent = conversation.debtor_name;

    const preview = document.createElement("div");

    preview.className = "conversation-preview";

    preview.textContent = conversation.last_message_preview || "Sem mensagens";

    const time = document.createElement("div");

    time.className = "conversation-time";

    time.textContent = formatTimestamp(conversation.last_message_at);



    const meta = document.createElement("div");

    meta.className = "conversation-meta";

    meta.appendChild(time);

    if (unreadCount > 0) {

      const badge = document.createElement("span");

      badge.className = "conversation-unread-badge";

      badge.textContent = unreadCount > 99 ? "99+" : String(unreadCount);

      meta.appendChild(badge);

    }



    const infoWrap = document.createElement("div");

    infoWrap.className = "conversation-info";

    infoWrap.append(title, preview);



    const head = document.createElement("div");

    head.className = "conversation-head";

    head.append(avatar, infoWrap, meta);



    item.append(head);

    if (conversation.tags?.length) {

      const tagRow = document.createElement("div");

      tagRow.className = "conversation-tags";

      conversation.tags.forEach((tag) => {

        const chip = document.createElement("span");

        chip.className = "tag-chip";

        chip.textContent = tag.name;

        chip.style.setProperty("--tag-color", tag.color || "#4f46e5");

        tagRow.appendChild(chip);

      });

      item.append(tagRow);

    }

    if (state.user?.is_admin && conversation.owner_user_id) {

      const ownerTag = document.createElement("div");

      ownerTag.className = "owner-label";

      const ownerName = getUserLabel(conversation.owner_user_id);

      ownerTag.textContent = ownerName ? `@${ownerName}` : `ID ${conversation.owner_user_id}`;

      ownerTag.title = "Responsável";

      item.append(ownerTag);

    }

    item.addEventListener("click", () => selectConversation(conversation.id));

    conversationListEl.appendChild(item);

  });

  updateReminderConversationOptions();

}



function updateReminderConversationOptions() {

  if (!reminderConversationSelect) return;

  const previousValue =

    reminderConversationSelect.value || state.pendingReminderConversationId || "";

  reminderConversationSelect.innerHTML = "";

  const emptyOption = document.createElement("option");

  emptyOption.value = "";

  emptyOption.textContent = "Selecione";

  reminderConversationSelect.appendChild(emptyOption);

  state.conversations.forEach((conversation) => {

    const option = document.createElement("option");

    option.value = String(conversation.id);

    option.textContent = conversation.debtor_name;

    reminderConversationSelect.appendChild(option);

  });

  if (previousValue) {

    reminderConversationSelect.value = String(previousValue);

  }

}



async function loadConversations(options = {}) {

  const { silent = false } = options;

  try {

    let url = "/api/conversations";

    if (state.user?.is_admin) {

      const scope = state.viewAllConversations ? "all" : "mine";

      url += `?scope=${scope}`;

    }

    state.conversations = await fetchJson(url);

    seedConversationAvatars(state.conversations);

    syncSelectedConversation();
    renderConversations();
    renderChatHeader();
    prefetchConversationAvatars(state.conversations.slice(0, 8));
    updateDashboard();
  } catch (error) {
    console.error(error);
    if (!silent) {
      alert(error.message);
    }

  }

}



async function selectConversation(conversationId) {
  const conversation = state.conversations.find((c) => c.id === conversationId);
  if (!conversation) {
    return;
  }
  stopPolling();
  state.selectedConversation = conversation;
  state.messagesSignature = null;
  state.latestMessages = [];
  clearReplyContext();
  closeEmojiPicker();
  renderChatHeader();
  setMessageFormAvailability(true);
  closeTagMenus();

  ensureConversationAvatar(conversation.id);

  await loadMessages();

  startPolling();

  renderConversations();

}



async function loadMessages() {
  if (!state.selectedConversation) return;
  try {
    const [messages, notes] = await Promise.all([
      fetchJson(`/api/conversations/${state.selectedConversation.id}/messages`),
      fetchJson(`/api/conversations/${state.selectedConversation.id}/notes`),
    ]);
    const signature = JSON.stringify(
      messages.map((message) => [
        message.id,
        message.message_type,
        message.media_url,
        message.content,
        message.media_duration_seconds,
        message.reply_to_message_id,
      ])
    );
    const notesSignature = JSON.stringify(
      notes.map((note) => [note.id, note.text, note.created_at])
    );
    if (
      signature === state.messagesSignature &&
      notesSignature === state.notesSignature
    ) {
      return;
    }
    state.messagesSignature = signature;
    state.notesSignature = notesSignature;
    state.conversationNotes = notes;
    renderMessages(messages, { notes });
    clearUnreadForActiveConversation();
  } catch (error) {
    console.error(error);
  }
}


async function handleMediaFileSelected(event) {

  if (!event.target?.files?.length || !state.selectedConversation) return;

  const file = event.target.files[0];

  mediaFileInput.value = "";

  try {

    await sendMediaFile(file);

  } catch (error) {

    alert(error.message || "Erro ao enviar arquivo.");

  }

}



async function sendMediaFile(file) {

  if (!state.selectedConversation || !file) return;

  const caption = messageInput.value.trim();

  const form = new FormData();

  form.append("conversation_id", state.selectedConversation.id);

  if (state.replyContext?.id) {

    form.append("reply_to_message_id", state.replyContext.id);

  }

  if (caption) {

    form.append("caption", caption);

  }

  form.append("file", file, file.name || `anexo-${Date.now()}`);

  state.mediaSending = true;

  setAttachmentControlsAvailability(true);

  try {

    const response = await fetch("/api/messages/media", {

      method: "POST",

      headers: {

        Authorization: `Bearer ${state.token}`,

      },

      body: form,

    });

    if (!response.ok) {

      throw new Error((await response.text()) || "Falha ao enviar arquivo.");

    }

    await response.json();

    messageInput.value = "";

    await loadConversations();

    await loadMessages();

    clearReplyContext();

  } finally {

    state.mediaSending = false;

    setAttachmentControlsAvailability(true);

  }

}



function renderMessages(messages, options = {}) {
  const notes = options.notes || state.conversationNotes || [];
  state.latestMessages = messages.slice();
  renderReplyPreview();
  messageListEl.innerHTML = "";
  if (!messages.length && !notes.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Ainda sem mensagens.";
    messageListEl.appendChild(empty);
    return;
  }

  const messageMap = new Map(messages.map((msg) => [msg.id, msg]));
  let lastDayKey = null;

  const getDayKey = (date) => {
    if (!date) return "unknown";
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const timeline = [
    ...messages.map((message) => ({
      kind: "message",
      data: message,
      timestamp: parseUtcDate(message.timestamp),
      rawTimestamp: message.timestamp,
    })),
    ...notes.map((note) => ({
      kind: "note",
      data: note,
      timestamp: parseUtcDate(note.created_at),
      rawTimestamp: note.created_at,
    })),
  ].sort((a, b) => {
    const aTime = a.timestamp ? a.timestamp.getTime() : 0;
    const bTime = b.timestamp ? b.timestamp.getTime() : 0;
    if (aTime !== bTime) {
      return aTime - bTime;
    }
    if (a.kind === b.kind) return 0;
    return a.kind === "note" ? -1 : 1;
  });

  timeline.forEach((entry) => {
    const timestamp = entry.timestamp;
    const dayKey = getDayKey(timestamp);
    if (dayKey !== lastDayKey) {
      lastDayKey = dayKey;
      const divider = document.createElement("div");
      divider.className = "message-date-divider";
      const label = document.createElement("span");
      label.textContent = formatDayDividerLabel(timestamp || entry.rawTimestamp);
      divider.appendChild(label);
      messageListEl.appendChild(divider);
    }

    if (entry.kind === "note") {
      const note = entry.data;
      const noteEl = document.createElement("article");
      noteEl.className = "conversation-note";
      const title = document.createElement("p");
      title.className = "conversation-note-title";
      title.textContent = note.author_name
        ? `Nota interna — ${note.author_name}`
        : "Nota interna";
      const body = document.createElement("p");
      body.className = "conversation-note-text";
      body.textContent = note.text;
      const meta = document.createElement("small");
      meta.className = "conversation-note-meta";
      meta.textContent = formatTimestamp(timestamp || note.created_at);
      noteEl.append(title, body, meta);
      messageListEl.appendChild(noteEl);
      return;
    }

    const message = entry.data;
    const bubble = document.createElement("div");
    bubble.className = `message ${message.direction}`;
    bubble.dataset.messageId = message.id;

    if (message.reply_to_message_id) {
      const quoted = messageMap.get(message.reply_to_message_id) || null;

      bubble.appendChild(createQuotedPreview(quoted, message.reply_to_message_id));

    }



    let mediaHandled = false;

    if (message.message_type === "audio" && message.media_url) {

      appendAudioMessage(bubble, message);

      mediaHandled = true;

    } else if (["image", "document"].includes(message.message_type) && message.media_url) {

      appendFileMessage(bubble, message);

      mediaHandled = true;

    }

    const shouldRenderText =

      (!mediaHandled && message.content) ||

      (message.message_type === "audio" && !!message.content);

    if (shouldRenderText) {

      const textEl = document.createElement("p");

      textEl.textContent = message.content || "";

      bubble.appendChild(textEl);

    }



    const footer = document.createElement("div");

    footer.className = "message-footer";

    const replyButton = document.createElement("button");

    replyButton.type = "button";

    replyButton.className = "message-reply-trigger";

    replyButton.title = "Responder esta mensagem";

    replyButton.setAttribute("aria-label", "Responder esta mensagem");

    replyButton.textContent = "↩";

    replyButton.addEventListener("click", (event) => {
      event.stopPropagation();
      setReplyContextFromMessage(message);
    });
    footer.appendChild(replyButton);
    const timeEl = document.createElement("time");
    timeEl.textContent = formatTimestamp(timestamp || message.timestamp);
    footer.appendChild(timeEl);
    bubble.appendChild(footer);
    messageListEl.appendChild(bubble);
  });
  requestAnimationFrame(() => {
    messageListEl.scrollTop = messageListEl.scrollHeight;

  });

}



function createQuotedPreview(message, messageId) {

  const previewButton = document.createElement("button");

  previewButton.type = "button";

  previewButton.className = "message-reply-preview";

  const author = document.createElement("strong");

  const label =

    message && message.direction === "agent" ? "Você" : getConversationContactLabel();

  author.textContent = message ? label : "Mensagem";

  const text = document.createElement("span");

  text.textContent = buildMessageSummary(message);

  previewButton.appendChild(author);

  previewButton.appendChild(text);

  previewButton.addEventListener("click", (event) => {

    event.stopPropagation();

    focusMessageById(messageId);

  });

  return previewButton;

}



function focusMessageById(messageId) {

  if (!messageId || !messageListEl) return;

  const target = messageListEl.querySelector(`[data-message-id=\"${messageId}\"]`);

  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "center" });

  target.classList.add("message-highlight");

  setTimeout(() => {

    target.classList.remove("message-highlight");

  }, 1600);

}



function clearUnreadForActiveConversation() {

  if (!state.selectedConversation) return;

  const activeId = state.selectedConversation.id;

  let updated = false;

  state.conversations = state.conversations.map((conversation) => {

    if (conversation.id === activeId && Number(conversation.unread_count) > 0) {

      updated = true;

      return { ...conversation, unread_count: 0 };

    }

    return conversation;

  });

  if (updated) {

    state.selectedConversation = { ...state.selectedConversation, unread_count: 0 };

    renderConversations();

    loadConversations({ silent: true }).catch((error) =>

      console.error("Erro ao atualizar conversas após marcar como lida", error)

    );

  }

}



function appendAudioMessage(container, message) {

  const wrapper = document.createElement("div");

  wrapper.className = "audio-wrapper";

  if (message.media_url) {

    const audioEl = document.createElement("audio");

    audioEl.controls = true;

    audioEl.preload = "none";

    audioEl.src = message.media_url;

    audioEl.dataset.messageId = message.id;

    wrapper.appendChild(audioEl);

  } else {

    const fallback = document.createElement("p");

    fallback.className = "audio-caption";

    fallback.textContent = "Áudio indisponível.";

    wrapper.appendChild(fallback);

  }

  if (message.media_duration_seconds) {

    const duration = document.createElement("small");

    duration.className = "muted";

    const seconds = Math.round(Number(message.media_duration_seconds));

    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");

    const sec = String(seconds % 60).padStart(2, "0");

    duration.textContent = `Duração ${minutes}:${sec}`;

    wrapper.appendChild(duration);

  }

  container.appendChild(wrapper);

}



function appendFileMessage(container, message) {

  const wrapper = document.createElement("div");

  wrapper.className = "file-wrapper";

  if (message.message_type === "image" && message.media_url) {

    const img = document.createElement("img");

    img.src = message.media_url;

    img.alt = message.content || "Imagem recebida";

    img.loading = "lazy";

    img.tabIndex = 0;

    img.classList.add("message-image-trigger");

    img.setAttribute("role", "button");

    img.setAttribute("aria-label", "Abrir imagem em tela cheia");

    img.dataset.mediaUrl = message.media_url;

    if (message.content) {

      img.dataset.caption = message.content;

    }

    wrapper.appendChild(img);

  } else if (message.media_url) {

    const fallbackName = extractFilenameFromUrl(message.media_url);

    const docCard = document.createElement("div");

    docCard.className = "document-card";

    const header = document.createElement("div");

    header.className = "document-card-header";

    const icon = document.createElement("div");

    icon.className = "document-card-icon";

    const extension = (fallbackName?.split(".").pop() || "PDF").slice(0, 4).toUpperCase();

    icon.textContent = extension;

    header.appendChild(icon);

    const info = document.createElement("div");

    info.className = "document-card-info";

    const title = document.createElement("p");

    title.className = "document-card-title";

    title.title = fallbackName || "";

    title.textContent = fallbackName || "Arquivo";

    const meta = document.createElement("small");

    meta.className = "document-card-meta";

    const typeLabel = determineDocumentLabel(message.media_content_type, extension);

    const sizeLabel = formatFileSize(message.media_size_bytes);

    meta.textContent = [typeLabel, sizeLabel].filter(Boolean).join(" · ");

    info.appendChild(title);

    info.appendChild(meta);

    header.appendChild(info);

    docCard.appendChild(header);

    const actions = document.createElement("div");

    actions.className = "document-card-actions";

    const openLink = document.createElement("a");

    openLink.href = message.media_url;

    openLink.target = "_blank";

    openLink.rel = "noreferrer noopener";

    openLink.textContent = "Abrir";

    openLink.download = fallbackName || true;

    actions.appendChild(openLink);

    docCard.appendChild(actions);

    wrapper.appendChild(docCard);

  } else {

    const fallback = document.createElement("p");

    fallback.className = "audio-caption";

    fallback.textContent = "Arquivo indisponivel.";

    wrapper.appendChild(fallback);

  }

  if (message.content) {

    const caption = document.createElement("p");

    caption.className = "audio-caption";

    caption.textContent = message.content;

    wrapper.appendChild(caption);

  }

  container.appendChild(wrapper);

}



function determineDocumentLabel(contentType, extension) {

  const lowered = (contentType || "").toLowerCase();

  if (lowered.includes("pdf")) return "PDF";

  if (lowered.includes("image")) return "Imagem";

  if (lowered.includes("audio")) return "Áudio";

  if (lowered.includes("video")) return "Vídeo";

  if (lowered.includes("sheet") || lowered.includes("excel")) return "Planilha";

  if (lowered.includes("presentation")) return "Apresentação";

  if (lowered.includes("word") || lowered.includes("document")) return "Documento";

  const ext = (extension || "").toUpperCase();

  if (ext) return ext;

  return "Arquivo";

}



function formatFileSize(bytes) {

  if (typeof bytes !== "number" || Number.isNaN(bytes) || bytes <= 0) {

    return "";

  }

  const units = ["B", "KB", "MB", "GB", "TB"];

  let size = bytes;

  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {

    size /= 1024;

    unitIndex += 1;

  }

  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;

}



function extractFilenameFromUrl(url) {

  if (!url) return "";

  try {

    const parts = url.split("?")[0].split("/");

    return parts[parts.length - 1] || "";

  } catch (error) {

    return "";

  }

}



function renderChatHeader() {

  if (!chatTitleEl || !chatSubtitleEl || !selectedTagsEl) {

    return;

  }

  const conversation = state.selectedConversation;

  if (!conversation) {

    updateChatAvatar(null);

    chatTitleEl.textContent = "Selecione uma conversa";

    chatSubtitleEl.textContent = "As mensagens aparecem aqui.";

    chatSubtitleEl.classList.remove("hidden");

    selectedTagsEl.innerHTML = '<small class="muted">Sem etiquetas</small>';

    selectedTagsEl.classList.remove("hidden");

    chatOwnerEl?.classList.add("hidden");

    tagMenu?.classList.add("hidden");

    if (tagMenuToggle) {

      tagMenuToggle.disabled = true;

      tagMenuToggle.setAttribute("aria-disabled", "true");

    }

    updateCallButtonsAvailability();

    return;

  }

  updateChatAvatar(conversation);

  const displayName = (conversation.debtor_name || conversation.debtor_phone || "Sem identificação").trim();

  chatTitleEl.textContent = displayName;

  const phone = (conversation.debtor_phone || "").trim();

  if (phone && phone !== displayName) {

    chatSubtitleEl.textContent = phone;

    chatSubtitleEl.classList.remove("hidden");

  } else {

    chatSubtitleEl.textContent = "";

    chatSubtitleEl.classList.add("hidden");

  }

  let ownerText = "";

  if (state.user?.is_admin && conversation.owner_user_id) {

    const ownerName = getUserLabel(conversation.owner_user_id);

    ownerText = ownerName

      ? `Responsável: @${ownerName}`

      : `Responsável ID ${conversation.owner_user_id}`;

  }

  if (chatOwnerEl) {

    if (ownerText) {

      chatOwnerEl.textContent = ownerText;

      chatOwnerEl.classList.remove("hidden");

    } else {

      chatOwnerEl.textContent = "";

      chatOwnerEl.classList.add("hidden");

    }

  }

  if (conversation.tags?.length) {

    selectedTagsEl.innerHTML = "";

    conversation.tags.forEach((tag) => {

      const chip = document.createElement("span");

      chip.className = "tag-chip";

      chip.textContent = tag.name;

      chip.style.setProperty("--tag-color", tag.color || "#4f46e5");

      selectedTagsEl.appendChild(chip);

    });

    selectedTagsEl.classList.remove("hidden");

  } else {

    selectedTagsEl.innerHTML = "";

    selectedTagsEl.classList.add("hidden");

  }

  if (tagMenuToggle) {

    tagMenuToggle.disabled = false;

    tagMenuToggle.setAttribute("aria-disabled", "false");

  }

  if (reminderCreateButton) {

    reminderCreateButton.disabled = false;

    reminderCreateButton.dataset.conversationId = conversation.id;

  }

  renderChatReminders();

  updateCallButtonsAvailability();

}



function updateChatAvatar(conversation) {

  if (!chatAvatarEl) return;

  if (!conversation) {

    chatAvatarEl.textContent = "";

    chatAvatarEl.style.backgroundColor = "";

    chatAvatarEl.style.backgroundImage = "";

    chatAvatarEl.classList.remove("has-photo");

    chatAvatarEl.classList.add("hidden");

    chatAvatarEl.removeAttribute("title");

    return;

  }

  const avatarUrl = getCachedAvatarUrl(conversation.id);

  chatAvatarEl.classList.remove("hidden");

  chatAvatarEl.title = conversation.debtor_name || conversation.debtor_phone || "";

  if (avatarUrl) {

    chatAvatarEl.style.backgroundImage = `url(${avatarUrl})`;

    chatAvatarEl.style.backgroundColor = "transparent";

    chatAvatarEl.textContent = "";

    chatAvatarEl.classList.add("has-photo");

  } else {

    const avatar = getAvatarData(conversation.debtor_name, conversation.debtor_phone);

    chatAvatarEl.style.backgroundImage = "";

    chatAvatarEl.style.backgroundColor = avatar.color;

    chatAvatarEl.textContent = avatar.initials;

    chatAvatarEl.classList.remove("has-photo");

  }

}



function renderChatReminders() {

  if (!chatRemindersEl) return;

  const conversation = state.selectedConversation;

  if (!conversation) {

    chatRemindersEl.classList.add("hidden");

    chatRemindersEl.innerHTML = "";

    return;

  }

  const reminders = state.reminders

    .filter(

      (reminder) =>

        !reminder.is_done && reminder.conversation_id === conversation.id

    )

    .sort(

      (a, b) =>

        (parseUtcDate(a.due_at)?.getTime() || 0) -

        (parseUtcDate(b.due_at)?.getTime() || 0)

    )

    .slice(0, 3);

  if (!reminders.length) {

    chatRemindersEl.classList.add("hidden");

    chatRemindersEl.innerHTML = "";

    return;

  }

  chatRemindersEl.classList.remove("hidden");

  chatRemindersEl.innerHTML = "";

  reminders.forEach((reminder) => {

    const pill = document.createElement("div");

    pill.className = "reminder-pill";

    const dueDate = parseUtcDate(reminder.due_at);

    if (dueDate && dueDate.getTime() < Date.now()) {

      pill.classList.add("overdue");

    }

    const title = document.createElement("span");

    title.textContent = reminder.title;

    const timing = document.createElement("span");

    timing.textContent = formatTimestamp(dueDate || reminder.due_at);

    pill.append(title, timing);

    chatRemindersEl.appendChild(pill);

  });

}



function syncSelectedConversation() {

  if (!state.selectedConversation) return;

  const updated = state.conversations.find(

    (conversation) => conversation.id === state.selectedConversation.id

  );

  if (updated) {

    state.selectedConversation = { ...state.selectedConversation, ...updated };

  } else {

    resetChatArea();

  }

}



function startPolling() {

  stopPolling();

  state.pollHandle = setInterval(loadMessages, 4000);

}



function startReminderPolling() {

  stopReminderPolling();

  state.reminderPollHandle = setInterval(loadReminders, 60000);

}



function startConversationPolling() {

  stopConversationPolling();

  state.conversationPollHandle = setInterval(() => {

    loadConversations({ silent: true });

  }, 5000);

}



if (messageForm) {
  messageForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  if (!state.selectedConversation) return;

  const content = messageInput.value.trim();

  if (!content) return;

  const originalContent = content;

  messageInput.value = "";
  scheduleMessageInputResize();
  closeQuickReplyPanel();

  try {

    const payload = {

      conversation_id: state.selectedConversation.id,

      direction: "agent",

      content,

    };

    if (state.replyContext?.id) {

      payload.reply_to_message_id = state.replyContext.id;

    }

    await fetchJson("/api/messages", {

      method: "POST",

      body: JSON.stringify(payload),

    });

    await loadConversations();

    await loadMessages();

    clearReplyContext();

  } catch (error) {

    messageInput.value = originalContent;
    scheduleMessageInputResize();

    alert(error.message);

  }

  });
}



if (messageInput && messageForm) {

  messageInput.addEventListener("input", () => {
    scheduleMessageInputResize();
    updateQuickReplyPanel();
  });

  // Set the initial height once styles are applied.
  scheduleMessageInputResize();

  messageInput.addEventListener("keydown", (event) => {

    if (state.quickReplyOpen) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        state.quickReplyIndex = Math.min(state.quickReplyIndex + 1, state.quickReplyMatches.length - 1);
        openQuickReplyPanel(state.quickReplyMatches);
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        state.quickReplyIndex = Math.max(state.quickReplyIndex - 1, 0);
        openQuickReplyPanel(state.quickReplyMatches);
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        closeQuickReplyPanel();
        return;
      }
      if (event.key === "Enter" && !event.shiftKey && !event.altKey && !event.metaKey) {
        event.preventDefault();
        applyQuickReplyAtCursor(state.quickReplyIndex);
        return;
      }
    }

    if (

      event.key === "Enter" &&

      !event.shiftKey &&

      !event.altKey &&

      !event.metaKey

    ) {

      event.preventDefault();

      if (typeof messageForm.requestSubmit === "function") {

        messageForm.requestSubmit();

      } else if (messageSubmitButton) {

        messageSubmitButton.click();

      } else {

        messageForm.dispatchEvent(

          new Event("submit", { cancelable: true, bubbles: true })

        );

      }

    }

  });

}



newConversationForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const payload = {

    debtor_name: document.getElementById("debtorName").value,

    debtor_phone: document.getElementById("debtorPhone").value,

    notes: document.getElementById("debtorNotes").value || null,

  };

  try {

    const conversation = await fetchJson("/api/conversations", {

      method: "POST",

      body: JSON.stringify(payload),

    });

    newConversationForm.reset();

    await loadConversations();

    selectConversation(conversation.id);

  } catch (error) {

    alert(error.message);

  }

});



refreshButton.addEventListener("click", () => loadConversations());



if (conversationSearchInput) {

  conversationSearchInput.addEventListener("input", (event) => {

    state.searchQuery = event.target.value;

    renderConversations();

  });

}



if (tagFilterButton && tagFilterMenu) {

  tagFilterButton.addEventListener("click", () => {

    const willOpen = tagFilterMenu.classList.contains("hidden");

    closeTagMenus();

    if (willOpen) {

      renderTagFilterMenu();

      tagFilterMenu.classList.remove("hidden");

    }

  });

}



if (tagMenuToggle && tagMenu) {

  tagMenuToggle.addEventListener("click", () => {

    if (tagMenuToggle.disabled || !state.selectedConversation) return;

    const willOpen = tagMenu.classList.contains("hidden");

    closeTagMenus();

    if (willOpen) {

      renderTagMenuList();

      tagMenu.classList.remove("hidden");

    }

  });

}



if (newTagForm) {

  newTagForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = newTagNameInput.value.trim();

    if (!name) {

      alert("Informe um nome para a etiqueta.");

      return;

    }

    try {

      await fetchJson("/api/tags", {

        method: "POST",

        body: JSON.stringify({

          name,

          color: newTagColorInput.value || "#2f80ed",

        }),

      });

      newTagForm.reset();

      newTagColorInput.value = "#2f80ed";

      await loadTags();

    } catch (error) {

      alert(error.message);

    }

  });

}



if (toggleNewConversationButton && newConversationForm) {

  const syncNewConversationState = () => {

    const isOpen = !newConversationForm.classList.contains("collapsed");

    toggleNewConversationButton.classList.toggle("active", isOpen);

    toggleNewConversationButton.setAttribute("aria-expanded", String(isOpen));

    newConversationSection?.classList.toggle("is-open", isOpen);

  };



  syncNewConversationState();



  toggleNewConversationButton.addEventListener("click", () => {

    newConversationForm.classList.toggle("collapsed");

    syncNewConversationState();

  });

}



if (newReminderForm) {

  newReminderForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    reminderFormError.textContent = "";

    reminderFormError?.classList.remove("success");

    const title = reminderTitleInput.value.trim();

    const dueValue = reminderDueInput.value;

    if (!title || !dueValue) {

      reminderFormError.textContent = "Informe descrição e data.";

      return;

    }

    const dueDate = new Date(dueValue);

    if (Number.isNaN(dueDate.getTime())) {

      reminderFormError.textContent = "Data inválida.";

      return;

    }

    const conversationId = reminderConversationSelect.value

      ? Number(reminderConversationSelect.value)

      : null;

    const payload = {

      title,

      due_at: dueDate.toISOString(),

      conversation_id: conversationId,

    };

    try {

      await fetchJson("/api/reminders", {

        method: "POST",

        body: JSON.stringify(payload),

      });

      reminderFormError.textContent = "Lembrete criado!";

      reminderFormError?.classList.add("success");

      state.pendingReminderConversationId = conversationId;

      newReminderForm.reset();

      if (conversationId) {

        reminderConversationSelect.value = String(conversationId);

      }

      await loadReminders();

    } catch (error) {

      reminderFormError.textContent = error.message;

    }

  });

}



if (imagePreviewModal) {

  imagePreviewModal.addEventListener("click", (event) => {

    if (

      event.target === imagePreviewModal ||

      event.target.closest("[data-image-preview-close]")

    ) {

      closeImagePreview();

    }

  });

}



if (messageListEl) {

  messageListEl.addEventListener("click", (event) => {

    const trigger = event.target.closest(".message-image-trigger");

    if (trigger && trigger.dataset.mediaUrl) {

      event.preventDefault();

      openImagePreview(trigger.dataset.mediaUrl, trigger.dataset.caption || "");

    }

  });

  messageListEl.addEventListener("keydown", (event) => {

    if (event.key !== "Enter" && event.key !== " ") {

      return;

    }

    const trigger = event.target.closest(".message-image-trigger");

    if (trigger && trigger.dataset.mediaUrl) {

      event.preventDefault();

      openImagePreview(trigger.dataset.mediaUrl, trigger.dataset.caption || "");

    }

  });

}



document.addEventListener("click", (event) => {
  if (
    tagFilterMenu &&
    !tagFilterMenu.classList.contains("hidden") &&
    !tagFilterMenu.contains(event.target) &&
    !tagFilterButton?.contains(event.target)

  ) {

    tagFilterMenu.classList.add("hidden");

  }

  if (
    tagMenu &&
    !tagMenu.classList.contains("hidden") &&
    !tagMenu.contains(event.target) &&
    !tagMenuToggle?.contains(event.target)
  ) {
    tagMenu.classList.add("hidden");
  }
  if (
    state.emojiPickerOpen &&
    emojiPickerPanel &&
    !emojiPickerPanel.contains(event.target) &&
    !emojiToggleButton?.contains(event.target)
  ) {
    closeEmojiPicker();
  }
});


document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeTagMenus();
    if (reminderModal && !reminderModal.classList.contains("hidden")) {
      closeReminderModal(true);
    }
    if (noteModal && !noteModal.classList.contains("hidden")) {
      closeNoteModal();
    }
    if (state.emojiPickerOpen) {
      closeEmojiPicker();
    }
    if (state.imagePreviewOpen) {
      closeImagePreview();
    }
  }
});


resetChatArea();

updateTagFilterButton();



const SESSION_STATUS_INFO = {

  connected: {

    label: "Conectado",

    hint: "Sessão ativa e sincronizada.",

    tone: "online",

  },

  connecting: {

    label: "Conectando",

    hint: "Preparando conexão com o WhatsApp.",

    tone: "pending",

  },

  qr: {

    label: "QR disponível",

    hint: "Abra o WhatsApp e escaneie o código exibido ao lado.",

    tone: "pending",

  },

  qrcode: {

    label: "QR disponível",

    hint: "Abra o WhatsApp e escaneie o código exibido ao lado.",

    tone: "pending",

  },

  waiting_qr: {

    label: "Aguardando leitura do QR",

    hint: "Escaneie o novo QR pelo menu Aparelhos conectados.",

    tone: "pending",

  },

  disconnected: {

    label: "Desconectado",

    hint: "Gere um novo QR para restabelecer a sessão.",

    tone: "offline",

  },

  expired: {

    label: "Sessão expirada",

    hint: "Gere um novo QR para reconectar o dispositivo.",

    tone: "offline",

  },

  timeout: {

    label: "Tempo excedido",

    hint: "Gere um novo QR e mantenha o app aberto no celular.",

    tone: "offline",

  },

};



function getSessionStatusInfo(status) {

  const normalized = (status || "").toLowerCase();

  const fallbackLabel = normalized

    ? normalized.replace(/[_-]/g, " ")

    : "Sem dados";

  const info = SESSION_STATUS_INFO[normalized] || {};

  const label = info.label || fallbackLabel;

  const hint =

    info.hint || "Aguarde alguns segundos antes de gerar um novo QR.";

  let tone = info.tone || "offline";

  if (!status) {

    tone = "offline";

  }

  return { label, hint, tone };

}



async function loadSession(showError = false) {

  if (!sessionInfoEl) return;

  try {

    const session = await fetchJson("/api/session");

    state.session = session;

    updateIntegrationStatus(session.status);

    const lastSync = session.last_synced_at

      ? formatTimestamp(session.last_synced_at)

      : "Nunca";

    const provider = session.provider || "evolution";

    const statusInfo = getSessionStatusInfo(session.status);

    const infoFields = [

      { label: "C?digo", value: session.session_code },

      { label: "Criado", value: formatTimestamp(session.created_at) },

      { label: "Provedor", value: provider },

    ];

    if (session.integration_base_url) {

      infoFields.push({ label: "URL", value: session.integration_base_url });

    }

    if (session.integration_instance_id) {

      infoFields.push({

        label: "Inst?ncia",

        value: session.integration_instance_id,

      });

    }

    const infoHtml = infoFields

      .filter((field) => Boolean(field.value))

      .map(

        (field) => `

        <article class="session-meta-item">

          <p class="session-meta-label">${field.label}</p>

          <p class="session-meta-value">${field.value}</p>

        </article>`

      )

      .join("");

    sessionInfoEl.innerHTML = `

      <div class="session-summary">

        <div>

          <p class="session-summary-label">Status atual</p>

          <p class="session-summary-value">${statusInfo.label}</p>

          <p class="session-summary-hint">${statusInfo.hint}</p>

        </div>

        <span class="session-chip ${statusInfo.tone}">${statusInfo.label}</span>

      </div>

      <div class="session-meta-grid">

        ${infoHtml}

      </div>

      <div class="session-sync-card">

        <small>?ltima sincroniza??o</small>

        <strong>${lastSync}</strong>

      </div>

    `;

    updateQrPreview(session);

    if (integrationProviderSelect) {

      integrationProviderSelect.value = provider;

    }

    if (integrationBaseUrlInput) {

      integrationBaseUrlInput.value = session.integration_base_url || "";

    }

    if (integrationInstanceInput) {

      integrationInstanceInput.value = session.integration_instance_id || "";

    }

    if (integrationTokenInput) {

      integrationTokenInput.value = "";

    }

    setIntegrationCredentialHint(provider);

    updateIntegrationAutoProvisionVisibility();

    updateCallButtonsAvailability();

    updateRotateSessionButtonAvailability();

  } catch (error) {

    console.error("Erro ao carregar sessão", error);

    sessionInfoEl.innerHTML = `<p class="empty">${error.message}</p>`;

    updateIntegrationStatus(null);

    if (showError) {

      alert(error.message);

    }

  }

}



function updateIntegrationStatus(status) {

  if (!integrationStatusDot) return;

  integrationStatusDot.className = "status-dot";

  if (!status) {
    if (integrationStatusText) {
      integrationStatusText.textContent = "Aguardando conexão";
    }
    if (integrationStatusDetail) {
      integrationStatusDetail.textContent = "Escaneie o QR para conectar.";
    }
    return;
  }

  if (status === "connected") {
    integrationStatusDot.classList.add("online");
    if (integrationStatusText) {
      integrationStatusText.textContent = "Conectado";
    }
    if (integrationStatusDetail) {
      integrationStatusDetail.textContent = "Sessão ativa e sincronizada.";
    }
  } else {
    integrationStatusDot.classList.add("offline");
    if (integrationStatusText) {
      integrationStatusText.textContent = "Desconectado";
    }
    if (integrationStatusDetail) {
      integrationStatusDetail.textContent = "Escaneie o QR Code para reconectar.";
    }
  }

}



function updateRotateSessionButtonAvailability() {

  if (!rotateSessionButton) return;

  const ready = Boolean(state.organization?.has_uazapi_credentials);

  rotateSessionButton.disabled = rotateSessionButtonLoading || !ready;

  const hint = ready

    ? "Gerar o QR usando os dados preenchidos na tela de colaboradores."

    : "Configure a URL e o token da Uazapi na tela de colaboradores antes de gerar o QR.";

  rotateSessionButton.setAttribute("title", hint);

  rotateSessionButton.setAttribute("aria-label", hint);

}


function setRotateSessionButtonLoading(loading) {

  if (!rotateSessionButton) {

    rotateSessionButtonLoading = Boolean(loading);

    return;

  }

  rotateSessionButtonLoading = Boolean(loading);

  rotateSessionButton.textContent = rotateSessionButtonLoading

    ? rotateSessionButtonBusyText

    : rotateSessionButtonDefaultText;

  rotateSessionButton.setAttribute(

    "aria-busy",

    rotateSessionButtonLoading ? "true" : "false"

  );

  updateRotateSessionButtonAvailability();

}



function hideQrPreview() {

  if (integrationQrImage) {

    integrationQrImage.classList.add("hidden");

    integrationQrImage.removeAttribute("src");

  }

  if (integrationQrPayload) {

    integrationQrPayload.classList.add("hidden");

    integrationQrPayload.value = "";

  }

}


function renderQrPreview(payload) {

  if (!integrationQrImage || !integrationQrPayload) {

    return;

  }

  integrationQrPayload.classList.add("hidden");

  integrationQrPayload.value = "";

  if (payload.startsWith("data:image")) {

    integrationQrImage.src = payload;

    integrationQrImage.classList.remove("hidden");

  } else {

    integrationQrPayload.value = payload;

    integrationQrPayload.classList.remove("hidden");

  }

}


function updateQrPreview(session) {

  if (!integrationQrImage || !integrationQrPayload) return;

  const payload = session?.qr_code_payload?.trim();

  const sessionPending = session?.status === "pending";

  if (payload) {

    cachedIntegrationQrPayload = payload;

    renderQrPreview(payload);

    return;

  }

  if (cachedIntegrationQrPayload && sessionPending) {

    renderQrPreview(cachedIntegrationQrPayload);

    return;

  }

  cachedIntegrationQrPayload = "";

  hideQrPreview();

}



function setIntegrationCredentialHint(provider) {

  if (!integrationCredentialHint) return;

  const sessionHasCreds = Boolean(state.session?.has_credentials);

  const orgAutoProvisionReady =

    provider === "uazapi" && state.organization?.has_uazapi_credentials;

  if (provider === "wppconnect") {

    integrationCredentialHint.textContent =

      "Para WPPConnect/Baileys informe a URL do gateway, o nome da sessão e opcionalmente o token HTTP.";

  } else if (provider === "uazapi") {

    if (sessionHasCreds) {

      integrationCredentialHint.textContent =

        'Token armazenado. Atualize os campos apenas se quiser substituir ou clique em "Criar instância automática".';

    } else if (orgAutoProvisionReady) {

      integrationCredentialHint.textContent =

        "Servidor e token configurados pelo painel de colaboradores; clique em Gerar QR e a instância será criada automaticamente.";

    } else {

      integrationCredentialHint.textContent =

        'Para Uazapi informe URL, ID da instância e token existentes ou clique em "Criar instância automática" para provisionar.';

    }

  } else {

    integrationCredentialHint.textContent = sessionHasCreds

      ? "Token armazenado. Informe novamente apenas se quiser substituir."

      : "Informe URL, ID e token da instância Evolution antes de gerar o QR.";

  }

}



function updateIntegrationAutoProvisionVisibility() {

  if (!integrationAutoProvisionButton && !integrationAutoProvisionHint) return;

  const provider = integrationProviderSelect?.value || "evolution";

  const showAuto = provider === "uazapi";

  if (integrationAutoProvisionButton) {

    integrationAutoProvisionButton.classList.toggle("hidden", !showAuto);

  }

  if (integrationAutoProvisionHint) {

    integrationAutoProvisionHint.classList.toggle("hidden", !showAuto);

  }

}


async function requestSessionRotation({ triggerButton = null } = {}) {

  if (triggerButton) {

    setRotateSessionButtonLoading(true);

  }

  try {

    await refreshOrganizationInfo();

    const autoProvisionReady =

      Boolean(state.organization?.has_uazapi_credentials && state.organization?.uazapi_server_url);

    if (!autoProvisionReady) {

      throw new Error(missingUazapiCredentialMessage);

    }

    const payload = {

      session_label: "primary",

      provider: "uazapi",

      auto_provision: true,

      integration_base_url: state.organization.uazapi_server_url,

    };

    await fetchJson("/api/session/rotate", {

      method: "POST",

      body: JSON.stringify(payload),

    });

    await loadSession(true);

  } catch (error) {

    alert(error.message);

  } finally {

    if (triggerButton) {

      setRotateSessionButtonLoading(false);

    }

  }

}



async function refreshOrganizationInfo() {

  if (!state.user) {

    return false;

  }

  try {

    const organization = await fetchJson("/api/organization");

    state.organization = organization;

    updateRotateSessionButtonAvailability();

    return Boolean(organization?.has_uazapi_credentials);

  } catch (error) {

    console.debug("Não foi possível atualizar os dados da organização", error);

    return false;

  }

}



if (rotateSessionButton) {

  rotateSessionButton.addEventListener("click", () =>

    requestSessionRotation({ triggerButton: rotateSessionButton })

  );

}
function updateUserInfo() {

  if (!state.user) return;

  const label = state.user.full_name ? `${state.user.full_name} (${state.user.username})` : state.user.username;

  userInfoEl.textContent = label;

  settingsUserEl.textContent = label;

  if (state.organization) {

    orgInfoEl.textContent = state.organization.name;

    settingsOrgEl.textContent = `${state.organization.name} (${state.organization.slug})`;

  }

  renderUsers();
  updateScopeControls();
  updateNoteButtonState();
}


function setActiveNav(panel) {

  sideNavButtons.forEach((button) => {

    button.classList.toggle("active", button.dataset.panel === panel);

  });

}



function openSettings() {

  renderUsers();

  loadUsers();
  renderQuickRepliesManager();

  showSettingsHome();
  settingsModal.classList.remove("hidden");

  settingsModal.setAttribute("aria-hidden", "false");

  setActiveNav("settings");

}



function closeSettings() {

  settingsModal.classList.add("hidden");

  settingsModal.setAttribute("aria-hidden", "true");

  setActiveNav("conversations");

}

function hideAllSettingsSections() {
  settingsSections.forEach((section) => section.classList.add("hidden"));
}

function showSettingsHome() {
  hideAllSettingsSections();
  if (settingsHomeEl) settingsHomeEl.classList.remove("hidden");
  if (settingsBackButton) settingsBackButton.classList.add("hidden");

  const isAdmin = Boolean(state.user?.is_admin);
  settingsNavItems.forEach((item) => {
    if (!(item instanceof HTMLElement)) return;
    const adminOnly = item.hasAttribute("data-admin-only");
    item.classList.toggle("hidden", adminOnly && !isAdmin);
  });
}

function showSettingsSection(sectionId) {
  hideAllSettingsSections();
  if (settingsHomeEl) settingsHomeEl.classList.add("hidden");
  const section = document.getElementById(sectionId);
  if (section) section.classList.remove("hidden");
  if (settingsBackButton) settingsBackButton.classList.remove("hidden");
}



closeSettingsBtn.addEventListener("click", closeSettings);
settingsBackButton?.addEventListener("click", () => showSettingsHome());

settingsModal.addEventListener("click", (event) => {

  if (event.target === settingsModal) {

    closeSettings();

  }

});

settingsNavItems.forEach((item) => {
  item.addEventListener("click", () => {
    const targetId = item.getAttribute("data-settings-target");
    if (!targetId) return;
    if (item.hasAttribute("data-admin-only") && !state.user?.is_admin) return;
    showSettingsSection(targetId);
  });
});

if (quickReplyForm) {

  quickReplyForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const shortcut = (quickReplyShortcutInput?.value || "").trim().toLowerCase();

    const content = (quickReplyContentInput?.value || "").trim();

    if (!shortcut || !content) {

      if (quickReplyErrorEl) quickReplyErrorEl.textContent = "Preencha o atalho e a mensagem.";

      return;

    }

    if (!/^[a-z0-9._-]+$/.test(shortcut)) {

      if (quickReplyErrorEl) quickReplyErrorEl.textContent =
        "Atalho inválido. Use letras minúsculas, números, '.', '_' ou '-'.";

      return;

    }

    const replies = loadQuickReplies();

    const existingIndex = replies.findIndex((r) => r.shortcut === shortcut);

    if (existingIndex >= 0) {

      replies[existingIndex] = { shortcut, content };

    } else {

      replies.push({ shortcut, content });

    }

    saveQuickReplies(replies);

    renderQuickRepliesManager();

    clearQuickReplyForm();

  });

}

quickReplyClearButton?.addEventListener("click", () => clearQuickReplyForm());

document.addEventListener("click", (event) => {

  if (!state.quickReplyOpen || !quickReplyPanel) return;

  const target = event.target;

  if (!(target instanceof Element)) return;

  if (quickReplyPanel.contains(target)) return;

  if (messageInput && (target === messageInput || messageInput.contains(target))) return;

  closeQuickReplyPanel();

});



reminderBell?.addEventListener("click", () => openReminderModal());

closeRemindersBtn?.addEventListener("click", () => closeReminderModal(true));

reminderModal?.addEventListener("click", (event) => {

  if (event.target === reminderModal) {

    closeReminderModal(true);

  }

});

if (reminderCreateButton) {
  reminderCreateButton.addEventListener("click", () => {
    if (!state.selectedConversation) return;
    openReminderModal(state.selectedConversation.id);
  });
}

emojiToggleButton?.addEventListener("click", () => toggleEmojiPicker());
if (emojiPickerElement) {
  emojiPickerElement.addEventListener("emoji-click", (event) => {
    const detail = event.detail || {};
    const emoji = detail.unicode || detail.emoji?.unicode;
    if (emoji) {
      insertEmojiAtCursor(emoji);
    }
    closeEmojiPicker();
  });
}

noteCreateButton?.addEventListener("click", openNoteModal);
closeNoteModalButton?.addEventListener("click", () => closeNoteModal());
noteModal?.addEventListener("click", (event) => {
  if (event.target === noteModal) {
    closeNoteModal();
  }
});
if (noteForm) {
  noteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!state.selectedConversation) {
      noteFormError.textContent = "Selecione uma conversa.";
      return;
    }
    const text = noteTextInput.value.trim();
    if (!text) {
      noteFormError.textContent = "Digite a nota interna.";
      return;
    }
    noteFormError.textContent = "";
    try {
      await fetchJson(`/api/conversations/${state.selectedConversation.id}/notes`, {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      noteTextInput.value = "";
      closeNoteModal();
      await loadMessages();
    } catch (error) {
      noteFormError.textContent = error.message;
    }
  });
}

callStartButton?.addEventListener("click", () => handleCallStart());
callRejectButton?.addEventListener("click", () => handleCallReject());


function openIntegration() {

  if (!integrationModal) return;

  integrationModal.classList.remove("hidden");

  integrationModal.setAttribute("aria-hidden", "false");

  setActiveNav("integration");

  loadSession();

}



function closeIntegration(resetNav = false) {

  if (!integrationModal) return;

  integrationModal.classList.add("hidden");

  integrationModal.setAttribute("aria-hidden", "true");

  if (resetNav) {

    setActiveNav("conversations");

  }

}



closeIntegrationBtn?.addEventListener("click", () => closeIntegration(true));

integrationModal?.addEventListener("click", (event) => {

  if (event.target === integrationModal) {

    closeIntegration(true);

  }

});



if (scopeButtons.length) {

  scopeButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const scope = button.dataset.scope === "all" ? "all" : "mine";

      if (scope === "all" && !state.user?.is_admin) return;

      const shouldViewAll = scope === "all";

      if (state.viewAllConversations === shouldViewAll) return;

      state.viewAllConversations = shouldViewAll;

      updateScopeControls();

      loadConversations();

    });

  });

}



if (conversationTypeTabs.length) {

  conversationTypeTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

      const type = tab.dataset.conversationType || "chats";

      if (state.activeConversationType === type) return;

      state.activeConversationType = type;

      updateConversationTypeTabs();

      renderConversations();

    });

  });

}



sideNavButtons.forEach((button) => {
  button.addEventListener("click", () => handlePanel(button.dataset.panel));
});

if (dashboardRefreshButton) {
  dashboardRefreshButton.addEventListener("click", async () => {
    const originalLabel = dashboardRefreshButton.textContent;
    dashboardRefreshButton.disabled = true;
    dashboardRefreshButton.textContent = "Atualizando...";
    try {
      await Promise.all([
        loadConversations({ silent: true }),
        loadReminders().catch(() => {}),
        loadBulkCampaigns().catch(() => {}),
      ]);
    } finally {
      dashboardRefreshButton.disabled = false;
      dashboardRefreshButton.textContent = originalLabel;
      updateDashboard();
    }
  });
}

if (calendarPrevWeekButton) {
  calendarPrevWeekButton.addEventListener("click", () => {
    state.calendarWeekOffset -= 1;
    renderCalendar();
  });
}

if (calendarNextWeekButton) {
  calendarNextWeekButton.addEventListener("click", () => {
    state.calendarWeekOffset += 1;
    renderCalendar();
  });
}

if (calendarTodayButton) {
  calendarTodayButton.addEventListener("click", () => {
    state.calendarWeekOffset = 0;
    renderCalendar();
  });
}

if (calendarNewEventButton) {
  calendarNewEventButton.addEventListener("click", () => {
    alert("Registro de novos compromissos estará disponível em breve. Por enquanto, utilize os lembretes.");
  });
}

function openBulkPanel() {
  closeDashboardPanel();
  if (!bulkPanel || !workspace) return;
  workspace.classList.add("bulk-active");
  bulkPanel.classList.remove("hidden");
  setActiveNav("bulk");
  loadBulkCampaigns();
renderBulkCampaigns();
renderCalendar();
}

function closeBulkPanel() {
  if (!bulkPanel || !workspace) return;

  workspace.classList.remove("bulk-active");

  bulkPanel.classList.add("hidden");
}

function openDashboardPanel() {
  if (!dashboardPanel || !workspace) return;
  closeBulkPanel();
  workspace.classList.add("dashboard-active");
  dashboardPanel.classList.remove("hidden");
  setActiveNav("dashboard");
  updateDashboard();
}

function closeDashboardPanel() {
  if (!dashboardPanel || !workspace) return;
  workspace.classList.remove("dashboard-active");
  dashboardPanel.classList.add("hidden");
}

function openCalendarPanel() {
  if (!calendarPanel || !workspace) return;
  closeBulkPanel();
  closeDashboardPanel();
  closeIntegration();
  closeReminderModal(true);
  workspace.classList.add("calendar-active");
  calendarPanel.classList.remove("hidden");
  setActiveNav("calendar");
  renderCalendar();
}

function closeCalendarPanel() {
  if (!calendarPanel || !workspace) return;
  workspace.classList.remove("calendar-active");
  calendarPanel.classList.add("hidden");
}


function openBulkCreateModal() {

  if (!bulkCreateModal) return;

  resetBulkMapping();

  if (bulkContactsFileInput) {

    bulkContactsFileInput.value = "";

  }

  bulkCreateError.textContent = "";

  state.bulkStepIndex = 0;

  updateBulkStep();

  bulkCreateModal.classList.remove("hidden");

  bulkCreateModal.setAttribute("aria-hidden", "false");

  const defaultDate = new Date();

  defaultDate.setMinutes(defaultDate.getMinutes() + 30);

  if (bulkScheduleDateInput) {

    bulkScheduleDateInput.value = defaultDate.toISOString().slice(0, 10);

  }

  if (bulkScheduleTimeInput) {

    bulkScheduleTimeInput.value = defaultDate.toISOString().slice(11, 16);

  }

  const immediateRadio = bulkCreateForm?.querySelector('input[name="bulkScheduleMode"][value="now"]');

  if (immediateRadio) {

    immediateRadio.checked = true;

    updateScheduleFields();

  }

  bulkCampaignNameInput?.focus();

}



function closeBulkCreateModal() {

  if (!bulkCreateModal) return;

  bulkCreateModal.classList.add("hidden");

  bulkCreateModal.setAttribute("aria-hidden", "true");

  bulkCreateForm?.reset();

  if (bulkContactsFileInput) {

    bulkContactsFileInput.value = "";

  }

  resetBulkMapping();

  bulkCreateError.textContent = "";

  state.bulkStepIndex = 0;

  updateBulkStep();

}



function getBulkStatusClass(status) {

  if (status === "running") return "running";

  if (status === "scheduled") return "scheduled";

  if (status === "paused") return "scheduled";

  if (status === "failed") return "failed";

  return "done";

}



function renderBulkCampaigns() {
  if (!bulkCampaignList) return;
  const search = state.bulkSearch.trim().toLowerCase();
  const statusFilter = state.bulkStatusFilter;

  const campaigns = state.bulkCampaigns

    .filter((campaign) => {

      const matchesSearch =

        !search ||

        campaign.name.toLowerCase().includes(search) ||

        (campaign.channel || "").toLowerCase().includes(search);

      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;

      return matchesSearch && matchesStatus;

    })

    .sort((a, b) => {

      const aDate = parseUtcDate(a.started_at || a.created_at)?.getTime() || 0;

      const bDate = parseUtcDate(b.started_at || b.created_at)?.getTime() || 0;

      return bDate - aDate;

    });

  bulkCampaignList.innerHTML = "";

  if (!campaigns.length) {

    const empty = document.createElement("div");

    empty.className = "bulk-empty";

    empty.innerHTML = "<strong>Nenhuma campanha encontrada</strong><span>Crie uma nova campanha ou ajuste os filtros.</span>";

    bulkCampaignList.appendChild(empty);

    return;

  }

  campaigns.forEach((campaign) => {
    const row = document.createElement("article");
    row.className = "bulk-row";

    const initials = campaign.name

      .split(/\s+/)

      .filter(Boolean)

      .slice(0, 2)

      .map((part) => part[0])

      .join("")

      .toUpperCase();

    const statusClass = getBulkStatusClass(campaign.status);

    const displayedCost = typeof campaign.cost_estimate === "number" ? campaign.cost_estimate : null;

    const startedAt = campaign.started_at || campaign.created_at;

    row.innerHTML = `

      <div class="bulk-row-name">

        <div class="bulk-row-avatar">${initials || "CM"}</div>

        <div>

          <strong>${campaign.name}</strong>

          <small>${campaign.channel || "WhatsApp Nexen"}</small>

        </div>

      </div>

      <div>

        <span class="bulk-status ${statusClass}">${BULK_STATUS_LABELS[campaign.status] || campaign.status}</span>

      </div>

      <div class="bulk-metrics">

        <div>

          <span>Enviadas</span>

          <strong>${formatInteger(campaign.sent_count)} / ${formatInteger(campaign.contacts_total || 0)}</strong>

        </div>

        <div>

          <span>Respondidas</span>

          <strong>${formatInteger(campaign.replied_count)}</strong>

        </div>

      </div>

      <div>

        <strong>${displayedCost !== null ? formatCurrency(displayedCost) : "—"}</strong>

      </div>

      <div>

        <small>${formatTimestamp(startedAt)}</small>

      </div>

    `;

    bulkCampaignList.appendChild(row);
  });
}

function getBulkStatusLabel(status) {
  if (status === "running") return "Em execução";
  if (status === "scheduled") return "Programada";
  if (status === "paused") return "Pausada";
  if (status === "failed") return "Falhou";
  return "Concluída";
}

function renderDashboardEmptyState(listEl, message) {
  if (!listEl) return;
  const empty = document.createElement("li");
  empty.className = "dashboard-empty";
  empty.textContent = message;
  listEl.appendChild(empty);
}

function buildDashboardList(listEl, items, buildItem, emptyMessage) {
  if (!listEl) return;
  listEl.innerHTML = "";
  if (!items.length) {
    renderDashboardEmptyState(listEl, emptyMessage);
    return;
  }
  items.forEach((item) => {
    const node = buildItem(item);
    if (node) {
      listEl.appendChild(node);
    }
  });
}

function updateDashboard() {
  if (!dashboardPanel) return;
  if (dashboardTotalConversationsEl) {
    dashboardTotalConversationsEl.textContent = formatDashboardNumber(state.conversations.length);
  }
  if (dashboardUnreadConversationsEl) {
    const unread = state.conversations.filter((conversation) => Number(conversation?.unread_count) > 0).length;
    dashboardUnreadConversationsEl.textContent = formatDashboardNumber(unread);
  }
  if (dashboardPendingRemindersEl) {
    const pending = state.reminders.filter((reminder) => !reminder.is_done).length;
    dashboardPendingRemindersEl.textContent = formatDashboardNumber(pending);
  }
  if (dashboardActiveCampaignsEl) {
    const activeCampaigns = state.bulkCampaigns.filter((campaign) =>
      ["running", "scheduled", "paused"].includes(campaign.status)
    ).length;
    dashboardActiveCampaignsEl.textContent = formatDashboardNumber(activeCampaigns);
  }
  if (dashboardLastUpdated) {
    dashboardLastUpdated.textContent = `Atualizado ${formatTimestamp(new Date())}`;
  }

  const topCampaigns = [...(state.bulkCampaigns || [])]
    .sort((a, b) => {
      const aDate = parseUtcDate(a.started_at || a.created_at)?.getTime() || 0;
      const bDate = parseUtcDate(b.started_at || b.created_at)?.getTime() || 0;
      return bDate - aDate;
    })
    .slice(0, 4);
  buildDashboardList(
    dashboardCampaignList,
    topCampaigns,
    (campaign) => {
      const li = document.createElement("li");
      const name = document.createElement("strong");
      name.textContent = campaign.name || "Campanha";
      const meta = document.createElement("small");
      const when = parseUtcDate(campaign.started_at || campaign.created_at);
      meta.textContent = `${getBulkStatusLabel(campaign.status)} • ${
        when ? formatTimestamp(when) : "Sem data"
      }`;
      li.append(name, meta);
      return li;
    },
    "Nenhuma campanha registrada."
  );

  const pendingReminders = state.reminders
    .filter((reminder) => !reminder.is_done)
    .sort(
      (a, b) =>
        (parseUtcDate(a.due_at)?.getTime() || Infinity) - (parseUtcDate(b.due_at)?.getTime() || Infinity)
    )
    .slice(0, 4);
  buildDashboardList(
    dashboardReminderList,
    pendingReminders,
    (reminder) => {
      const li = document.createElement("li");
      const title = document.createElement("strong");
      title.textContent = reminder.title || reminder.description || "Lembrete";
      const subtitle = document.createElement("small");
      const due = parseUtcDate(reminder.due_at);
      const conversationLabel = getConversationLabel(reminder.conversation_id) || "Sem conversa";
      subtitle.textContent = `${conversationLabel} • ${due ? formatTimestamp(due) : "Sem data"}`;
      li.append(title, subtitle);
      return li;
    },
    "Nenhum lembrete pendente."
  );

  const recentConversations = [...state.conversations]
    .sort(
      (a, b) => (parseUtcDate(b.last_message_at)?.getTime() || 0) - (parseUtcDate(a.last_message_at)?.getTime() || 0)
    )
    .slice(0, 5);
  buildDashboardList(
    dashboardConversationList,
    recentConversations,
    (conversation) => {
      const li = document.createElement("li");
      const title = document.createElement("strong");
      title.textContent = conversation.debtor_name || conversation.debtor_phone || `ID ${conversation.id}`;
      const subtitle = document.createElement("small");
      const preview = conversation.last_message_preview || "Sem mensagens";
      const when = formatTimestamp(conversation.last_message_at);
      subtitle.textContent = `${preview} • ${when || "Sem data"}`;
      li.append(title, subtitle);
      return li;
    },
    "Nenhuma conversa disponível."
  );
}

function renderCalendar() {
  if (!calendarGrid || !calendarPanel) return;
  const weekDates = getWeekDates(state.calendarWeekOffset);
  if (calendarWeekLabel) {
    calendarWeekLabel.textContent = formatWeekRangeLabel(weekDates);
  }
  calendarGrid.innerHTML = "";
  weekDates.forEach((date) => {
    const column = document.createElement("article");
    column.className = "calendar-day";
    const key = formatLocalDateKey(date);
    const isToday = key === formatLocalDateKey(new Date());
    if (isToday) {
      column.classList.add("today");
    }
    const header = document.createElement("header");
    const weekdayFormatter = new Intl.DateTimeFormat("pt-BR", {
      weekday: "short",
    });
    const dayFormatter = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
    });
    header.innerHTML = `<strong>${weekdayFormatter.format(date).replace(".", "")}</strong><span>${dayFormatter
      .format(date)
      .replace(".", "")}</span>`;
    column.append(header);
    const events = state.calendarEvents
      .filter((event) => event.date === key)
      .sort((a, b) => (a.start_time || "").localeCompare(b.start_time || ""));
    if (!events.length) {
      const empty = document.createElement("small");
      empty.className = "muted";
      empty.textContent = "Sem eventos";
      column.append(empty);
    } else {
      events.forEach((event) => {
        const card = document.createElement("div");
        card.className = "calendar-event";
        const title = document.createElement("strong");
        title.textContent = event.title || "Compromisso";
        const meta = document.createElement("small");
        meta.textContent = `${event.start_time || "--"} · ${event.owner || "Equipe"}`;
        card.append(title, meta);
        column.append(card);
      });
    }
    calendarGrid.appendChild(column);
  });
  if (calendarUpcomingList) {
    const upcoming = state.calendarEvents
      .map((event) => ({ ...event, when: parseCalendarDate(event) }))
      .filter((event) => event.when)
      .sort((a, b) => a.when - b.when)
      .slice(0, 5);
    calendarUpcomingList.innerHTML = "";
    if (!upcoming.length) {
      const empty = document.createElement("li");
      empty.className = "dashboard-empty";
      empty.textContent = "Nenhum compromisso cadastrado.";
      calendarUpcomingList.appendChild(empty);
    } else {
      upcoming.forEach((event) => {
        const li = document.createElement("li");
        const title = document.createElement("strong");
        title.textContent = event.title;
        const subtitle = document.createElement("span");
        const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        });
        subtitle.textContent = `${timeFormatter.format(event.when)} · ${event.owner || "Equipe"}`;
        li.append(title, subtitle);
        calendarUpcomingList.appendChild(li);
      });
    }
  }
}


function updateBulkStep() {

  bulkStepPanels.forEach((panel, index) => {

    panel.classList.toggle("hidden", index !== state.bulkStepIndex);

  });

  bulkStepperItems.forEach((item, index) => {

    if (index === state.bulkStepIndex) {

      item.classList.add("active");

    } else {

      item.classList.remove("active");

    }

  });

  if (state.bulkStepIndex <= 0) {

    bulkStepPrev?.setAttribute("disabled", "disabled");

  } else {

    bulkStepPrev?.removeAttribute("disabled");

  }

  if (state.bulkStepIndex >= bulkStepPanels.length - 1) {

    bulkStepNext?.classList.add("hidden");

    bulkStepFinish?.classList.remove("hidden");

  } else {

    bulkStepNext?.classList.remove("hidden");

    bulkStepFinish?.classList.add("hidden");

  }

}



function updateScheduleFields() {

  const scheduleModeInput = bulkCreateForm?.querySelector('input[name="bulkScheduleMode"]:checked');

  if (!scheduleModeInput) return;

  const disabled = scheduleModeInput.value !== "schedule";

  if (bulkScheduleDateInput) {

    bulkScheduleDateInput.disabled = disabled;

  }

  if (bulkScheduleTimeInput) {

    bulkScheduleTimeInput.disabled = disabled;

  }

}



function resetBulkMapping() {

  state.bulkContactsPreview = null;

  state.bulkContactsMapping = { phone: "", name: "", customFields: [] };

  if (bulkMappingSection) {

    bulkMappingSection.classList.add("hidden");

  }

  if (bulkMappingFileLabel) {

    bulkMappingFileLabel.textContent = "";

  }

  if (bulkMappingHead) {

    bulkMappingHead.innerHTML = "";

  }

  if (bulkMappingBody) {

    bulkMappingBody.innerHTML = "";

  }

  [bulkColumnPhoneSelect, bulkColumnNameSelect].forEach((select) => {

    if (!select) return;

    select.innerHTML = "";

    const placeholder = document.createElement("option");

    placeholder.value = "";

    placeholder.textContent = "Selecione";

    select.appendChild(placeholder);

  });

  if (bulkCustomFieldsContainer) {

    bulkCustomFieldsContainer.innerHTML = "";

  }

  if (bulkMappingError) {

    bulkMappingError.textContent = "";

  }

  renderBulkPlaceholders();

}



function handleBulkContactsFileSelected(event) {

  resetBulkMapping();

  const file = event.target?.files?.[0];

  if (!file) return;

  bulkMappingSection?.classList.remove("hidden");

  if (bulkMappingFileLabel) {

    bulkMappingFileLabel.textContent = file.name;

  }

  const extension = (file.name.split(".").pop() || "").toLowerCase();

  if (extension !== "csv") {

    if (bulkMappingError) {

      bulkMappingError.textContent = "Para visualizar e mapear as colunas automaticamente, envie o arquivo em formato CSV.";

    }

    if (bulkMappingHead) {

      bulkMappingHead.innerHTML = "";

    }

    if (bulkMappingBody) {

      bulkMappingBody.innerHTML = "";

    }

    initializeCustomFieldSelects([]);

    return;

  }

  const reader = new FileReader();

  reader.onload = () => {

    try {

      const preview = parseCsvPreview(String(reader.result || ""));

      if (!preview.columns.length) {

        if (bulkMappingError) {

          bulkMappingError.textContent = "Não foi possível identificar o cabeçalho da planilha.";

        }

        return;

      }

      state.bulkContactsPreview = preview;

      renderBulkMappingPreview(preview.columns, preview.rows);

      applyMappingSelections(preview.columns);

      if (bulkMappingError) {

        bulkMappingError.textContent = "";

      }

      if (

        bulkCampaignQuantityInput &&

        preview.totalRows &&

        (!bulkCampaignQuantityInput.value || Number(bulkCampaignQuantityInput.value) === 0)

      ) {

        bulkCampaignQuantityInput.value = preview.totalRows;

      }

    } catch (error) {

      console.error("Erro ao analisar CSV", error);

      if (bulkMappingError) {

        bulkMappingError.textContent = "Erro ao ler o CSV. Verifique se o arquivo possui cabeçalho.";

      }

    }

  };

  reader.onerror = () => {

    if (bulkMappingError) {

      bulkMappingError.textContent = "Não foi possível ler o arquivo. Tente novamente.";

    }

  };

  reader.readAsText(file);

}



function parseCsvPreview(text, maxRows = 5) {

  if (!text) {

    return { columns: [], rows: [], totalRows: 0 };

  }

  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const rawLines = normalized.split("\n").filter((line) => line.trim().length > 0);

  if (!rawLines.length) {

    return { columns: [], rows: [], totalRows: 0 };

  }

  const delimiter = detectDelimiter(rawLines[0]);

  const columns = normalizeColumns(splitCsvLine(rawLines[0], delimiter));

  const rows = [];

  for (let index = 1; index < rawLines.length && rows.length < maxRows; index += 1) {

    const line = rawLines[index];

    if (!line.trim()) continue;

    const values = splitCsvLine(line, delimiter);

    if (values.every((value) => !value.trim())) continue;

    const entry = {};

    columns.forEach((column, columnIndex) => {

      entry[column] = (values[columnIndex] || "").trim();

    });

    rows.push(entry);

  }

  const totalRows = Math.max(0, rawLines.length - 1);

  return { columns, rows, totalRows };

}



function detectDelimiter(line) {

  if (!line) return ",";

  const delimiters = [",", ";", "\t", "|"];

  let best = ",";

  let bestCount = -1;

  delimiters.forEach((delimiter) => {

    const count = line.split(delimiter).length - 1;

    if (count > bestCount) {

      best = delimiter;

      bestCount = count;

    }

  });

  return best;

}



function splitCsvLine(line, delimiter) {

  const values = [];

  let current = "";

  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {

    const char = line[i];

    if (char === '"') {

      if (inQuotes && line[i + 1] === '"') {

        current += '"';

        i += 1;

      } else {

        inQuotes = !inQuotes;

      }

    } else if (char === delimiter && !inQuotes) {

      values.push(current);

      current = "";

    } else {

      current += char;

    }

  }

  values.push(current);

  return values;

}



function normalizeColumns(rawColumns) {

  const seen = new Map();

  return rawColumns.map((column, index) => {

    const base = column?.trim() || `Coluna ${index + 1}`;

    let candidate = base;

    let suffix = 2;

    while (seen.has(candidate)) {

      candidate = `${base} (${suffix})`;

      suffix += 1;

    }

    seen.set(candidate, true);

    return candidate;

  });

}



function renderBulkMappingPreview(columns, rows) {

  if (!bulkMappingHead || !bulkMappingBody) return;

  bulkMappingHead.innerHTML = "";

  bulkMappingBody.innerHTML = "";

  if (!columns.length) return;

  const headRow = document.createElement("tr");

  columns.forEach((column) => {

    const th = document.createElement("th");

    th.textContent = column;

    headRow.appendChild(th);

  });

  bulkMappingHead.appendChild(headRow);

  if (!rows.length) {

    const tr = document.createElement("tr");

    const td = document.createElement("td");

    td.colSpan = columns.length;

    td.textContent = "Nenhuma linha encontrada.";

    tr.appendChild(td);

    bulkMappingBody.appendChild(tr);

    return;

  }

  rows.forEach((row) => {

    const tr = document.createElement("tr");

    columns.forEach((column) => {

      const td = document.createElement("td");

      td.textContent = row[column] || "";

      tr.appendChild(td);

    });

    bulkMappingBody.appendChild(tr);

  });

}



function populateMappingSelect(select, columns, selectedValue) {

  if (!select) return;

  select.innerHTML = "";

  const placeholder = document.createElement("option");

  placeholder.value = "";

  placeholder.textContent = "Selecione";

  select.appendChild(placeholder);

  columns.forEach((column) => {

    const option = document.createElement("option");

    option.value = column;

    option.textContent = column;

    if (column === selectedValue) {

      option.selected = true;

    }

    select.appendChild(option);

  });

}



function suggestMappingSelections(columns) {

  const normalized = columns.map((column) => column.toLowerCase());

  const findMatch = (patterns) => {

    for (let index = 0; index < normalized.length; index += 1) {

      const value = normalized[index];

      if (patterns.some((pattern) => pattern.test(value))) {

        return columns[index];

      }

    }

    return "";

  };

  const phone = findMatch([/telefone/, /celular/, /phone/, /whats/]);

  const name = findMatch([/nome/, /name/, /contato/]);

  const remaining = columns.filter((column) => column !== phone && column !== name);

  return { phone, name, customFields: remaining.slice(0, 3).map((column, index) => ({ key: `campo_${index + 1}`, column })) };

}



function applyMappingSelections(columns) {

  const suggestions = suggestMappingSelections(columns);

  populateMappingSelect(bulkColumnPhoneSelect, columns, suggestions.phone);

  populateMappingSelect(bulkColumnNameSelect, columns, suggestions.name);

  initializeCustomFieldSelects(columns, suggestions.customFields);

  handleBulkMappingSelectionChange();

}



function handleBulkMappingSelectionChange() {

  const customFields = [];

  if (bulkCustomFieldsContainer) {

    bulkCustomFieldsContainer.querySelectorAll(".bulk-custom-field").forEach((row, index) => {

      const keyInput = row.querySelector("input");

      const select = row.querySelector("select");

      if (!select || !select.value) return;

      customFields.push({

        key: keyInput?.value?.trim() || `campo_${index + 1}`,

        column: select.value,

      });

    });

  }

  state.bulkContactsMapping = {

    phone: bulkColumnPhoneSelect?.value || "",

    name: bulkColumnNameSelect?.value || "",

    customFields,

  };

  renderBulkPlaceholders();

}



function normalizePlaceholderKey(value) {

  if (value === undefined || value === null) return "";

  return String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

}



function renderBulkPlaceholders() {

  if (!bulkPlaceholderList) return;

  bulkPlaceholderList.innerHTML = "";

  const mapping = state.bulkContactsMapping || { customFields: [] };

  const tokens = [];

  if (mapping.phone) {

    tokens.push({ label: "Telefone", token: "{telefone}" });

  }

  if (mapping.name) {

    tokens.push({ label: "Nome", token: "{nome}" });

  }

  (mapping.customFields || []).forEach((field, index) => {

    const keyLabel = (field?.key || field?.column || `Campo ${index + 1}`).trim();

    const slug = normalizePlaceholderKey(field?.key || field?.column);

    if (!slug) return;

    tokens.push({ label: keyLabel, token: `{${slug}}` });

  });

  if (!tokens.length) {

    bulkPlaceholderList.innerHTML =

      '<p class="placeholder-empty">Mapeie os campos para liberar variáveis.</p>';

    return;

  }

  const seen = new Set();

  tokens.forEach((placeholder) => {

    if (seen.has(placeholder.token)) return;

    seen.add(placeholder.token);

    const button = document.createElement("button");

    button.type = "button";

    button.className = "placeholder-chip";

    button.textContent = placeholder.token;

    button.title = `Inserir ${placeholder.label}`;

    button.addEventListener("click", () => insertPlaceholderToken(placeholder.token));

    bulkPlaceholderList.appendChild(button);

  });

}



function insertPlaceholderToken(token) {

  if (!bulkMessageTemplateInput) return;

  const { selectionStart, selectionEnd, value } = bulkMessageTemplateInput;

  const start = typeof selectionStart === "number" ? selectionStart : value.length;

  const end = typeof selectionEnd === "number" ? selectionEnd : value.length;

  const nextValue = `${value.slice(0, start)}${token}${value.slice(end)}`;

  bulkMessageTemplateInput.value = nextValue;

  const cursor = start + token.length;

  requestAnimationFrame(() => {

    bulkMessageTemplateInput.focus();

    bulkMessageTemplateInput.setSelectionRange(cursor, cursor);

  });

}



function initializeCustomFieldSelects(columns, defaults = []) {

  if (!bulkCustomFieldsContainer) return;

  bulkCustomFieldsContainer.innerHTML = "";

  defaults.forEach((value) => {

    addCustomFieldSelect(columns, value);

  });

  if (!defaults.length) {

    addCustomFieldSelect(columns);

  }

}



function addCustomFieldSelect(columns, preset = null) {

  if (!bulkCustomFieldsContainer) return;

  const wrapper = document.createElement("div");

  wrapper.className = "bulk-custom-field";

  const keyInput = document.createElement("input");

  keyInput.type = "text";

  keyInput.placeholder = "Nome do campo";

  keyInput.value = preset?.key || "";

  keyInput.addEventListener("input", handleBulkMappingSelectionChange);

  const select = document.createElement("select");

  populateMappingSelect(select, columns, preset?.column || "");

  const removeButton = document.createElement("button");

  removeButton.type = "button";

  removeButton.className = "ghost small";

  removeButton.textContent = "Remover";

  removeButton.addEventListener("click", () => {

    wrapper.remove();

    handleBulkMappingSelectionChange();

  });

  select.addEventListener("change", handleBulkMappingSelectionChange);

  wrapper.appendChild(keyInput);

  wrapper.appendChild(select);

  wrapper.appendChild(removeButton);

  bulkCustomFieldsContainer.appendChild(wrapper);

}



function handleAddCustomField() {

  if (!state.bulkContactsPreview?.columns) return;

  addCustomFieldSelect(state.bulkContactsPreview.columns);

  handleBulkMappingSelectionChange();

}



resetBulkMapping();



bulkSearchInput?.addEventListener("input", (event) => {

  state.bulkSearch = event.target.value || "";

  renderBulkCampaigns();

});



bulkFilterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    bulkFilterButtons.forEach((chip) => chip.classList.toggle("active", chip === button));

    state.bulkStatusFilter = button.dataset.bulkFilter || "all";

    renderBulkCampaigns();

  });

});



bulkCreateButton?.addEventListener("click", () => openBulkCreateModal());

closeBulkCreateBtn?.addEventListener("click", () => closeBulkCreateModal());

bulkCreateCancel?.addEventListener("click", () => closeBulkCreateModal());

bulkCreateModal?.addEventListener("click", (event) => {

  if (event.target === bulkCreateModal) {

    closeBulkCreateModal();

  }

});

bulkContactsFileInput?.addEventListener("change", handleBulkContactsFileSelected);

bulkColumnPhoneSelect?.addEventListener("change", handleBulkMappingSelectionChange);

bulkColumnNameSelect?.addEventListener("change", handleBulkMappingSelectionChange);

bulkAddCustomFieldButton?.addEventListener("click", handleAddCustomField);



bulkStepNext?.addEventListener("click", () => {

  if (state.bulkStepIndex < bulkStepPanels.length - 1) {

    state.bulkStepIndex += 1;

    updateBulkStep();

  }

});



bulkStepPrev?.addEventListener("click", () => {

  if (state.bulkStepIndex > 0) {

    state.bulkStepIndex -= 1;

    updateBulkStep();

  }

});



bulkCreateForm

  ?.querySelectorAll('input[name="bulkScheduleMode"]')

  .forEach((radio) => radio.addEventListener("change", () => updateScheduleFields()));



bulkCreateForm?.addEventListener("submit", async (event) => {

  event.preventDefault();

  const name = bulkCampaignNameInput.value.trim();

  const channel = bulkCampaignChannelSelect.value;

  const scheduleRadio = bulkCreateForm.querySelector('input[name="bulkScheduleMode"]:checked');

  const scheduleMode = scheduleRadio ? scheduleRadio.value : "now";

  let scheduledDate = null;

  if (scheduleMode === "schedule") {

    const date = bulkCreateForm.elements.bulkScheduleDate.value;

    const time = bulkCreateForm.elements.bulkScheduleTime.value;

    if (!date || !time) {

      bulkCreateError.textContent = "Defina data e horário para agendar.";

      return;

    }

    scheduledDate = parseUtcDate(`${date}T${time}`);

    if (!scheduledDate) {

      bulkCreateError.textContent = "Data de envio inválida.";

      return;

    }

  }

  const quantity = Number(bulkCampaignQuantityInput.value);

  const cost = Number(bulkCampaignCostInput.value);

  const sendInterval = Number(bulkSendIntervalInput?.value || 0);

  if (!name || !bulkMessageTemplateInput.value.trim() || Number.isNaN(quantity) || Number.isNaN(cost) || Number.isNaN(sendInterval)) {

    bulkCreateError.textContent = "Preencha todos os campos com valores válidos.";

    return;

  }

  if (!state.bulkContactsPreview) {

    bulkCreateError.textContent = "Envie a base de contatos e confirme o mapeamento das colunas.";

    state.bulkStepIndex = 1;

    updateBulkStep();

    return;

  }

  if (!state.bulkContactsMapping.phone) {

    bulkCreateError.textContent = "Selecione a coluna que contém os telefones.";

    state.bulkStepIndex = 1;

    updateBulkStep();

    return;

  }

  const contactsFile = bulkContactsFileInput?.files?.[0];

  if (!contactsFile) {

    bulkCreateError.textContent = "Envie a base de contatos em CSV ou XLSX.";

    state.bulkStepIndex = 1;

    updateBulkStep();

    return;

  }

  const mappingPayload = {

    phone: state.bulkContactsMapping.phone,

    name: state.bulkContactsMapping.name,

    custom_fields: (state.bulkContactsMapping.customFields || [])

      .filter((field) => field?.column)

      .map((field, index) => ({

        key: field?.key || field?.column || `campo_${index + 1}`,

        column: field.column,

      })),

  };

  const payload = {

    name,

    channel,

    message_template: bulkMessageTemplateInput.value.trim(),

    preview_text: bulkMessagePreviewInput ? bulkMessagePreviewInput.value.trim() : "",

    contacts_quantity: Number.isNaN(quantity) ? undefined : quantity,

    cost_estimate: Number.isNaN(cost) ? undefined : cost,

    send_interval_seconds: Number.isNaN(sendInterval) ? undefined : sendInterval,

    scheduled_for:

      scheduleMode === "schedule" ? `${bulkScheduleDateInput.value}T${bulkScheduleTimeInput.value}` : null,

    mapping: mappingPayload,

  };

  const formData = new FormData();

  formData.append("campaign", JSON.stringify(payload));

  formData.append("contacts_file", contactsFile);

  bulkCreateError.textContent = "";

  bulkStepFinish?.setAttribute("disabled", "disabled");

  try {

    await fetchJson("/api/bulk/campaigns", {

      method: "POST",

      body: formData,

    });

    await loadBulkCampaigns();

    closeBulkCreateModal();

  } catch (error) {

    bulkCreateError.textContent = error.message;

  } finally {

    bulkStepFinish?.removeAttribute("disabled");

  }

});



async function logoutUser() {

  try {

    if (state.token) {

      await fetchJson("/api/auth/logout", { method: "POST" });

    }

  } catch (error) {

    console.warn("Erro ao sair", error);

  } finally {

    handleUnauthorized();

  }

}



function handlePanel(panel) {
  closeTagMenus();
  if (panel === "conversations") {
    closeBulkPanel();
    closeDashboardPanel();
    closeCalendarPanel();
    closeSettings();
    closeIntegration();
    closeReminderModal(true);
    setActiveNav("conversations");
  } else if (panel === "bulk") {
    closeDashboardPanel();
    closeCalendarPanel();
    closeSettings();
    closeIntegration();
    closeReminderModal(true);
    openBulkPanel();
  } else if (panel === "dashboard") {
    closeSettings();
    closeIntegration();
    closeCalendarPanel();
    closeReminderModal(true);
    openDashboardPanel();
  } else if (panel === "calendar") {
    closeSettings();
    closeIntegration();
    openCalendarPanel();
  } else if (panel === "integration") {
    closeBulkPanel();
    closeDashboardPanel();
    closeCalendarPanel();
    closeReminderModal();
    openIntegration();
  } else if (panel === "settings") {
    closeBulkPanel();
    closeDashboardPanel();
    closeCalendarPanel();
    closeIntegration();
    closeReminderModal();
    openSettings();
  } else if (panel === "logout") {
    logoutUser();
  }

}



function switchAuthView(view) {

  authTabs.forEach((button) => {

    if (button.dataset.authView === view) {

      button.classList.add("active");

    } else {

      button.classList.remove("active");

    }

  });

  if (view === "login") {

    loginForm?.classList.remove("hidden");

    registerForm?.classList.add("hidden");

  } else {

    registerForm?.classList.remove("hidden");

    loginForm?.classList.add("hidden");

  }

}



authTabs.forEach((button) => {

  button.addEventListener("click", () => switchAuthView(button.dataset.authView));

});



if (loginForm) {

  loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const payload = {

      organization_slug: loginForm.organization.value.trim().toLowerCase(),

      username: loginForm.username.value.trim().toLowerCase(),

      password: loginForm.password.value.trim(),

    };

    if (loginErrorEl) {
      loginErrorEl.textContent = "";
    }

    try {

      const data = await fetchJson("/api/auth/login", {

        method: "POST",

        body: JSON.stringify(payload),

        skipAuth: true,

      });

      setToken(data.token);

      state.user = data.user;

      state.organization = data.organization;

      loginForm.reset();

      await enterWorkspace();

    } catch (error) {

      if (loginErrorEl) {
        loginErrorEl.textContent = error.message;
      }

    }

  });

}



if (registerForm) {

  registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const payload = {

      organization_name: document.getElementById("orgName").value.trim(),

      organization_slug: document.getElementById("orgSlug").value.trim().toLowerCase(),

      full_name: document.getElementById("registerFullName").value.trim() || null,

      username: document.getElementById("registerUsername").value.trim().toLowerCase(),

      password: document.getElementById("registerPassword").value.trim(),

    };

    registerErrorEl.textContent = "";

    try {

      const data = await fetchJson("/api/auth/register", {

        method: "POST",

        body: JSON.stringify(payload),

        skipAuth: true,

      });

      setToken(data.token);

      state.user = data.user;

      state.organization = data.organization;

      registerForm.reset();

      await enterWorkspace();

    } catch (error) {

      registerErrorEl.textContent = error.message;

    }

  });



}



async function enterWorkspace() {

  showApp();

  closeSettings();

  closeIntegration();

  resetChatArea();

  state.searchQuery = "";

  state.tagFilterId = null;

  state.pendingReminderConversationId = null;

  state.avatars = {};

  state.avatarRequests = {};

  if (conversationSearchInput) {

    conversationSearchInput.value = "";

  }

  updateUserInfo();

  updateTagFilterButton();

  const tasks = [
    loadConversations(),
    loadSession(),
    loadTags(),
    loadReminders(),
    loadBulkCampaigns(),
  ];

  if (state.user?.is_admin) {

    tasks.push(loadUsers());

  } else {

    state.users = [state.user];

    renderUsers();

  }

  setActiveNav("conversations");

  tasks.push(refreshOrganizationInfo());
  await Promise.all(tasks);

  startConversationPolling();

  startReminderPolling();

}



async function bootstrap() {

  if (state.token) {

    try {

      const data = await fetchJson("/api/auth/me");

      state.user = data.user;

      state.organization = data.organization;

      await enterWorkspace();

      return;

    } catch (error) {

      console.warn("Sessão inválida", error);

      handleUnauthorized();

    }

  } else {

    showLogin();

  }

}



setupAudioControls();

bootstrap();

updateRotateSessionButtonAvailability();



function getUserLabel(userId) {

  if (!userId) return "";

  const user = state.users.find((u) => u.id === userId);

  return user ? user.username : "";

}



function getConversationLabel(conversationId) {

  if (!conversationId) return "";

  const conversation = state.conversations.find(

    (item) => item.id === conversationId

  );

  return conversation ? conversation.debtor_name : "";

}



function renderUsers() {

  if (!userListEl) return;

  userListEl.innerHTML = "";

  if (!state.user?.is_admin) {

    userListEl.innerHTML = "<p class=\"empty\">Somente administradores podem gerenciar usuários.</p>";

    userAdminSection?.classList.add("hidden");

    return;

  }

  userAdminSection?.classList.remove("hidden");

  if (!state.users.length) {

    const empty = document.createElement("p");

    empty.className = "empty";

    empty.textContent = "Sem usuários adicionais.";

    userListEl.appendChild(empty);

    return;

  }

  state.users.forEach((user) => {

    const row = document.createElement("div");

    row.className = "user-list-item";



    const primary = document.createElement("div");

    primary.className = "user-item-primary";



    const identity = document.createElement("div");

    identity.className = "user-item-identity";

    const usernameEl = document.createElement("strong");

    usernameEl.textContent = user.username;

    const nameEl = document.createElement("span");

    nameEl.textContent = user.full_name || "Sem nome";

    identity.append(usernameEl, nameEl);



    const badges = document.createElement("div");

    badges.className = "user-item-badges";

    if (user.is_admin) {

      const adminBadge = document.createElement("span");

      adminBadge.className = "tag";

      adminBadge.textContent = "ADMIN";

      badges.appendChild(adminBadge);

    }

    const statusBadge = document.createElement("span");

    statusBadge.className = "tag";

    statusBadge.textContent = user.is_active ? "ATIVO" : "INATIVO";

    badges.appendChild(statusBadge);

    if (state.user.id === user.id) {

      const selfBadge = document.createElement("span");

      selfBadge.className = "tag";

      selfBadge.textContent = "VOCÊ";

      badges.appendChild(selfBadge);

    }



    const meta = document.createElement("small");

    meta.className = "user-item-meta";

    meta.textContent = `ID #${user.id} • ${user.is_admin ? "Administrador" : "Usuário"} • ${

      user.is_active ? "Ativo" : "Inativo"

    }`;



    primary.append(identity, badges, meta);



    const actions = document.createElement("div");

    actions.className = "user-actions";

    if (state.user.id !== user.id) {

      const toggleButton = document.createElement("button");

      toggleButton.textContent = user.is_active ? "Desativar" : "Reativar";

      toggleButton.addEventListener("click", () => toggleUser(user));

      actions.appendChild(toggleButton);

      const roleButton = document.createElement("button");

      roleButton.textContent = user.is_admin ? "Remover admin" : "Tornar admin";

      roleButton.addEventListener("click", () => toggleAdmin(user));

      actions.appendChild(roleButton);

    } else {

      const holder = document.createElement("span");

      holder.className = "user-self-tag";

      holder.textContent = "Seu acesso";

      actions.appendChild(holder);

    }

    const resetButton = document.createElement("button");

    resetButton.className = "primary";

    resetButton.textContent = "Resetar senha";

    resetButton.addEventListener("click", () => resetPassword(user));

    actions.appendChild(resetButton);



    row.append(primary, actions);

    userListEl.appendChild(row);

  });

}



async function loadUsers() {

  if (!state.user?.is_admin) {

    state.users = [state.user];

    return;

  }

  try {

    state.users = await fetchJson("/api/users");

    renderUsers();

    renderConversations(state.conversations);

  } catch (error) {

    console.error("Erro ao listar usuários", error);

    if (settingsModal.getAttribute("aria-hidden") === "false") {

      alert("Não foi possível carregar a lista de usuários.");

    }

  }

}



function collectConversationTags() {

  const fallbackMap = new Map();

  state.conversations.forEach((conversation) => {

    (conversation.tags || []).forEach((tag) => {

      if (tag && tag.id && !fallbackMap.has(tag.id)) {

        fallbackMap.set(tag.id, tag);

      }

    });

  });

  return Array.from(fallbackMap.values());

}



function getAvailableTags() {

  if (state.tags.length) {

    return state.tags;

  }

  return collectConversationTags();

}



function updateTagFilterButton() {

  if (!tagFilterButton) return;

  if (!state.tagFilterId) {

    tagFilterButton.classList.remove("active");

    const indicator = tagFilterButton.querySelector(".selected-color-dot");

    if (indicator) indicator.remove();

    return;

  }

  const availableTags = getAvailableTags();

  const tag = availableTags.find((item) => item.id === state.tagFilterId);

  if (!tag) {

    state.tagFilterId = null;

    updateTagFilterButton();

    return;

  }

  let indicator = tagFilterButton.querySelector(".selected-color-dot");

  if (!indicator) {

    indicator = document.createElement("span");

    indicator.className = "selected-color-dot";

    tagFilterButton.appendChild(indicator);

  }

  indicator.style.backgroundColor = tag.color || "#211181";

  tagFilterButton.classList.add("active");

}



function renderTagFilterMenu() {

  if (!tagFilterMenu) return;

  tagFilterMenu.innerHTML = "";

  const list = document.createElement("div");

  list.className = "tag-menu-list";

  const allButton = document.createElement("button");

  allButton.type = "button";

  allButton.textContent = "Todas as conversas";

  if (!state.tagFilterId) {

    allButton.classList.add("active");

  }

  allButton.addEventListener("click", () => {

    state.tagFilterId = null;

    updateTagFilterButton();

    closeTagMenus();

    renderConversations();

  });

  list.appendChild(allButton);

  const availableTags = getAvailableTags();

  if (!availableTags.length) {

    tagFilterMenu.appendChild(list);

    const empty = document.createElement("p");

    empty.className = "empty";

    empty.textContent = "Nenhuma etiqueta criada.";

    tagFilterMenu.appendChild(empty);

    return;

  }

  availableTags.forEach((tag) => {

    const button = document.createElement("button");

    button.type = "button";

    const swatch = document.createElement("span");

    swatch.className = "tag-color-swatch";

    swatch.style.backgroundColor = tag.color;

    button.append(swatch, document.createTextNode(` ${tag.name}`));

    if (state.tagFilterId === tag.id) {

      button.classList.add("active");

    }

    button.addEventListener("click", () => {

      state.tagFilterId = tag.id;

      updateTagFilterButton();

      closeTagMenus();

      renderConversations();

    });

    list.appendChild(button);

  });

  tagFilterMenu.appendChild(list);

}



function renderTagMenuList() {

  if (!tagMenuList) return;

  if (!state.selectedConversation) {

    tagMenuList.innerHTML = '<p class="empty">Selecione uma conversa.</p>';

    return;

  }

  if (!state.tags.length) {

    tagMenuList.innerHTML = '<p class="empty">Crie uma etiqueta para começar.</p>';

    return;

  }

  const assigned = new Set(

    (state.selectedConversation.tags || []).map((tag) => tag.id)

  );

  tagMenuList.innerHTML = "";

  state.tags.forEach((tag) => {

    const row = document.createElement("label");

    row.className = "tag-menu-item";

    const info = document.createElement("div");

    info.style.display = "flex";

    info.style.alignItems = "center";

    info.style.gap = "0.4rem";

    const color = document.createElement("span");

    color.className = "tag-color-swatch";

    color.style.backgroundColor = tag.color;

    const name = document.createElement("span");

    name.textContent = tag.name;

    info.append(color, name);

    const input = document.createElement("input");

    input.type = "checkbox";

    input.checked = assigned.has(tag.id);

    input.addEventListener("change", (event) => {

      handleTagToggle(tag.id, event.target.checked, event.target);

    });

    row.append(info, input);

    tagMenuList.appendChild(row);

  });

}



async function handleTagToggle(tagId, shouldAttach, checkboxEl) {

  if (!state.selectedConversation) return;

  const url = `/api/conversations/${state.selectedConversation.id}/tags/${tagId}`;

  try {

    await fetchJson(url, { method: shouldAttach ? "POST" : "DELETE" });

    await loadConversations();

    renderTagMenuList();

  } catch (error) {

    if (checkboxEl) {

      checkboxEl.checked = !shouldAttach;

    }

    alert(error.message);

  }

}



async function loadTags() {

  try {

    state.tags = await fetchJson("/api/tags");

    if (

      state.tagFilterId &&

      !state.tags.some((tag) => tag.id === state.tagFilterId)

    ) {

      state.tagFilterId = null;

    }

    updateTagFilterButton();

    if (!tagFilterMenu?.classList.contains("hidden")) {

      renderTagFilterMenu();

    }

    if (!tagMenu?.classList.contains("hidden")) {

      renderTagMenuList();

    }

    renderConversations();

    renderChatHeader();

  } catch (error) {

    console.error("Erro ao carregar etiquetas", error);

  }

}



async function loadReminders() {

  try {

    state.reminders = await fetchJson("/api/reminders");
    updateReminderBadge();
    renderReminderList();
    renderChatReminders();
    updateDashboard();
  } catch (error) {
    console.error("Erro ao carregar lembretes", error);
  }
}


async function loadBulkCampaigns() {

  try {

    const campaigns = await fetchJson("/api/bulk/campaigns");
    state.bulkCampaigns = campaigns || [];
    renderBulkCampaigns();
    updateDashboard();
  } catch (error) {
    console.warn("Erro ao carregar campanhas em massa", error);
  }
}


function updateReminderBadge() {

  if (!reminderBadge) return;

  const endOfDay = new Date();

  endOfDay.setHours(23, 59, 59, 999);

  const dueToday = state.reminders.filter((reminder) => {

    if (reminder.is_done) return false;

    const due = parseUtcDate(reminder.due_at);

    if (!due) return false;

    return due <= endOfDay;

  });

  if (dueToday.length) {

    reminderBadge.textContent = dueToday.length;

    reminderBadge.classList.remove("hidden");

  } else {

    reminderBadge.classList.add("hidden");

  }

}



function renderReminderList() {

  if (!reminderListEl) return;

  reminderListEl.innerHTML = "";

  if (!state.reminders.length) {

    const empty = document.createElement("p");

    empty.className = "empty";

    empty.textContent = "Nenhum lembrete pendente.";

    reminderListEl.appendChild(empty);

    return;

  }

  const sorted = [...state.reminders].sort(

    (a, b) =>

      (parseUtcDate(a.due_at)?.getTime() || 0) -

      (parseUtcDate(b.due_at)?.getTime() || 0)

  );

  sorted.forEach((reminder) => {

    const item = document.createElement("article");

    item.className = "reminder-item";

    const due = parseUtcDate(reminder.due_at);

    if (due && due.getTime() < Date.now()) {

      item.classList.add("overdue");

    }

    const header = document.createElement("header");

    const conversationLabel = getConversationLabel(reminder.conversation_id);

    header.innerHTML = `<span class="reminder-conversation">${conversationLabel || "Sem conversa"}</span><span class="reminder-date">${formatTimestamp(

      due || reminder.due_at

    )}</span>`;

    const title = document.createElement("strong");

    title.textContent = reminder.title;

    const actions = document.createElement("div");

    actions.className = "reminder-actions";

    const doneButton = document.createElement("button");

    doneButton.className = "primary";

    doneButton.textContent = "Concluído";

    doneButton.addEventListener("click", () => markReminderDone(reminder.id));

    const deleteButton = document.createElement("button");

    deleteButton.className = "ghost";

    deleteButton.textContent = "Remover";

    deleteButton.addEventListener("click", () => deleteReminder(reminder.id));

    actions.append(doneButton, deleteButton);

    item.append(header, title, actions);

    reminderListEl.appendChild(item);

  });

}



function openReminderModal(preselectConversationId = null) {

  if (!reminderModal) return;

  reminderModal.classList.remove("hidden");

  reminderModal.setAttribute("aria-hidden", "false");

  if (preselectConversationId) {

    state.pendingReminderConversationId = Number(preselectConversationId);

  }

  updateReminderConversationOptions();

  if (

    reminderConversationSelect &&

    state.pendingReminderConversationId

  ) {

    reminderConversationSelect.value = String(

      state.pendingReminderConversationId

    );

  }

  reminderFormError.textContent = "";

  setActiveNav("conversations");

  loadReminders();

}



function closeReminderModal(force = false) {

  if (!reminderModal) return;

  reminderModal.classList.add("hidden");

  reminderModal.setAttribute("aria-hidden", "true");

  if (force) {

    setActiveNav("conversations");

  }

  state.pendingReminderConversationId = null;

}



async function markReminderDone(reminderId) {

  try {

    await fetchJson(`/api/reminders/${reminderId}`, {

      method: "PATCH",

      body: JSON.stringify({ is_done: true }),

    });

    await loadReminders();

  } catch (error) {

    alert(error.message);

  }

}



async function deleteReminder(reminderId) {

  const confirmDelete = confirm("Remover lembrete?");

  if (!confirmDelete) return;

  try {

    await fetchJson(`/api/reminders/${reminderId}`, { method: "DELETE" });

    await loadReminders();

  } catch (error) {

    alert(error.message);

  }

}



newUserForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  if (!state.user?.is_admin) {

    newUserErrorEl.textContent = "Apenas administradores podem criar usuários.";

    return;

  }

  newUserErrorEl.textContent = "";

  newUserErrorEl.classList.remove("success");

  const payload = {

    username: newUserUsernameInput.value.trim().toLowerCase(),

    full_name: newUserFullNameInput.value.trim() || null,

    password: newUserPasswordInput.value.trim(),

    is_admin: newUserIsAdminInput.checked,

  };

  try {

    await fetchJson("/api/users", {

      method: "POST",

      body: JSON.stringify(payload),

    });

    newUserForm.reset();

    await loadUsers();

    newUserErrorEl.textContent = "Usuário criado com sucesso.";

    newUserErrorEl.classList.add("success");

  } catch (error) {

    newUserErrorEl.textContent = error.message;

  }

});



async function toggleUser(user) {

  try {

    await fetchJson(`/api/users/${user.id}`, {

      method: "PATCH",

      body: JSON.stringify({ is_active: !user.is_active }),

    });

    await loadUsers();

  } catch (error) {

    alert(error.message);

  }

}



async function resetPassword(user) {

  const newPassword = prompt(`Nova senha para ${user.username}`);

  if (!newPassword) {

    return;

  }

  try {

    await fetchJson(`/api/users/${user.id}`, {

      method: "PATCH",

      body: JSON.stringify({ password: newPassword }),

    });

    alert(`Senha redefinida para ${user.username}. Compartilhe manualmente.`);

  } catch (error) {

    alert(error.message);

  }

}



async function toggleAdmin(user) {

  const targetState = !user.is_admin;

  if (!targetState) {

    const confirmRemove = confirm(

      `Remover privilégios de administrador do usuário ${user.username}?`

    );

    if (!confirmRemove) {

      return;

    }

  }

  try {

    await fetchJson(`/api/users/${user.id}`, {

      method: "PATCH",

      body: JSON.stringify({ is_admin: targetState }),

    });

    await loadUsers();

  } catch (error) {

    alert(error.message);

  }

}

