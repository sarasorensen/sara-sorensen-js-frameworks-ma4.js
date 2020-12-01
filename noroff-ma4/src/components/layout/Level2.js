import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/api";

const IngredientList = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((json) => setIngredients(json.results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <ul>
      {ingredients.map((ingredient) => (
        <li key={ingredient.title}>{ingredient.ingredients}</li>
      ))}
    </ul>
  );
};

export default IngredientList;
