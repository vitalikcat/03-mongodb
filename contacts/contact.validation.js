import Joi from "joi";
import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;

export const contactIdValidation = (req, res, next) => {
  const { id } = req.params;
  const isValidId = ObjectId.isValid(id);

  if (!isValidId) {
    return res.status(400).send("Bad request");
  } else {
    next();
  }
};

export const createContactValidation = (req, res, next) => {
  const validationRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });

  const { error } = Joi.validate(req.body, validationRules);

  if (error) {
    const missingField = error.details[0].path[0];

    return res.status(400).json({
      message: `missing required ${missingField} field`,
    });
  } else {
    next();
  }
};

export const updateContactValidation = (req, res, next) => {
  const validationRules = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  });
  const result = Joi.validate(req.body, validationRules);

  if (result.error || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "missing  fields",
    });
  } else {
    next();
  }
};
