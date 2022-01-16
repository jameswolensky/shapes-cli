import { Service } from 'typedi'
import Shape from '@/abstracts/shape.abstract'
import ICoordinates from '@/interfaces/coordinates.interface'

@Service()
export default class CircleService extends Shape {
	exactArgs = 3
	type = 'circle'

	addSuccessMessage (args: number[], uuid: string): string {
	  return `Shape ${uuid} added: ${this.type} with center at (${args[0]}, ${args[1]}) and radius ${args[2]}`
	}

	additionalArgumentsCheck (args: number[]): boolean {
	  const radius = args[2]
	  return radius > 0
	}

	additionalArgumentsCheckErrorMessage (args: number[]): string {
	  let errorMessage = ''
	  const radius = args[2]
	  if (radius <= 0) {
	    errorMessage = `${this.type} must have a radius greater than 0. ${radius} was provided.`
	  }
	  return errorMessage
	}

	getArea (radius: number): number {
	  return Math.abs(Math.PI * Math.pow(radius, 2))
	}

	isPointWithinShape (point: ICoordinates, args: number[]): [boolean, number] {
	  const center: ICoordinates = {
	    x: args[0],
	    y: args[1]
	  }
	  const radius: number = args[2]
	  const result = (Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2) < Math.pow(radius, 2))
	  const area = this.getArea(radius)
	  return [result, area]
	}
}
