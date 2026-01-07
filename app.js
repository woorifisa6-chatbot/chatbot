const chat = document.getElementById("chat");
const input = document.querySelector(".composer__input");
const sendBtn = document.querySelector(".composer__send");

let isComposing = false; // 한글 조합 중일 때 전송 금지
let sendingLock = false; // 중복 전송 방지

// 현재 시간 생성
function nowTime() {
  return new Date().toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "numeric",
  });
}

function escapeHtml(str) {
  return str.replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[m])
  );
}

// 메세지 화면 추가
function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = `msg msg--${type}`;

  if (type === "bot") {
    msg.innerHTML = `
      <img
        src="./assets/wibee.svg"
        alt="Wibee"
        class="bot-avatar"
      />
      <div class="bubble bubble--bot">
        <p class="bubble__text">${escapeHtml(text)}</p>
        <div class="bubble__meta">${nowTime()}</div>
      </div>
    `;
  } else {
    // user 메시지
    msg.innerHTML = `
      <div class="bubble bubble--user">
        <p class="bubble__text">${escapeHtml(text)}</p>
        <div class="bubble__meta">${nowTime()}</div>
      </div>
    `;
  }

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  if (sendingLock) return;

  const text = input.value.trim();
  if (!text) return;

  sendingLock = true;
  sendBtn.disabled = true;

  addMessage(text, "user");
  input.value = "";

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) throw new Error(`서버 오류: ${res.status}`);

    const botReply = await res.json();
    addMessage(botReply, "bot");
  } catch (err) {
    addMessage("서버와 통신 중 문제가 발생했어요.", "bot");
    console.error(err);
  } finally {
    sendingLock = false;
    sendBtn.disabled = false;
    input.focus();
  }
}

// 한글 조합 이벤트
input.addEventListener("compositionstart", () => {
  isComposing = true;
});
input.addEventListener("compositionend", () => {
  isComposing = false;
});

// Enter 처리: 조합 중이면 무시
input.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  if (e.shiftKey) return; // (선택) Shift+Enter 줄바꿈 쓰고 싶으면 유지

  // 조합 중 Enter 무시
  if (isComposing || e.isComposing || e.keyCode === 229) return;

  e.preventDefault();
  sendMessage();
});

sendBtn.addEventListener("click", sendMessage);
