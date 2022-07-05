import React from "react";
import { motion } from "framer-motion";
import { items } from './data';

const MenuItemsInline = () => {
  const [focused, setFocused] = React.useState(null);

  return (
    <ul
      className="gap-x-size-xs-sm hidden prose:flex text-size-0 font-light"
      onMouseLeave={() => setFocused(null)}
    >
      {items.map((item, i) => (
        <li
          className="relative"
          key={item.name}
          onMouseEnter={() => setFocused(i)}
        >
          <a href={item.link}>{item.name}</a>
          {focused === i ? (
            <motion.div
              className="bg-alice-400 h-[2px] absolute inset-x-0 bottom-0"
              layoutId="underline"
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default MenuItemsInline;
