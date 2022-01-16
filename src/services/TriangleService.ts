import { Service } from 'typedi'
import Shape from '@/abstracts/shape.abstract'
import ICoordinates from '@/interfaces/coordinates.interface'

@Service()
export default class TriangleService extends Shape {
	exactArgs = 6
	type = 'triangle'

	addSuccessMessage (args: number[], uuid: string): string {
	  return `Shape ${uuid} added: ${this.type} with vertices at (${args[0]}, ${args[1]}), (${args[2]}, ${args[3]}), (${args[4]}, ${args[5]})`
	}

	additionalArgumentsCheck (args: number[]): boolean {
	  const v0: ICoordinates = {
	    x: args[0],
	    y: args[1]
	  }
	  const v1: ICoordinates = {
	    x: args[2],
	    y: args[3]
	  }
	  const v2: ICoordinates = {
	    x: args[4],
	    y: args[5]
	  }
	  return JSON.stringify(v0) !== JSON.stringify(v1) && JSON.stringify(v1) !== JSON.stringify(v2) && JSON.stringify(v0) !== JSON.stringify(v2)
	}

	additionalArgumentsCheckErrorMessage (args: number[]): string {
	  let errorMessage = ''
	  const v0: ICoordinates = {
	    x: args[0],
	    y: args[1]
	  }
	  const v1: ICoordinates = {
	    x: args[2],
	    y: args[3]
	  }
	  const v2: ICoordinates = {
	    x: args[4],
	    y: args[5]
	  }
	  if (JSON.stringify(v0) === JSON.stringify(v1) || JSON.stringify(v1) === JSON.stringify(v2) || JSON.stringify(v0) === JSON.stringify(v2)) {
	    errorMessage = `${this.type} must have unique vertices. (${args[0]}, ${args[1]}), (${args[2]}, ${args[3]}), (${args[4]}, ${args[5]}) was provided.`
	  }
	  return errorMessage
	}

	getArea (vertices: ICoordinates[]): number {
	  const v0: ICoordinates = vertices[0]
	  const v1: ICoordinates = vertices[1]
	  const v2: ICoordinates = vertices[2]
	  return (-v1.y * v2.x + v0.y * (-v1.x + v2.x) + v0.x * (v1.y - v2.y) + v1.x * v2.y) / 2
	}

	isPointWithinShape (point: ICoordinates, args: number[]): [boolean, number] {
	  const v0: ICoordinates = {
	    x: args[0],
	    y: args[1]
	  }
	  const v1: ICoordinates = {
	    x: args[2],
	    y: args[3]
	  }
	  const v2: ICoordinates = {
	    x: args[4],
	    y: args[5]
	  }
	  const area = this.getArea([v0, v1, v2])
	  const d = 1 / (2 * area)
	  const s = d * (v0.y * v2.x - v0.x * v2.y + (v2.y - v0.y) * point.x + (v0.x - v2.x) * point.y)
	  const t = d * (v0.x * v1.y - v0.y * v1.x + (v0.y - v1.y) * point.x + (v1.x - v0.x) * point.y)
	  const result = s >= 0 && t >= 0 && (s + t) < 1
	  return [result, Math.abs(area)]
	}
}
