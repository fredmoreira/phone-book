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

const getIdValue = (value) => {
  return value.id || String(value);
};

const hasOwnKey = (object, key) => {
  return Object.prototype.hasOwnProperty.call(object, key);
};

const idsMatch = (left, right) => {
  return getIdValue(left) === getIdValue(right);
};

const matchesField = (contact, key, value) => {
  if (key === '_id') {
    return idsMatch(contact._id, value);
  }

  return contact[key] === value;
};

const matchesQuery = (contact, query) => {
  for (const key in query) {
    if (hasOwnKey(query, key) && !matchesField(contact, key, query[key])) {
      return false;
    }
  }

  return true;
};

const findContactById = (query) => {
  return contacts.find(contact => {
    if (!query._id) {
      return false;
    }

    return idsMatch(contact._id, query._id);
  });
};

const applyUpdate = (contact, update) => {
  if (update.$set) {
    Object.assign(contact, update.$set);
  } else {
    Object.assign(contact, update);
  }
};

const withCallback = (operation, callback) => {
  setImmediate(() => {
    try {
      callback(null, operation());
    } catch (err) {
      callback(err, null);
    }
  });
};

// Create a connection object that mimics the database interface
// with methods compatible with mongojs callbacks (for compatibility)
const createConnection = () => {
  return {
    contacts: {
      find: (query, callback) => {
        withCallback(() => {
          return contacts.filter(contact => matchesQuery(contact, query));
        }, callback);
      },

      findOne: (query, callback) => {
        withCallback(() => {
          return contacts.find(contact => matchesQuery(contact, query)) || null;
        }, callback);
      },

      insert: (doc, callback) => {
        withCallback(() => {
          const newContact = {
            _id: new ObjectId(uuidv4()),
            ...doc
          };

          contacts.push(newContact);
          saveToFile();

          return newContact;
        }, callback);
      },

      update: (query, update, callback) => {
        withCallback(() => {
          const contact = findContactById(query);

          if (!contact) {
            return null;
          }

          applyUpdate(contact, update);
          saveToFile();

          return contact;
        }, callback);
      },

      remove: (query, callback) => {
        withCallback(() => {
          const index = contacts.findIndex(contact => {
            if (!query._id) {
              return false;
            }

            return idsMatch(contact._id, query._id);
          });

          if (index === -1) {
            return { ok: 1, n: 0 };
          }

          contacts.splice(index, 1);
          saveToFile();

          return { ok: 1, n: 1 };
        }, callback);
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
