export type ItemNameMap = {
  INTERN: string;
  JUNIOR: string;
}

export type ItemName = Lowercase<keyof ItemNameMap>;

export type ActionNames = 'increment' | 'click';

export type ItemCounts = {
  [Key in keyof ItemNameMap as `${Lowercase<Key>}Count`]: number
}

export type BuyingMode = 1 | 10 | 100 | 'MAX';

export type ItemCountsAbleToBuy = {
  [Key in keyof ItemNameMap as `${Lowercase<Key>}CountAbleToBuy`]: number
};

export type Actions = {
  buyItem: (itemName: ItemName, count?: BuyingMode) => void
} & {
  [K in ActionNames]: () => void
}

export type LinesState = ItemCounts & ItemCountsAbleToBuy & {
  actions: Actions,
  linesCount: number,
  linesInc: number,
};

