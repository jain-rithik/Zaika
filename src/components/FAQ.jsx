const FAQ = ({ title, description, showItems, setShowItems }) => {
  const handleClick = () => {
    setShowItems();
  };

  return (
    <div className="FAQ-container">
      <div className="category-header" onClick={handleClick}>
        <h3>{title}</h3>
        {showItems ? (
          <i className={`fa-solid fa-chevron-up`}></i>
        ) : (
          <i className={`fa-solid fa-chevron-down`}></i>
        )}
      </div>
      {showItems && <p className="FAQ-des">{description}</p>}
    </div>
  );
};

export default FAQ;
