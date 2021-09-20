import { ISpeciticationsRepository } from '../repositories/ISpecificationReposiroty'

interface Request {
  name: string,
  description: string
}

class CreateSpecificationsService {
  constructor(private specificationsRepository: ISpeciticationsRepository){}

  execute({name, description }: Request): void{
    const specification = this.specificationsRepository.findByName(name)

    if(!specification){
      throw new Error("Specification not found")
    }

    this.specificationsRepository.create({ name, description })

  }
}


export { CreateSpecificationsService }