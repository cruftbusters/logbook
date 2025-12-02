export type LogbookList = { items: Logbook[] }
export type Logbook = { id: string; title: string; sheet: Sheet }
export type Sheet = string[][]
