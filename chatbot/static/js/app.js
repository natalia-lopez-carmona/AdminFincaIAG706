const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const messages = document.getElementById("messages");

const history = [];

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  messages.innerHTML += `<div class="msg user">${escapeHtml(text)}</div>`;
  input.value = "";
  input.disabled = true;
  form.querySelector(".chat-send-btn").disabled = true;

  const loadingId = "loading-" + Date.now();
  messages.innerHTML += `<div class="msg bot loading" id="${loadingId}">AgriBot está escribiendo...</div>`;
  messages.scrollTop = messages.scrollHeight;

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history })
    });

    const data = await res.json();
    document.getElementById(loadingId)?.remove();

    history.push({ role: "user", content: text });
    history.push({ role: "assistant", content: data.response });

    const rendered = marked.parse(data.response);
    messages.innerHTML += `<div class="msg bot">${rendered}</div>`;
  } catch {
    document.getElementById(loadingId)?.remove();
    messages.innerHTML += `<div class="msg bot">Error de conexión. Intenta de nuevo.</div>`;
  }

  input.disabled = false;
  form.querySelector(".chat-send-btn").disabled = false;
  input.focus();
  messages.scrollTop = messages.scrollHeight;
});
