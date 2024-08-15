import * as yup from "yup";
import { v4 } from "uuid";

const phoneRegExp = /^[0-9]{10,10}$/;

export const createUserSerializer = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup
    .string()
    .required()
    .matches(phoneRegExp, "Phone number is not valid"),
  id: yup
    .string()
    .matches(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )
    .default(() => v4())
    .notRequired(),
});

export const updateUserSerializer = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});
