import { Service } from 'typedi'
import Shape from '@/abstracts/shape.abstract'
import ICoordinates from '@/interfaces/coordinates.interface'

@Service()
export default class ReactangleService extends Shape {
	exactArgs = 4
	type = 'rectangle'

	addSuccessMessage (args: number[], uuid: string): string {
	  return `Shape ${uuid} added: ${this.type} with top-right corner at (${args[0]}, ${args[1]}) and a side length of ${args[2]} and ${args[3]}`
	}

	additionalArgumentsCheck (args: number[]): boolean {
	  const side1 = args[2]
	  const side2 = args[3]
	  return side1 !== side2 && side1 > 0 && side2 > 0
	}

	additionalArgumentsCheckErrorMessage (args: number[]): string {
	  let errorMessage = ''
	  const side1 = args[2]
	  const side2 = args[3]
	  if (side1 <= 0 || side2 <= 0) {
	    errorMessage = `${this.type} must have side lengths greater than 0. ${side1} and ${side2} was provided.`
	  } else if (side1 === side2) {
	    errorMessage = `${this.type} must have two different side lengths. ${side1} and ${side2} was provided.`
	  }
	  return errorMessage
	}

	getArea (length1: number, length2: number): number {
	  return Math.abs(length1 * length2)
	}

	isPointWithinShape (point: ICoordinates, args: number[]): [boolean, number] {
	  const longSide = Math.max(args[2], args[3])
	  const shortSide = Math.min(args[2], args[3])
	  const v0: ICoordinates = {
	    x: args[0],
	    y: args[1]
	  }
	  const v2: ICoordinates = {
	    x: v0.x - longSide,
	    y: v0.y - shortSide
	  }
	  const result = point.x > v2.x && point.x < v0.x && point.y > v2.y && point.y < v0.y
	  const area = this.getArea(longSide, shortSide)
	  return [result, area]
	}
}
