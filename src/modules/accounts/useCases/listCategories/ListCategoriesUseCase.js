const { hash } = require('bcryptjs');
const AppError = require('../../../../errors/AppError');

class ListCategoriesUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute() {
    
    const user = await this.categoriesRepository.findAll();

    return user;
  }
}

module.exports = { ListCategoriesUseCase };
