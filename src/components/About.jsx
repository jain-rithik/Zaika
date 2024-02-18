import { useState } from "react";
import FAQ from "./FAQ";
import faqData from "../utils/faqData";

const About = () => {
  const [showItems, setShowItems] = useState(0);

  return (
    <div className="About-container">
      <h1>More About this project</h1>
      <div className="acordian">
        {faqData.map((data, index) => (
          <FAQ
            key={data.id}
            showItems={index === showItems ? true : false}
            setShowItems={() => {
              if (index === showItems) {
                setShowItems(null);
              } else {
                setShowItems(index);
              }
            }}
            title={data.title}
            description={data.description}
          />
        ))}
      </div>
    </div>
  );
};

export default About;
