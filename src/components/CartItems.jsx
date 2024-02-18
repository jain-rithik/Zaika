import { useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity, removeItem } from "../utils/cartSlice";

const CartItems = ({ items }) => {
  console.log(items);
  const dispatch = useDispatch();

  const handleRemoveItem = (index) => {
    dispatch(removeItem(index));
  }

  const handleIncrement = (index) => {
    dispatch(incrementQuantity(index))
  }

  const handleDecrement = (index) => {
    dispatch(decrementQuantity(index))
  }

  return (
    <div>
      {items.map((item, index) => (
        <div key={item.card.info.id} className="cart-item-container">
          <div className="item-name">
            {item.card.info.itemAttribute.vegClassifier === "VEG" ? (
              <i id="veg-logo" className="fa-regular fa-circle-stop"></i>
            ) : (
              <i id="nonveg-logo" className="fa-regular fa-square-caret-up"></i>
            )}
            <p>{item.card.info.name}</p>
          </div>
          <div className="item-price">
            <div className="inc-dec-count">
            <div className="minus-counter" onClick={() => handleDecrement(index)}>-</div>
            <span>{item.quantity}</span>
            <div className="plus-counter" onClick={() => handleIncrement(index)}>+</div>
            </div>
            <h4>
              ₹
              {(item.card.info.price
                ? item.card.info.price / 100 * item.quantity
                : item.card.info.defaultPrice / 100 * item.quantity).toFixed(2)}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
