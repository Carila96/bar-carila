import { UI_CONFIG } from './config/ui-config.js';
import { SessionMemory } from './memory/session-memory.js';
import { formatCarilaText } from './text-format.js';

const memory = new SessionMemory();
const byId = (id) => document.getElementById(id);
const elements = Object.fromEntries(['sceneCaption','carilaWindow','carilaTurn','userTurn','starters','chatForm','messageInput','sendButton','status','historyButton','historyDialog','historyList','closeHistory','leaveButton','farewellDialog','farewellText','restartButton','menuButton','menuDrawer','menuOverlay','closeMenu','voiceButton','voiceButtonLabel','voiceStatus'].map((id) => [id, byId(id)]));
const bar = document.querySelector('.bar');
let voicePeer = null;
let voiceStream = null;
let voiceAudio = null;
let voiceStarting = false;

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

function isVoiceActive() {
  return Boolean(voicePeer && ['new','connecting','connected'].includes(voicePeer.connectionState));
}

function setVoiceUi(state, detail = '') {
  const active = state === 'active';
  const connecting = state === 'connecting';
  elements.voiceButton.classList.toggle('is-active', active);
  elements.voiceButton.classList.toggle('is-connecting', connecting);
  elements.voiceButton.setAttribute('aria-pressed', String(active));
  elements.voiceButton.disabled = connecting;
  elements.voiceButtonLabel.textContent = active ? '音声会話を終える' : connecting ? '接続しています…' : '音声会話を始める';
  elements.voiceStatus.textContent = detail || (active ? 'そのまま話してください。Carilaの途中でも話し始めれば割り込めます。' : '一度始めれば、あとは普通に話しかけられます。');
  elements.chatForm.classList.toggle('is-disabled-by-voice', active || connecting);
  elements.messageInput.disabled = active || connecting;
  elements.sendButton.disabled = active || connecting;
}

function stopVoice(detail = '') {
  if (voiceStream) {
    for (const track of voiceStream.getTracks()) track.stop();
  }
  if (voicePeer) voicePeer.close();
  if (voiceAudio) {
    voiceAudio.pause();
    voiceAudio.srcObject = null;
    voiceAudio.remove();
  }
  voicePeer = null;
  voiceStream = null;
  voiceAudio = null;
  voiceStarting = false;
  setVoiceUi('idle', detail);
}

async function startVoice() {
  if (voiceStarting || isVoiceActive()) return;
  if (!navigator.mediaDevices?.getUserMedia || typeof RTCPeerConnection === 'undefined') {
    setVoiceUi('idle', 'このブラウザでは音声会話を利用できません。');
    return;
  }

  voiceStarting = true;
  setVoiceUi('connecting');
  bar.classList.add('is-conversing');
  elements.starters.hidden = true;
  elements.sceneCaption.hidden = true;

  try {
    voiceStream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    });

    const peer = new RTCPeerConnection();
    voicePeer = peer;
    voiceAudio = document.createElement('audio');
    voiceAudio.autoplay = true;
    voiceAudio.playsInline = true;
    voiceAudio.hidden = true;
    document.body.append(voiceAudio);

    peer.ontrack = (event) => {
      const [stream] = event.streams;
      if (stream) voiceAudio.srcObject = stream;
    };

    peer.onconnectionstatechange = () => {
      if (peer !== voicePeer) return;
      if (peer.connectionState === 'connected') {
        voiceStarting = false;
        setVoiceUi('active');
      } else if (['failed','disconnected','closed'].includes(peer.connectionState)) {
        stopVoice(peer.connectionState === 'disconnected' ? '音声接続が切れました。もう一度お試しください。' : '音声会話を終了しました。');
      }
    };

    const events = peer.createDataChannel('oai-events');
    events.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'input_audio_buffer.speech_started') elements.voiceStatus.textContent = '聞いています…';
        if (data.type === 'input_audio_buffer.speech_stopped') elements.voiceStatus.textContent = 'Carilaが聞き取りました。';
        if (data.type === 'response.output_audio.started') elements.voiceStatus.textContent = 'Carilaが話しています。途中でもそのまま話しかけられます。';
        if (data.type === 'response.done') elements.voiceStatus.textContent = 'そのまま話してください。';
        if (data.type === 'error') console.error('Carila realtime event error', data.error || data);
      } catch {}
    });

    for (const track of voiceStream.getTracks()) peer.addTrack(track, voiceStream);
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    const response = await fetch('/api/carila-realtime-session', {
      method: 'POST',
      headers: { 'content-type': 'application/sdp' },
      body: offer.sdp,
    });
    const answerSdp = await response.text();
    if (!response.ok) throw new Error(`realtime session ${response.status}: ${answerSdp.slice(0, 200)}`);
    await peer.setRemoteDescription({ type: 'answer', sdp: answerSdp });
  } catch (error) {
    console.error('Carila realtime voice failed', error);
    stopVoice('音声会話を開始できませんでした。マイク許可と接続設定をご確認ください。');
  }
}

function setBusy(busy) {
  document.querySelector('.counter').setAttribute('aria-busy', String(busy));
  if (!isVoiceActive() && !voiceStarting) {
    elements.sendButton.disabled = busy; elements.messageInput.disabled = busy;
  }
  elements.status.textContent = busy ? 'Carilaがグラスを置いて、こちらを見ています……' : '';
}

async function send(rawMessage) {
  const message = rawMessage.trim();
  if (!message || elements.sendButton.disabled || isVoiceActive()) return;
  memory.add('user', message); showLatest(); setBusy(true);
  bar.classList.add('is-conversing');
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
    if (!isVoiceActive()) elements.messageInput.focus();
  }
}

elements.voiceButton.addEventListener('click', () => { if (isVoiceActive()) stopVoice('音声会話を終了しました。'); else startVoice(); });
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
elements.leaveButton.addEventListener('click', () => { toggleMenu(false); if (isVoiceActive()) stopVoice(); elements.farewellText.textContent = UI_CONFIG.farewell; elements.farewellDialog.showModal(); });
elements.restartButton.addEventListener('click', () => location.reload());
window.addEventListener('pagehide', () => stopVoice());
resizeComposer();
setVoiceUi('idle');
