import React, { createContext, useContext } from 'react';
import { useQuery } from '@apollo/client';

import GET_CHANNEL_COUNTRIES from '../../../../pages/api/query/youtube/get-channel-countries.query.gql';

const CountriesContext = createContext({
  countries: null
});

function CountriesProvider({ children }) {
  const { data, error, loading } = useQuery(GET_CHANNEL_COUNTRIES);

  return (
    <CountriesContext.Provider
      value={{
        countries: data?.getChannelCountries?.locations ?? []
      }}>
      {children}
    </CountriesContext.Provider>
  );
}

const useCountries = () => useContext(CountriesContext);

export { CountriesProvider, useCountries };
