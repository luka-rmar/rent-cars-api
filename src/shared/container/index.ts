import { container } from 'tsyringe'

import { ICategoriesRepository } from '../../modules/cars/repositories/implementations/ICategoryRepository'
import { CategoriesRepository } from '../../modules/cars/repositories/Categories'


container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)