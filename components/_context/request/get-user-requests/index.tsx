import React, { createContext, useContext, useState } from 'react';
import { useQuery } from '@apollo/client';

import GET_ALL_USER_REQUESTS from '../../../../pages/api/query/request/get-user-requests.gql';

const GetUserRequestsContext = createContext({
  requests: null,
  setOffset: (value: number) => {},
  offset: null,
  refetch: null,
  setCategory: null,
  setLocation: null,
  setPlatform: null,
  setStatus: null,
  loading: null,
  total: null,
  searchText: null,
  setSearchText: null
});

function GetUserRequestsProvider({ children }) {
  const [category, setCategory] = useState<string>(null);
  const [location, setLocation] = useState<string>(null);
  const [platform, setPlatform] = useState<string>(null);
  const [status, setStatus] = useState<string>(null);

  const [searchText, setSearchText] = useState<string>(null);

  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  const { data, error, loading, refetch } = useQuery(GET_ALL_USER_REQUESTS, {
    variables: {
      data: {
        category,
        location,
        platform,
        status,
        searchText,
        limit,
        offset
      }
    }
  });

  return (
    <GetUserRequestsContext.Provider
      value={{
        requests: data?.getAllRequestsOfUser?.requests,
        setOffset,
        offset,
        refetch,
        setCategory,
        setLocation,
        setPlatform,
        setStatus,
        loading,
        total: data?.getAllRequestsOfUser?.totalCount,
        searchText,
        setSearchText
      }}>
      {children}
    </GetUserRequestsContext.Provider>
  );
}

const useUserRequests = () => useContext(GetUserRequestsContext);

export { GetUserRequestsProvider, useUserRequests };
