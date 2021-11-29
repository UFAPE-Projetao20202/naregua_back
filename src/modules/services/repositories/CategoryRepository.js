const { Category } = require('../models/Category');

class CategoryRepository {
  async create({ description }) {
    const category = await Category.create({ description });

    return category;
  }  

  async findAll() {
    return await Category.findAll({
      order: [['description', 'ASC']]
    });
  }
}

module.exports = { CategoryRepository };
