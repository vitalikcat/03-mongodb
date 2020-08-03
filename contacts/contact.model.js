import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  subscription: String,
  password: String,
  token: String,
});

/**
 * - Сервис.
 * - Вы должны описывать то, как вы будете забирать данные.
 */
class Contact {
  constructor() {
    this.contactModel = mongoose.model("Contact", contactSchema);
  }

  getContacts = () => {
    return this.contactModel.find();
  };

  getContactById = (contactId) => {
    return this.contactModel.findById(contactId);
  };

  createContact = (contact) => {
    return this.contactModel.create(contact);
  };

  deleteContactById = (contactId) => {
    return this.contactModel.findByIdAndDelete(contactId);
  };

  updateContactById = (contactId, fieldsToUpdate) => {
    return this.contactModel.findByIdAndUpdate(contactId, fieldsToUpdate, {
      new: true,
    });
  };
}

export default new Contact();
