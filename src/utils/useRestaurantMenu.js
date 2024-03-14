import { useContext, useEffect, useState } from "react";
import { MENU_URL } from "./constants";
import LocationContext from "./LocationContext";

const useRestaurantMenu = (resId) => {
  const [restInfo, setRestInfo] = useState(null);
  const { location } = useContext(LocationContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      MENU_URL +
        "lat=" +
        location.latitude +
        "&lng=" +
        location.longitude +
        "&restaurantId=" +
        resId
    );

    const json = await data.json();
    setRestInfo(json.data);
  };
  return restInfo;
};

export default useRestaurantMenu;
