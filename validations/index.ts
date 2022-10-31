import Joi from "joi";

export const topicSchema = Joi.object().keys({
  title: Joi.string().required().max(50),
  description: Joi.string().max(250)
})

export const validateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      res.send(error.message);
    }
  };
};