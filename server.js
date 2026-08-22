const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const BOT_TOKEN = '2435197574449697652:yhEbYsFCPEFVbPQJXjqCMAlmZOiDzDREMbWvSznMNJQmCEXJJypXiYNIRnAWmBr';

app.post('/webhook', (req, res) => {
  const data = req.body;
  console.log('📩 Tin nhắn:', data);

  if (data.message && data.message.text) {
    const userText = data.message.text;
    const userId = data.from.id;

    let reply = '';
    const lower = userText.toLowerCase();
    if (lower.includes('chào') || lower.includes('hello')) reply = 'Xin chào! Tôi là bot của Đăng đẹp zai 😎';
    else if (lower.includes('tên')) reply = 'Tôi là bot Zalo, được tạo bởi Đăng đẹp zai!';
    else if (lower.includes('cảm ơn')) reply = 'Không có gì 😊';
    else reply = `Bạn nói: "${userText}"\nHãy thử nói "chào" nhé!`;

    axios.post('https://openapi.zalo.ai/v2/oa/message', {
      user_id: userId,
      message: { text: reply }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'access_token': BOT_TOKEN
      }
    }).then(() => console.log('✅ Đã reply:', reply))
      .catch(err => console.error('❌ Lỗi:', err.response?.data || err.message));
  }

  res.status(200).send('OK');
});

app.get('/', (req, res) => res.send('🤖 Bot Zalo đang chạy!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server chạy tại port ${PORT}`));
