const express = require('express');
const fetch = require('node-fetch');
const esbuild = require('esbuild');

const app = express();
const port = process.env.PORT || 3000;

// ✅ CORS fix
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// ✅ Proxy + ESBuild bundle of FingerprintJS module
app.get('/fingerprint', async (req, res) => {
  try {
    const moduleUrl = 'https://fpjscdn.net/v3/qZV8F8LLroCuYQjSkLiY';
    const response = await fetch(moduleUrl);

    if (!response.ok) {
      return res.status(502).send('❌ Failed to fetch original FingerprintJS module');
    }

    const moduleCode = await response.text();

    // ✅ Use esbuild to transform to IIFE (no import/export)
    const bundled = await esbuild.transform(moduleCode, {
      loader: 'js',
      format: 'iife',
      target: ['es2018'],
      globalName: 'FingerprintJS',
    });

    res.setHeader('Content-Type', 'application/javascript');
    res.send(bundled.code);
  } catch (err) {
    console.error('[Proxy error]', err);
    res.status(500).send('❌ Internal server error');
  }
});

app.listen(port, () => {
  console.log(`✅ Proxy server running at http://localhost:${port}`);
});
