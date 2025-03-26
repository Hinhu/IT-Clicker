import React from 'react';

function Item() {
  return (
    <div className="flex p-[10px] border border-dashed border-black bg-slate-300 transition-colors duration-75 active:bg-slate-500">
      Item
    </div>
  )
}

function NavBar() {

  return (
    <div className="flex flex-col border border-solid border-black h-screen w-52 flex-grow-0">
      <Item />
      <Item />
      <Item />
      <Item />

    </div>
  )
}

export default NavBar;