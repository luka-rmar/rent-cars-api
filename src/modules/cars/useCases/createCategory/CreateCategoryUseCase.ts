import { ICategoriesRepository } from '../../repositories/implementations/ICategoryRepository'
import { Category } from '../../entities/Category'
import { inject, injectable } from 'tsyringe'

interface Request {
  name: string,
  description: string
}


@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
    ){}

  async execute({name, description }: Request): Promise<Category>{
    const category = await this.categoriesRepository.findByName(name)

    if(category){
      throw new Error("Category already exists")
    }

    const newCategory = await this.categoriesRepository.create({ name, description })
    
    return newCategory;

  }
}

export { CreateCategoryUseCase }