import { Router } from "express";
import {
  contactIdValidation,
  createContactValidation,
  updateContactValidation,
} from "./contact.validation";
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
} from "./contact.controller";

const contactRouters = Router();

contactRouters.get("/", getContactsController);
contactRouters.get("/:id", contactIdValidation, getContactByIdController);
contactRouters.post("/", createContactValidation, createContactController);
contactRouters.delete("/:id", contactIdValidation, deleteContactController);
contactRouters.patch(
  "/:id",
  contactIdValidation,
  updateContactValidation,
  updateContactController
);

export default contactRouters;
