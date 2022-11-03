import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class TopicValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.maxLength(50), rules.required()]),
    description: schema.string([rules.maxLength(250), rules.required()])
  });


  public messages: CustomMessages = {}
}
