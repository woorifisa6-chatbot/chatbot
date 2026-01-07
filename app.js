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
  msg.innerHTML = `
      <div class="bubble bubble--${type}">
        <p class="bubble__text">${escapeHtml(text)}</p>
        <div class="bubble__meta">${nowTime()}</div>
      </div>
    `;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// 메세지 전달
function sendMessage() {
  if (sendingLock) return;

  const text = input.value.trim();
  if (!text) return;

  sendingLock = true;
  sendBtn.disabled = true;

  addMessage(text, "user");
  input.value = "";

  // 더미 응답 (TODO: 서버 연동)
  setTimeout(() => {
    addMessage(`"${text}"에 대한 금융 용어 설명입니다.`, "bot");

    // 락 해제
    sendingLock = false;
    sendBtn.disabled = false;
    input.focus();
  }, 500);
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
