const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname), {
  extensions: ['html', 'htm'],
  setHeaders: (res, filePath) => {
    if (path.extname(filePath) === '.html') {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  }
}));

// Handle clean URLs - redirect /service-name to /service-name/
app.get(/^\/[^.]*$/, (req, res, next) => {
  const path = req.path;
  // If it's a directory path, try to serve index.html
  if (!path.includes('.')) {
    const indexPath = path.endsWith('/') ? path + 'index.html' : path + '/index.html';
    res.sendFile(path.join(__dirname, indexPath), (err) => {
      if (err) {
        next();
      }
    });
  } else {
    next();
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

