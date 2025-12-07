export interface Actions {
  create(): void
  delete(id: string): void
  rename(id: string, title: string): void
}
export type Logbook = { id: string; title: string }
export type LogbookList = { items: Logbook[] }
