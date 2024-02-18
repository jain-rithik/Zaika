import React from "react";
import { CDN_URL } from "../utils/constants";

const Shimmer = () => {
  // You can adjust the number of shimmer items based on your design
  const shimmerItems = Array.from({ length: 20 }, (_, index) => index + 1);

  return (
    <div className="Food-menu">
      <div className="Food-card">
        {shimmerItems.map((item) => (
          <div key={item} className="shimmer-item">
            <div className="shimmer-img"></div>
            <div className="shimmer-details">
              <div className="shimmer-title"></div>
              <div className="shimmer-rating"></div>
              <div className="shimmer-category"></div>
              <div className="shimmer-cost"></div>
              <div className="shimmer-time"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ResMenuShimmer = () => {
  return (
    <>
      <div className="menu-conatiner">
        <div className="menu-header shimmer-menu-header">
          <div className="menu">
            <div></div>
            <div></div>
            <div></div>
            <br />
            <div></div>
            <div></div>
          </div>
          <div className="rating">
            <div className="shimmer-rating-box"></div>
          </div>
        </div>
        <div className="menu-info">
          <div className="shimmer-menu-animate shimmer-menu-info"></div>
        </div>
        <div className="menu-price">
          <div className="shimmer-menu-animate shimmer-menu-price"></div>
        </div>
        <div className="menu-border"></div>
        <div className="category-conatiner">
          <div className="category-header">
            <div className="shimmer-menu-animate shimmer-category-header"></div>
          </div>
          {Array(10)
            .fill("")
            .map((item, i) => {
              return (
                <div className="item-container" key={"res-menu-list" + i}>
                  <div className="item-info shimmer-item-info">
                    <div className="shimmer-menu-animate"></div>
                    <div className="shimmer-menu-animate"></div>
                    <div className="shimmer-menu-animate"></div>
                    <span className="shimmer-menu-animate"></span>
                  </div>
                  <div className="item-img">
                    <div className="shimmer-menu-animate shimmer-item-img"></div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Shimmer;
