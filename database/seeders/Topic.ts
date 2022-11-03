import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import TopicFactory from 'Database/factories/TopicFactory';

export default class extends BaseSeeder {
  public async run() {
    await TopicFactory.createMany(100);
  }
}
