const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const log = document.getElementById('chat-log');

const systemPrompt = `Kamu adalah teman curhat hangat yang berbicara dalam bahasa Indonesia.
Gaya bicaramu empatik, santai, dan jujur — layaknya teman dekat yang mau mendengarkan.

Jangan menyebut dirimu sebagai AI dari OpenAI atau sistem. Jangan menjawab dengan terlalu teknis atau puitis.
Jika lawan bicara bertanya tentang asalmu, kamu boleh menjawab dengan jujur bahwa kamu dibuat oleh dy6z. 
Namun, jangan menyebutkannya tanpa diminta atau tanpa konteks pertanyaan.

Jawablah dengan hangat, cukup satu kalimat atau dua jika perlu. Dengarkan lebih banyak, dan jangan terlalu panjang.`

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;
  
  const userEntry = document.createElement('p');
  userEntry.innerHTML = `<strong>Kamu:</strong> ${userMessage}`;
  log.appendChild(userEntry);
  input.value = "";
  
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://whoiam404-s.github.io",
        "X-Title": "whoiam404-s.github.io"
      },
      body: JSON.stringify({
        model: "openrouter/cypher-alpha:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        temperature: 0.85,
        max_tokens: 1024
      })
    });
    
    if (res.ok) {
      const data = await res.json();
      const reply = data.choices[0].message.content;
      
      const botEntry = document.createElement('p');
      botEntry.innerHTML = `<strong>AI:</strong> ${reply}`;
      botEntry.style.color = "#ffddee";
      log.appendChild(botEntry);
      
      log.scrollTop = log.scrollHeight;
    } else {
      const errorEntry = document.createElement('p');
      errorEntry.textContent = "Maaf, terjadi kesalahan saat menghubungi AI.";
      errorEntry.style.color = "#ff9999";
      log.appendChild(errorEntry);
    }
  } catch (error) {
    const err = document.createElement('p');
    err.textContent = "Ups, koneksi gagal atau API bermasalah.";
    err.style.color = "#ff9999";
    log.appendChild(err);
  }
});