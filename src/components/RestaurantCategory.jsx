import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({data, resInfo}) => {
    // console.log(data)
    // console.log(resInfo);

    const [showItems, setShowItems] = useState(true);

    const handleClick = () => {
        setShowItems(!showItems);
    }
    return (
        <div >
            <div className="category-conatiner">
            <div className="category-header" onClick={handleClick}>
                <h3>{data.title} ({data.itemCards.length})</h3>
                {showItems ? <i className={`fa-solid fa-chevron-up`}></i> : <i className={`fa-solid fa-chevron-down`}></i>}
            </div>
            {showItems && <ItemList resInfo={resInfo} items={data.itemCards} />}
            </div>
            <div className="menu-border"></div>
        </div>
    )
}

export default RestaurantCategory;