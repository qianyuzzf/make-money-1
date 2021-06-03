export type RecordItem = {
  money: number,
  type: string,
  notes: string,
  tags: string[],
  time?: Date
}

export type Tag = {
  id: string,
  name: string
}

