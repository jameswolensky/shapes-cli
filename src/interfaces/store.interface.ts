export default interface IStore {
	dataKey: string
	Store: any
	get(): any
	add(key: string, value: any): void
	destroy(): void
	update(currentStore: any): void
}
