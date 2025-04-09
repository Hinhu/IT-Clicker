import React from 'react';
import { ITEM_NAMES } from '../consts';
import { ItemName } from '../types';
import useItemStats from '../hooks/useItemStats';
import useBuyItem from '../hooks/useBuyItem';

type ItemProps = {
  name: ItemName
}

const Item = React.memo(function Item({ name }: ItemProps) {
  const { count, price, itemsAbleToBuy } = useItemStats(name);
  const buyItem = useBuyItem(name);
  const canBuy = itemsAbleToBuy > 0;

  return (
    <div
    className={`flex justify-between p-[10px] border border-dashed border-black bg-slate-300 ${canBuy ? "cursor-pointer transition-colors duration-75 active:bg-slate-500" : "text-slate-500"}`}
    onClick={() => canBuy ? buyItem() : null}
    >
      <div className="flex">
        {name}: {count}
      </div>
      <div className="flex font-bold">
        {price}
      </div>
    </div>
  )
})

function NavBar() {
  return (
    <div className="flex flex-col border border-solid border-black h-screen w-52 flex-grow-0">
      {ITEM_NAMES.map((itemName, index) => (
        <Item name={itemName} key={index} />
      ))}
    </div>
  )
}

export default NavBar;