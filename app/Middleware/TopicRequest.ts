import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import TopicValidator from 'App/Validators/TopicValidator';
import { logger } from '../../helpers/default.logger';

export default class TopicRequest {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      await request.validate(TopicValidator);
      await next();
    } catch (error) {
      response.badRequest(error.messages);
      logger.error(error.messages);
    }
  }
}
