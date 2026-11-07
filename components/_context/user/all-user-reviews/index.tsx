import React, { createContext, useContext } from 'react';
import { useQuery } from '@apollo/client';

import GET_ALL_REVIEWS from '../../../../pages/api/query/user/get-all-reviews.gql';
import { useCurrentUser } from '../current-user';

const GetAllUserReviewsContext = createContext({
  allUserReviews: null,
  loading: null,
  error: null,
  refetch: async () => {}
});

function GetAllUserReviewsProvider({ children }) {
  const { currentUser } = useCurrentUser();

  const variables = {
    data: {
      limit: 30,
      offset: 0
    }
  };

  const {
    data: currentUserReviewsData,
    error: currentUserReviewsError,
    loading: currentUserReviewsLoading,
    refetch: refetchCurrentUserReviews
  } = useQuery(GET_ALL_REVIEWS, {
    variables: {
      data: {
        ...variables.data,
        userId: currentUser?.id
      }
    },
    skip: !currentUser?.id
  });

  const {
    data: allReviewsData,
    error: allReviewsError,
    loading: allReviewsLoading,
    refetch: refetchAllReviews
  } = useQuery(GET_ALL_REVIEWS, {
    variables
  });

  const currentUserReview = currentUserReviewsData?.getAllReviews?.reviews?.[0];
  const otherReviews =
    allReviewsData?.getAllReviews?.reviews?.filter(
      (review) => review.userId !== currentUser?.id
    ) || [];
  const allUserReviews = currentUserReview
    ? {
        ...allReviewsData?.getAllReviews,
        reviews: [currentUserReview, ...otherReviews]
      }
    : allReviewsData?.getAllReviews;
  const loading = currentUserReviewsLoading || allReviewsLoading;
  const error = currentUserReviewsError || allReviewsError;
  const refetch = async () => {
    await Promise.all([
      refetchAllReviews(),
      currentUser?.id ? refetchCurrentUserReviews() : Promise.resolve()
    ]);
  };

  return (
    <GetAllUserReviewsContext.Provider
      value={{
        allUserReviews,
        loading,
        error,
        refetch
      }}>
      {children}
    </GetAllUserReviewsContext.Provider>
  );
}

const useAllUserReviews = () => useContext(GetAllUserReviewsContext);

export { GetAllUserReviewsProvider, useAllUserReviews };
