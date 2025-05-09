const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

// ✅ CORS fix – הגדרת next כמו שצריך
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// ✅ Route נכון
app.get('/fingerprint', async (req, res) => {
  try {
    const libUrl = 'https://fpjscdn.net/v3/ezVq3gIDSVXFPr67etIU';
    const response = await fetch(libUrl);

    if (!response.ok) {
      res.status(500).send('❌ Failed to fetch FingerprintJS lib');
      return;
    }

    const moduleCode = await response.text();
    res.setHeader('Content-Type', 'application/javascript');
    res.send(moduleCode);
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Internal server error');
  }
});

app.listen(port, () => {
  console.log(`✅ Proxy server running at http://localhost:${port}`);
});
