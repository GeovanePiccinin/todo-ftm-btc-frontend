import { useContext, memo } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./ItemsLeft.module.css";
import clsx from "clsx";

const ItemsLeft = memo(function ItemsLeft({ itemsLeft }) {
  const { theme } = useContext(ThemeContext);

  console.log("Rendering ItemsLeft");

  return (
    <p className={clsx(styles.itemsLeft, styles[`itemsLeft-${theme}`])}>
      {" "}
      Items Left {itemsLeft}
    </p>
  );
});
export default ItemsLeft;
