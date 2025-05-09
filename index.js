const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.get('/fingerprint', async (req, res) => {
  try {
    const libUrl = 'https://fpjscdn.net/v3/ezVq3gIDSVXFPr67etIU/fingerprint.min.js';

    // טוען את הספרייה כטקסט (לא module)
    const scriptResponse = await fetch(libUrl);
    const scriptText = await scriptResponse.text();

    res.type('application/javascript').send(scriptText);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
