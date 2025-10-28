const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'sites.json');

app.use(cors());
app.use(bodyParser.json());

function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  return [];
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/resources', (req, res) => {
  const data = loadData();
  res.json(data);
});

app.get('/api/resources/:id', (req, res) => {
  const data = loadData();
  const resource = data.find(r => r.id === req.params.id);
  if (resource) {
    res.json(resource);
  } else {
    res.status(404).json({ error: 'Resource not found' });
  }
});

app.post('/api/resources', (req, res) => {
  const data = loadData();
  const newResource = { id: `${Date.now()}`, ...req.body };
  data.push(newResource);
  saveData(data);
  res.status(201).json(newResource);
});

app.put('/api/resources/:id', (req, res) => {
  const data = loadData();
  const index = data.findIndex(r => r.id === req.params.id);
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    saveData(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ error: 'Resource not found' });
  }
});

app.delete('/api/resources/:id', (req, res) => {
  let data = loadData();
  const index = data.findIndex(r => r.id === req.params.id);
  if (index !== -1) {
    data.splice(index, 1);
    saveData(data);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Resource not found' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
