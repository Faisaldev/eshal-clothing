import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import {
  selectCategoriesMap,
  selectCategoryIsLoading,
} from '../../store/categories/category.selector';
import { CategoryContainer, CategoryTitle } from './category.styles';
const Category = () => {
  const categories = useSelector(selectCategoriesMap);
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const isLoading = useSelector(selectCategoryIsLoading);

  useEffect(() => {
    setProducts(categories[category]);
  }, [categories, category]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
