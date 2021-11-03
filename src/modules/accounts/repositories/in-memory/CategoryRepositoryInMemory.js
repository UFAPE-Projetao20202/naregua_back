const { v4: uuidv4 } = require('uuid');

class CategoryRepository {
  constructor() {
    this.categories = [];
  }

  async create({ description }) {
    const category = {};

    Object.assign(category, {
      id: uuidv4(),
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.categories.push(category);

    return category;
  }  

  async findAll() {
    return this.categories;
  }
}

module.exports = { CategoryRepository };
