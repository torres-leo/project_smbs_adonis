import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const topicSchemaValidator = schema.create({
  title: schema.string({ trim: true }, [rules.maxLength(50), rules.required()]),
  description: schema.string([rules.maxLength(250), rules.required()])
})