import { Service } from 'typedi'
import Conf from 'conf'
import IStore from '@/interfaces/store.interface'

@Service()
export default class StoreService implements IStore {
	dataKey = 'shapes'
	Store: any

	constructor () {
	  this.Store = new Conf()
	}

	get (): any {
	  return this.Store.get(this.dataKey) ?? {}
	}

	add (key: string, value: any): void {
	  const currentStore = this.get()
	  currentStore[key] = value
	  this.update(currentStore)
	}

	destroy (): void {
	  this.update({})
	}

	update (currentStore: any): void {
	  this.Store.set(this.dataKey, currentStore)
	}
}
