import React, { useState } from 'react';
import { ITEM_NAMES } from '../consts';
import { BuyingMode, ItemName } from '../types';
import useItemStats from '../hooks/useItemStats';
import useBuyItem from '../hooks/useBuyItem';

type ItemProps = {
  name: ItemName,
  buyingMode: BuyingMode,
}

const Item = React.memo(function Item({ name, buyingMode }: ItemProps) {
  const { count, price, itemsAbleToBuy } = useItemStats(name);
  const buyItem = useBuyItem(name);
  const canBuy = itemsAbleToBuy > 0;

  return (
    <div
      className={`flex flex-col p-[10px] border border-dashed border-black bg-slate-300 ${canBuy ? "cursor-pointer transition-colors duration-75 active:bg-slate-500" : "text-slate-500"}`}
      onClick={() => canBuy ? buyItem(buyingMode) : null}
    >
      <div className="flex justify-between">
        <div className="flex select-none">
          {name}: {count}
        </div>
        <div className="flex font-bold select-none">
          {price * (buyingMode === 'MAX' ? itemsAbleToBuy : buyingMode)}
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex text-xs select-none">
          Max: {itemsAbleToBuy}
        </div>
      </div>
    </div>
  )
})

const BUYING_MODES: BuyingMode[] = [1, 10, 100, 'MAX'];

function NavBar() {
  const [buyingMode, setBuyingMode] = useState<BuyingMode>(1);

  return (
    <div className="flex flex-col border border-solid border-black h-screen w-52 flex-grow-0">
      <div className="flex border border-solid border-black w-auto flex-grow-0">
        {BUYING_MODES.map((mode, index) => (
          <div key={index} onClick={() => setBuyingMode(mode)} className={`flex flex-grow p-[10px] border border-solid border-black select-none ${mode === buyingMode ? 'font-bold' : 'cursor-pointer transition-colors duration-75 active:bg-slate-500'}`}>
            {mode !== 'MAX' ? `${mode}x`: mode}
          </div>
        ))}
      </div>
      {ITEM_NAMES.map((itemName, index) => (
        <Item name={itemName} buyingMode={buyingMode} key={index} />
      ))}
    </div>
  )
}

export default NavBar;