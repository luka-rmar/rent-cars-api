import { ICategoriesRepository } from '../../repositories/implementations/ICategoryRepository'
import { Category } from '../../entities/Category'
import { inject, injectable } from 'tsyringe'


@injectable()
class ListCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
    ){}

  async execute(): Promise<Category[]>{
    const categories = await this.categoriesRepository.list()

    return categories;

  }
}

export { ListCategoryUseCase }