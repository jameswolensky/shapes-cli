import { Service } from 'typedi'
import Shape from '@/abstracts/shape.abstract'
import ICoordinates from '@/interfaces/coordinates.interface'

@Service()
export default class EllipseService extends Shape {
	exactArgs = 4
	type = 'ellipse'

	addSuccessMessage (args: number[], uuid: string): string {
	  return `Shape ${uuid} added: ${this.type} with center at (${args[0]}, ${args[1]}) and axes ${args[2]} and ${args[3]}`
	}

	additionalArgumentsCheck (args: number[]): boolean {
	  const axis1 = args[2]
	  const axis2 = args[3]
	  return axis1 !== axis2 && axis1 > 0 && axis2 > 0
	}

	additionalArgumentsCheckErrorMessage (args: number[]): string {
	  let errorMessage = ''
	  const axis1 = args[2]
	  const axis2 = args[3]
	  if (axis1 <= 0 || axis2 <= 0) {
	    errorMessage = `${this.type} must have axes greater than 0. ${axis1} and ${axis2} was provided.`
	  } else if (axis1 === axis2) {
	    errorMessage = `${this.type} must have two different axes lengths. ${axis1} and ${axis2} was provided.`
	  }
	  return errorMessage
	}

	getArea (axis1: number, axis2: number): number {
	  return Math.abs(Math.PI * axis1 * axis2)
	}

	isPointWithinShape (point: ICoordinates, args: number[]): [boolean, number] {
	  const center: ICoordinates = {
	    x: args[0],
	    y: args[1]
	  }
	  const axis1: number = args[2]
	  const axis2: number = args[3]
	  const majorAxis: number = Math.max(axis1, axis2)
	  const minorAxis: number = Math.min(axis1, axis2)
	  const result = (Math.pow(point.x - center.x, 2) / Math.pow(majorAxis, 2)) + (Math.pow(point.y - center.y, 2) / Math.pow(minorAxis, 2)) < 1
	  const area = this.getArea(axis1, axis2)
	  return [result, area]
	}
}
