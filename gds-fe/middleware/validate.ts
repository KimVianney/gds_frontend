import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";
import {
  AnyObject,
  ObjectShape,
  RequiredObjectSchema,
  TypeOfShape,
} from "yup/lib/object";

type Methods = Array<string>;

export function validate(
  handler: NextApiHandler,
  schema?: RequiredObjectSchema<
    ObjectShape,
    AnyObject,
    TypeOfShape<ObjectShape>
  >,
  methods: Methods = ["GET"]
) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (methods.includes(req.method || "GET")) {
      try {
        if (req.method !== "GET" && !schema) {
          throw new Error("Schema is required for non GET requests");
        }
        req.body =
          req.method !== "GET"
            ? await schema?.validate(req.body, {
                abortEarly: true,
                stripUnknown: true,
              })
            : req.body;
        return handler(req, res);
      } catch (error) {
        return res.status(400).json({
          status: false,
          message: (error as ValidationError).message,
          errors: (error as ValidationError).errors,
        });
      }
    }
    return res
      .status(405)
      .json({ message: "Method Not Allowed", status: false });
  };
}
