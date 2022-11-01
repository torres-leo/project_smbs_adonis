// import Joi from "joi";
// import { logger } from "../helpers/default.logger";
import { schema, rules } from '@ioc:Adonis/Core/Validator'

// export const topicSchema = Joi.object().keys({
//   title: Joi.string().required().max(50),
//   description: Joi.string().max(250)
// })

// export const validateSchema = (schema) => {
//   return async ({ request }, next) => {
//     try {
//       await schema.validateAsync(request.body);
//       next()
//     } catch (error) {
//       console.log(error);
//       logger.error(error)
//     }
//   };
// };

export const topicSchemaValidator = schema.create({
  title: schema.string({ trim: true }, [rules.maxLength(50), rules.required()]),
  description: schema.string([rules.maxLength(250), rules.required()])
})