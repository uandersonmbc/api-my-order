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


Route.post('login', 'AuthController.login')
Route.post('register', 'AuthController.register')

/*
 |--------------------------------------------------------------------------
 | Routes Group
 |--------------------------------------------------------------------------
 | Criei um grupo de rotas privadas, essa rotas privadas 
 | só pode ser acessadas quando o usuário estiver logado.
 | 
 |--------------------------------------------------------------------------
 | Middlewares
 |--------------------------------------------------------------------------
 | middleware(['auth']) serve para poder verificar se usuário está logado na plataforma
 | a verificação é feita atraves do token no header da requisição
 | ele verifia se o token é vádido, se o token não expirou e se ele não estar na black-list.
 | 
 | E o que é a black-lis, a black-list é quando o usuário está logado
 | e o administrador quer deslogar esse usuário por algum motivo, ai ele pega o token desse usuário
 | e joga o token na black-list, sendo assim o middleware vai verificar e ver se o token do usuário
 | não estar nessa lista.
 |--------------------------------------------------------------------------
 | 
 | Mas explicado do que isso só deus na causa.
 |
 */

Route.get('user', 'AuthController.user').middleware(['auth']);

Route.group(() => {
}).middleware(['auth', 'is:administrator']);

Route.group(() => {

    // Route.post('order', 'OrderController.store')


    Route.get('cashier', 'CashierController.getCashier');
    Route.post('cashier', 'CashierController.openCashier');
    Route.put('cashier', 'CashierController.closedCashier');

    Route.resource('category', 'CategoryController').apiOnly()

    Route.post('addSubCategory', 'CategoryController.addSubCategory')

    Route.resource('product', 'ProductController').apiOnly()

    Route.resource('ingredient', 'IngredientController').apiOnly()

    Route.post('changestatus/:id', 'OrderController.changeStatus')
    Route.get('order', 'OrderController.index')
    Route.get('showorder/:id', 'OrderController.show')

}).middleware(['auth', 'is:manager']);

Route.group(() => {
    Route.post('changestatus/:id', 'OrderController.changeStatus')
    Route.get('order', 'OrderController.index')
    Route.get('showorder/:id', 'OrderController.show')

}).middleware(['auth', 'is:waiter']);


Route.group(() => {
    Route.post('addItem', 'OrderController.addItem')
    Route.post('deleteItem', 'OrderController.deleteItem')
    Route.post('order', 'OrderController.store')
    Route.put('order/:id', 'OrderController.changeStatus')
}).middleware(['auth', 'is:customer']);