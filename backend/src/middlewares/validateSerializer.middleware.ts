import { NextFunction, Request, Response } from "express";
import { AnyObject, ObjectSchema } from "yup";

const validateSerializerMiddleware =
  (serializer: ObjectSchema<{}, AnyObject, {}, "">) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const validatedBody = await serializer.validate(request.body, {
        stripUnknown: true,
        abortEarly: false,
      });
      request.body = validatedBody;
      return next();
    } catch (err: any) {
      return response.status(400).json({ message: err?.message });
    }
  };

export default validateSerializerMiddleware;
