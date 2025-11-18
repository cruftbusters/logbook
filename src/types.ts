export type Logbook = LogbookData & LogbookMethods
export type LogbookData = { title: string }
export type LogbookMethods = {
  delete: () => void
  rename: (value: string) => void
}
