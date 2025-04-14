export type ItemNameMap = {
  INTERN: string;
  JUNIOR: string;
}

export type ItemName = Lowercase<keyof ItemNameMap>;

export type ActionNames = 'increment' | 'click';

export type ItemsNumMap = {
  [Key in ItemName]: number
}

export type ItemConfig = {
  basePrice: number,
  baseLinesInc: number,
  getAmountOfItemsAbleToBuy: (currentLines: number, currentItemCount: number) => number,
  getItemsPrice: (currentItemCount: number, itemsToBuyCount: number) => number
}

export type ItemsConfig = {
  [Key in ItemName]: ItemConfig
}

export type BuyingMode = 1 | 10 | 100 | 'MAX';


export type Actions = {
  buyItem: (itemName: ItemName, count?: BuyingMode) => void
} & {
  [K in ActionNames]: () => void
}

export type LinesState = {
  actions: Actions,
  linesCount: number,
  linesInc: number,
  itemCounts: ItemsNumMap,
  itemsAbleToBuy: ItemsNumMap
};

