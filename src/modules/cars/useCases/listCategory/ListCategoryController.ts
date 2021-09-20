import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { ListCategoryUseCase } from './ListCategoryUseCase';


class ListCategoryController {

  async handle(request: Request, response: Response): Promise<Response> {
    try{

      const listCategoryUseCase = container.resolve(ListCategoryUseCase)

      const categories = await listCategoryUseCase.execute()

      return response.status(201).json(categories)
    }
    catch (error) {
      return response.status(401).json({ error: error.name })
    }
  }

}

export { ListCategoryController }