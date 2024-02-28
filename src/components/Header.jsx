import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LocationContext from "../utils/LocationContext";
import CityContext from "../utils/CityContext";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const [showNavItems, setShowNavItems] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const onlineStatus = useOnlineStatus();
  const [nearMe, setNearMe] = useState(false);
  const { setLocation } = useContext(LocationContext);
  const { city } = useContext(CityContext);

  const cartItems = useSelector((store) => store.cart.items);

  const handleLocationNearMe = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position?.coords;
      setLocation({
        latitude: latitude,
        longitude: longitude,
      });
      setNearMe(true);
    });
  };

  const handleLocationDefault = () => {
    setLocation({
      latitude: 12.9716,
      longitude: 77.5946,
    });
    setNearMe(false);
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleNavItems = () => {
    setShowNavItems(!showNavItems);
  };

  return (
    <>
      <div className="header">
        <div className="logo-container">
          <Link to={"/"}>
            <img
              alt="logo"
              className="logo"
              src={require("../../logos/logo.png")}
            />
          </Link>
          {nearMe ? (
            <div
              onClick={() => {
                handleLocationDefault();
                toast.success("Switched to Default Location Bangalore");
              }}
            >
              <Link to={"/"}>
                <button>Default Location</button>
              </Link>
              <p>{city}</p>
            </div>
          ) : (
            <div
              onClick={() => {
                handleLocationNearMe();
                toast.success(`Switched to Nearby Location`);
              }}
            >
              <Link to={"/"}>
                <button>📍Locate Me</button>
              </Link>
              <p>{city}</p>
            </div>
          )}
        </div>
        <div className="nav-items">
          <div className="menu-icon" onClick={toggleNavItems}>
            <span>
              <i className="fa-solid fa-bars"></i>
            </span>
          </div>
          <ul className={`nav-list ${showNavItems ? "show" : ""}`}>
            <li>
              {" "}
              <Link className="h-item" to={"/"}>
                {" "}
                <span>
                  <i className="fa-solid fa-house"></i>
                </span>{" "}
                Home
              </Link>{" "}
            </li>
            <li>
              <Link className="h-item" to={"/about"}>
                <span>
                  <i className="fa-brands fa-react"></i>
                </span>{" "}
                About
              </Link>
            </li>
            {/* <li><Link className="h-item" to={"/contact"}><span><i class="fa-solid fa-address-book"></i></span> Contact</Link></li> */}
            {/* <li><Link to={"/grocery"}>Grocery</Link></li> */}
            <li>
              <Link className="h-item h-cart" to={"/cart"}>
                <span>
                  <i className="fa-solid fa-cart-shopping"></i>
                </span>{" "}
                Cart<p>{totalQuantity}</p>
              </Link>
            </li>

            <div
              onClick={() => {
                btnName === "Login"
                  ? (setBtnName("Logout"), toast.success("User Logged In"))
                  : (setBtnName("Login"), toast.success("User Logged Out"));
              }}
              className="login"
            >
              <span>
                <i className="fa-solid fa-user"></i>
              </span>
              {btnName}
            </div>
            <li className="h-online">
              Online Status: {onlineStatus ? "🟢" : "🔴"}
            </li>
          </ul>
        </div>
      </div>
      <div className="empty"></div>
    </>
  );
};

export default Header;
