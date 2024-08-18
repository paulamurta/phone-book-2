import * as yup from "yup";

import { IContactCreate, IContactUpdate } from "../interfaces/contact";

const phoneRegExp = /^[0-9]{10,10}$/;

export const createContactSerializer = yup.object<IContactCreate>().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phoneNumber: yup
    .string()
    .required()
    .matches(phoneRegExp, "Phone number is not valid"),
  email: yup.string().email().optional(),
});

export const updateContactSerializer = yup.object<IContactUpdate>().shape({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .optional(),
  email: yup.string().email().optional(),
  favorite: yup.boolean().optional(),
  birthday: yup.date().optional(),
});
