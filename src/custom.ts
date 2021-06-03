export type RecordItem = {
  money: number,
  type: string,
  notes: string,
  tags: Tag[],
  time?: Date
}

export type Tag = {
  id: string,
  name: string
}

