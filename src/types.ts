export interface Actions {
  create(): void
  createSheet(id: string): void
  delete(id: string): void
  deleteSheet(id: string, sheetId: any): void
  rename(id: string, title: string): void
}

export type LogbookList = { items: Logbook[] }
export type Logbook = { id: string; title: string; sheets: Sheet[] }
export type Sheet = {
  id: string
  title: string
}
