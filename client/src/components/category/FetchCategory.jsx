import { useState, useEffect } from "react";
import { fetchCategories } from "../../api/api";
const FetchCategory = (props) => {
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOptions] = useState(categories[0]);
  useEffect(() => {
    const getCategories = async () => {
      const result = await fetchCategories();
      if (result) {
        setCategories(result.data);
      }
    };
    getCategories();
  }, []);
  const handleChange = (e) => {

    setSelectedOptions(e.target.value);
    const content = e.target.value.split("-");
    props.handleCategory(content[0],content[1]);
  };
  return (
    <div>
      <h5>Kategori :</h5>
      <select
        id="category-select"
        value={selectedOption}
        onChange={handleChange}
    
      >
        {categories.map((option) => (
          <option key={option._id} value={`${option._id}-${option.name}`}   >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FetchCategory;
