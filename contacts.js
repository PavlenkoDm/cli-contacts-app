const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');


const pathToContacts = path.join(__dirname, './db/contacts.json');

async function listContacts() {
    return await getAllContacts(pathToContacts);
}

async function getContactById({ id }) {
    const allContacts = await getAllContacts(pathToContacts);
    const contact = allContacts.find(contact => contact.id === id);
    if (!contact) {
        return null;
    }
    return contact;
}

async function removeContact({ id }) {
    const allContacts = await getAllContacts(pathToContacts);
    const contactIndex = allContacts.findIndex(contact => contact.id === id);
    if (contactIndex === -1) {
        return null;
    }
    const [removedContact] = allContacts.splice(contactIndex, 1);
    await fs.writeFile(pathToContacts, JSON.stringify(allContacts, null, 2));
    return removedContact;
}

async function addContact({ name, email, phone }) {
    const allContacts = await getAllContacts(pathToContacts);
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    allContacts.push(newContact);
    await fs.writeFile(pathToContacts, JSON.stringify(allContacts, null, 2));
    return newContact;
}


async function getAllContacts(path) {
    const allContacts = await fs.readFile(path);
    return JSON.parse(allContacts, null, 2);
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
