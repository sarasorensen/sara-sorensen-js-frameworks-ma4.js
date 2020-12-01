import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL } from "../../constants/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RecipeItem from "./RecipeItem";
import SearchRecipe from "./SearchRecipe";

const IngredientList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((json) => {
        setIngredients(json.results);
        setFilteredIngredients(json.results);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const filterCards = function (e) {
    const searchValue = e.target.value.toLowerCase();

    const filteredArray = ingredients.filter(function (ingr) {
      const lowerCaseName = ingr.title.toLowerCase();

      if (lowerCaseName.startsWith(searchValue)) {
        return true;
      }
      return false;
    });
    setFilteredIngredients(filteredArray);
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <SearchRecipe handleSearch={filterCards} />
      <Row>
        {filteredIngredients.map((ingredient) => {
          const { title, thumbnail } = ingredient;

          return (
            <Col sm={6} md={3} key={title}>
              <RecipeItem title={title} thumbnail={thumbnail} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default IngredientList;
