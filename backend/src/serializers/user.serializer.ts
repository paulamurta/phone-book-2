import * as yup from "yup";

import { IUserCreate } from "../interfaces/user";

export const newUserSerializer = yup.object<IUserCreate>().shape({
  name: yup.string().required().max(255),
  email: yup.string().required().max(255),
  password: yup.string().required().min(4),
});

export const userLoginSerializer = yup.object().shape({
  email: yup.string().required().max(255).email(),
  password: yup.string().required().min(4),
});
