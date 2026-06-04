'use strict';

var assert = require('chai').assert;
var persistence = require('../../lib/persistence');

var callContacts = function(conn, method) {
  var args = Array.prototype.slice.call(arguments, 2);

  return new Promise(function(resolve, reject) {
    conn.contacts[method].apply(conn.contacts, args.concat(function(err, result) {
      if (err) {
        return reject(err);
      }

      resolve(result);
    }));
  });
};

var clone = function(value) {
  return JSON.parse(JSON.stringify(value));
};

var buildContacts = function() {
  return [
    {
      _id: new persistence.ObjectId('contact-1'),
      name: 'Ada Lovelace',
      mobilephone: '0551199999999',
      homephone: '0551133333333'
    },
    {
      _id: new persistence.ObjectId('contact-2'),
      name: 'Grace Hopper',
      mobilephone: '0552188888888',
      homephone: '0552144444444'
    }
  ];
};

describe('Persistence', function() {
  var originalContacts;
  var conn;

  before(function() {
    persistence.loadFromFile();
    originalContacts = clone(persistence.getContacts());
  });

  beforeEach(function() {
    persistence.setContacts(buildContacts());
    conn = persistence.createConnection();
  });

  after(function() {
    persistence.setContacts(originalContacts);
  });

  it('finds contacts by regular fields and object ids', async function() {
    var namedResults = await callContacts(conn, 'find', { name: 'Ada Lovelace' });
    var idResults = await callContacts(conn, 'find', { _id: new persistence.ObjectId('contact-2') });

    assert.lengthOf(namedResults, 1);
    assert.equal(namedResults[0].mobilephone, '0551199999999');
    assert.lengthOf(idResults, 1);
    assert.equal(idResults[0].name, 'Grace Hopper');
  });

  it('returns one matching contact or null', async function() {
    var contact = await callContacts(conn, 'findOne', { _id: 'contact-1' });
    var missingContact = await callContacts(conn, 'findOne', { name: 'Katherine Johnson' });

    assert.equal(contact.name, 'Ada Lovelace');
    assert.isNull(missingContact);
  });

  it('inserts a contact with an object id', async function() {
    var contact = await callContacts(conn, 'insert', {
      name: 'Katherine Johnson',
      mobilephone: '0553177777777',
      homephone: '0553155555555'
    });

    assert.instanceOf(contact._id, persistence.ObjectId);
    assert.isTrue(persistence.ObjectId.isValid(contact._id));
    assert.equal(contact.name, 'Katherine Johnson');
    assert.lengthOf(persistence.getContacts(), 3);
  });

  it('updates matching contacts with $set updates', async function() {
    var updated = await callContacts(conn, 'update', { _id: 'contact-1' }, {
      $set: {
        mobilephone: '0551166666666'
      }
    });

    assert.equal(updated.name, 'Ada Lovelace');
    assert.equal(updated.mobilephone, '0551166666666');
  });

  it('updates matching contacts with direct updates', async function() {
    var updated = await callContacts(conn, 'update', { _id: 'contact-2' }, {
      homephone: '0552177777777'
    });

    assert.equal(updated.name, 'Grace Hopper');
    assert.equal(updated.homephone, '0552177777777');
  });

  it('returns null when no contact is updated', async function() {
    var updated = await callContacts(conn, 'update', { _id: 'missing-contact' }, {
      $set: {
        name: 'No One'
      }
    });

    assert.isNull(updated);
  });

  it('removes matching contacts and reports the count', async function() {
    var removed = await callContacts(conn, 'remove', { _id: 'contact-1' });
    var missingRemoval = await callContacts(conn, 'remove', { _id: 'missing-contact' });

    assert.deepEqual(removed, { ok: 1, n: 1 });
    assert.deepEqual(missingRemoval, { ok: 1, n: 0 });
    assert.lengthOf(persistence.getContacts(), 1);
  });
});
