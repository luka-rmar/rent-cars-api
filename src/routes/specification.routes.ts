import { Router } from 'express'
import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationRepository'
import { CreateSpecificationsService } from '../modules/cars/services/CreateSpecificationsService'



const categoriesRoutes = Router()
const specificationsRepository = new SpecificationsRepository()

categoriesRoutes.post("/categories", (request, response) => {

  const { name, description } = request.body;

  const createSpecificationsService = new CreateSpecificationsService(specificationsRepository)

  createSpecificationsService.execute({ name, description })

  return response.status(201).json()
  
})

export { categoriesRoutes }