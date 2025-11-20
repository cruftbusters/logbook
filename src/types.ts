export type Actions = {
  rename: (id: string, title: string) => void
}
export type Logbook = { id: string; title: string }
export type LogbookList = { items: Logbook[] }
