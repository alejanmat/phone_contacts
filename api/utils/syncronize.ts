import Contact from "../contact.model";
const { synchronizeAll } = require("../services/elastic.service");

export const syncronize = async () => {
  const contacts = await Contact.find();
  await synchronizeAll(contacts);
};
