const contacts = require('./contacts');
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>')
  .option('-i, --id <type>')
  .option('-n, --name <type>')
  .option('-e, --email <type>')
  .option('-p, --phone <type>');

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contactsList = await contacts.listContacts();
            console.log(contactsList);
            break;

        case 'get':
            const contactById = await contacts.getContactById({ id });
            console.log(contactById);
            break;

        case 'add':
            const addedContact = await contacts.addContact({ name, email, phone });
            console.log(addedContact)
            break;

        case 'remove':
            const removedContact = await contacts.removeContact({ id });
            console.log(removedContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);