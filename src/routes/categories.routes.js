const { Router } = require('express');
const {
    CreateCategoryController,
} = require('../modules/accounts/useCases/createCategory/CreateCategoryController');
const { ListCategoriesController } = require('../modules/accounts/useCases/listCategories/ListCategoriesController');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const { ensureProvider } = require('../middlewares/ensureProvider');

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', ensureAuthenticated, ensureProvider, createCategoryController.handle.bind(createCategoryController));
categoriesRoutes.get('/', ensureAuthenticated, ensureProvider, listCategoriesController.handle.bind(listCategoriesController));

module.exports = { categoriesRoutes };
