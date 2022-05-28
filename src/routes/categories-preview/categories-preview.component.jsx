import { Fragment, useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { CategoriesContext } from '../../contexts/categories.context';

const CategoriesPreview = () => {
  const { categories } = useContext(CategoriesContext);
  console.log('render shop');
  console.log('faisal', categories);

  return (
    <Fragment>
      {Object.keys(categories).map(title => (
        <CategoryPreview
          key={title}
          title={title}
          products={categories[title]}
        />
      ))}
    </Fragment>
  );
};

export default CategoriesPreview;
