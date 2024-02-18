import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";
import CDN_URL from "../utils/constants";
import CartItems from "./CartItems";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const restaurantInfo = useSelector((store) => store.cart.restaurant);
  // console.log(restaurantInfo);

  useEffect(() => {
    // Calculate total price when cartItems change
    const calculateTotalPrice = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.card.info.price
          ? item.card.info.price / 100 * item.quantity
          : item.card.info.defaultPrice / 100 * item.quantity;
      });
      total = Number(total.toFixed(2));
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  useEffect(() => {
    // Calculate total amount when totalPrice or other relevant values change
    const calculateTotalAmount = () => {
      // Add GST and restaurant charges to totalPrice
      const gstAndCharges = Number((totalPrice * 0.18).toFixed(2)); // Assuming GST is 18%

      console.log(restaurantInfo?.feeDetails?.totalFee / 100 || 0)

      // Update the total amount
      const finalTotalAmount = Number((totalPrice + (restaurantInfo?.feeDetails?.totalFee / 100 || 0) + gstAndCharges).toFixed(2));
      setTotalAmount(
        (finalTotalAmount)
      );
    };

    calculateTotalAmount();
  }, [totalPrice, restaurantInfo?.feeDetails?.totalFee]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return cartItems.length === 0 ? (
    <div className="empty-cart">
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
        alt=""
      />
      <h3>Your cart is empty</h3>
      <p>You can go to home page to view more restaurants</p>
      <Link
            className="btn-style btn-add"
            to={"/"}
          >
            <span>SEE RESTAURANTS NEAR YOU</span>
          </Link>
    </div>
  ) : (
    <div className="cart">
      <h3 className="cart-h3">Cart</h3>
      <div className="cart-container">
        <div className="cart-header">
          <div className="cart-header-content menu">
            <h3>{restaurantInfo.name}</h3>
            <p>{restaurantInfo.cuisines.join(", ")}</p>
            <p>
              {restaurantInfo.locality},{" "}
              {restaurantInfo.sla.lastMileTravelString}
            </p>
            <div className="menu-price-constainer">
              <svg
                className="RestaurantTimeCost_icon__8UdT4"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <circle
                  r="8.35"
                  transform="matrix(-1 0 0 1 9 9)"
                  stroke="#3E4152"
                  strokeWidth="1.3"
                ></circle>
                <path
                  d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z"
                  fill="#3E4152"
                ></path>
              </svg>
              <span>
                {restaurantInfo.sla.minDeliveryTime}-
                {restaurantInfo.sla.maxDeliveryTime} MINS
              </span>
            </div>
          </div>
          <img src={CDN_URL + restaurantInfo.cloudinaryImageId} alt="" />
        </div>
        <div className="cart-items">
          <CartItems items={cartItems} />
        </div>
        <div className="cart-btns">
          <button className="btn-style" onClick={() => {
            handleClearCart();
            toast.success("Cart cleared. Happy shopping")
          }}>
            <span>Clear Cart</span>
          </button>
          <Link
            className="btn-style btn-add"
            to={"/restaurants/" + restaurantInfo.id}
          >
            <span>Add More Items</span>
          </Link>
        </div>
        <div className="cart-bill">
          <p className="heading-bill">Bill Details</p>
          <div className="bill-item">
            <p>Item Total</p>
            <p>₹{totalPrice}</p>
          </div>
          <div className="bill-item">
            <p>Delivery Fee | {restaurantInfo.sla.lastMileTravelString}</p>
            <p>₹{restaurantInfo.feeDetails.totalFee / 100 || 0}</p>
          </div>
          <div className="bill-item">
            <p>GST and Restaurant Charges</p>
            <p>₹{(totalPrice * 0.18).toFixed(2)}</p>
          </div>
          <div className="bill-total bill-item">
            <p>To Pay</p>
            <p>₹{totalAmount}</p>
          </div>
        </div>
      </div>
      <div className="order-btn">
        <Link onClick={() => {
          toast("Please use swiggy or zomato to place your order!!", {
            icon: '😁',
            style: {
              textAlign: "center",
            },
            duration: 2500,
          }),
          handleClearCart();
        }} to={"/"}>Place Order</Link>
      </div>
    </div>
  );
};

export default Cart;
