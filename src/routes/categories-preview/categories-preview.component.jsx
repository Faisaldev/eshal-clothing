import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';
import {
  selectCategoriesMap,
  selectCategoryIsLoading,
} from '../../store/categories/category.selector';
const CategoriesPreview = () => {
  const categories = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoryIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categories).map(title => (
          <CategoryPreview
            key={title}
            title={title}
            products={categories[title]}
          />
        ))
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
