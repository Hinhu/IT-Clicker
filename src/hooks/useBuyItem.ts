import { useCallback } from 'react';
import useLinesStore from '../store';
import { BuyingMode, ItemName } from '../types';

function useBuyItem(name: ItemName) {
  const buyItem = useLinesStore((state) => state.actions.buyItem);

  return useCallback((count: BuyingMode = 1) => buyItem(name, count), [name, buyItem]);
}

export default useBuyItem;