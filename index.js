require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files (e.g., portfolio HTML/CSS/JS)
app.use(express.static(path.join(__dirname, 'public')));

// Dummy project API
app.get('/api/projects', (req, res) => {
  res.json([
    {
      name: "Spreesuite Billing Platform",
      description: "Enterprise billing system built with Angular & Node.js."
    },
    {
      name: "Impact Genome Dashboard",
      description: "Data analytics app using React, D3, and MongoDB."
    },
    {
      name: "Tax Provision Tool",
      description: "Back-office automation for tax workflows using PostgreSQL and Express."
    }
  ]);
});

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio running at http://localhost:${PORT}`);
});
