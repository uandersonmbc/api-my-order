'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('user', 'AuthController.user')

Route.post('login', 'AuthController.login')
Route.post('register', 'AuthController.register')

//Route.post('createuser', 'AuthController.create')

Route.resource('category', 'CategoryController').apiOnly()

Route.post('addSubCategory', 'CategoryController.addSubCategory')

Route.resource('product', 'ProductController').apiOnly()

Route.resource('ingredient', 'IngredientController').apiOnly()

Route.post('createorder', 'OrderController.store')
Route.post('changestatus/:id', 'OrderController.changeStatus')
Route.get('order', 'OrderController.index')
Route.get('showorder/:id', 'OrderController.show')