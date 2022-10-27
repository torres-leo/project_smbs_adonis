import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Topic from 'App/Models/Topic'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    await Topic.createMany([
      {
        id: 1,
        title: "First Title",
        description: "Some Description"
      },
      {
        id: 2,
        title: "Second Title",
        description: "Some Description2"
      }
    ])
  }
}
