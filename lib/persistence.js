'use strict';

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '..', 'data', 'contacts.json');

let contacts = [];

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Load contacts from file
const loadFromFile = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      contacts = JSON.parse(data);
    } else {
      contacts = [];
      saveToFile();
    }
  } catch (err) {
    console.error('Error loading contacts from file:', err);
    contacts = [];
  }
};

// Save contacts to file
const saveToFile = () => {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving contacts to file:', err);
  }
};

// Initialize data
const init = () => {
  ensureDataDir();
  loadFromFile();
};

// ObjectId-like interface for unique contact identifiers
class ObjectId {
  constructor(id) {
    this.id = String(id);
  }

  toString() {
    return this.id;
  }

  equals(other) {
    return this.id === String(other);
  }

  static isValid(id) {
    return id && String(id).length > 0;
  }
}

// Create a connection object that mimics the database interface
// with methods compatible with mongojs callbacks (for compatibility)
const createConnection = () => {
  return {
    contacts: {
      find: (query, callback) => {
        setImmediate(() => {
          try {
            const results = contacts.filter(contact => {
              for (const key in query) {
                if (Object.prototype.hasOwnProperty.call(query, key)) {
                  if (key === '_id') {
                    const queryId = query[key].id || String(query[key]);
                    const contactId = contact._id.id || String(contact._id);
                    if (queryId !== contactId) return false;
                  } else if (contact[key] !== query[key]) {
                    return false;
                  }
                }
              }
              return true;
            });
            callback(null, results);
          } catch (err) {
            callback(err, null);
          }
        });
      },

      findOne: (query, callback) => {
        setImmediate(() => {
          try {
            const result = contacts.find(contact => {
              for (const key in query) {
                if (Object.prototype.hasOwnProperty.call(query, key)) {
                  if (key === '_id') {
                    const queryId = query[key].id || String(query[key]);
                    const contactId = contact._id.id || String(contact._id);
                    if (queryId !== contactId) return false;
                  } else if (contact[key] !== query[key]) {
                    return false;
                  }
                }
              }
              return true;
            });
            callback(null, result || null);
          } catch (err) {
            callback(err, null);
          }
        });
      },

      insert: (doc, callback) => {
        setImmediate(() => {
          try {
            const newContact = {
              _id: new ObjectId(uuidv4()),
              ...doc
            };
            contacts.push(newContact);
            saveToFile();
            callback(null, newContact);
          } catch (err) {
            callback(err, null);
          }
        });
      },

      update: (query, update, callback) => {
        setImmediate(() => {
          try {
            const contact = contacts.find(c => {
              if (query._id) {
                const queryId = query._id.id || String(query._id);
                const contactId = c._id.id || String(c._id);
                return queryId === contactId;
              }
              return false;
            });

            if (contact) {
              if (update.$set) {
                Object.assign(contact, update.$set);
              } else {
                Object.assign(contact, update);
              }
              saveToFile();
              callback(null, contact);
            } else {
              callback(null, null);
            }
          } catch (err) {
            callback(err, null);
          }
        });
      },

      remove: (query, callback) => {
        setImmediate(() => {
          try {
            const index = contacts.findIndex(c => {
              if (query._id) {
                const queryId = query._id.id || String(query._id);
                const contactId = c._id.id || String(c._id);
                return queryId === contactId;
              }
              return false;
            });

            if (index !== -1) {
              contacts.splice(index, 1);
              saveToFile();
              callback(null, { ok: 1, n: 1 });
            } else {
              callback(null, { ok: 1, n: 0 });
            }
          } catch (err) {
            callback(err, null);
          }
        });
      }
    }
  };
};

module.exports = {
  ObjectId,
  init,
  createConnection,
  loadFromFile,
  saveToFile,
  getContacts: () => contacts,
  setContacts: (newContacts) => {
    contacts = newContacts;
    saveToFile();
  }
};
