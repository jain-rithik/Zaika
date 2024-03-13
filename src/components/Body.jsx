import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import OfflinePage from "./OfflinePage";
import LocationContext from "../utils/LocationContext";
import CityContext from "../utils/CityContext";
import toast from "react-hot-toast";
import noresult from "../../logos/no-results.png"

const Body = () => {
  const [listOfRest, setListOfRest] = useState([]);
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  let [title, setTitle] = useState("");
  const { location } = useContext(LocationContext);
  const { setCity } = useContext(CityContext);

  useEffect(() => {
    fetchData();
  }, [location]);

  const fetchData = async () => {
    const data = await fetch(
      `https://corsproxy.org/?https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D${location.latitude}%26lng%3D${location.longitude}`
    );
    // "https://instafood.onrender.com/api/restaurants?lat=19.0918606&lng=72.8825928"
    const json = await data.json();

    console.log(json);

    setListOfRest(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setCity(
      json?.data?.cards[
        json?.data?.cards.length - 1
      ]?.card?.card?.citySlug?.toUpperCase() || ""
    );

    // Extract unique identifiers from existing objects
    const existingIds = new Set(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants.map(
        (rest) => rest.info.id
      )
    );

    // Filter additional objects based on unique identifiers
    const additionalRestaurants =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants.filter(
        (rest) => !existingIds.has(rest.info.id)
      );

    // Update state with additional unique objects
    setListOfRest((prevList) => [
      ...(prevList || []),
      ...(additionalRestaurants || []),
    ]);
    setfilteredRestaurant((prevList) => [
      ...(prevList || []),
      ...(additionalRestaurants || []),
    ]);

    title =
      json?.data?.cards[1]?.card?.card?.header?.title ||
      "Top restaurant chains";
    setTitle(title);

    if (
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants === undefined
    ) {
      fetchMobileData();
    }
  };

  const fetchMobileData = async () => {
    const mData = await fetch(
      `https://corsproxy.org/?https%3A%2F%2Fwww.swiggy.com%2Fmapi%2Fhomepage%2FgetCards%3Flat%3D${location.latitude}%26lng%3D${location.longitude}`
    );

    const json = await mData.json();

    setListOfRest(
      json.data.success.cards[4].gridWidget.gridElements.infoWithStyle
        .restaurants
    );
    setfilteredRestaurant(
      json.data.success.cards[4].gridWidget.gridElements.infoWithStyle
        .restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) return <OfflinePage />;

  return listOfRest.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            className="search-box"
            type="text"
            placeholder="Search for restaurants, cuisines"
            value={searchText}
            onChange={(e) => {
              const searchTextValue = e.target.value.toLowerCase();
              setSearchText(searchTextValue);

              if (searchTextValue === "") {
                setfilteredRestaurant(listOfRest);
              } else {
                const filteredList = listOfRest.filter(
                  (res) =>
                    res.info.name.toLowerCase().includes(searchTextValue) ||
                    res.info.cuisines.some((cuisine) =>
                      cuisine.toLowerCase().includes(searchTextValue)
                    )
                );
                setfilteredRestaurant(filteredList);
              }
            }}
          />
          <div
            className="search-icon"
            onClick={() => {
              console.log(searchText);
              setSearchText("");
            }}
          >
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ color: "#939393" }}
            ></i>
          </div>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            setfilteredRestaurant(listOfRest);
            toast.success("All Restaurants Displayed");
          }}
        >
          All Restaurants
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredRest = listOfRest.filter(
              (res) => res.info.avgRating > 4.3
            );
            setfilteredRestaurant(filteredRest);
            toast.success("Highly Rated Restaurants");
          }}
        >
          Ratings 4.3+
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredRest = listOfRest.filter(
              (res) => res?.info?.veg === true
            );
            setfilteredRestaurant(filteredRest);
            toast.success("Showing Pure Veg Restaurants");
          }}
        >
          Pure Veg
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredRest = listOfRest.filter(
              (res) => res?.info?.sla?.deliveryTime <= 25
            );
            setfilteredRestaurant(filteredRest);
            toast.success("Fast Delivery Restaurants Displayed");
          }}
        >
          Fast Delivery
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredRest = listOfRest.filter((res) => {
              const costForTwo = parseInt(
                res?.info?.costForTwo
                  .replace("₹", "")
                  .replace(" for two", "")
                  .trim()
              );
              return costForTwo <= 300;
            });
            setfilteredRestaurant(filteredRest);
            toast.success("Budget-Friendly Restaurants Displayed");
          }}
        >
          Less than ₹300
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredRest = listOfRest.filter((res) => {
              const costForTwo = parseInt(
                res?.info?.costForTwo
                  .replace("₹", "")
                  .replace(" for two", "")
                  .trim()
              );
              return costForTwo > 300 && costForTwo <= 600;
            });
            setfilteredRestaurant(filteredRest);
            toast.success("Discover Dining Deals: ₹300 - ₹600");
          }}
        >
          Range: ₹300 - ₹600
        </button>
      </div>
      <div className="Food-menu">
        <h2 className="food-menu-title">{title}</h2>
        {filteredRestaurant.length === 0 ? (
          <div className="no-results-found">
            <img
              src={noresult}
              alt="Search Results Are Finished - No Results Found Cartoon@clipartmax.com"
            />
          </div>
        ) : (
          <div className="Food-card">
            {filteredRestaurant.map((restaurant) => (
              <Link
                key={restaurant.info.id}
                to={"/restaurants/" + restaurant.info.id}
              >
                <RestaurantCard resData={restaurant} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
