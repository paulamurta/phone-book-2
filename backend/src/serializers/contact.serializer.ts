import * as yup from "yup";

import {
  IContactCreate,
  IContactSearch,
  IContactUpdate,
} from "../interfaces/contact";

const phoneRegExp = /^[0-9]{10,10}$/;

export const createContactSerializer = yup.object<IContactCreate>().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phoneNumber: yup
    .string()
    .required()
    .matches(phoneRegExp, "Phone number is not valid"),
  email: yup.string().optional().email(),
  birthday: yup.date().optional(),
  groupId: yup.string().uuid().optional(),
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

export const contactSearchSerializer = yup.object<IContactSearch>().shape({
  search: yup.string().optional(),
  favorite: yup.boolean().optional(),
  groupId: yup.string().uuid().optional(),
});
