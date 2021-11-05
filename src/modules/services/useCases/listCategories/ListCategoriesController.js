const { CategoryRepository } = require('../../repositories/CategoryRepository');
const { ListCategoriesUseCase } = require('./ListCategoriesUseCase');

class ListCategoriesController {
  constructor() {
    const categoriesRepository = new CategoryRepository();
    this.listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
  }
  async handle(request, response) {

    const categories = await this.listCategoriesUseCase.execute();

    return response.status(201).json(categories);
  }
}

module.exports = { ListCategoriesController };
