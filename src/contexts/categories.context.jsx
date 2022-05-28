import { createContext, useEffect, useState } from 'react';
import { getCategoriesDoc } from '../services/firebase.service';

export const CategoriesContext = createContext({
  categories: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    (async () => {
      const categories = await getCategoriesDoc();
      setCategories(categories);
    })();
  }, []);

  const value = { categories };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

// useEffect(() => {
//   (async () => {
//     await addCollectionAndDoc('categories', SHOP_DATA);
//   })();
// }, []);
