import { useCallback } from 'react';
import useLinesStore from '../store';
import { ItemName } from '../types';

function useBuyItem(name: ItemName) {
  const buyItem = useLinesStore((state) => state.buyItem);

  return useCallback((count = 1) => buyItem(name, count), [name, buyItem]);
}

export default useBuyItem;