import { Container } from 'typedi'
import ICoordinates from '@/interfaces/coordinates.interface'
import NotificationService from '@/services/NotificationService'
import StoreService from '@/services/StoreService'
import { v4 as uuidV4 } from 'uuid'

export default abstract class Shape {
	abstract exactArgs: number
	abstract type: string
	abstract addSuccessMessage(args: number[], uuid: string): string
	abstract getArea(...args: any): number
	abstract isPointWithinShape(point: ICoordinates, args: number[]): [boolean, number]
	abstract additionalArgumentsCheck(args: number[]): boolean
	abstract additionalArgumentsCheckErrorMessage(args: number[]): string
	add (args: any): void {
	  if (!args || args.length === 0) {
	    Container.get(NotificationService).error('No arguments provided.')
	    return
	  } else if (args.length !== this.exactArgs) {
	    Container.get(NotificationService).error(`${this.type} requires exactly ${this.exactArgs} arguments. ${args.length} provided.`)
	    return
	  } else if (!args.every((arg: any) => parseFloat(arg) === arg)) {
	    Container.get(NotificationService).error('All arguments must be numeric.')
	    return
	  } else if (!this.additionalArgumentsCheck(args)) {
	    Container.get(NotificationService).error(this.additionalArgumentsCheckErrorMessage(args))
	    return
	  }
	  const uuidStr: string = uuidV4()
	  try {
	    Container.get(StoreService).add(uuidStr, [this.type, ...args])
	    Container.get(NotificationService).success(this.addSuccessMessage(args, uuidStr))
	  } catch (e) {
	    Container.get(NotificationService).error(`There was an error adding the ${this.type}. Please try again.`)
	  }
	}
}
