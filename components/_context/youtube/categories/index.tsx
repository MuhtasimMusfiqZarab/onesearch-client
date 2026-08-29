import React, { createContext, useContext } from 'react';
import { useQuery } from '@apollo/client';

import GET_CHANNEL_CATEGORIES from '../../../../pages/api/query/youtube/get-channel-categories.gql';
import { seedCategories } from '../seed';

const CategoriesContext = createContext({
  categories: null
});

function CategoriesProvider({ children }) {
  const { data, error, loading } = useQuery(GET_CHANNEL_CATEGORIES);

  return (
    <CategoriesContext.Provider
      value={{
        categories: data?.getAllCategories?.categories ?? seedCategories
      }}>
      {children}
    </CategoriesContext.Provider>
  );
}

const useCategories = () => useContext(CategoriesContext);

export { CategoriesProvider, useCategories };
