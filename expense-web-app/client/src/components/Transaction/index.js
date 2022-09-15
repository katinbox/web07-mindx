import moment from "moment";
import {
  Item,
  ItemImg,
  ItemDesc,
  ItemAmount,
  RemoveIcon,
} from "./Transaction.style";
import useCategories from "../../hooks/useCategories";
import {
  CATEGORIES_IMG_PATH,
  DECREASE_ARROW,
  INCREASE_ARROW,
  STATUS_IMG_PATH,
} from "../../constants/imageSrc";
import { EXPENSES } from "../../constants/transactionTypes";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useState } from "react";

const Transaction = ({ item, actions }) => {
  const categories = useCategories();
  const [remove, setRemove] = useState(false);
  const cat = categories.find((category) => category.id === item.category);
  const { name: catTitle, img, type } = cat;
  const arrow = type === EXPENSES ? DECREASE_ARROW : INCREASE_ARROW;
  const date = moment(item.date).fromNow();
  const handleDrag = (_e, info) => {
    setRemove(() => (info.offset.x < 0 ? true : false));
  };

  return (
    <Item
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
      onClick={() => actions.handleShowPopup(item, true)}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={handleDrag}
      layout
    >
      <AnimateSharedLayout>
        <ItemImg>
          <img src={`${CATEGORIES_IMG_PATH}${img}`} alt="{catTitle}" />
        </ItemImg>
        <ItemDesc>
          <h4>{catTitle}</h4>
          <span>{date}</span>
        </ItemDesc>
        <ItemAmount layout>
          <h4>{`$${item.amount}`}</h4>
          <img src={`${STATUS_IMG_PATH}${arrow}.png`} alt={`${arrow}`} />
        </ItemAmount>
        <AnimatePresence>
          {remove && <RemoveIcon handleRemoveTrans={actions.removeTrans} />}
        </AnimatePresence>
      </AnimateSharedLayout>
    </Item>
  );
};

export default Transaction;
