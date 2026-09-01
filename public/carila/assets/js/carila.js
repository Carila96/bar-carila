import { UI_CONFIG } from './config/ui-config.js';
import { SessionMemory } from './memory/session-memory.js';
import { formatCarilaText } from './text-format.js';

const memory = new SessionMemory();
const byId = (id) => document.getElementById(id);
const elements = Object.fromEntries(['sceneCaption','carilaWindow','carilaTurn','userTurn','starters','chatForm','messageInput','sendButton','status','historyButton','historyDialog','historyList','closeHistory','leaveButton','farewellDialog','farewellText','restartButton','menuButton','menuDrawer','menuOverlay','closeMenu'].map((id) => [id, byId(id)]));

document.querySelector('.scene').style.setProperty('--scene-image', `url("${UI_CONFIG.imagePath}")`);
elements.carilaTurn.textContent = formatCarilaText(UI_CONFIG.greeting);
memory.add('assistant', UI_CONFIG.greeting);

for (const label of UI_CONFIG.starters) {
  const button = document.createElement('button');
  button.type = 'button'; button.textContent = label;
  button.addEventListener('click', () => send(label));
  elements.starters.append(button);
}

function showLatest() {
  const [guest, carila] = memory.lastExchange;
  if (guest?.role === 'user') {
    elements.userTurn.hidden = false;
    elements.userTurn.querySelector('p').textContent = guest.content;
  }
  if (carila?.role === 'assistant') {
    elements.carilaTurn.textContent = formatCarilaText(carila.content);
    elements.carilaWindow.classList.remove('is-entering');
    requestAnimationFrame(() => elements.carilaWindow.classList.add('is-entering'));
  }
}

function resizeComposer() {
  elements.messageInput.style.height = 'auto';
  const maxHeight = Number.parseFloat(getComputedStyle(elements.messageInput).maxHeight);
  elements.messageInput.style.height = `${Math.min(elements.messageInput.scrollHeight, maxHeight)}px`;
  elements.messageInput.style.overflowY = elements.messageInput.scrollHeight > maxHeight ? 'auto' : 'hidden';
}

function toggleMenu(open) {
  elements.menuDrawer.classList.toggle('is-open', open);
  elements.menuDrawer.setAttribute('aria-hidden', String(!open));
  elements.menuButton.setAttribute('aria-expanded', String(open));
  elements.menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  elements.menuOverlay.hidden = !open;
}

function setBusy(busy) {
  document.querySelector('.counter').setAttribute('aria-busy', String(busy));
  elements.sendButton.disabled = busy; elements.messageInput.disabled = busy;
  elements.status.textContent = busy ? 'Carilaがグラスを置いて、こちらを見ています……' : '';
}

async function send(rawMessage) {
  const message = rawMessage.trim();
  if (!message || elements.sendButton.disabled) return;
  memory.add('user', message); showLatest(); setBusy(true);
  elements.starters.hidden = true; elements.sceneCaption.hidden = true; elements.messageInput.value = ''; resizeComposer();
  let failed = false;
  try {
    const response = await fetch(UI_CONFIG.apiPath, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: memory.conversation() }) });
    const data = await response.json();
    if (!response.ok || typeof data.reply !== 'string') throw new Error(data.requestId || 'chat unavailable');
    memory.add('assistant', data.reply); showLatest();
  } catch (error) {
    console.error('Carila chat failed', error);
    failed = true;
  } finally {
    setBusy(false);
    if (failed) elements.status.textContent = '……申し訳ありません。少し店内の調子が悪いようです。もう一度お声がけください。';
    elements.messageInput.focus();
  }
}

elements.chatForm.addEventListener('submit', (event) => { event.preventDefault(); send(elements.messageInput.value); });
elements.messageInput.addEventListener('input', resizeComposer);
elements.messageInput.addEventListener('keydown', (event) => { if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && !event.isComposing) { event.preventDefault(); elements.chatForm.requestSubmit(); } });
elements.menuButton.addEventListener('click', () => toggleMenu(elements.menuDrawer.getAttribute('aria-hidden') === 'true'));
elements.closeMenu.addEventListener('click', () => toggleMenu(false));
elements.menuOverlay.addEventListener('click', () => toggleMenu(false));
elements.historyButton.addEventListener('click', () => {
  toggleMenu(false);
  elements.historyList.replaceChildren();
  memory.history().forEach((message) => { const item = document.createElement('li'); const speaker = document.createElement('strong'); speaker.textContent = message.role === 'assistant' ? 'CARILA' : 'あなた'; const content = message.role === 'assistant' ? formatCarilaText(message.content) : message.content; const text = document.createTextNode(content); item.append(speaker, text); elements.historyList.append(item); });
  elements.historyDialog.showModal();
});
elements.closeHistory.addEventListener('click', () => elements.historyDialog.close());
elements.leaveButton.addEventListener('click', () => { toggleMenu(false); elements.farewellText.textContent = UI_CONFIG.farewell; elements.farewellDialog.showModal(); });
elements.restartButton.addEventListener('click', () => location.reload());
resizeComposer();
