import { useShallow } from 'zustand/react/shallow';

import { ITEMS_CONFIG } from '../consts';
import useLinesStore from '../store';
import { BuyingMode, ItemName } from '../types';

function useItemsStats(itemName: ItemName, itemsToBuyCount: BuyingMode) {
  const { itemCount, itemsAbleToBuy } = useLinesStore(useShallow((state) => ({
    itemCount: state.itemCounts[itemName],
    itemsAbleToBuy: state.itemsAbleToBuy[itemName]
  })));
  const price = ITEMS_CONFIG[itemName].getItemsPrice(itemCount, itemsToBuyCount ==='MAX' ? itemsAbleToBuy : itemsToBuyCount);

  return { count: itemCount, price, itemsAbleToBuy };
}

export default useItemsStats;