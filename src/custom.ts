export type RecordItem = {
  money: number,
  type: string,
  notes: string,
  tags: Tag[],
  time?: string
}

export type Tag = {
  id: string,
  name: string
}

