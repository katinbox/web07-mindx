import { Item, Image } from "./CategoryItem.style";
const CategoryItem = ({ item, actions, isSelect }) => {
  return (
    <Item
      onClick={() => actions.handleItemSelected(item.id)}
      bg={isSelect ? "var(--aqua)" : ""}
    >
      <Image src={item.img} alt={item.title} />
      <h5>{item.title}</h5>
    </Item>
  );
};

export default CategoryItem;
