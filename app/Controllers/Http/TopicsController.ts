import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Topic from "App/Models/Topic";
import { logger } from '../../../helpers/default.logger';

export default class TopicsController {

  public async getTopics({ request, response }) {
    const page = request.input('page', 1);
    const limit = request.input('limit', 20);
    const title = request.input("title");
    try {
      if (title) {
        return await Topic.query().where("title", title);
      } else {
        return await Topic.query().paginate(page, limit);
      }
    } catch (error) {
      response.badRequest({ message: "Failed to get Topics", error: error })
      logger.error("Failed to get Topics", error)
    }
  }

  public async getTopic({ params, response }: HttpContextContract) {
    try {
      const topic = await Topic.findOrFail(params.id);
      return topic;
    } catch (error) {
      response.status(404).send("Failed to get Topic", error);
      logger.info("Failed to get Topic:", error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const { title, description } = request.body();
    try {
      await Topic.create({ title, description });
    }
    catch (error) {
      response.badRequest({ message: "Failed to create Topic... ", error: error.message });
      logger.error('Failed to create Topic... ', error.message);
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const topic = await Topic.findOrFail(params.id);
      topic.title = request.input('title')
      topic.description = request.input('description')
      await topic.save();
      return topic;
    } catch (error) {
      response.badRequest({ message: `Failed to update Topic: ${params.id}`, error: error.message });
      logger.error(`Topic: "${params.id}" Not Found...`, error.message);
    }
  }

  public async delete({ response, params }: HttpContextContract) {
    try {
      const topic = await Topic.findOrFail(params.id);
      await topic.delete();
    } catch (error) {
      response.badRequest({ message: `Failed to delete Topic: ${params.id}.`, error: error.message });
      logger.error(`Failed to delete Topic: ${params.id}`, error.message);
    }
  }
}
