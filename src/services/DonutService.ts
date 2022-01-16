import { Service, Container } from 'typedi'
import Shape from '@/abstracts/shape.abstract'
import ICoordinates from '@/interfaces/coordinates.interface'
import CircleService from '@/services/CircleService'

@Service()
export default class DonutService extends Shape {
	exactArgs = 4
	type = 'donut'

	addSuccessMessage (args: number[], uuid: string): string {
	  return `Shape ${uuid} added: ${this.type} with center at (${args[0]}, ${args[1]}) and radius1 ${args[2]} and radius2 ${args[3]}`
	}

	additionalArgumentsCheck (args: number[]): boolean {
	  const radius1 = args[2]
	  const radius2 = args[3]
	  return radius1 !== radius2 && radius1 > 0 && radius2 > 0
	}

	additionalArgumentsCheckErrorMessage (args: number[]): string {
	  let errorMessage = ''
	  const radius1 = args[2]
	  const radius2 = args[3]
	  if (radius1 <= 0 || radius2 <= 0) {
	    errorMessage = `${this.type} must have radii greater than 0. ${radius1} and ${radius2} was provided.`
	  } else if (radius1 === radius2) {
	    errorMessage = `${this.type} must have two different radii lengths. ${radius1} and ${radius2} was provided.`
	  }
	  return errorMessage
	}

	getArea (radius1: number, radius2: number): number {
	  const largerRadius = Math.max(radius1, radius2)
	  const smallerRadius = Math.min(radius1, radius2)
	  const outerCircleArea = Container.get(CircleService).getArea(largerRadius)
	  const innerCircleArea = Container.get(CircleService).getArea(smallerRadius)
	  return Math.abs(outerCircleArea - innerCircleArea)
	}

	isPointWithinShape (point: ICoordinates, args: number[]): [boolean, number] {
	  const center: ICoordinates = {
	    x: args[0],
	    y: args[1]
	  }
	  const radius1 = args[2]
	  const radius2 = args[3]
	  const largerRadius = Math.max(radius1, radius2)
	  const smallerRadius = Math.min(radius1, radius2)
	  const result = (Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2) < Math.pow(largerRadius, 2)) && !(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2) < Math.pow(smallerRadius, 2))
	  const area = this.getArea(radius1, radius2)
	  return [result, area]
	}
}
