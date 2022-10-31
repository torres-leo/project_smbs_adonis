/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
// import { topicSchema, validateSchema } from "../validations"

Route.group(() => {

  Route.get('/', 'TopicsController.getTopics')
  // Route.get('/:id', 'TopicsController.getTopic')
  Route.get('/:id', 'TopicsController.getTopic')
  Route.post('/', 'TopicsController.create')
  Route.patch('/:id', 'TopicsController.update')
  Route.delete('/:id', 'TopicsController.delete')
}).prefix('topics')
