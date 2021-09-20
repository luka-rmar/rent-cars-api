import { ICategoriesRepository } from '../../repositories/implementations/ICategoryRepository'
import { Express } from 'express'
import { Category } from '../../entities/Category'
import { inject, injectable } from 'tsyringe'
import fs from 'fs'
import cvsParse from 'csv-parse'

interface PropsImportCategory {
  name: string,
  description: string
}


@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
    ){}

    loadFileCategory(file: Express.Multer.File): Promise<PropsImportCategory[]> {
      return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(file.path)
        const parseCsv = cvsParse({delimiter: ","})
        const categories: PropsImportCategory[] = []
    
        stream.pipe(parseCsv)
    
        parseCsv.on("data", async line => {
          const [ name, description ] = line;
          categories.push({
            name,
            description
          })
        }).on("end", () => {
          resolve(categories)
        }).on("error", error => {
          reject(error)
        })
      })
    }

  async execute(file : Express.Multer.File): Promise<Category[] | null>{
    const categories = await this.loadFileCategory(file)
    
    const newCategories = categories.map(async ({ name, description }) => {
      const categoryAlreadyExists = await this.categoriesRepository.findByName(name)
      if(!categoryAlreadyExists) {
        const newCategories = this.categoriesRepository.create({ name, description })
        return newCategories;
      }
    })

    return newCategories

   }
}

export { ImportCategoryUseCase }