const { CategoryRepository } = require('../../repositories/CategoryRepository');
const { CreateCategoryUseCase } = require('./CreateCategoryUseCase');

class CreateCategoryController {
  constructor() {
    const categoryRepository = new CategoryRepository();
    this.createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  }
  async handle(request, response) {
    const { description } = request.body;

    const user = await this.createCategoryUseCase.execute({
      description
    });

    return response.status(201).json(user);
  }
}

module.exports = { CreateCategoryController };
