import { Repository, getRepository } from 'typeorm'
import { Category } from '../entities/Category'
import { ICategoriesRepository, CreateCategoryDTO } from './implementations/ICategoryRepository'

class CategoriesRepository implements ICategoriesRepository{

  private categories: Repository<Category>;
  
  constructor() {
    this.categories = getRepository(Category)
  }
  
  async create({ name, description }: CreateCategoryDTO): Promise<Category> {
    
    const category = this.categories.create({ name, description,  })

    await this.categories.save(category)

    return category;
  
  }

  async list(): Promise<Category[]> {   
    return await this.categories.query("SELECT * FROM categories")
  }
  

  async findByName(name: string): Promise<Category> {
    const category = await this.categories.findOne({ where: { name } })

    return category
    
  }
  


}

export { CategoriesRepository }