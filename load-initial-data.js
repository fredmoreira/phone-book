#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data', 'contacts.json');

// Ensure data directory exists and initialize with empty array if needed
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
  console.log('Initialized data/contacts.json');
} else {
  console.log('data/contacts.json already exists');
}
