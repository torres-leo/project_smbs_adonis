import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
// import Topic from 'App/Models/Topic'
import TopicFactory from 'Database/factories/TopicFactory'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await TopicFactory.createMany(100)
  }
}
