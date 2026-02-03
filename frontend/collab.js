const collabState = {
  token: localStorage.getItem('collab_token'),
  user: null,
  organizations: [],
};

const loginSection = document.getElementById('collabLoginSection');
const panelSection = document.getElementById('collabPanel');
const loginForm = document.getElementById('collabLoginForm');
const logoutButton = document.getElementById('collabLogoutButton');
const loginError = document.getElementById('collabLoginError');
const statusMessage = document.getElementById('collabStatusMessage');
const createOrgForm = document.getElementById('createOrgForm');
const orgListEl = document.getElementById('collabOrgList');
const credentialForm = document.getElementById('credentialForm');
const credentialWebhookInput = document.getElementById('credentialWebhook');
const credentialOrgSelect = document.getElementById('credentialOrg');
const credentialServerUrl = document.getElementById('credentialServerUrl');
const credentialAdminToken = document.getElementById('credentialAdminToken');
const collabUserName = document.getElementById('collabUserName');
const collabInfo = document.getElementById('collabInfo');
const collabOrgHint = document.getElementById('collabOrgHint');
const collabUpdatedAt = document.getElementById('collabUpdatedAt');
const summaryOrgCount = document.getElementById('summaryOrgCount');
const summaryOrgActive = document.getElementById('summaryOrgActive');
const summaryUserCount = document.getElementById('summaryUserCount');
const summaryMessagesCount = document.getElementById('summaryMessagesCount');
const summaryMessagesGrowth = document.getElementById('summaryMessagesGrowth');
const summaryGrowthRate = document.getElementById('summaryGrowthRate');
const summaryOrgCountTag = document.getElementById('summaryOrgCountTag');
const orgSearchInput = document.getElementById('orgSearchInput');
const newOrgButton = document.getElementById('newOrgButton');

function setCollabStatus(message = '', isError = true) {
  if (!statusMessage) {
    return;
  }
  statusMessage.textContent = message;
  statusMessage.classList.toggle('form-error', Boolean(message) && isError);
  statusMessage.classList.toggle('success', Boolean(message) && !isError);
}

function showLogin() {
  if (loginSection) {
    loginSection.classList.remove('hidden');
  }
  if (panelSection) {
    panelSection.classList.add('hidden');
  }
}

function showPanel() {
  if (loginSection) {
    loginSection.classList.add('hidden');
  }
  if (panelSection) {
    panelSection.classList.remove('hidden');
  }
}

async function collabFetch(url, options = {}) {
  if (!collabState.token) {
    throw new Error('Sessão expirada.');
  }
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + collabState.token,
    ...(options.headers || {}),
  };
  const response = await fetch(url, {
    ...options,
    headers,
  });
  if (response.status === 401) {
    handleLogout();
    throw new Error('Sessão expirada.');
  }
  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const detail = payload && payload.detail ? payload.detail : 'Erro ao comunicar com o servidor.';
    throw new Error(detail);
  }
  return payload;
}

function persistToken(token) {
  collabState.token = token;
  localStorage.setItem('collab_token', token);
}

function clearToken() {
  collabState.token = null;
  localStorage.removeItem('collab_token');
}

async function handleLogin(event) {
  if (event) {
    event.preventDefault();
  }
  if (!loginForm) {
    return;
  }
  loginError.textContent = '';
  const payload = {
    username: loginForm.username.value.trim().toLowerCase(),
    password: loginForm.password.value,
    collaborator: true,
  };
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || 'Credenciais inválidas');
    }
    if (!data.user || !data.user.is_admin) {
      throw new Error('Apenas administradores podem acessar esta área.');
    }
    persistToken(data.token);
    collabState.user = data.user;
    if (collabUserName) {
      collabUserName.textContent = data.user.full_name || data.user.username;
    }
    if (collabInfo) {
      collabInfo.textContent = 'Painel administrativo da Nexen.ai';
    }
    await initPanel();
  } catch (error) {
    loginError.textContent = error.message;
  }
}

async function initPanel() {
  setCollabStatus();
  showPanel();
  try {
    await loadProfile();
    await loadOrganizations();
  } catch (error) {
    setCollabStatus(error.message);
  }
}

async function loadProfile() {
  if (!collabState.token) {
    return;
  }
  const data = await collabFetch('/api/auth/me');
  collabState.user = data.user;
  if (collabUserName) {
    collabUserName.textContent = data.user.full_name || data.user.username;
  }
  if (collabInfo) {
    collabInfo.textContent = 'Painel administrativo da Nexen.ai';
  }
}

async function loadOrganizations() {
  const organizations = await collabFetch('/api/admin/organizations');
  collabState.organizations = organizations || [];
  renderOrgList();
  renderCredentialSelect();
  if (collabUpdatedAt) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    collabUpdatedAt.textContent = 'Atualizado em ' + time;
  }
}

function updateSummaryStats(list) {
  const totalOrgs = list.length;
  const activeOrgs = list.filter((org) => org.is_active).length;
  const totalUsers = list.reduce((sum, org) => sum + (org.user_count || 0), 0);
  const readyCount = list.filter((org) => org.has_admin_token).length;
  const messagesSum = list.reduce((sum, org) => sum + (org.message_count || 0), 0);
  const messagesGrowth = totalOrgs ? Math.min(99, Math.round((readyCount / totalOrgs) * 100)) : 0;
  const growthRate = totalOrgs ? Math.round((activeOrgs / totalOrgs) * 100) : 0;
  if (summaryOrgCount) {
    summaryOrgCount.textContent = totalOrgs.toString();
  }
  if (summaryOrgCountTag) {
    summaryOrgCountTag.textContent = totalOrgs.toString();
  }
  if (summaryOrgActive) {
    summaryOrgActive.textContent = activeOrgs + ' ativas';
  }
  if (summaryUserCount) {
    summaryUserCount.textContent = totalUsers.toLocaleString('pt-BR');
  }
  if (summaryMessagesCount) {
    summaryMessagesCount.textContent = messagesSum.toLocaleString('pt-BR');
  }
  if (summaryMessagesGrowth) {
    summaryMessagesGrowth.textContent = messagesGrowth + '';
  }
  if (summaryGrowthRate) {
    summaryGrowthRate.textContent = growthRate + '%';
  }
}

function renderOrgList() {
  if (!orgListEl) {
    return;
  }
  const list = collabState.organizations;
  const searchTerm = (orgSearchInput && orgSearchInput.value ? orgSearchInput.value.trim().toLowerCase() : '');
  const filtered = list.filter((org) => {
    const haystack = (org.name + ' ' + org.slug).toLowerCase();
    return haystack.includes(searchTerm);
  });
  updateSummaryStats(list);
  if (collabOrgHint) {
    collabOrgHint.textContent =
      filtered.length === list.length
        ? filtered.length + ' organização(ões) exibida(s)'
        : filtered.length + ' organização(ões) encontrada(s)';
  }
  orgListEl.innerHTML = '';
  if (!filtered.length) {
    const empty = document.createElement('p');
    empty.className = 'muted';
    empty.textContent = 'Nenhuma organização encontrada.';
    orgListEl.append(empty);
    return;
  }
  filtered.forEach((org) => {
    const article = document.createElement('article');
    article.className = 'collab-org-card';
    const header = document.createElement('div');
    header.className = 'org-card-header';
    const info = document.createElement('div');
    info.className = 'org-card-info';
    const icon = document.createElement('div');
    icon.className = 'org-icon';
    icon.textContent = '🏢';
    const textWrapper = document.createElement('div');
    const nameEl = document.createElement('p');
    nameEl.className = 'org-name';
    nameEl.textContent = org.name;
    const slugEl = document.createElement('p');
    slugEl.className = 'org-slug';
    const slugValue = org.slug ? '/' + org.slug : '/sem-slug';
    slugEl.textContent = slugValue;
    textWrapper.append(nameEl, slugEl);
    info.append(icon, textWrapper);
    const headerActions = document.createElement('div');
    headerActions.className = 'org-card-header-actions';
    const statusPill = document.createElement('span');
    statusPill.className = 'pill ' + (org.is_active ? 'pill-active' : 'pill-inactive');
    statusPill.textContent = org.is_active ? 'Ativo' : 'Inativo';
    const dotsButton = document.createElement('button');
    dotsButton.type = 'button';
    dotsButton.className = 'dots-button';
    dotsButton.innerHTML = '⋮';
    headerActions.append(statusPill, dotsButton);
    header.append(info, headerActions);
    const meta = document.createElement('div');
    meta.className = 'org-card-meta';
    const userCount = Number.isFinite(Number(org.user_count)) ? Number(org.user_count) : 0;
    const limitValue = Number.isFinite(Number(org.user_limit)) ? Number(org.user_limit) : 0;
    const limitText = limitValue > 0 ? limitValue : '∞';
    const serverLabel = org.uazapi_server_url || 'Sem Server URL';
    const createdAt = org.created_at ? new Date(org.created_at) : null;
    const createdLabel = createdAt ? createdAt.toLocaleDateString('pt-BR') : 'Sem data';
    const createMetaItem = (iconChar, text) => {
      const span = document.createElement('span');
      const iconEl = document.createElement('span');
      iconEl.className = 'meta-icon';
      iconEl.textContent = iconChar;
      span.append(iconEl, document.createTextNode(' ' + text));
      return span;
    };
    meta.append(
      createMetaItem('👥', userCount + '/' + limitText),
      createMetaItem('🌐', serverLabel),
      createMetaItem('📅', createdLabel),
    );
    const actions = document.createElement('div');
    actions.className = 'collab-card-actions';
    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'ghost-button';
    editButton.textContent = 'Editar credenciais';
    editButton.addEventListener('click', () => fillCredentialForm(org));
    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'ghost-button';
    toggleButton.textContent = org.is_active ? 'Desativar' : 'Ativar';
    toggleButton.addEventListener('click', () => toggleOrganizationState(org.id, org.is_active));
    const limitForm = createLimitForm(org);
    actions.append(editButton, toggleButton, limitForm);
    article.append(header, meta, actions);
    orgListEl.append(article);
  });
}

function renderCredentialSelect() {
  if (!credentialOrgSelect) {
    return;
  }
  credentialOrgSelect.innerHTML = '';
  collabState.organizations.forEach((org) => {
    const option = document.createElement('option');
    option.value = String(org.id);
    option.textContent = org.name + ' (' + org.slug + ')';
    credentialOrgSelect.append(option);
  });
  if (credentialOrgSelect.firstChild) {
    credentialOrgSelect.value = credentialOrgSelect.firstChild.value;
    fillCredentialForm(collabState.organizations[0]);
  }
}

function createLimitForm(org) {
  const form = document.createElement('form');
  form.className = 'limit-form';
  const input = document.createElement('input');
  input.type = 'number';
  input.min = '0';
  input.value = Number.isFinite(org.user_limit) ? org.user_limit : 0;
  input.title = 'Limite de usuários';
  input.style.width = '100px';
  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'ghost-button';
  button.textContent = 'Atualizar limite';
  form.append(input, button);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const limit = Number(input.value);
    const payload = {
      user_limit: Number.isFinite(limit) && limit >= 0 ? Math.floor(limit) : 0,
    };
    await updateOrganization(org.id, payload, 'Limite atualizado.');
  });
  return form;
}

async function toggleOrganizationState(orgId, currentState) {
  await updateOrganization(orgId, { is_active: !currentState }, 'Status atualizado.');
}

async function updateOrganization(orgId, payload, successMessage) {
  try {
    await collabFetch('/api/admin/organizations/' + orgId, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setCollabStatus(successMessage, false);
    await loadOrganizations();
  } catch (error) {
    setCollabStatus(error.message);
  }
}

function fillCredentialForm(org) {
  if (!org || !credentialForm || !credentialOrgSelect) {
    return;
  }
  credentialOrgSelect.value = String(org.id);
  if (credentialServerUrl) {
    credentialServerUrl.value = org.uazapi_server_url || '';
  }
  if (credentialAdminToken) {
    credentialAdminToken.value = '';
  }
  if (credentialWebhookInput) {
    credentialWebhookInput.value = org.webhook_url || '';
  }
  credentialForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

async function handleCreateOrg(event) {
  if (event) {
    event.preventDefault();
  }
  if (!createOrgForm) {
    return;
  }
  const payload = {
    name: createOrgForm.name.value.trim(),
    slug: createOrgForm.slug.value.trim(),
    admin_username: createOrgForm.admin_username.value.trim(),
    admin_password: createOrgForm.admin_password.value,
    admin_full_name: createOrgForm.admin_full_name.value.trim() || undefined,
    uazapi_server_url: createOrgForm.uazapi_server_url.value.trim() || undefined,
    uazapi_admin_token: createOrgForm.uazapi_admin_token.value.trim() || undefined,
    webhook_url: createOrgForm.webhook_url.value.trim() || undefined,
  };
  const rawLimit = createOrgForm.user_limit ? Number(createOrgForm.user_limit.value) : NaN;
  payload.user_limit = Number.isFinite(rawLimit) && rawLimit >= 0 ? Math.floor(rawLimit) : 0;
  setCollabStatus('', true);
  try {
    await collabFetch('/api/admin/organizations', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    createOrgForm.reset();
    setCollabStatus('Cliente criado com sucesso.', false);
    await loadOrganizations();
  } catch (error) {
    setCollabStatus(error.message);
  }
}

async function handleCredentialSubmit(event) {
  if (event) {
    event.preventDefault();
  }
  if (!credentialForm || !credentialOrgSelect) {
    return;
  }
  const orgId = Number(credentialOrgSelect.value);
  if (!orgId) {
    return;
  }
  const payload = {
    uazapi_server_url: credentialServerUrl.value.trim() || null,
    uazapi_admin_token: credentialAdminToken.value.trim() || null,
    webhook_url:
      credentialWebhookInput && credentialWebhookInput.value
        ? credentialWebhookInput.value.trim()
        : null,
  };
  try {
    await collabFetch('/api/admin/organizations/' + orgId + '/credentials', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    if (credentialAdminToken) {
      credentialAdminToken.value = '';
    }
    setCollabStatus('Credenciais atualizadas.', false);
    await loadOrganizations();
  } catch (error) {
    setCollabStatus(error.message);
  }
}

function handleLogout() {
  clearToken();
  collabState.user = null;
  showLogin();
  setCollabStatus();
}

async function initPage() {
  if (collabState.token) {
    try {
      await initPanel();
      return;
    } catch (error) {
      clearToken();
    }
  }
  showLogin();
}

if (loginForm) {
  loginForm.addEventListener('submit', handleLogin);
}
if (logoutButton) {
  logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    handleLogout();
  });
}
if (createOrgForm) {
  createOrgForm.addEventListener('submit', handleCreateOrg);
}
if (credentialForm) {
  credentialForm.addEventListener('submit', handleCredentialSubmit);
}
if (orgSearchInput) {
  orgSearchInput.addEventListener('input', () => renderOrgList());
}
if (newOrgButton) {
  newOrgButton.addEventListener('click', () => {
    if (createOrgForm) {
      createOrgForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstInput = createOrgForm.querySelector('input');
      if (firstInput) {
        firstInput.focus();
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
