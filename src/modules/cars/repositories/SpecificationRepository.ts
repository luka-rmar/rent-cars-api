import { ICreateSpecificationDTO, ISpeciticationsRepository } from './ISpecificationReposiroty'
import { Specifications } from '../model/Specifications'

class SpecificationsRepository implements  ISpeciticationsRepository {
  private specifications: Specifications[]

  constructor(){
    this.specifications = []
  }
  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specifications()

    Object.assign(specification, {
      name,
      description,
      created_at: new Date()
    })

    this.specifications.push(specification)
  }

  findByName(name: string): Specifications {
    const specification = this.specifications.find(specification => specification.name === name);

    return specification;
  }
}

export { SpecificationsRepository }