import { Specifications } from '../../model/Specifications'

interface ICreateSpecificationDTO {
  name: string,
  description: string
}

interface ISpeciticationsRepository  {
  create({ name, description }: ICreateSpecificationDTO): void;
  findByName(name: string):Specifications;
}

export { ICreateSpecificationDTO, ISpeciticationsRepository }