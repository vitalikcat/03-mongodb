import Contact from "./contact.model";

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await Contact.getContacts();

    return res.json(contacts);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  const contactId = req.params.id;
  try {
    const foundContact = await Contact.getContactById(contactId);

    return res.status(200).send(foundContact);
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  const contact = req.body;
  try {
    const createdContact = await Contact.createContact(contact);

    return res.status(201).send(createdContact);
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  const contactId = req.params.id;
  try {
    await Contact.deleteContactById(contactId);
    const updatedContacts = await Contact.getContacts();

    return res.status(200).json(updatedContacts);
  } catch (error) {
    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  const contactId = req.params.id;
  const fieldsToUpdate = req.body;

  try {
    const updatedContact = await Contact.updateContactById(
      contactId,
      fieldsToUpdate
    );

    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};
