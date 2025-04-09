export type ItemNameMap = {
  INTERN: string;
  JUNIOR: string;
}

export type ItemName = Lowercase<keyof ItemNameMap>;

export type ActionNames = 'increment' | 'click';

export type ItemCounts = {
  [Key in keyof ItemNameMap as `${Lowercase<Key>}Count`]: number
}

export type ItemCountsAbleToBuy = {
  [Key in keyof ItemNameMap as `${Lowercase<Key>}CountAbleToBuy`]: number
}

export type Actions = {
  [K in ActionNames]: () => void
}


export type LinesState = ItemCounts & ItemCountsAbleToBuy & Actions & {
  linesCount: number,
  linesInc: number,
  buyItem: (itemName: ItemName, count?: number) => void,
};




