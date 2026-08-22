const express = require('express');
const app = express();
app.use(express.json());
app.post('/webhook', (req, res) => {
  console.log('📩 Nhận được tin nhắn từ Zalo:', req.body);
  res.status(200).send('OK');
});
app.get('/', (req, res) => {
  res.send('🤖 Bot Zalo đang hoạt động!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại port ${PORT}`);
});
