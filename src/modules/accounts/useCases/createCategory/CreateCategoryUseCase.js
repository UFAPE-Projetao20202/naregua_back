const { hash } = require('bcryptjs');
const AppError = require('../../../../errors/AppError');

class CreateCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute({ description }) {
    if (!description || !String(description).trim()) throw new AppError('Informe a descrição.');
 
    const category = await this.categoriesRepository.create({
        description
    });

    return category;
  }
}

module.exports = { CreateCategoryUseCase };
