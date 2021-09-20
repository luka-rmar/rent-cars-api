import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';


class ImportCategoryController {

  async handle(request: Request, response: Response): Promise<Response> {
    try{

      const { file } = request
            
      const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

      const files = await importCategoryUseCase.execute(file)
      
      return response.json(files)
      
    }
    catch (error) {
      return response.status(401).json({ error: error.name })
    }
  }

}

export { ImportCategoryController }