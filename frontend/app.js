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

const departmentCreateForm = document.getElementById("departmentCreateForm");
const departmentCreateNameInput = document.getElementById("departmentCreateName");
const departmentCreateErrorEl = document.getElementById("departmentCreateError");
const departmentListEl = document.getElementById("departmentList");
const departmentDetailEl = document.getElementById("departmentDetail");
const departmentDetailTitleEl = document.getElementById("departmentDetailTitle");
const departmentUsersListEl = document.getElementById("departmentUsersList");
const departmentSaveUsersButton = document.getElementById("departmentSaveUsersButton");
const departmentSaveErrorEl = document.getElementById("departmentSaveError");
const departmentDeleteButton = document.getElementById("departmentDeleteButton");

const userInfoEl = document.getElementById("userInfo");
const userMenuButton = document.getElementById("userMenuButton");
const userMenuPanel = document.getElementById("userMenuPanel");
const userMenuOrgEl = document.getElementById("userMenuOrg");
const userMenuNameEl = document.getElementById("userMenuName");

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

function normalizeBrazilPhone(raw) {
  const digits = String(raw || "").replace(/\D/g, "");

  if (!digits) return "";

  const trimmed = digits.replace(/^0+/, "");
  const hasCountry = trimmed.startsWith("55");
  let national = hasCountry ? trimmed.slice(2) : trimmed;

  if (national.length === 10) {
    const ddd = national.slice(0, 2);
    const subscriber = national.slice(2);
    const first = subscriber[0];

    // Heurística: números móveis antigos (8 dígitos) geralmente começam com 6-9,
    // e hoje usam 9 dígitos (com "9" após o DDD).
    if (first && Number(first) >= 6) {
      national = `${ddd}9${subscriber}`;
    }
  }

  if (national.length !== 10 && national.length !== 11) return trimmed;

  return `55${national}`;
}

const sideNavButtons = document.querySelectorAll(".side-nav button[data-panel]");

const workspace = document.querySelector(".workspace");

const newUserIsAdminInput = document.getElementById("newUserIsAdmin");

const conversationSearchInput = document.getElementById("conversationSearch");

const tagFilterButton = document.getElementById("tagFilterButton");

const tagFilterMenu = document.getElementById("tagFilterMenu");
const conversationFilterButton = document.getElementById("conversationFilterButton");
const conversationFilterMenu = document.getElementById("conversationFilterMenu");
const conversationAdminFilters = document.getElementById("conversationAdminFilters");
const filterOwnerSearch = document.getElementById("filterOwnerSearch");
const filterOwnerOptions = document.getElementById("filterOwnerOptions");
const filterOwnerChips = document.getElementById("filterOwnerChips");
const filterDepartmentSearch = document.getElementById("filterDepartmentSearch");
const filterDepartmentOptions = document.getElementById("filterDepartmentOptions");
const filterDepartmentChips = document.getElementById("filterDepartmentChips");
const conversationFilterClear = document.getElementById("conversationFilterClear");

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

const phoneActionMenu = document.createElement("div");
phoneActionMenu.className = "phone-action-menu hidden";
phoneActionMenu.setAttribute("role", "menu");
document.body.appendChild(phoneActionMenu);

const reactionPicker = document.createElement("div");
reactionPicker.className = "reaction-picker hidden";
reactionPicker.setAttribute("role", "menu");
document.body.appendChild(reactionPicker);
let reactionPickerMessageId = null;

const conversationActionMenu = document.createElement("div");
conversationActionMenu.className = "conversation-action-menu hidden";
conversationActionMenu.setAttribute("role", "menu");
document.body.appendChild(conversationActionMenu);
let conversationActionMenuConversationId = null;

const messageActionMenu = document.createElement("div");
messageActionMenu.className = "message-action-menu hidden";
messageActionMenu.setAttribute("role", "menu");
document.body.appendChild(messageActionMenu);
let messageActionMenuMessageId = null;

const messageSelectionBar = document.getElementById("messageSelectionBar");
const messageSelectionCountEl = document.getElementById("messageSelectionCount");
const messageSelectionCopyButton = document.getElementById("messageSelectionCopy");
const messageSelectionCancelButton = document.getElementById("messageSelectionCancel");

const chatTitleEl = document.getElementById("chatTitle");

const chatSubtitleEl = document.getElementById("chatSubtitle");

const chatOwnerEl = document.getElementById("chatOwner");

const editContactNameButton = document.getElementById("editContactNameButton");

const selectedTagsEl = document.getElementById("selectedTags");

const chatRemindersEl = document.getElementById("chatReminders");

const chatAvatarEl = document.getElementById("chatAvatar");

const callStartButton = document.getElementById("callStartButton");

const callRejectButton = document.getElementById("callRejectButton");

const messageSearchToggleButton = document.getElementById("messageSearchToggle");
const chatSearchBar = document.getElementById("chatSearchBar");
const chatSearchInput = document.getElementById("chatSearchInput");
const chatSearchPrevButton = document.getElementById("chatSearchPrev");
const chatSearchNextButton = document.getElementById("chatSearchNext");
const chatSearchCloseButton = document.getElementById("chatSearchClose");
const chatSearchMetaEl = document.getElementById("chatSearchMeta");

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
const editMessageModal = document.getElementById("editMessageModal");
const closeEditMessageModalButton = document.getElementById("closeEditMessageModal");
const editMessageForm = document.getElementById("editMessageForm");
const editMessageTextInput = document.getElementById("editMessageText");
const editMessageError = document.getElementById("editMessageError");
const cancelEditMessageButton = document.getElementById("cancelEditMessage");
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
const calendarEventModal = document.getElementById("calendarEventModal");
const calendarEventModalTitle = document.getElementById("calendarEventModalTitle");
const calendarEventModalSubtitle = document.getElementById("calendarEventModalSubtitle");
const calendarEventModalContact = document.getElementById("calendarEventModalContact");
const calendarEventModalOwner = document.getElementById("calendarEventModalOwner");
const calendarEventModalNotes = document.getElementById("calendarEventModalNotes");
const calendarEventModalConversation = document.getElementById("calendarEventModalConversation");
const calendarEventModalComplete = document.getElementById("calendarEventModalComplete");
const calendarEventModalCancel = document.getElementById("calendarEventModalCancel");
const calendarStatToday = document.getElementById("calendarStatToday");
const calendarStatWeek = document.getElementById("calendarStatWeek");
const calendarStatMonth = document.getElementById("calendarStatMonth");
const calendarStatPending = document.getElementById("calendarStatPending");
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
const signMessagesToggle = document.getElementById("signMessagesToggle");
const mediaFileInput = document.getElementById("mediaFileInput");
const mediaUploadLabel = document.getElementById("mediaUploadLabel");
const emojiToggleButton = document.getElementById("emojiToggleButton");
const emojiPickerPanel = document.getElementById("emojiPickerPanel");
const emojiPickerElement = emojiPickerPanel?.querySelector("emoji-picker");
const imagePreviewModal = document.getElementById("imagePreviewModal");
const imagePreviewImage = document.getElementById("imagePreviewImage");
const imagePreviewCaption = document.getElementById("imagePreviewCaption");
const imagePreviewDownload = document.getElementById("imagePreviewDownload");

const mediaComposerModal = document.getElementById("mediaComposerModal");
const mediaComposerImage = document.getElementById("mediaComposerImage");
const mediaComposerCanvas = document.getElementById("mediaComposerCanvas");
const mediaComposerForm = document.getElementById("mediaComposerForm");
const mediaComposerCaption = document.getElementById("mediaComposerCaption");
const mediaComposerToggleDraw = document.getElementById("mediaComposerToggleDraw");
const mediaComposerClear = document.getElementById("mediaComposerClear");
const mediaComposerColor = document.getElementById("mediaComposerColor");

const MIC_ICON_SVG = "<svg class='toolbar-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true' focusable='false'><path d='M12 19v3'/><path d='M19 10v2a7 7 0 0 1-14 0v-2'/><rect x='9' y='2' width='6' height='13' rx='3'/></svg>";
const STOP_ICON_SVG = "<svg class='toolbar-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true' focusable='false'><rect x='7' y='7' width='10' height='10' rx='2'/></svg>";

function setAudioRecordButtonVisual(mode) {
  if (!audioRecordButton) return;

  if (mode === "recording") {
    audioRecordButton.classList.add("recording");
    audioRecordButton.classList.add("icon-only");
    audioRecordButton.innerHTML = STOP_ICON_SVG;
    audioRecordButton.setAttribute("aria-label", "Parar gravação");
    audioRecordButton.title = "Parar";
    return;
  }

  audioRecordButton.classList.remove("recording");
  audioRecordButton.classList.add("icon-only");
  audioRecordButton.innerHTML = MIC_ICON_SVG;
  audioRecordButton.setAttribute("aria-label", "Gravar áudio");
  audioRecordButton.title = "Gravar áudio";
}


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

  departments: [],
  selectedDepartmentId: null,
  selectedDepartmentUserIds: [],

  mediaComposer: {
    open: false,
    file: null,
    objectUrl: "",
    drawEnabled: false,
    hasEdits: false,
    drawing: false,
    lastX: 0,
    lastY: 0,
  },

  selectedConversation: null,

  pollHandle: null,

  conversationPollHandle: null,

  viewAllConversations: false,
  conversationsPageSize: 150,
  conversationsOffset: 0,
  conversationsHasMore: true,
  conversationsLoadingMore: false,
  conversationsCursorUpdatedAt: null,
  conversationsCursorId: null,

  activeConversationType: "chats",

  tags: [],

  searchQuery: "",

  tagFilterId: null,

  conversationOwnerFilterIds: [],
  conversationDepartmentFilterIds: [],
  conversationOwnerQuery: "",
  conversationDepartmentQuery: "",

  session: null,

  reminders: [],

  reminderPollHandle: null,
  pendingReminderConversationId: null,
  reminderModalOriginPanel: null,
  messagesSignature: null,
  notesSignature: null,
  latestMessages: [],
  fullMessages: [],
  messagesHasMoreByConversation: {},
  messagesOldestIdByConversation: {},
  messagesByConversation: {},
  notesByConversation: {},
  messagesPageSize: 200,
  messageLoadAbortController: null,
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
  calendarEventPreview: null,
  messageSelectionMode: false,
  selectedMessageIds: [],
  messageSearchQuery: "",
  messageSearchMatches: [],
  messageSearchMatchIndex: -1,
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
  signMessagesEnabled: false,
  sendingMessage: false,
  realtimeRunning: false,
  realtimeConnected: false,
  realtimeAbortController: null,
  realtimeRetryHandle: null,
  realtimeRefreshConversationsHandle: null,
  realtimeRefreshMessagesHandle: null,

};

function setMediaComposerCanvasBounds() {
  if (!mediaComposerCanvas || !mediaComposerImage) return;
  const width = Math.max(1, Math.round(mediaComposerImage.clientWidth || 1));
  const height = Math.max(1, Math.round(mediaComposerImage.clientHeight || 1));
  const left = Math.round(mediaComposerImage.offsetLeft || 0);
  const top = Math.round(mediaComposerImage.offsetTop || 0);

  mediaComposerCanvas.style.left = `${left}px`;
  mediaComposerCanvas.style.top = `${top}px`;
  mediaComposerCanvas.style.right = "auto";
  mediaComposerCanvas.style.bottom = "auto";
  mediaComposerCanvas.style.width = `${width}px`;
  mediaComposerCanvas.style.height = `${height}px`;

  if (mediaComposerCanvas.width !== width || mediaComposerCanvas.height !== height) {
    mediaComposerCanvas.width = width;
    mediaComposerCanvas.height = height;
  }
}

function openMediaComposer(file, options = {}) {
  if (!mediaComposerModal || !mediaComposerImage || !file) return;
  const captionDefault = String(options.captionDefault ?? "").trim();

  if (state.mediaComposer.objectUrl) {
    URL.revokeObjectURL(state.mediaComposer.objectUrl);
  }

  state.mediaComposer.file = file;
  state.mediaComposer.objectUrl = URL.createObjectURL(file);
  state.mediaComposer.open = true;
  state.mediaComposer.drawEnabled = false;
  state.mediaComposer.hasEdits = false;
  state.mediaComposer.drawing = false;

  if (mediaComposerCaption) {
    mediaComposerCaption.value = captionDefault;
  }

  if (mediaComposerCanvas) {
    const ctx = mediaComposerCanvas.getContext("2d");
    ctx?.clearRect(0, 0, mediaComposerCanvas.width, mediaComposerCanvas.height);
    mediaComposerCanvas.classList.add("hidden");
    mediaComposerCanvas.setAttribute("aria-hidden", "true");
  }

  mediaComposerImage.onload = () => {
    setTimeout(() => {
      setMediaComposerCanvasBounds();
    }, 0);
  };
  mediaComposerImage.src = state.mediaComposer.objectUrl;

  mediaComposerModal.classList.remove("hidden");
  mediaComposerModal.setAttribute("aria-hidden", "false");
  document.body?.classList.add("image-preview-open");
}

function closeMediaComposer() {
  if (!mediaComposerModal) return;

  mediaComposerModal.classList.add("hidden");
  mediaComposerModal.setAttribute("aria-hidden", "true");
  document.body?.classList.remove("image-preview-open");

  if (mediaComposerImage) {
    mediaComposerImage.onload = null;
    mediaComposerImage.src = "";
  }
  if (mediaComposerCanvas) {
    const ctx = mediaComposerCanvas.getContext("2d");
    ctx?.clearRect(0, 0, mediaComposerCanvas.width, mediaComposerCanvas.height);
    mediaComposerCanvas.classList.add("hidden");
    mediaComposerCanvas.setAttribute("aria-hidden", "true");
  }

  if (state.mediaComposer.objectUrl) {
    URL.revokeObjectURL(state.mediaComposer.objectUrl);
  }
  state.mediaComposer.file = null;
  state.mediaComposer.objectUrl = "";
  state.mediaComposer.open = false;
  state.mediaComposer.drawEnabled = false;
  state.mediaComposer.hasEdits = false;
  state.mediaComposer.drawing = false;
}

function setMediaComposerDrawEnabled(enabled) {
  state.mediaComposer.drawEnabled = Boolean(enabled);
  if (!mediaComposerCanvas) return;
  if (state.mediaComposer.drawEnabled) {
    setMediaComposerCanvasBounds();
    mediaComposerCanvas.classList.remove("hidden");
    mediaComposerCanvas.setAttribute("aria-hidden", "false");
  } else {
    mediaComposerCanvas.classList.add("hidden");
    mediaComposerCanvas.setAttribute("aria-hidden", "true");
  }
}

function startMediaComposerDraw(x, y) {
  if (!mediaComposerCanvas) return;
  const ctx = mediaComposerCanvas.getContext("2d");
  if (!ctx) return;
  const color = String(mediaComposerColor?.value || "#cd5cdd");
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  state.mediaComposer.drawing = true;
  state.mediaComposer.lastX = x;
  state.mediaComposer.lastY = y;
}

function moveMediaComposerDraw(x, y) {
  if (!state.mediaComposer.drawing || !mediaComposerCanvas) return;
  const ctx = mediaComposerCanvas.getContext("2d");
  if (!ctx) return;
  ctx.beginPath();
  ctx.moveTo(state.mediaComposer.lastX, state.mediaComposer.lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  state.mediaComposer.lastX = x;
  state.mediaComposer.lastY = y;
  state.mediaComposer.hasEdits = true;
}

function endMediaComposerDraw() {
  state.mediaComposer.drawing = false;
}

async function buildMediaComposerOutputFile() {
  if (!state.mediaComposer.file || !mediaComposerImage) return null;
  if (!state.mediaComposer.hasEdits || !mediaComposerCanvas) return state.mediaComposer.file;

  const width = mediaComposerCanvas.width || 1;
  const height = mediaComposerCanvas.height || 1;
  const output = document.createElement("canvas");
  output.width = width;
  output.height = height;
  const ctx = output.getContext("2d");
  if (!ctx) return state.mediaComposer.file;

  ctx.drawImage(mediaComposerImage, 0, 0, width, height);
  ctx.drawImage(mediaComposerCanvas, 0, 0, width, height);

  const blob = await new Promise((resolve) => output.toBlob(resolve, "image/png", 0.92));
  if (!blob) return state.mediaComposer.file;
  return new File([blob], "imagem.png", { type: "image/png" });
}

function getQuickRepliesStorageKey() {
  const orgId = state.organization?.id ?? "0";
  const userId = state.user?.id ?? "0";
  return `quickReplies:${orgId}:${userId}`;
}

function getSignMessagesStorageKey() {
  const orgId = state.organization?.id ?? "0";
  const userId = state.user?.id ?? "0";
  return `signMessages:${orgId}:${userId}`;
}

function getConversationDraftStorageKey(conversationId) {
  const orgId = state.organization?.id ?? "0";
  const userId = state.user?.id ?? "0";
  return `draft:${orgId}:${userId}:${conversationId}`;
}

function loadConversationDraft(conversationId) {
  if (!conversationId) return "";
  try {
    const raw = localStorage.getItem(getConversationDraftStorageKey(conversationId));
    if (!raw) return "";
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.text !== "string") return "";
    return parsed.text;
  } catch {
    return "";
  }
}

function loadConversationDraftUpdatedAt(conversationId) {
  if (!conversationId) return 0;
  try {
    const raw = localStorage.getItem(getConversationDraftStorageKey(conversationId));
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    const updatedAt = Number(parsed?.updatedAt) || 0;
    return Number.isFinite(updatedAt) ? updatedAt : 0;
  } catch {
    return 0;
  }
}

function saveConversationDraft(conversationId, text) {
  if (!conversationId) return;
  const normalized = String(text || "").replace(/\r\n/g, "\n");
  const trimmed = normalized.trim();
  try {
    if (!trimmed) {
      localStorage.removeItem(getConversationDraftStorageKey(conversationId));
      return;
    }
    localStorage.setItem(
      getConversationDraftStorageKey(conversationId),
      JSON.stringify({ text: normalized, updatedAt: Date.now() })
    );
  } catch {
    // ignore
  }
}

function clearConversationDraft(conversationId) {
  if (!conversationId) return;
  try {
    localStorage.removeItem(getConversationDraftStorageKey(conversationId));
  } catch {
    // ignore
  }
  if (conversationListEl) {
    renderConversations();
  }
}

let draftSaveTimer = null;

function scheduleDraftSave() {
  if (!messageInput || state.sendingMessage) return;
  const conversationId = state.selectedConversation?.id;
  if (!conversationId) return;
  const text = messageInput.value || "";
  if (draftSaveTimer) {
    clearTimeout(draftSaveTimer);
  }
  draftSaveTimer = setTimeout(() => {
    draftSaveTimer = null;
    saveConversationDraft(conversationId, text);
    if (conversationListEl) {
      renderConversations();
    }
  }, 250);
}

function persistDraftForActiveConversation() {
  if (!messageInput) return;
  const conversationId = state.selectedConversation?.id;
  if (!conversationId) return;
  saveConversationDraft(conversationId, messageInput.value || "");
  if (conversationListEl) {
    renderConversations();
  }
}

function restoreDraftForConversation(conversationId) {
  if (!messageInput || !conversationId) return;
  const draft = loadConversationDraft(conversationId);
  messageInput.value = draft || "";
  scheduleMessageInputResize();
}

function loadSignMessagesPreference() {
  try {
    return localStorage.getItem(getSignMessagesStorageKey()) === "1";
  } catch {
    return false;
  }
}

function saveSignMessagesPreference(enabled) {
  try {
    localStorage.setItem(getSignMessagesStorageKey(), enabled ? "1" : "0");
  } catch {
    // ignore
  }
}

function getSignatureLabel() {
  const username = (state.user?.username || "").trim();
  const fullName = (state.user?.full_name || "").trim();
  return username || fullName || "Você";
}

function applySignatureIfEnabled(text) {
  if (!state.signMessagesEnabled) return text;
  const label = getSignatureLabel();
  return `${label}:\n${text}`;
}

function syncSignMessagesToggle() {
  const enabled = loadSignMessagesPreference();
  state.signMessagesEnabled = enabled;
  if (signMessagesToggle) {
    signMessagesToggle.checked = enabled;
  }
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

function normalizePhoneDigits(value) {
  return String(value || "").replaceAll(/\D/g, "");
}

function normalizePhoneForCompare(value) {
  const digits = normalizePhoneDigits(value);
  if (!digits) return "";

  // Strip country code if present (Brazil)
  let national = digits;
  if ((national.length === 12 || national.length === 13) && national.startsWith("55")) {
    national = national.slice(2);
  } else if (national.length > 11) {
    national = national.slice(-11);
  }

  // Normalize legacy mobile numbers without the 9th digit (DDD + 8 digits)
  if (national.length === 10) {
    const ddd = national.slice(0, 2);
    const subscriber = national.slice(2);
    const first = subscriber[0];
    if (first && Number(first) >= 6) {
      national = `${ddd}9${subscriber}`;
    }
  }

  return national;
}

function digitsToE164(digits) {
  const only = normalizePhoneDigits(digits);
  if (!only) return "";
  if (only.length === 10 || only.length === 11) {
    return `+55${only}`;
  }
  if ((only.length === 12 || only.length === 13) && only.startsWith("55")) {
    return `+${only}`;
  }
  return only.startsWith("+") ? only : `+${only}`;
}

function extractPhoneMatches(text) {
  const value = String(text || "");
  // Match per-line phone-like tokens (avoid swallowing multiple lines in one match).
  // Examples: "47 9733-7214", "+55 (47) 9709-3208", "47997832789"
  const regex = /(\+?\d[\d ().-]{7,}\d)/g;
  const matches = [];
  let match;
  while ((match = regex.exec(value))) {
    const raw = match[1];
    const digits = normalizePhoneDigits(raw);
    if (!digits) continue;
    if (digits.length < 10 || digits.length > 13) continue;
    // Avoid matching dates like 09/02/2026 or times like 13:31
    if (raw.includes("/") || raw.includes(":")) continue;
    matches.push({ start: match.index, end: match.index + raw.length, raw, digits });
  }
  return matches;
}

function hidePhoneActionMenu() {
  phoneActionMenu.classList.add("hidden");
  phoneActionMenu.innerHTML = "";
}

function hideConversationActionMenu() {
  conversationActionMenu.classList.add("hidden");
  conversationActionMenu.innerHTML = "";
  conversationActionMenuConversationId = null;
}

function hideMessageActionMenu() {
  messageActionMenu.classList.add("hidden");
  messageActionMenu.innerHTML = "";
  messageActionMenuMessageId = null;
}

function hideReactionPicker() {
  reactionPicker.classList.add("hidden");
  reactionPicker.innerHTML = "";
  reactionPickerMessageId = null;
}

async function reactToMessage(message, emoji) {
  const updated = await fetchJson(`/api/messages/${message.id}/react`, {
    method: "POST",
    body: JSON.stringify({ emoji: String(emoji || "") }),
  });
  if (updated && state.latestMessages?.length) {
    const idx = state.latestMessages.findIndex((m) => m.id === message.id);
    if (idx >= 0) {
      state.latestMessages[idx] = { ...state.latestMessages[idx], ...updated };
    }
    renderMessages(state.latestMessages, {
      notes: state.conversationNotes || [],
      preserveScroll: true,
    });
  } else {
    await loadMessages();
  }
}

function showReactionPicker({ x, y, message }) {
  if (!message) return;
  reactionPickerMessageId = message.id;
  reactionPicker.innerHTML = "";

  const common = ["👍", "❤️", "😂", "😮", "😢", "🙏"];
  const row = document.createElement("div");
  row.className = "reaction-picker-row";

  common.forEach((emoji) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "reaction-picker-emoji";
    btn.textContent = emoji;
    if (message.my_reaction === emoji) {
      btn.classList.add("active");
    }
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const nextEmoji = message.my_reaction === emoji ? "" : emoji;
      try {
        await reactToMessage(message, nextEmoji);
      } catch (error) {
        alert(error.message);
      } finally {
        hideReactionPicker();
      }
    });
    row.appendChild(btn);
  });

  reactionPicker.appendChild(row);
  reactionPicker.style.left = `${Math.max(8, Math.min(x, window.innerWidth - 340))}px`;
  reactionPicker.style.top = `${Math.max(8, Math.min(y, window.innerHeight - 160))}px`;
  reactionPicker.classList.remove("hidden");
}

function syncMessageSelectionBar() {
  if (!messageSelectionBar) return;
  const count = (state.selectedMessageIds || []).length;
  if (messageSelectionCountEl) {
    messageSelectionCountEl.textContent = String(count);
  }
  messageSelectionBar.classList.toggle("hidden", !state.messageSelectionMode);
}

function setMessageSelectionMode(enabled) {
  state.messageSelectionMode = Boolean(enabled);
  if (!state.messageSelectionMode) {
    state.selectedMessageIds = [];
  }
  hideMessageActionMenu();
  syncMessageSelectionBar();
  if (state.latestMessages?.length) {
    renderMessages(state.latestMessages, {
      notes: state.conversationNotes || [],
      preserveScroll: true,
    });
  }
}

function toggleMessageSelected(messageId) {
  const id = Number(messageId);
  if (!id) return;
  const set = new Set(state.selectedMessageIds || []);
  if (set.has(id)) set.delete(id);
  else set.add(id);
  state.selectedMessageIds = Array.from(set);
  syncMessageSelectionBar();
  if (state.latestMessages?.length) {
    renderMessages(state.latestMessages, {
      notes: state.conversationNotes || [],
      preserveScroll: true,
    });
  }
  if (!state.selectedMessageIds.length) {
    setMessageSelectionMode(false);
  }
}

function getMessagesForSearch(messages, query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return messages;
  return (messages || []).filter((message) => {
    const hay = `${message.content || ""}`.toLowerCase();
    return hay.includes(q);
  });
}

function updateChatSearchMeta(total, filtered) {
  if (!chatSearchMetaEl) return;
  if (!state.messageSearchQuery) {
    chatSearchMetaEl.textContent = "";
    return;
  }
  chatSearchMetaEl.textContent = `${filtered} resultado(s)`;
}

function setChatSearchOpen(open) {
  if (!chatSearchBar) return;
  const shouldOpen = Boolean(open);
  chatSearchBar.classList.toggle("hidden", !shouldOpen);
  if (!shouldOpen) {
    state.messageSearchQuery = "";
    state.messageSearchMatches = [];
    state.messageSearchMatchIndex = -1;
    if (chatSearchInput) chatSearchInput.value = "";
    updateChatSearchMeta(0, 0);
    if (state.fullMessages?.length) {
      renderMessages(state.fullMessages, { notes: state.conversationNotes || [], fullMessages: state.fullMessages, preserveScroll: true });
    } else if (state.latestMessages?.length) {
      renderMessages(state.latestMessages, { notes: state.conversationNotes || [], preserveScroll: true });
    }
  } else {
    chatSearchInput?.focus();
    chatSearchInput?.select();
  }
}

function syncChatSearchNavigationState() {
  const total = (state.messageSearchMatches || []).length;
  const hasQuery = Boolean(String(state.messageSearchQuery || "").trim());
  const enabled = hasQuery && total > 0;
  if (chatSearchPrevButton) chatSearchPrevButton.disabled = !enabled;
  if (chatSearchNextButton) chatSearchNextButton.disabled = !enabled;
  if (chatSearchMetaEl) {
    if (!hasQuery) {
      chatSearchMetaEl.textContent = "";
    } else if (!total) {
      chatSearchMetaEl.textContent = "0 resultado(s)";
    } else {
      const current = Math.max(0, Math.min(state.messageSearchMatchIndex, total - 1));
      chatSearchMetaEl.textContent = `${current + 1}/${total}`;
    }
  }
}

function applyChatMessageSearch({ focus = true } = {}) {
  const query = String(state.messageSearchQuery || "").trim();
  const all = state.fullMessages?.length ? state.fullMessages : state.latestMessages || [];
  const matches = query
    ? all
        .filter((message) => {
          if (!message) return false;
          const content = String(message.content || "");
          if (!content) return false;
          return content.toLowerCase().includes(query.toLowerCase());
        })
        .map((message) => message.id)
    : [];

  state.messageSearchMatches = matches;
  state.messageSearchMatchIndex = matches.length ? 0 : -1;
  syncChatSearchNavigationState();

  renderMessages(all, {
    notes: state.conversationNotes || [],
    fullMessages: all,
    preserveScroll: true,
  });

  if (focus && matches.length) {
    requestAnimationFrame(() => focusMessageById(matches[0]));
  }
}

function moveChatSearchMatch(delta) {
  const total = (state.messageSearchMatches || []).length;
  if (!total) return;
  const current = state.messageSearchMatchIndex >= 0 ? state.messageSearchMatchIndex : 0;
  const next = (current + delta + total) % total;
  state.messageSearchMatchIndex = next;
  syncChatSearchNavigationState();
  const messageId = state.messageSearchMatches[next];
  if (messageId) {
    focusMessageById(messageId);
    // refresh highlight
    const all = state.fullMessages?.length ? state.fullMessages : state.latestMessages || [];
    renderMessages(all, {
      notes: state.conversationNotes || [],
      fullMessages: all,
      preserveScroll: true,
    });
    requestAnimationFrame(() => focusMessageById(messageId));
  }
}

function summarizeMessageForCopy(message) {
  if (!message) return "";
  const parts = [];
  const when = message.timestamp ? formatTimestamp(message.timestamp) : "";
  const who = message.direction === "agent" ? "Você" : getConversationContactLabel();
  if (when) parts.push(`[${when}]`);
  if (who) parts.push(`${who}:`);
  if (message.message_type && message.message_type !== "text" && !message.content) {
    const labelMap = { image: "[imagem]", audio: "[áudio]", document: "[arquivo]" };
    parts.push(labelMap[message.message_type] || `[${message.message_type}]`);
  } else {
    parts.push((message.content || "").trim());
  }
  return parts.filter(Boolean).join(" ");
}

async function copySelectedMessagesToClipboard() {
  const ids = new Set(state.selectedMessageIds || []);
  if (!ids.size) return;
  const messages = (state.latestMessages || [])
    .filter((m) => ids.has(m.id))
    .slice()
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  const text = messages.map(summarizeMessageForCopy).filter(Boolean).join("\n");
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // fallback
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
}

function showMessageActionMenu({ x, y, message }) {
  if (!message) return;
  messageActionMenuMessageId = message.id;
  messageActionMenu.innerHTML = "";

  const selectButton = document.createElement("button");
  selectButton.type = "button";
  selectButton.textContent = "Selecionar mensagens";
  selectButton.addEventListener("click", () => {
    hideMessageActionMenu();
    setMessageSelectionMode(true);
    toggleMessageSelected(message.id);
  });

  messageActionMenu.appendChild(selectButton);

  const canEditMessage =
    message.direction === "agent" &&
    !message.is_deleted_for_all &&
    String(message.message_type || "text") === "text";

  if (canEditMessage) {
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Editar mensagem";
    editButton.addEventListener("click", () => {
      hideMessageActionMenu();
      openEditMessageModal(message);
    });
    messageActionMenu.appendChild(editButton);
  }

  const canDeleteForAll =
    message.direction === "agent" && !message.is_deleted_for_all;

  if (canDeleteForAll) {
    const deleteForAll = document.createElement("button");
    deleteForAll.type = "button";
    deleteForAll.textContent = "Apagar para todos";
    deleteForAll.addEventListener("click", async () => {
      hideMessageActionMenu();
      try {
        const updated = await fetchJson(`/api/messages/${message.id}/delete-for-all`, {
          method: "POST",
        });
        if (updated && state.latestMessages?.length) {
          const idx = state.latestMessages.findIndex((m) => m.id === message.id);
          if (idx >= 0) {
            state.latestMessages[idx] = { ...state.latestMessages[idx], ...updated };
          }
          renderMessages(state.latestMessages, { notes: state.conversationNotes || [] });
        } else {
          await loadMessages();
        }
      } catch (error) {
        alert(error.message);
      }
    });

    messageActionMenu.appendChild(deleteForAll);
  }

  messageActionMenu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - 340))}px`;
  messageActionMenu.style.top = `${Math.max(8, Math.min(y, window.innerHeight - 160))}px`;
  messageActionMenu.classList.remove("hidden");
}

function sortConversationsForSidebar(list) {
  const copy = Array.isArray(list) ? [...list] : [];
  copy.sort((a, b) => {
    const ap = a?.is_pinned ? 1 : 0;
    const bp = b?.is_pinned ? 1 : 0;
    if (ap !== bp) return bp - ap;
    const messageAt = a?.last_message_at ? new Date(a.last_message_at).getTime() : 0;
    const messageBt = b?.last_message_at ? new Date(b.last_message_at).getTime() : 0;
    const draftAt = loadConversationDraftUpdatedAt(a?.id);
    const draftBt = loadConversationDraftUpdatedAt(b?.id);
    const at = Math.max(messageAt || 0, draftAt || 0);
    const bt = Math.max(messageBt || 0, draftBt || 0);
    if (at !== bt) return bt - at;
    return (b?.id || 0) - (a?.id || 0);
  });
  return copy;
}

async function setConversationPinned(conversationId, pinned) {
  await fetchJson(`/api/conversations/${conversationId}/pin`, {
    method: pinned ? "POST" : "DELETE",
  });
  const target = (state.conversations || []).find((c) => c.id === conversationId);
  if (target) {
    target.is_pinned = Boolean(pinned);
  }
  state.conversations = sortConversationsForSidebar(state.conversations || []);
  renderConversations();
}

function showConversationActionMenu({ x, y, conversation }) {
  if (!conversation) return;
  const conversationId = conversation.id;
  conversationActionMenuConversationId = conversationId;
  conversationActionMenu.innerHTML = "";

  const isPinned = Boolean(conversation.is_pinned);

  const pinButton = document.createElement("button");
  pinButton.type = "button";
  pinButton.textContent = isPinned ? "Desafixar conversa" : "Fixar conversa";
  pinButton.addEventListener("click", async () => {
    hideConversationActionMenu();
    try {
      await setConversationPinned(conversationId, !isPinned);
    } catch (error) {
      alert(error.message);
    }
  });

  const tagButton = document.createElement("button");
  tagButton.type = "button";
  tagButton.textContent = "Adicionar etiqueta";
  tagButton.addEventListener("click", () => {
    hideConversationActionMenu();
    selectConversation(conversationId);
    window.setTimeout(() => {
      if (tagMenuToggle && !tagMenuToggle.disabled) {
        tagMenuToggle.click();
      }
    }, 0);
  });

  const unreadButton = document.createElement("button");
  unreadButton.type = "button";
  unreadButton.textContent = "Marcar como não lida";
  unreadButton.addEventListener("click", async () => {
    hideConversationActionMenu();
    try {
      await fetchJson(`/api/conversations/${conversationId}/mark-unread`, {
        method: "POST",
      });
      await loadConversations({ silent: true });
      renderConversations();
    } catch (error) {
      alert(error.message);
    }
  });

  conversationActionMenu.append(pinButton, tagButton, unreadButton);
  conversationActionMenu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - 340))}px`;
  conversationActionMenu.style.top = `${Math.max(8, Math.min(y, window.innerHeight - 220))}px`;
  conversationActionMenu.classList.remove("hidden");
}

function showPhoneActionMenu({ x, y, phoneDigits }) {
  phoneActionMenu.innerHTML = "";
  const e164 = digitsToE164(phoneDigits);

  const talkButton = document.createElement("button");
  talkButton.type = "button";
  talkButton.innerHTML = `<span class="icon" aria-hidden="true">💬</span><span>Conversar com ${escapeHtml(
    e164 || phoneDigits
  )}</span>`;
  talkButton.addEventListener("click", async () => {
    hidePhoneActionMenu();
    await openConversationForPhone(phoneDigits);
  });

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.innerHTML = `<span class="icon" aria-hidden="true">📋</span><span>Copiar número</span>`;
  copyButton.addEventListener("click", async () => {
    hidePhoneActionMenu();
    try {
      await navigator.clipboard.writeText(e164 || phoneDigits);
    } catch {
      // ignore
    }
  });

  phoneActionMenu.append(talkButton, copyButton);
  phoneActionMenu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - 340))}px`;
  phoneActionMenu.style.top = `${Math.max(8, Math.min(y, window.innerHeight - 180))}px`;
  phoneActionMenu.classList.remove("hidden");
}

async function openConversationForPhone(phoneDigits) {
  const target = normalizePhoneForCompare(phoneDigits);
  if (!target) return;

  const existing = (state.conversations || []).find((conversation) => {
    const current = normalizePhoneForCompare(conversation.debtor_phone);
    return current && current === target;
  });
  if (existing) {
    selectConversation(existing.id);
    return;
  }

  const confirmCreate = confirm(`Criar nova conversa com ${digitsToE164(phoneDigits) || phoneDigits}?`);
  if (!confirmCreate) return;
  const payload = {
    debtor_name: digitsToE164(phoneDigits) || phoneDigits,
    debtor_phone: digitsToE164(phoneDigits) || phoneDigits,
    notes: null,
  };
  try {
    const conversation = await fetchJson("/api/conversations", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    await loadConversations();
    selectConversation(conversation.id);
  } catch (error) {
    alert(error.message);
  }
}

function appendMessageTextWithLinks(container, text) {
  const value = String(text || "");
  const matches = extractPhoneMatches(value);
  if (!matches.length) {
    container.textContent = value;
    return;
  }

  let cursor = 0;
  matches.forEach((m) => {
    if (m.start > cursor) {
      container.appendChild(document.createTextNode(value.slice(cursor, m.start)));
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "phone-link";
    button.textContent = m.raw;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const rect = button.getBoundingClientRect();
      showPhoneActionMenu({
        x: rect.left + rect.width / 2,
        y: rect.top - 8,
        phoneDigits: m.digits,
      });
    });
    container.appendChild(button);
    cursor = m.end;
  });

  if (cursor < value.length) {
    container.appendChild(document.createTextNode(value.slice(cursor)));
  }
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
  stopRealtime();

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

let editMessageTargetId = null;

function openEditMessageModal(message) {
  if (!editMessageModal || !editMessageTextInput || !editMessageForm) return;
  if (!message) return;
  editMessageTargetId = message.id;
  if (editMessageError) editMessageError.textContent = "";
  editMessageTextInput.value = String(message.content || "");
  editMessageModal.classList.remove("hidden");
  editMessageModal.setAttribute("aria-hidden", "false");
  setTimeout(() => editMessageTextInput.focus(), 50);
}

function closeEditMessageModal() {
  if (!editMessageModal) return;
  editMessageModal.classList.add("hidden");
  editMessageModal.setAttribute("aria-hidden", "true");
  editMessageTargetId = null;
  if (editMessageTextInput) {
    editMessageTextInput.value = "";
  }
  if (editMessageError) {
    editMessageError.textContent = "";
  }
}

function setMessageFormAvailability(enabled) {
  messageInput.disabled = !enabled;
  messageSubmitButton.disabled = !enabled;
  if (messageSearchToggleButton) {
    messageSearchToggleButton.disabled = !enabled;
  }
  if (!enabled) {
    messageInput.value = "";
    cancelPendingAudio();
    clearReplyContext();
    closeQuickReplyPanel();
    setChatSearchOpen(false);
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

  setupMediaComposerControls();

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

    setAudioRecordButtonVisual("recording");

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

  setAudioRecordButtonVisual("idle");

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
  messageListEl.classList.add("has-empty-state");
  messageListEl.innerHTML =
    '<div class="chat-empty-state"><div class="chat-empty-image" aria-hidden="true"></div><p class="empty">Selecione uma conversa para continuar.</p></div>';
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

    const raw = await response.text().catch(() => "");
    let detail = {};
    if (raw) {
      try {
        detail = JSON.parse(raw);
      } catch {
        detail = { detail: raw };
      }
    }

    throw new Error(detail.detail || `Falha na requisição ${response.status}`);

  }

  if (response.status === 204) {
    return null;
  }

  const raw = await response.text().catch(() => "");
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }

}

function setupMediaComposerControls() {
  if (!mediaComposerModal || !mediaComposerForm) return;

  if (mediaComposerModal.dataset.bound === "1") return;
  mediaComposerModal.dataset.bound = "1";

  mediaComposerModal
    .querySelectorAll("[data-media-composer-close]")
    .forEach((btn) => btn.addEventListener("click", closeMediaComposer));
  mediaComposerModal
    .querySelectorAll("[data-media-composer-cancel]")
    .forEach((btn) => btn.addEventListener("click", closeMediaComposer));

  mediaComposerModal.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.id === "mediaComposerModal") {
      closeMediaComposer();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (state.mediaComposer.open) {
      closeMediaComposer();
    }
  });

  mediaComposerToggleDraw?.addEventListener("click", () => {
    setMediaComposerDrawEnabled(!state.mediaComposer.drawEnabled);
    if (mediaComposerToggleDraw) {
      mediaComposerToggleDraw.textContent = state.mediaComposer.drawEnabled ? "Parar" : "Desenhar";
    }
  });

  mediaComposerClear?.addEventListener("click", () => {
    if (!mediaComposerCanvas) return;
    const ctx = mediaComposerCanvas.getContext("2d");
    ctx?.clearRect(0, 0, mediaComposerCanvas.width, mediaComposerCanvas.height);
    state.mediaComposer.hasEdits = false;
  });

  mediaComposerCanvas?.addEventListener("pointerdown", (event) => {
    if (!state.mediaComposer.drawEnabled || !mediaComposerCanvas) return;
    const rect = mediaComposerCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    startMediaComposerDraw(x, y);
    mediaComposerCanvas.setPointerCapture?.(event.pointerId);
  });
  mediaComposerCanvas?.addEventListener("pointermove", (event) => {
    if (!state.mediaComposer.drawEnabled || !state.mediaComposer.drawing || !mediaComposerCanvas) return;
    const rect = mediaComposerCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    moveMediaComposerDraw(x, y);
  });
  mediaComposerCanvas?.addEventListener("pointerup", () => endMediaComposerDraw());
  mediaComposerCanvas?.addEventListener("pointercancel", () => endMediaComposerDraw());
  mediaComposerCanvas?.addEventListener("pointerleave", () => endMediaComposerDraw());

  window.addEventListener("resize", () => {
    if (!state.mediaComposer.open) return;
    setTimeout(() => setMediaComposerCanvasBounds(), 0);
  });

  mediaComposerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!state.selectedConversation || !state.mediaComposer.file) return;

    const caption = String(mediaComposerCaption?.value || "").trim();
    try {
      const fileToSend = await buildMediaComposerOutputFile();
      closeMediaComposer();
      messageInput.value = "";
      await sendMediaFile(fileToSend || state.mediaComposer.file, caption);
    } catch (error) {
      alert(error?.message || "Erro ao enviar imagem.");
    }
  });

  messageInput?.addEventListener("paste", (event) => {
    if (!state.selectedConversation) return;
    const items = event.clipboardData?.items;
    if (!items || !items.length) return;
    for (const item of items) {
      if (item.kind === "file" && item.type && item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (!file) continue;
        event.preventDefault();
        openMediaComposer(file, { captionDefault: messageInput.value.trim() });
        return;
      }
    }
  });
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

function formatBrazilDate(dateInput, includeTime = true) {
  if (!dateInput) return "";
  const date = dateInput instanceof Date ? dateInput : parseUtcDate(dateInput);
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return includeTime ? `${day}/${month}/${year} ${hours}:${minutes}` : `${day}/${month}/${year}`;
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



function isAdminUser() {
  return Boolean(state.user?.is_admin);
}

function clearConversationAdminFilters(options = {}) {
  const { rerender = true } = options;

  state.conversationOwnerFilterIds = [];
  state.conversationDepartmentFilterIds = [];
  state.conversationOwnerQuery = "";
  state.conversationDepartmentQuery = "";

  if (filterOwnerSearch) filterOwnerSearch.value = "";
  if (filterDepartmentSearch) filterDepartmentSearch.value = "";

  if (filterOwnerOptions) {
    filterOwnerOptions.innerHTML = "";
    filterOwnerOptions.classList.add("hidden");
  }

  if (filterDepartmentOptions) {
    filterDepartmentOptions.innerHTML = "";
    filterDepartmentOptions.classList.add("hidden");
  }

  if (filterOwnerChips) filterOwnerChips.innerHTML = "";
  if (filterDepartmentChips) filterDepartmentChips.innerHTML = "";

  if (rerender) {
    renderConversations(state.conversations);
  }
}

function updateConversationAdminFiltersVisibility() {
  if (!conversationAdminFilters) return;

  const isAdmin = isAdminUser();
  conversationAdminFilters.classList.toggle("hidden", !isAdmin);

  if (!isAdmin) {
    clearConversationAdminFilters({ rerender: false });
  }
}

function getUserDisplayLabel(user) {
  if (!user) return "";
  if (user.full_name) return user.full_name;
  if (user.username) return `@${user.username}`;
  return "";
}

function getDepartmentDisplayLabel(dept) {
  if (!dept) return "";
  return dept.name || String(dept.id || "");
}

function renderConversationOwnerChips() {
  if (!filterOwnerChips) return;

  filterOwnerChips.innerHTML = "";
  const selectedIds = Array.isArray(state.conversationOwnerFilterIds) ? state.conversationOwnerFilterIds : [];

  selectedIds.forEach((rawId) => {
    const userId = Number(rawId);
    const user = (state.users || []).find((u) => u.id === userId);
    const label = user ? getUserDisplayLabel(user) : `ID ${rawId}`;

    const chip = document.createElement("span");
    chip.className = "filter-chip";
    chip.textContent = label;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.setAttribute("aria-label", `Remover ${label}`);
    remove.textContent = "×";
    remove.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      state.conversationOwnerFilterIds = (state.conversationOwnerFilterIds || []).filter((id) => Number(id) !== userId);
      renderConversationOwnerChips();
      renderConversationOwnerOptions();
      renderConversations(state.conversations);
    });

    chip.appendChild(remove);
    filterOwnerChips.appendChild(chip);
  });
}

function renderConversationDepartmentChips() {
  if (!filterDepartmentChips) return;

  filterDepartmentChips.innerHTML = "";
  const selectedIds = Array.isArray(state.conversationDepartmentFilterIds) ? state.conversationDepartmentFilterIds : [];

  selectedIds.forEach((rawId) => {
    const deptId = Number(rawId);
    const dept = (state.departments || []).find((d) => Number(d.id) === deptId);
    const label = dept ? getDepartmentDisplayLabel(dept) : `Departamento ${rawId}`;

    const chip = document.createElement("span");
    chip.className = "filter-chip";
    chip.textContent = label;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.setAttribute("aria-label", `Remover ${label}`);
    remove.textContent = "×";
    remove.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      state.conversationDepartmentFilterIds = (state.conversationDepartmentFilterIds || []).filter(
        (id) => Number(id) !== deptId
      );
      renderConversationDepartmentChips();
      renderConversationDepartmentOptions();
      renderConversations(state.conversations);
    });

    chip.appendChild(remove);
    filterDepartmentChips.appendChild(chip);
  });
}

function renderConversationOwnerOptions() {
  if (!filterOwnerOptions || !filterOwnerSearch) return;

  const query = (state.conversationOwnerQuery || "").trim().toLowerCase();
  filterOwnerOptions.innerHTML = "";

  if (!isAdminUser() || query.length < 1) {
    filterOwnerOptions.classList.add("hidden");
    return;
  }

  const selected = new Set((state.conversationOwnerFilterIds || []).map((id) => Number(id)));

  const candidates = (state.users || [])
    .filter((user) => user && !selected.has(user.id))
    .map((user) => {
      const label = getUserDisplayLabel(user);
      const secondary = user.username ? `@${user.username}` : "";
      const haystack = `${label} ${secondary}`.toLowerCase();
      return { user, label, secondary, haystack };
    })
    .filter((item) => item.haystack.includes(query))
    .slice(0, 8);

  if (!candidates.length) {
    filterOwnerOptions.classList.add("hidden");
    return;
  }

  candidates.forEach(({ user, label, secondary }) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "filter-option";
    option.innerHTML = `<span>${escapeHtml(label)}</span>${
      secondary ? `<span class="meta">${escapeHtml(secondary)}</span>` : ""
    }`;

    option.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const set = new Set((state.conversationOwnerFilterIds || []).map((id) => Number(id)));
      set.add(user.id);
      state.conversationOwnerFilterIds = Array.from(set);
      state.conversationOwnerQuery = "";
      filterOwnerSearch.value = "";
      renderConversationOwnerChips();
      renderConversationOwnerOptions();
      renderConversations(state.conversations);
    });

    filterOwnerOptions.appendChild(option);
  });

  filterOwnerOptions.classList.remove("hidden");
}

function renderConversationDepartmentOptions() {
  if (!filterDepartmentOptions || !filterDepartmentSearch) return;

  const query = (state.conversationDepartmentQuery || "").trim().toLowerCase();
  filterDepartmentOptions.innerHTML = "";

  if (!isAdminUser() || query.length < 1) {
    filterDepartmentOptions.classList.add("hidden");
    return;
  }

  const selected = new Set((state.conversationDepartmentFilterIds || []).map((id) => Number(id)));

  const candidates = (state.departments || [])
    .filter((dept) => dept && !selected.has(Number(dept.id)))
    .map((dept) => {
      const label = getDepartmentDisplayLabel(dept);
      const haystack = `${label}`.toLowerCase();
      return { dept, label, haystack };
    })
    .filter((item) => item.haystack.includes(query))
    .slice(0, 8);

  if (!candidates.length) {
    filterDepartmentOptions.classList.add("hidden");
    return;
  }

  candidates.forEach(({ dept, label }) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "filter-option";
    option.textContent = label;

    option.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const set = new Set((state.conversationDepartmentFilterIds || []).map((id) => Number(id)));
      set.add(Number(dept.id));
      state.conversationDepartmentFilterIds = Array.from(set);
      state.conversationDepartmentQuery = "";
      filterDepartmentSearch.value = "";
      renderConversationDepartmentChips();
      renderConversationDepartmentOptions();
      renderConversations(state.conversations);
    });

    filterDepartmentOptions.appendChild(option);
  });

  filterDepartmentOptions.classList.remove("hidden");
}

function userMatchesDepartmentFilter(user, selectedDeptIds) {
  if (!user) return false;
  const selected = Array.isArray(selectedDeptIds) ? selectedDeptIds : [];
  if (!selected.length) return true;

  const userDepts = Array.isArray(user.departments) ? user.departments : [];
  if (!userDepts.length) return false;

  for (const rawId of selected) {
    const deptId = Number(rawId);
    if (userDepts.includes(deptId) || userDepts.includes(String(deptId))) {
      return true;
    }
    const dept = (state.departments || []).find((d) => Number(d.id) === deptId);
    const deptName = dept?.name;
    if (deptName && userDepts.includes(deptName)) {
      return true;
    }
  }

  return false;
}

function renderConversations(conversations = state.conversations) {

  conversationListEl.innerHTML = "";

  const list = conversations || [];

  updateConversationTypeTabs(list);

  const search = state.searchQuery.trim().toLowerCase();

  const tagFilterId = state.tagFilterId;

  const ownerFilterIds = isAdminUser() ? (state.conversationOwnerFilterIds || []) : [];
  const departmentFilterIds = isAdminUser() ? (state.conversationDepartmentFilterIds || []) : [];
  const ownerFilterSet = new Set(ownerFilterIds.map((id) => Number(id)));

  const activeType = state.activeConversationType === "groups" ? "groups" : "chats";

  const filtered = list.filter((conversation) => {

    if (!conversation) {

      return false;

    }

    const draftText = loadConversationDraft(conversation.id);

    const haystack = [

      conversation.debtor_name,

      conversation.debtor_phone,

      conversation.last_message_preview,

      draftText,

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

    const matchesOwner =
      !ownerFilterSet.size ||
      (conversation.owner_user_id && ownerFilterSet.has(Number(conversation.owner_user_id)));

    const matchesDepartment =
      !departmentFilterIds.length ||
      (conversation.owner_user_id &&
        userMatchesDepartmentFilter(
          (state.users || []).find((u) => u.id === Number(conversation.owner_user_id)),
          departmentFilterIds
        ));

    return matchesSearch && matchesTag && matchesType && matchesOwner && matchesDepartment;

  });

  const ordered = sortConversationsForSidebar(filtered);

  if (!ordered.length) {

    const empty = document.createElement("p");

    empty.className = "empty";

    empty.textContent = list.length

      ? "Nenhuma conversa com os filtros atuais."

      : "Nenhuma conversa ainda.";

    conversationListEl.appendChild(empty);

    return;

  }



  ordered.forEach((conversation) => {

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

    const draftText = loadConversationDraft(conversation.id);
    const draftNormalized = String(draftText || "").replace(/\s+/g, " ").trim();
    if (draftNormalized) {
      const snippet =
        draftNormalized.length > 70 ? `${draftNormalized.slice(0, 70).trim()}…` : draftNormalized;
      preview.classList.add("is-draft");
      preview.innerHTML = `<span class="draft-label">Rascunho:</span> ${escapeHtml(snippet)}`;
    } else {
      preview.classList.remove("is-draft");
      preview.textContent =
        conversation.last_message_preview || (conversation.last_message_at ? "Mensagem" : "Sem mensagens");
    }

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



    const actionsToggle = document.createElement("button");
    actionsToggle.type = "button";
    actionsToggle.className = "conversation-actions-toggle";
    actionsToggle.title = "Opções";
    actionsToggle.setAttribute("aria-label", "Opções");
    actionsToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg>`;
    actionsToggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const rect = actionsToggle.getBoundingClientRect();
      const willOpen =
        conversationActionMenuConversationId !== conversation.id ||
        conversationActionMenu.classList.contains("hidden");
      hideConversationActionMenu();
      if (willOpen) {
        showConversationActionMenu({
          x: rect.left,
          y: rect.bottom + 8,
          conversation,
        });
      }
    });

    head.append(actionsToggle);

    item.append(head);

    if (conversation.is_pinned) {
      const pinIndicator = document.createElement("div");
      pinIndicator.className = "conversation-pinned-indicator";
      pinIndicator.title = "Conversa fixada";
      pinIndicator.setAttribute("aria-label", "Conversa fixada");
      pinIndicator.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`;
      item.appendChild(pinIndicator);
    }

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
      const ownerDept = getUserDepartmentLabel(conversation.owner_user_id);

      ownerTag.textContent = ownerName
        ? `@${ownerName}${ownerDept ? ` / ${ownerDept}` : ""}`
        : `ID ${conversation.owner_user_id}`;

      ownerTag.title = "Responsável";

      item.append(ownerTag);

    }

    item.addEventListener("click", () => selectConversation(conversation.id));

    conversationListEl.appendChild(item);

  });

  if (state.conversationsHasMore) {
    const loadMore = document.createElement("button");
    loadMore.type = "button";
    loadMore.className = "ghost small full";
    loadMore.textContent = state.conversationsLoadingMore ? "Carregando..." : "Carregar mais";
    loadMore.disabled = state.conversationsLoadingMore;
    loadMore.addEventListener("click", () => loadConversations({ append: true, silent: true }));
    conversationListEl.appendChild(loadMore);
  }

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

    const append = Boolean(options.append);
    if (append && (state.conversationsLoadingMore || !state.conversationsHasMore)) {
      return;
    }
    if (append) {
      state.conversationsLoadingMore = true;
    } else {
      state.conversationsOffset = 0;
      state.conversationsHasMore = true;
      state.conversationsCursorUpdatedAt = null;
      state.conversationsCursorId = null;
    }

    let url = "/api/conversations";
    const params = new URLSearchParams();
    const limit = state.conversationsPageSize || 150;
    params.set("limit", String(limit));

    if (state.user?.is_admin) {

      const scope = state.viewAllConversations ? "all" : "mine";

      params.set("scope", scope);

    }

    const beforeUpdatedAt = append ? state.conversationsCursorUpdatedAt : null;
    const beforeConversationId = append ? state.conversationsCursorId : null;
    if (beforeUpdatedAt && beforeConversationId) {
      params.set("before_updated_at", beforeUpdatedAt);
      params.set("before_conversation_id", String(beforeConversationId));
    }
    const qs = params.toString();
    if (qs) {
      url += `?${qs}`;
    }

    const fetched = await fetchJson(url);
    const fetchedList = Array.isArray(fetched) ? fetched : [];
    const incoming = sortConversationsForSidebar(fetchedList);
    if (append) {
      const index = new Map((state.conversations || []).map((c) => [c.id, c]));
      incoming.forEach((c) => index.set(c.id, c));
      state.conversations = sortConversationsForSidebar(Array.from(index.values()));
    } else {
      state.conversations = incoming;
    }

    const cursorCandidate = (() => {
      for (let i = fetchedList.length - 1; i >= 0; i -= 1) {
        const c = fetchedList[i];
        if (c && !c.is_pinned) return c;
      }
      return fetchedList[fetchedList.length - 1] || null;
    })();
    if (cursorCandidate?.updated_at && cursorCandidate?.id) {
      state.conversationsCursorUpdatedAt = String(cursorCandidate.updated_at);
      state.conversationsCursorId = Number(cursorCandidate.id);
    }
    state.conversationsHasMore = fetchedList.length === limit;

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
  finally {
    state.conversationsLoadingMore = false;
    if (options.append) {
      renderConversations();
    }
  }

}



async function selectConversation(conversationId) {
  const conversation = state.conversations.find((c) => c.id === conversationId);
  if (!conversation) {
    return;
  }
  // Salva rascunho antes de trocar de conversa.
  persistDraftForActiveConversation();

  stopPolling();
  state.selectedConversation = conversation;
  state.messagesSignature = null;
  state.latestMessages = [];
  setChatSearchOpen(false);
  clearReplyContext();
  closeEmojiPicker();
  renderChatHeader();
  setMessageFormAvailability(true);
  closeTagMenus();

  ensureConversationAvatar(conversation.id);

  // Restaura rascunho da conversa selecionada.
  restoreDraftForConversation(conversation.id);

  const cachedMessages = state.messagesByConversation[conversation.id];
  const cachedNotes = state.notesByConversation[conversation.id];
  if (Array.isArray(cachedMessages) && cachedMessages.length) {
    state.fullMessages = cachedMessages.slice();
    state.conversationNotes = Array.isArray(cachedNotes) ? cachedNotes.slice() : [];
    renderMessages(state.fullMessages, {
      notes: state.conversationNotes,
      fullMessages: state.fullMessages,
      hasMore: Boolean(state.messagesHasMoreByConversation[conversation.id]),
    });
  } else {
    state.fullMessages = [];
    state.conversationNotes = [];
  }

  await loadMessages({ refresh: true });

  startPolling();

  renderConversations();

}

async function fetchMessagesPage(conversationId, { limit, beforeId, signal } = {}) {
  const params = new URLSearchParams();
  if (limit) params.set("limit", String(limit));
  if (beforeId) params.set("before_id", String(beforeId));
  const url = `/api/conversations/${conversationId}/messages?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
    signal,
  });

  if (response.status === 401) {
    handleUnauthorized();
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  if (!response.ok) {
    const raw = await response.text().catch(() => "");
    let detail = {};
    if (raw) {
      try {
        detail = JSON.parse(raw);
      } catch {
        detail = { detail: raw };
      }
    }
    throw new Error(detail.detail || `Falha na requisição ${response.status}`);
  }

  const hasMore = response.headers.get("X-Has-More") === "1";
  const data = await response.json();
  return { messages: Array.isArray(data) ? data : [], hasMore };
}

function updateConversationMessageCache(conversationId, messages, notes) {
  state.messagesByConversation[conversationId] = Array.isArray(messages) ? messages.slice() : [];
  if (Array.isArray(notes)) {
    state.notesByConversation[conversationId] = notes.slice();
  }
}

async function loadOlderMessages() {
  const conversationId = state.selectedConversation?.id;
  if (!conversationId) return;
  if (!state.messagesHasMoreByConversation[conversationId]) return;
  const beforeId = state.messagesOldestIdByConversation[conversationId];
  if (!beforeId) return;

  try {
    const { messages: older, hasMore } = await fetchMessagesPage(conversationId, {
      limit: state.messagesPageSize,
      beforeId,
    });
    if (!older.length) {
      state.messagesHasMoreByConversation[conversationId] = false;
      renderMessages(state.fullMessages || [], {
        notes: state.conversationNotes || [],
        fullMessages: state.fullMessages || [],
        hasMore: false,
      });
      return;
    }

    const mergedMap = new Map((state.fullMessages || []).map((m) => [m.id, m]));
    older.forEach((m) => mergedMap.set(m.id, m));
    const merged = Array.from(mergedMap.values()).sort((a, b) => (a.id || 0) - (b.id || 0));
    state.fullMessages = merged;

    const newOldestId = merged[0]?.id || beforeId;
    state.messagesOldestIdByConversation[conversationId] = newOldestId;
    state.messagesHasMoreByConversation[conversationId] = Boolean(hasMore);

    updateConversationMessageCache(conversationId, merged, state.conversationNotes || []);

    renderMessages(merged, {
      notes: state.conversationNotes || [],
      fullMessages: merged,
      hasMore: Boolean(hasMore),
    });
  } catch (error) {
    console.error(error);
  }
}

async function loadMessages(options = {}) {
  if (!state.selectedConversation) return;
  const conversationId = state.selectedConversation.id;
  const refresh = options.refresh !== false;

  if (refresh) {
    if (state.messageLoadAbortController) {
      try {
        state.messageLoadAbortController.abort();
      } catch {
        // ignore
      }
    }
    state.messageLoadAbortController = new AbortController();
  }

  const signal = state.messageLoadAbortController?.signal;
  try {
    const [{ messages: latest, hasMore }, notes] = await Promise.all([
      fetchMessagesPage(conversationId, {
        limit: state.messagesPageSize,
        signal,
      }),
      fetchJson(`/api/conversations/${conversationId}/notes`),
    ]);

    // Trocar de conversa enquanto carregava: ignora.
    if (!state.selectedConversation || state.selectedConversation.id !== conversationId) {
      return;
    }

    const previousHasMore = Boolean(state.messagesHasMoreByConversation[conversationId]);
    const previousOldestId = state.messagesOldestIdByConversation[conversationId] || null;
    const oldestIdInPage = latest[0]?.id || null;

    // Mantém mensagens já carregadas (ex.: páginas antigas) e mescla a página mais recente.
    const mergedMap = new Map((state.fullMessages || []).map((m) => [m.id, m]));
    latest.forEach((m) => mergedMap.set(m.id, m));
    let merged = Array.from(mergedMap.values()).sort((a, b) => (a.id || 0) - (b.id || 0));

    // Limite de memória/DOM (evita crescer infinito).
    if (merged.length > 2000) {
      merged = merged.slice(merged.length - 2000);
    }

    state.fullMessages = merged;
    state.conversationNotes = Array.isArray(notes) ? notes : [];

    // Atualiza paginação.
    const newOldestId =
      previousOldestId && oldestIdInPage ? Math.min(previousOldestId, oldestIdInPage) : (previousOldestId || oldestIdInPage);
    state.messagesOldestIdByConversation[conversationId] = newOldestId;

    let effectiveHasMore = previousHasMore;
    if (!previousOldestId || (previousOldestId && oldestIdInPage && previousOldestId === oldestIdInPage)) {
      effectiveHasMore = Boolean(hasMore);
    }
    // Se já tínhamos mais páginas e ainda não carregamos até o começo, mantém true.
    if (previousHasMore) {
      effectiveHasMore = true;
    }
    state.messagesHasMoreByConversation[conversationId] = effectiveHasMore;

    updateConversationMessageCache(conversationId, merged, state.conversationNotes);

    // Assinatura leve (evita JSON.stringify gigante).
    const last = merged[merged.length - 1];
    const sig = `${merged.length}:${merged[0]?.id || 0}:${last?.id || 0}:${last?.timestamp || ""}`;
    const notesSig = Array.isArray(notes)
      ? `${notes.length}:${notes[notes.length - 1]?.id || 0}:${notes[notes.length - 1]?.created_at || ""}`
      : "0";
    if (sig === state.messagesSignature && notesSig === state.notesSignature) {
      return;
    }
    state.messagesSignature = sig;
    state.notesSignature = notesSig;

    renderMessages(merged, {
      notes: state.conversationNotes,
      fullMessages: merged,
      hasMore: effectiveHasMore,
    });

    clearUnreadForActiveConversation();
    if (state.messageSearchQuery) {
      applyChatMessageSearch({ focus: false });
    }
  } catch (error) {
    if (error?.name === "AbortError") return;
    console.error(error);
  }
}


async function handleMediaFileSelected(event) {

  if (!event.target?.files?.length || !state.selectedConversation) return;

  const file = event.target.files[0];

  mediaFileInput.value = "";

  try {
    if (mediaComposerModal && mediaComposerImage && String(file.type || "").startsWith("image/")) {
      openMediaComposer(file, { captionDefault: messageInput.value.trim() });
    } else {
      await sendMediaFile(file);
    }

  } catch (error) {

    alert(error.message || "Erro ao enviar arquivo.");

  }

}



async function sendMediaFile(file, captionOverride = null) {

  if (!state.selectedConversation || !file) return;

  const caption =
    captionOverride === null ? messageInput.value.trim() : String(captionOverride || "").trim();

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

    if (captionOverride === null) {
      messageInput.value = "";
    }

    await loadConversations();

    await loadMessages();

    clearReplyContext();

    // Se a legenda foi enviada usando o input principal, limpa o rascunho.
    if (captionOverride === null) {
      clearConversationDraft(state.selectedConversation?.id);
    }

  } finally {

    state.mediaSending = false;

    setAttachmentControlsAvailability(true);

  }

}



function renderMessages(messages, options = {}) {
  messageListEl.classList.remove("has-empty-state");
  const previousScrollTop = messageListEl.scrollTop;
  const previousScrollHeight = messageListEl.scrollHeight;
  const previousClientHeight = messageListEl.clientHeight;
  const wasNearBottom =
    previousScrollTop + previousClientHeight >= previousScrollHeight - 48;
  const preserveScroll = Boolean(options.preserveScroll);
  const notes = options.notes || state.conversationNotes || [];
  const fullMessages = Array.isArray(options.fullMessages) ? options.fullMessages : messages;
  const hasMore = Boolean(options.hasMore);
  state.latestMessages = fullMessages.slice();
  const searchQuery = String(state.messageSearchQuery || "").trim().toLowerCase();
  const searchMatches = state.messageSearchMatches || [];
  const activeMatchId =
    searchMatches.length && state.messageSearchMatchIndex >= 0
      ? searchMatches[Math.min(state.messageSearchMatchIndex, searchMatches.length - 1)]
      : null;
  renderReplyPreview();
  messageListEl.innerHTML = "";
  if (!messages.length && !notes.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Ainda sem mensagens.";
    messageListEl.appendChild(empty);
    return;
  }

  if (hasMore) {
    const wrap = document.createElement("div");
    wrap.className = "chat-load-more";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chat-load-more-button";
    btn.textContent = "Carregar mensagens anteriores";
    btn.addEventListener("click", () => loadOlderMessages());
    wrap.appendChild(btn);
    messageListEl.appendChild(wrap);
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
    const row = document.createElement("div");
    row.className = `message-row ${message.direction}`;

    const bubble = document.createElement("div");
    bubble.className = `message ${message.direction}`;
    bubble.dataset.messageId = message.id;
    if (message.is_deleted_for_all) {
      bubble.classList.add("deleted-for-all");
    }
    if (searchQuery && String(message.content || "").toLowerCase().includes(searchQuery)) {
      bubble.classList.add("search-hit");
      if (activeMatchId && activeMatchId === message.id) {
        bubble.classList.add("search-hit-active");
      }
    }

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
      appendMessageTextWithLinks(textEl, message.content || "");
      bubble.appendChild(textEl);
    }

    if (state.messageSelectionMode) {
      const selectBox = document.createElement("button");
      selectBox.type = "button";
      selectBox.className = "message-select-box";
      const isSelected = (state.selectedMessageIds || []).includes(message.id);
      selectBox.classList.toggle("selected", isSelected);
      selectBox.setAttribute("aria-label", isSelected ? "Desmarcar" : "Selecionar");
      selectBox.innerHTML = `<svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 6 9 17l-5-5"/></svg>`;
      selectBox.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleMessageSelected(message.id);
      });
      row.appendChild(selectBox);

      bubble.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (target.closest("button") || target.closest("a") || target.closest("input")) return;
        toggleMessageSelected(message.id);
      });
    }

    if (!state.messageSelectionMode) {
      const reactionToggle = document.createElement("button");
      reactionToggle.type = "button";
      reactionToggle.className = "message-reaction-toggle";
      reactionToggle.title = "Reagir";
      reactionToggle.setAttribute("aria-label", "Reagir");
      reactionToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`;
      reactionToggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (message.is_deleted_for_all) return;
        const rect = reactionToggle.getBoundingClientRect();
        const willOpen =
          reactionPickerMessageId !== message.id ||
          reactionPicker.classList.contains("hidden");
        hideMessageActionMenu();
        hideReactionPicker();
        if (willOpen) {
          showReactionPicker({
            x: rect.left,
            y: rect.bottom + 8,
            message,
          });
        }
      });
      bubble.appendChild(reactionToggle);

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "message-actions-toggle";
      toggle.title = "Opções";
      toggle.setAttribute("aria-label", "Opções");
      toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg>`;
      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (message.is_deleted_for_all) return;
        const rect = toggle.getBoundingClientRect();
        const willOpen =
          messageActionMenuMessageId !== message.id ||
          messageActionMenu.classList.contains("hidden");
        hideReactionPicker();
        hideMessageActionMenu();
        if (willOpen) {
          showMessageActionMenu({
            x: rect.left,
            y: rect.bottom + 8,
            message,
          });
        }
      });
      bubble.appendChild(toggle);
    }

    if (message.is_deleted_for_all) {
      const deletedNote = document.createElement("div");
      deletedNote.className = "message-deleted-note";
      deletedNote.textContent = "Apagada para todos";
      bubble.appendChild(deletedNote);
    }

    const reactionCounts = message.reaction_counts || {};
    const reactionEntries = Object.entries(reactionCounts).filter(
      ([emoji, count]) => emoji && Number(count) > 0
    );
    if (reactionEntries.length) {
      reactionEntries.sort((a, b) => Number(b[1]) - Number(a[1]));
      const reactionsWrap = document.createElement("div");
      reactionsWrap.className = "message-reactions";
      reactionEntries.forEach(([emoji, count]) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "message-reaction";
        btn.title = "Reagir";
        btn.setAttribute("aria-label", "Reagir");
        if (message.my_reaction === emoji) {
          btn.classList.add("mine");
        }
        btn.textContent = count > 1 ? `${emoji} ${count}` : `${emoji}`;
        btn.addEventListener("click", async (event) => {
          event.preventDefault();
          event.stopPropagation();
          const nextEmoji = message.my_reaction === emoji ? "" : emoji;
          try {
            const updated = await fetchJson(`/api/messages/${message.id}/react`, {
              method: "POST",
              body: JSON.stringify({ emoji: nextEmoji }),
            });
            if (updated && state.latestMessages?.length) {
              const idx = state.latestMessages.findIndex((m) => m.id === message.id);
              if (idx >= 0) {
                state.latestMessages[idx] = { ...state.latestMessages[idx], ...updated };
              }
              renderMessages(state.latestMessages, {
                notes: state.conversationNotes || [],
                preserveScroll: true,
              });
            } else {
              await loadMessages();
            }
          } catch (error) {
            alert(error.message);
          }
        });
        reactionsWrap.appendChild(btn);
      });
      bubble.appendChild(reactionsWrap);
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
    row.appendChild(bubble);
    messageListEl.appendChild(row);
  });
  requestAnimationFrame(() => {
    const newScrollHeight = messageListEl.scrollHeight;
    if (preserveScroll) {
      const maxScrollTop = Math.max(0, newScrollHeight - messageListEl.clientHeight);
      messageListEl.scrollTop = Math.max(0, Math.min(previousScrollTop, maxScrollTop));
      return;
    }
    if (wasNearBottom) {
      messageListEl.scrollTop = newScrollHeight;
      return;
    }

    const delta = newScrollHeight - previousScrollHeight;
    messageListEl.scrollTop = Math.max(0, previousScrollTop + delta);

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

  if (!message.media_url) {
    const fallback = document.createElement("p");
    fallback.className = "audio-caption";
    fallback.textContent = "Áudio indisponível.";
    wrapper.appendChild(fallback);
    container.appendChild(wrapper);
    return;
  }

  const formatClock = (totalSeconds) => {
    const value = Number(totalSeconds);
    if (!Number.isFinite(value) || value < 0) return "0:00";
    const seconds = Math.floor(value);
    const minutes = Math.floor(seconds / 60);
    const remaining = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${remaining}`;
  };

  const PLAY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z"/></svg>`;
  const PAUSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M6 19h4V5H6zm8-14v14h4V5z"/></svg>`;

  const player = document.createElement("div");
  player.className = "audio-player";
  player.dataset.messageId = String(message.id || "");

  const playButton = document.createElement("button");
  playButton.type = "button";
  playButton.className = "audio-play";
  playButton.setAttribute("aria-label", "Reproduzir áudio");
  playButton.innerHTML = PLAY_ICON;

  const track = document.createElement("div");
  track.className = "audio-track";

  const range = document.createElement("input");
  range.className = "audio-range";
  range.type = "range";
  range.min = "0";
  range.max = "1000";
  range.value = "0";
  range.step = "1";
  range.setAttribute("aria-label", "Progresso do áudio");

  const meta = document.createElement("div");
  meta.className = "audio-meta";

  const current = document.createElement("span");
  current.className = "audio-time";
  current.textContent = "0:00";

  const total = document.createElement("span");
  total.className = "audio-duration";
  total.textContent = formatClock(message.media_duration_seconds || 0);

  meta.append(current, total);
  track.append(range, meta);

  const audioEl = document.createElement("audio");
  audioEl.preload = "none";
  audioEl.src = message.media_url;
  audioEl.dataset.messageId = String(message.id || "");

  player.append(playButton, track, audioEl);
  wrapper.appendChild(player);
  container.appendChild(wrapper);

  const stopOtherAudios = () => {
    document.querySelectorAll(".audio-player audio").forEach((node) => {
      if (node === audioEl) return;
      try {
        node.pause?.();
      } catch {
        // ignore
      }
    });
    document.querySelectorAll(".audio-player .audio-play").forEach((node) => {
      if (node === playButton) return;
      if (node instanceof HTMLElement) {
        node.innerHTML = PLAY_ICON;
        node.setAttribute("aria-label", "Reproduzir áudio");
      }
    });
  };

  const syncUi = () => {
    const duration = Number.isFinite(audioEl.duration) && audioEl.duration > 0 ? audioEl.duration : (Number(message.media_duration_seconds) || 0);
    const currentTime = Number(audioEl.currentTime) || 0;
    current.textContent = formatClock(currentTime);
    if (!Number(message.media_duration_seconds) && duration) {
      total.textContent = formatClock(duration);
    }
    if (duration > 0) {
      const percent = Math.max(0, Math.min(1, currentTime / duration));
      range.value = String(Math.round(percent * 1000));
    } else {
      range.value = "0";
    }
  };

  audioEl.addEventListener("timeupdate", syncUi);
  audioEl.addEventListener("loadedmetadata", syncUi);
  audioEl.addEventListener("ended", () => {
    playButton.innerHTML = PLAY_ICON;
    playButton.setAttribute("aria-label", "Reproduzir áudio");
    range.value = "0";
    current.textContent = "0:00";
  });
  audioEl.addEventListener("pause", () => {
    playButton.innerHTML = PLAY_ICON;
    playButton.setAttribute("aria-label", "Reproduzir áudio");
  });
  audioEl.addEventListener("play", () => {
    playButton.innerHTML = PAUSE_ICON;
    playButton.setAttribute("aria-label", "Pausar áudio");
  });

  playButton.addEventListener("click", async () => {
    try {
      if (!audioEl.paused) {
        audioEl.pause();
        return;
      }
      stopOtherAudios();
      await audioEl.play();
    } catch (error) {
      console.error("Falha ao reproduzir áudio", error);
    }
  });

  range.addEventListener("input", () => {
    const duration = Number.isFinite(audioEl.duration) && audioEl.duration > 0 ? audioEl.duration : (Number(message.media_duration_seconds) || 0);
    if (duration <= 0) return;
    const percent = Number(range.value) / 1000;
    audioEl.currentTime = Math.max(0, Math.min(duration, percent * duration));
    syncUi();
  });

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
    editContactNameButton?.classList.add("hidden");

    return;

  }

  updateChatAvatar(conversation);

  const displayName = (conversation.debtor_name || conversation.debtor_phone || "Sem identificação").trim();

  chatTitleEl.textContent = displayName;
  editContactNameButton?.classList.remove("hidden");

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
    const ownerDept = getUserDepartmentLabel(conversation.owner_user_id);

    ownerText = ownerName

      ? `Responsável: @${ownerName}${ownerDept ? ` / ${ownerDept}` : ""}`

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

    const actions = document.createElement("div");

    actions.className = "reminder-actions-pill";

    const completeBtn = document.createElement("button");

    completeBtn.type = "button";

    completeBtn.className = "reminder-action-pill complete";

    completeBtn.innerHTML = `<span aria-hidden="true" class="icon">✓</span>`;

    completeBtn.addEventListener("click", async (event) => {

      event.preventDefault();

      event.stopPropagation();

      await markReminderDone(reminder.id);

    });

    const cancelBtn = document.createElement("button");

    cancelBtn.type = "button";

    cancelBtn.className = "reminder-action-pill cancel";

    cancelBtn.innerHTML = `<span aria-hidden="true" class="icon">✕</span>`;

    cancelBtn.addEventListener("click", async (event) => {

      event.stopPropagation();

      const confirmCancel = confirm("Cancelar esta atividade?");

      if (!confirmCancel) return;

      try {

        await fetchJson(`/api/reminders/${reminder.id}`, { method: "DELETE" });

        await loadReminders();

      } catch (error) {

        alert(error.message);

      }

    });

    actions.append(completeBtn, cancelBtn);

    pill.append(title, timing, actions);

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

  const intervalMs = (state.realtimeRunning || state.realtimeConnected) ? 60000 : 4000;
  state.pollHandle = setInterval(loadMessages, intervalMs);

}



function startReminderPolling() {

  stopReminderPolling();

  state.reminderPollHandle = setInterval(loadReminders, 60000);

}



function startConversationPolling() {

  stopConversationPolling();

  const intervalMs = (state.realtimeRunning || state.realtimeConnected) ? 60000 : 5000;
  state.conversationPollHandle = setInterval(() => {

    loadConversations({ silent: true });

  }, intervalMs);

}

function stopRealtime() {
  if (state.realtimeRetryHandle) {
    clearTimeout(state.realtimeRetryHandle);
    state.realtimeRetryHandle = null;
  }
  if (state.realtimeAbortController) {
    try {
      state.realtimeAbortController.abort();
    } catch {
      // ignore
    }
    state.realtimeAbortController = null;
  }
  state.realtimeRunning = false;
  state.realtimeConnected = false;
}

function scheduleRealtimeRefreshConversations() {
  if (state.realtimeRefreshConversationsHandle) return;
  state.realtimeRefreshConversationsHandle = setTimeout(() => {
    state.realtimeRefreshConversationsHandle = null;
    loadConversations({ silent: true }).catch((error) =>
      console.warn("Falha ao atualizar conversas via SSE", error)
    );
  }, 300);
}

function scheduleRealtimeRefreshMessages(conversationId) {
  if (!state.selectedConversation || state.selectedConversation.id !== conversationId) return;
  if (state.realtimeRefreshMessagesHandle) return;
  state.realtimeRefreshMessagesHandle = setTimeout(() => {
    state.realtimeRefreshMessagesHandle = null;
    loadMessages().catch((error) =>
      console.warn("Falha ao atualizar mensagens via SSE", error)
    );
  }, 250);
}

function handleRealtimeEvent(eventName, payload) {
  if (!eventName || eventName === "ping" || eventName === "ready") return;
  if (eventName === "message") {
    const conversationId = payload?.conversation_id;
    if (conversationId) {
      scheduleRealtimeRefreshConversations();
      scheduleRealtimeRefreshMessages(conversationId);
    } else {
      scheduleRealtimeRefreshConversations();
    }
  }
}

function parseAndDispatchSseChunk(buffer) {
  const blocks = buffer.split(/\r?\n\r?\n/);
  const remainder = blocks.pop() ?? "";
  for (const block of blocks) {
    const lines = block.split(/\r?\n/);
    let eventName = "";
    const dataParts = [];
    for (const line of lines) {
      if (line.startsWith("event:")) {
        eventName = line.slice(6).trim();
      } else if (line.startsWith("data:")) {
        dataParts.push(line.slice(5).trimStart());
      }
    }
    const dataRaw = dataParts.join("\n");
    let payload = {};
    if (dataRaw) {
      try {
        payload = JSON.parse(dataRaw);
      } catch {
        payload = {};
      }
    }
    handleRealtimeEvent(eventName, payload);
  }
  return remainder;
}

async function startRealtime() {
  if (!state.token) return;
  if (state.realtimeRunning) return;

  if (!window.fetch || !window.TextDecoder) {
    console.warn("SSE indisponível neste navegador.");
    return;
  }

  state.realtimeRunning = true;
  state.realtimeConnected = false;

  let backoffMs = 1000;
  while (state.realtimeRunning) {
    const abortController = new AbortController();
    state.realtimeAbortController = abortController;
    try {
      const response = await fetch("/api/events", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
        signal: abortController.signal,
      });

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`Falha ao conectar no SSE (${response.status})`);
      }

      if (!response.body || !response.body.getReader) {
        throw new Error("Streaming não suportado no fetch deste navegador.");
      }

      state.realtimeConnected = true;
      backoffMs = 1000;

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (state.realtimeRunning) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        buffer = parseAndDispatchSseChunk(buffer);
      }
    } catch (error) {
      if (!state.realtimeRunning) break;
      console.warn("Conexão SSE caiu; tentando reconectar...", error);
    } finally {
      state.realtimeConnected = false;
      state.realtimeAbortController = null;
    }

    if (!state.realtimeRunning) break;
    await new Promise((resolve) => {
      state.realtimeRetryHandle = setTimeout(resolve, backoffMs);
    });
    backoffMs = Math.min(backoffMs * 2, 30000);
  }
}



if (messageForm) {
  messageForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  if (!state.selectedConversation) return;

  const raw = messageInput.value.trim();

  if (!raw) return;

  const content = applySignatureIfEnabled(raw);
  const originalContent = raw;
  const conversationId = state.selectedConversation.id;

  state.sendingMessage = true;
  messageInput.value = "";
  scheduleMessageInputResize();
  closeQuickReplyPanel();

  try {

    const payload = {

      conversation_id: conversationId,

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

    clearConversationDraft(conversationId);

  } catch (error) {

    messageInput.value = originalContent;
    scheduleMessageInputResize();
    saveConversationDraft(conversationId, originalContent);

    alert(error.message);

  } finally {
    state.sendingMessage = false;
  }

  });
}



if (messageInput && messageForm) {

  messageInput.addEventListener("input", () => {
    scheduleMessageInputResize();
    updateQuickReplyPanel();
    scheduleDraftSave();
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

if (signMessagesToggle) {
  signMessagesToggle.addEventListener("change", () => {
    state.signMessagesEnabled = Boolean(signMessagesToggle.checked);
    saveSignMessagesPreference(state.signMessagesEnabled);
  });
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    persistDraftForActiveConversation();
  });
}



newConversationForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const rawPhone = document.getElementById("debtorPhone").value;
  const normalizedPhone = normalizeBrazilPhone(rawPhone);

  if (!normalizedPhone) {
    alert("Informe um telefone com DDD (ex.: 47997093208 ou 5547997093208).");
    return;
  }

  if (
    !normalizedPhone.startsWith("55") ||
    (normalizedPhone.length !== 12 && normalizedPhone.length !== 13)
  ) {
    alert("Telefone inválido. Use um número com DDD (10 ou 11 dígitos) e, se quiser, com 55.");
    return;
  }

  const target = normalizePhoneForCompare(normalizedPhone);
  const existing = (state.conversations || []).find((conversation) => {
    const current = normalizePhoneForCompare(conversation.debtor_phone);
    return current && current === target;
  });
  if (existing) {
    selectConversation(existing.id);
    newConversationForm.classList.add("collapsed");
    toggleNewConversationButton?.classList.remove("active");
    toggleNewConversationButton?.setAttribute("aria-expanded", "false");
    newConversationSection?.classList.remove("is-open");
    return;
  }

  const payload = {

    debtor_name: document.getElementById("debtorName").value,

    debtor_phone: normalizedPhone,

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

    newConversationForm.classList.add("collapsed");
    toggleNewConversationButton?.classList.remove("active");
    toggleNewConversationButton?.setAttribute("aria-expanded", "false");
    newConversationSection?.classList.remove("is-open");

  } catch (error) {

    alert(error.message);

  }

});



refreshButton?.addEventListener("click", () => loadConversations());

editContactNameButton?.addEventListener("click", async () => {
  if (!state.selectedConversation) return;
  const conversationId = state.selectedConversation.id;
  const currentName = (state.selectedConversation.debtor_name || "").trim();
  const currentPhone = (state.selectedConversation.debtor_phone || "").trim();
  const nextName = prompt(
    "Nome do contato (deixe em branco para voltar a mostrar só o número):",
    currentName && currentName !== currentPhone ? currentName : ""
  );
  if (nextName === null) return;
  try {
    const updated = await fetchJson(`/api/conversations/${conversationId}`, {
      method: "PATCH",
      body: JSON.stringify({ debtor_name: nextName }),
    });
    state.selectedConversation = updated;
    await loadConversations({ silent: true });
    renderChatHeader();
  } catch (error) {
    alert(error.message);
  }
});



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

messageSelectionCancelButton?.addEventListener("click", () => setMessageSelectionMode(false));
messageSelectionCopyButton?.addEventListener("click", async () => {
  await copySelectedMessagesToClipboard();
  setMessageSelectionMode(false);
});

messageSearchToggleButton?.addEventListener("click", () => {
  if (messageSearchToggleButton.disabled) return;
  const isOpen = chatSearchBar && !chatSearchBar.classList.contains("hidden");
  setChatSearchOpen(!isOpen);
});

chatSearchCloseButton?.addEventListener("click", () => setChatSearchOpen(false));

chatSearchInput?.addEventListener("input", (event) => {
  state.messageSearchQuery = event.target.value || "";
  applyChatMessageSearch({ focus: true });
});

chatSearchPrevButton?.addEventListener("click", () => moveChatSearchMatch(-1));
chatSearchNextButton?.addEventListener("click", () => moveChatSearchMatch(1));



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
    conversationFilterMenu &&
    !conversationFilterMenu.classList.contains("hidden") &&
    !conversationFilterMenu.contains(event.target) &&
    !conversationFilterButton?.contains(event.target)
  ) {
    conversationFilterMenu.classList.add("hidden");
    conversationFilterButton?.setAttribute("aria-expanded", "false");
  }

  if (
    reactionPicker &&
    !reactionPicker.classList.contains("hidden") &&
    !reactionPicker.contains(event.target)
  ) {
    hideReactionPicker();
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

  if (
    userMenuPanel &&
    !userMenuPanel.classList.contains("hidden") &&
    !userMenuPanel.contains(event.target) &&
    !userMenuButton?.contains(event.target)
  ) {
    userMenuPanel.classList.add("hidden");
    userMenuButton?.setAttribute("aria-expanded", "false");
  }
});


document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeTagMenus();
    hideConversationActionMenu();
    hideMessageActionMenu();
    hideReactionPicker();
    if (state.messageSelectionMode) {
      setMessageSelectionMode(false);
    }
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
    if (userMenuPanel && !userMenuPanel.classList.contains("hidden")) {
      userMenuPanel.classList.add("hidden");
      userMenuButton?.setAttribute("aria-expanded", "false");
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

    // Oculta detalhes da sessão para todos os usuários (mantém apenas status + QR + "Gerar novo QR").
    sessionInfoEl.classList.add("hidden");
    sessionInfoEl.innerHTML = "";

    updateQrPreview(session);

    const provider = session.provider || "evolution";

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

    sessionInfoEl.classList.add("hidden");
    sessionInfoEl.innerHTML = "";

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

function hideConversationFilterOptions() {
  filterOwnerOptions?.classList.add("hidden");
  filterDepartmentOptions?.classList.add("hidden");
}

function positionConversationFilterMenu() {
  if (!conversationFilterButton || !conversationFilterMenu) return;
  if (conversationFilterMenu.classList.contains("hidden")) return;

  conversationFilterMenu.style.position = "fixed";
  conversationFilterMenu.style.zIndex = "9999";

  const gap = 10;
  const buttonRect = conversationFilterButton.getBoundingClientRect();
  const menuRect = conversationFilterMenu.getBoundingClientRect();

  let left = buttonRect.left;
  if (left + menuRect.width > window.innerWidth - gap) {
    left = window.innerWidth - gap - menuRect.width;
  }
  left = Math.max(gap, left);

  let top = buttonRect.bottom + gap;
  if (top + menuRect.height > window.innerHeight - gap) {
    top = buttonRect.top - gap - menuRect.height;
  }
  top = Math.max(gap, Math.min(top, window.innerHeight - gap - menuRect.height));

  conversationFilterMenu.style.left = `${Math.round(left)}px`;
  conversationFilterMenu.style.top = `${Math.round(top)}px`;
}

async function ensureConversationFilterDataLoaded() {
  if (!isAdminUser()) return;

  const tasks = [];
  if (!Array.isArray(state.users) || !state.users.length) {
    tasks.push(loadUsers());
  }
  if (!Array.isArray(state.departments) || !state.departments.length) {
    tasks.push(loadDepartments({ silent: true }));
  }

  if (!tasks.length) return;
  await Promise.allSettled(tasks);
}

async function prepareConversationFilterMenu() {
  updateConversationAdminFiltersVisibility();

  if (!isAdminUser()) {
    hideConversationFilterOptions();
    return;
  }

  await ensureConversationFilterDataLoaded();
  renderConversationOwnerChips();
  renderConversationDepartmentChips();
  renderConversationOwnerOptions();
  renderConversationDepartmentOptions();
}

if (conversationFilterButton && conversationFilterMenu) {
  conversationFilterButton.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const willOpen = conversationFilterMenu.classList.contains("hidden");
    conversationFilterButton.setAttribute("aria-expanded", String(willOpen));
    conversationFilterMenu.classList.toggle("hidden", !willOpen);

    if (willOpen) {
      await prepareConversationFilterMenu();
      requestAnimationFrame(() => {
        positionConversationFilterMenu();
        requestAnimationFrame(positionConversationFilterMenu);
      });
    } else {
      hideConversationFilterOptions();
    }
  });

  window.addEventListener("resize", () => {
    if (conversationFilterMenu.classList.contains("hidden")) return;
    positionConversationFilterMenu();
  });
}

filterOwnerSearch?.addEventListener("input", (event) => {
  state.conversationOwnerQuery = event.target.value || "";
  renderConversationOwnerOptions();
});

filterOwnerSearch?.addEventListener("focus", () => {
  renderConversationOwnerOptions();
});

filterDepartmentSearch?.addEventListener("input", (event) => {
  state.conversationDepartmentQuery = event.target.value || "";
  renderConversationDepartmentOptions();
});

filterDepartmentSearch?.addEventListener("focus", () => {
  renderConversationDepartmentOptions();
});

conversationFilterClear?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  clearConversationAdminFilters();
});



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

  if (userMenuNameEl && userMenuOrgEl) {
    userMenuNameEl.textContent = label;
    userMenuOrgEl.textContent = state.organization?.name || "";
  } else if (userInfoEl) {
    userInfoEl.textContent = label;
  }

  settingsUserEl.textContent = label;

  if (state.organization) {

    orgInfoEl.textContent = state.organization.name;

    settingsOrgEl.textContent = `${state.organization.name} (${state.organization.slug})`;

  }

  renderUsers();
  updateScopeControls();
  updateConversationAdminFiltersVisibility();
  updateNoteButtonState();
}

if (userMenuButton && userMenuPanel) {
  userMenuButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const willOpen = userMenuPanel.classList.contains("hidden");
    userMenuPanel.classList.toggle("hidden", !willOpen);
    userMenuButton.setAttribute("aria-expanded", String(willOpen));
  });
}


function setActiveNav(panel) {

  sideNavButtons.forEach((button) => {

    button.classList.toggle("active", button.dataset.panel === panel);

  });

}



function openSettings() {

  renderUsers();

  loadUsers().then(() => {
    loadDepartments({ silent: true });
  });
  loadDepartments({ silent: true });
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

  if (sectionId === "settingsDepartmentsSection") {
    loadDepartments();
  }
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

document.addEventListener("click", (event) => {
  if (phoneActionMenu.classList.contains("hidden")) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (phoneActionMenu.contains(target)) return;
  hidePhoneActionMenu();
});

document.addEventListener("click", (event) => {
  if (conversationActionMenu.classList.contains("hidden")) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (conversationActionMenu.contains(target)) return;
  hideConversationActionMenu();
});

document.addEventListener("click", (event) => {
  if (messageActionMenu.classList.contains("hidden")) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (messageActionMenu.contains(target)) return;
  hideMessageActionMenu();
});

window.addEventListener("resize", () => {
  hidePhoneActionMenu();
});

window.addEventListener("resize", () => {
  hideConversationActionMenu();
});

window.addEventListener("resize", () => {
  hideMessageActionMenu();
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

editMessageModal?.addEventListener("click", (event) => {
  if (event.target === editMessageModal) {
    closeEditMessageModal();
  }
});

closeEditMessageModalButton?.addEventListener("click", () => closeEditMessageModal());
cancelEditMessageButton?.addEventListener("click", () => closeEditMessageModal());

editMessageForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!editMessageTargetId) return;
  const text = (editMessageTextInput?.value || "").trim();
  if (!text) {
    if (editMessageError) editMessageError.textContent = "Digite um texto.";
    return;
  }
  if (editMessageError) editMessageError.textContent = "";
  try {
    const updated = await fetchJson(`/api/messages/${editMessageTargetId}/edit`, {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    closeEditMessageModal();
    if (updated && state.latestMessages?.length) {
      const idx = state.latestMessages.findIndex((m) => m.id === updated.id);
      if (idx >= 0) {
        state.latestMessages[idx] = { ...state.latestMessages[idx], ...updated };
      }
      renderMessages(state.latestMessages, {
        notes: state.conversationNotes || [],
        preserveScroll: true,
      });
    } else {
      await loadMessages();
    }
  } catch (error) {
    if (editMessageError) {
      editMessageError.textContent =
        error.message || "Não foi possível editar a mensagem.";
    } else {
      alert(error.message || "Não foi possível editar a mensagem.");
    }
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
      state.conversationsOffset = 0;
      state.conversationsHasMore = true;
      state.conversationsCursorUpdatedAt = null;
      state.conversationsCursorId = null;

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
    const now = new Date();
    const roundMinutes = 15;
    const rounded = new Date(now);
    rounded.setSeconds(0, 0);
    const minutes = rounded.getMinutes();
    const remainder = minutes % roundMinutes;
    if (remainder !== 0) {
      rounded.setMinutes(minutes + (roundMinutes - remainder));
    }
    openReminderModal(null, { originPanel: "calendar", prefillDueAt: rounded });
  });
}

if (calendarEventModal) {
  calendarEventModal.addEventListener("click", (event) => {
    if (event.target === calendarEventModal || event.target.closest("[data-calendar-event-close]")) {
      closeCalendarEventModal();
    }
  });
}

if (calendarEventModalConversation) {
  calendarEventModalConversation.addEventListener("click", async () => {
    if (!state.calendarEventPreview) return;
    const conversationId =
      findConversationIdForReminder(state.calendarEventPreview) ||
      (state.calendarEventPreview.conversation_id
        ? Number(state.calendarEventPreview.conversation_id)
        : null);
    if (!conversationId) return;
    closeCalendarEventModal();
    handlePanel("conversations");
    await selectConversation(conversationId);
    const panel = document.getElementById("chatPanel");
    if (panel) panel.scrollIntoView({ behavior: "smooth" });
  });
}

if (calendarEventModalComplete) {
  calendarEventModalComplete.addEventListener("click", async () => {
    if (!state.calendarEventPreview?.reminder_id) return;
    await markReminderDone(state.calendarEventPreview.reminder_id);
  });
}

if (calendarEventModalCancel) {
  calendarEventModalCancel.addEventListener("click", async () => {
    if (!state.calendarEventPreview?.reminder_id) return;
    const confirmCancel = confirm("Cancelar esta atividade?");
    if (!confirmCancel) return;
    try {
      await fetchJson(`/api/reminders/${state.calendarEventPreview.reminder_id}`, {
        method: "DELETE",
      });
      await loadReminders();
      closeCalendarEventModal();
    } catch (error) {
      alert(error.message);
    }
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
      const preview =
        conversation.last_message_preview || (conversation.last_message_at ? "Mensagem" : "Sem mensagens");
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
  updateCalendarStats(weekDates);
  const events = Array.isArray(state.calendarEvents) ? state.calendarEvents : [];

  const startHour = 7;
  const endHour = 19;
  const hourHeight = 56;
  const totalMinutes = (endHour - startHour) * 60;
  const gridHeightPx = (totalMinutes / 60) * hourHeight;

  const weekdayFormatter = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
  const dayFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" });

  calendarGrid.innerHTML = "";
  calendarGrid.classList.add("calendar-timegrid-host");

  const grid = document.createElement("div");
  grid.className = "calendar-timegrid";
  grid.style.setProperty("--calendar-hour-height", `${hourHeight}px`);
  grid.style.setProperty("--calendar-start-hour", String(startHour));
  grid.style.setProperty("--calendar-end-hour", String(endHour));

  const headerRow = document.createElement("div");
  headerRow.className = "calendar-timegrid-header";

  const corner = document.createElement("div");
  corner.className = "timegrid-corner";
  corner.textContent = "Hora";
  headerRow.appendChild(corner);

  weekDates.forEach((date) => {
    const key = formatLocalDateKey(date);
    const isToday = key === formatLocalDateKey(new Date());
    const cell = document.createElement("div");
    cell.className = `timegrid-dayheader${isToday ? " today" : ""}`;
    cell.innerHTML = `<strong>${weekdayFormatter.format(date).replace(".", "")}</strong><span>${dayFormatter
      .format(date)
      .replace(".", "")}</span>`;
    headerRow.appendChild(cell);
  });

  const body = document.createElement("div");
  body.className = "calendar-timegrid-body";

  const timeCol = document.createElement("div");
  timeCol.className = "timegrid-timecol";
  timeCol.style.height = `${gridHeightPx}px`;
  for (let hour = startHour; hour < endHour; hour += 1) {
    const label = document.createElement("div");
    label.className = "timegrid-time";
    label.textContent = `${String(hour).padStart(2, "0")}:00`;
    timeCol.appendChild(label);
  }
  body.appendChild(timeCol);

  weekDates.forEach((date) => {
    const key = formatLocalDateKey(date);
    const isToday = key === formatLocalDateKey(new Date());
    const dayCol = document.createElement("div");
    dayCol.className = `timegrid-daycol${isToday ? " today" : ""}`;
    dayCol.dataset.date = key;

    const dayInner = document.createElement("div");
    dayInner.className = "timegrid-daycol-inner";
    dayInner.style.height = `${gridHeightPx}px`;

    const dayEvents = events
      .filter((event) => event.date === key)
      .sort((a, b) => (a.start_time || "").localeCompare(b.start_time || ""));

      dayEvents.forEach((event, index) => {
        const block = document.createElement("div");
        block.className = "timegrid-event";
        if (event.is_done) {
          block.classList.add("is-done");
        }
        block.tabIndex = 0;
        block.setAttribute("role", "button");
        const title = document.createElement("strong");
        title.textContent = event.title || "Compromisso";
        const meta = document.createElement("small");
        meta.textContent = `${event.start_time || "--"} · ${event.owner || "Equipe"}`;
        block.append(title, meta);

        const [h, m] = String(event.start_time || "").split(":").map((value) => Number(value));
      const minutesFromStart = Math.max(
        0,
        Math.min(totalMinutes - 1, ((h || 0) - startHour) * 60 + (m || 0))
      );
      const top = (minutesFromStart / 60) * hourHeight;

      const durationMinutes = Number.isFinite(event.duration_minutes) ? event.duration_minutes : 60;
      const height = Math.max(34, (Math.min(durationMinutes, totalMinutes) / 60) * hourHeight);

      block.style.top = `${top}px`;
      block.style.height = `${height}px`;

      const overlapOffset = (index % 3) * 6;
      block.style.left = `${8 + overlapOffset}px`;
      block.style.right = `${8 + overlapOffset}px`;

      const eventDetails = {
        ...event,
        description: event.description || event.notes || "",
      };

      block.addEventListener("click", (event) => {
        event.stopPropagation();
        openCalendarEventModal(eventDetails);
      });
      block.addEventListener("keydown", (keyboardEvent) => {
        if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
          keyboardEvent.preventDefault();
          openCalendarEventModal(eventDetails);
        }
      });

      dayInner.appendChild(block);
    });

      dayCol.appendChild(dayInner);
    body.appendChild(dayCol);
  });

  grid.append(headerRow, body);
  calendarGrid.appendChild(grid);
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
  syncSignMessagesToggle();

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

  startRealtime().catch((error) => console.warn("SSE não iniciou", error));

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

function updateCalendarStats(weekDates) {
  if (!Array.isArray(weekDates) || !weekDates.length) return;

  const todayKey = formatLocalDateKey(new Date());
  const weekKeys = weekDates.map((date) => formatLocalDateKey(date));
  const first = weekDates[0];
  const refYear = first.getFullYear();
  const refMonth = first.getMonth();

  const events = Array.isArray(state.calendarEvents) ? state.calendarEvents : [];
  const todayCount = events.filter((event) => event.date === todayKey).length;
  const weekCount = events.filter((event) => weekKeys.includes(event.date)).length;
  const monthCount = events.filter((event) => {
    const when = parseCalendarDate(event);
    return when && when.getFullYear() === refYear && when.getMonth() === refMonth;
  }).length;

  const pendingCount = Array.isArray(state.reminders)
    ? state.reminders.filter((reminder) => !reminder.is_done).length
    : 0;

  if (calendarStatToday) calendarStatToday.textContent = String(todayCount);
  if (calendarStatWeek) calendarStatWeek.textContent = String(weekCount);
  if (calendarStatMonth) calendarStatMonth.textContent = String(monthCount);
  if (calendarStatPending) calendarStatPending.textContent = String(pendingCount);
}

function getUserDepartmentLabel(userId) {
  if (!userId) return "";
  const user = state.users.find((u) => u.id === userId);
  if (!user) return "";
  const departments = Array.isArray(user.departments) ? user.departments : [];
  return departments.length ? String(departments[0]) : "";
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

function resetDepartmentDetail() {
  state.selectedDepartmentId = null;
  state.selectedDepartmentUserIds = [];
  if (departmentDetailEl) departmentDetailEl.classList.add("hidden");
  if (departmentDetailTitleEl) departmentDetailTitleEl.textContent = "";
  if (departmentUsersListEl) departmentUsersListEl.innerHTML = "";
  if (departmentSaveErrorEl) departmentSaveErrorEl.textContent = "";
}

function renderDepartments() {
  if (!departmentListEl) return;

  departmentListEl.innerHTML = "";
  if (!state.user?.is_admin) {
    departmentListEl.innerHTML = "<p class=\"empty\">Somente administradores podem gerenciar departamentos.</p>";
    resetDepartmentDetail();
    return;
  }

  const list = state.departments || [];
  if (!list.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Nenhum departamento cadastrado.";
    departmentListEl.appendChild(empty);
    resetDepartmentDetail();
    return;
  }

  list.forEach((dept) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "department-item";
    btn.classList.toggle("active", state.selectedDepartmentId === dept.id);
    btn.innerHTML = `<div class="department-item-name">${escapeHtml(dept.name || "")}</div>
      <div class="department-item-meta">${Number(dept.member_count) || 0} usuário(s)</div>`;
    btn.addEventListener("click", () => selectDepartment(dept.id));
    departmentListEl.appendChild(btn);
  });
}

async function loadDepartments(options = {}) {
  const { silent = false } = options;
  if (!state.user?.is_admin) {
    state.departments = [];
    renderDepartments();
    return;
  }
  try {
    state.departments = await fetchJson("/api/departments");
    renderDepartments();
  } catch (error) {
    console.error("Erro ao carregar departamentos", error);
    if (!silent && settingsModal.getAttribute("aria-hidden") === "false") {
      alert("Não foi possível carregar os departamentos.");
    }
  }
}

function openCalendarEventModal(eventData) {
  if (!calendarEventModal) return;
  const { title, date, start_time, owner, description, conversation_id } = eventData || {};
  const dateLabel = formatBrazilDate(`${date}T${start_time || "00:00"}`);
  calendarEventModalTitle.textContent = title || "Atividade";
  calendarEventModalSubtitle.textContent = dateLabel;
  const contactLabel = eventData?.contactName || eventData?.contactPhone || "Contato não informado";
  calendarEventModalContact.textContent = `Contato: ${contactLabel}`;
  calendarEventModalOwner.textContent = eventData?.creatorName
    ? `Responsável: ${eventData.creatorName}`
    : owner
      ? `Responsável: ${owner}`
      : "Responsável: Equipe";
  calendarEventModalNotes.textContent = description || "Sem descrição adicional.";
  state.calendarEventPreview = eventData;
  calendarEventModal.classList.remove("hidden");
  calendarEventModal.setAttribute("aria-hidden", "false");
}

function closeCalendarEventModal() {
  if (!calendarEventModal) return;
  state.calendarEventPreview = null;
  calendarEventModal.classList.add("hidden");
  calendarEventModal.setAttribute("aria-hidden", "true");
}

function findConversationIdForReminder(eventData) {
  if (eventData.conversation_id) {
    return Number(eventData.conversation_id);
  }
  const targetPhone = normalizePhoneForCompare(eventData.contactPhone);
  if (!targetPhone) return null;
  const conversation = (state.conversations || []).find((conv) => {
    const normalized = normalizePhoneForCompare(conv.debtor_phone);
    return normalized && normalized === targetPhone;
  });
  return conversation ? conversation.id : null;
}

async function syncCalendarEventsFromReminders(remindersInput) {
  const reminders = Array.isArray(remindersInput)
    ? remindersInput
    : Array.isArray(state.reminders)
      ? state.reminders
      : [];
  const events = [];
  for (const reminder of reminders) {
    const due = parseUtcDate(reminder.due_at);
    if (!due) continue;
    const dateKey = formatLocalDateKey(due);
    const start_time = `${String(due.getHours()).padStart(2, "0")}:${String(due.getMinutes()).padStart(2, "0")}`;
    let conversation = null;
    if (reminder.conversation_id) {
      conversation = state.conversations.find((conv) => conv.id === reminder.conversation_id);
      if (!conversation) {
        try {
          conversation = await fetchJson(`/api/conversations/${reminder.conversation_id}`);
          state.conversations.push(conversation);
        } catch (error) {
          conversation = null;
        }
      }
    }
    const contactName = conversation?.debtor_name || conversation?.debtor_phone || "Contato não informado";
    const contactPhone = conversation?.debtor_phone || reminder.conversation_phone || "";
    const responsibleLabel = getUserLabel(reminder.owner_user_id) || "Equipe";
    const creatorLabel = getUserLabel(reminder.created_by_user_id) || responsibleLabel;
    const event = {
      id: `reminder_${reminder.id}`,
      date: dateKey,
      start_time,
      duration_minutes: 60,
      title: reminder.title || "Lembrete",
      owner: responsibleLabel,
      creatorName: creatorLabel,
      contactName,
      contactPhone,
      is_done: Boolean(reminder.is_done),
      source: "reminder",
      reminder_id: reminder.id,
      conversation_id: reminder.conversation_id,
    };
    events.push(event);
  }
  state.calendarEvents = events;
}

async function selectDepartment(departmentId) {
  if (!departmentId) return;
  state.selectedDepartmentId = departmentId;
  if (departmentSaveErrorEl) departmentSaveErrorEl.textContent = "";

  const dept = (state.departments || []).find((d) => d.id === departmentId);
  if (departmentDetailTitleEl) departmentDetailTitleEl.textContent = dept ? dept.name : `Departamento #${departmentId}`;

  if (departmentDetailEl) departmentDetailEl.classList.remove("hidden");
  if (departmentUsersListEl) departmentUsersListEl.innerHTML = "<p class=\"muted small\">Carregando usuários...</p>";

  try {
    const userIds = await fetchJson(`/api/departments/${departmentId}/users`);
    state.selectedDepartmentUserIds = Array.isArray(userIds) ? userIds.map((v) => Number(v)) : [];
  } catch (error) {
    state.selectedDepartmentUserIds = [];
    if (departmentSaveErrorEl) departmentSaveErrorEl.textContent = error.message;
  }

  renderDepartments();
  renderDepartmentUsersChecklist();
}

function renderDepartmentUsersChecklist() {
  if (!departmentUsersListEl) return;
  departmentUsersListEl.innerHTML = "";

  const users = state.users || [];
  if (!users.length) {
    departmentUsersListEl.innerHTML = "<p class=\"empty\">Carregue a lista de usuários para atribuir ao departamento.</p>";
    return;
  }

  const selectedSet = new Set(state.selectedDepartmentUserIds || []);
  users.forEach((user) => {
    const row = document.createElement("label");
    row.className = "department-user-row";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = selectedSet.has(user.id);
    checkbox.addEventListener("change", () => {
      const set = new Set(state.selectedDepartmentUserIds || []);
      if (checkbox.checked) set.add(user.id);
      else set.delete(user.id);
      state.selectedDepartmentUserIds = Array.from(set);
    });

    const name = document.createElement("span");
    name.className = "department-user-name";
    name.textContent = user.full_name ? `${user.full_name} (@${user.username})` : `@${user.username}`;
    row.append(checkbox, name);
    departmentUsersListEl.appendChild(row);
  });
}

departmentCreateForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!state.user?.is_admin) return;
  if (departmentCreateErrorEl) departmentCreateErrorEl.textContent = "";
  const name = (departmentCreateNameInput?.value || "").trim();
  if (!name) {
    if (departmentCreateErrorEl) departmentCreateErrorEl.textContent = "Informe o nome do departamento.";
    return;
  }
  try {
    await fetchJson("/api/departments", { method: "POST", body: JSON.stringify({ name }) });
    if (departmentCreateNameInput) departmentCreateNameInput.value = "";
    await loadDepartments();
  } catch (error) {
    if (departmentCreateErrorEl) departmentCreateErrorEl.textContent = error.message;
  }
});

departmentSaveUsersButton?.addEventListener("click", async () => {
  if (!state.user?.is_admin) return;
  const deptId = state.selectedDepartmentId;
  if (!deptId) return;
  if (departmentSaveErrorEl) departmentSaveErrorEl.textContent = "";
  try {
    await fetchJson(`/api/departments/${deptId}/users`, {
      method: "PUT",
      body: JSON.stringify({ user_ids: state.selectedDepartmentUserIds || [] }),
    });
    await loadDepartments({ silent: true });
    if (departmentSaveErrorEl) {
      departmentSaveErrorEl.textContent = "Salvo!";
      departmentSaveErrorEl.classList.add("success");
      window.setTimeout(() => {
        departmentSaveErrorEl.textContent = "";
        departmentSaveErrorEl.classList.remove("success");
      }, 1400);
    }
  } catch (error) {
    if (departmentSaveErrorEl) departmentSaveErrorEl.textContent = error.message;
  }
});

departmentDeleteButton?.addEventListener("click", async () => {
  if (!state.user?.is_admin) return;
  const deptId = state.selectedDepartmentId;
  if (!deptId) return;
  const dept = (state.departments || []).find((d) => d.id === deptId);
  const confirmDelete = confirm(`Excluir o departamento "${dept?.name || deptId}"?`);
  if (!confirmDelete) return;
  if (departmentSaveErrorEl) departmentSaveErrorEl.textContent = "";
  try {
    await fetchJson(`/api/departments/${deptId}`, { method: "DELETE" });
    resetDepartmentDetail();
    await loadDepartments();
  } catch (error) {
    if (departmentSaveErrorEl) departmentSaveErrorEl.textContent = error.message;
  }
});



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

    try {
      state.reminders = await fetchJson("/api/reminders?status=all");
    } catch (error) {
      console.warn("Falha ao carregar lembretes completos, usando apenas pendentes.", error);
      const pending = (await fetchJson("/api/reminders")) || [];
      try {
        const done = (await fetchJson("/api/reminders?status=done")) || [];
        const seen = new Set();
        state.reminders = [...pending, ...done].filter((reminder) => {
          const key = String(reminder?.id ?? "");
          if (!key) return false;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      } catch (doneError) {
        state.reminders = pending;
      }
    }
    await syncCalendarEventsFromReminders(state.reminders);
    updateReminderBadge();
    renderReminderList();
    renderChatReminders();
    updateDashboard();
    if (workspace?.classList.contains("calendar-active")) {
      renderCalendar();
    }
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

  const pending = (state.reminders || []).filter((reminder) => !reminder.is_done);

  if (!pending.length) {

    const empty = document.createElement("p");

    empty.className = "empty";

    empty.textContent = "Nenhum lembrete pendente.";

    reminderListEl.appendChild(empty);

    return;

  }

  const sorted = [...pending].sort(

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

    const openButton = document.createElement("button");
    openButton.className = "ghost";
    openButton.textContent = "Abrir conversa";
    openButton.addEventListener("click", async () => {
      const conversationId =
        findConversationIdForReminder(reminder) ||
        (reminder.conversation_id ? Number(reminder.conversation_id) : null);
      if (!conversationId) {
        alert("Conversa não informada para este lembrete.");
        return;
      }
      closeReminderModal(true);
      handlePanel("conversations");
      await selectConversation(conversationId);
      const panel = document.getElementById("chatPanel");
      if (panel) panel.scrollIntoView({ behavior: "smooth" });
    });

    actions.append(openButton, doneButton, deleteButton);

    item.append(header, title, actions);

    reminderListEl.appendChild(item);

  });

}



function openReminderModal(preselectConversationId = null, options = {}) {

  if (!reminderModal) return;

  reminderModal.classList.remove("hidden");

  reminderModal.setAttribute("aria-hidden", "false");

  const originPanel = options?.originPanel || "conversations";
  state.reminderModalOriginPanel = originPanel;

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

  if (reminderDueInput && !reminderDueInput.value && options?.prefillDueAt instanceof Date) {
    const due = options.prefillDueAt;
    const pad = (value) => String(value).padStart(2, "0");
    const localValue = `${due.getFullYear()}-${pad(due.getMonth() + 1)}-${pad(due.getDate())}T${pad(
      due.getHours()
    )}:${pad(due.getMinutes())}`;
    reminderDueInput.value = localValue;
  }

  reminderFormError.textContent = "";

  setActiveNav(originPanel);

  loadReminders();

}



function closeReminderModal(force = false) {

  if (!reminderModal) return;

  reminderModal.classList.add("hidden");

  reminderModal.setAttribute("aria-hidden", "true");

  if (force) {

    setActiveNav(state.reminderModalOriginPanel || "conversations");

  }

  state.pendingReminderConversationId = null;
  state.reminderModalOriginPanel = null;

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

