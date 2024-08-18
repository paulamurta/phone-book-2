import * as yup from "yup";

import { IGroupCreateUpdate } from "../interfaces/group";

export const createUpdateGroupSerializer = yup
  .object<IGroupCreateUpdate>()
  .shape({
    name: yup.string().required(),
  });
