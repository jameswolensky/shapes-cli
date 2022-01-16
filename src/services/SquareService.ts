import { Service } from 'typedi'
import Shape from '@/abstracts/shape.abstract'
import ICoordinates from '@/interfaces/coordinates.interface'

@Service()
export default class SquareService extends Shape {
	exactArgs = 3
	type = 'square'

	addSuccessMessage (args: number[], uuid: string): string {
	  return `Shape ${uuid} added: ${this.type} with top-right corner at (${args[0]}, ${args[1]}) and a side length of ${args[2]}`
	}

	additionalArgumentsCheck (args: number[]): boolean {
	  const side = args[2]
	  return side > 0
	}

	additionalArgumentsCheckErrorMessage (args: number[]): string {
	  let errorMessage = ''
	  const side = args[2]
	  if (side <= 0) {
	    errorMessage = `${this.type} must have a side length greater than 0. ${side} was provided.`
	  }
	  return errorMessage
	}

	getArea (length: number): number {
	  return Math.abs(Math.pow(length, 2))
	}

	isPointWithinShape (point: ICoordinates, args: number[]): [boolean, number] {
	  const length = args[2]
	  const v0: ICoordinates = {
	    x: args[0],
	    y: args[1]
	  }
	  const v2: ICoordinates = {
	    x: v0.x - length,
	    y: v0.y - length
	  }
	  const result = point.x > v2.x && point.x < v0.x && point.y > v2.y && point.y < v0.y
	  const area = this.getArea(length)
	  return [result, area]
	}
}
