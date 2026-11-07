import React, { useState } from 'react';
import SlickSlider from 'components/general/slick';
import { Heading } from '../heading';
import Modal from 'components/general/modal';
import AddReview from 'components/general/add-review';
import Review from 'components/general/review';

import { useCurrentUser } from 'components/_context/user/current-user';
import { useAllUserReviews } from 'components/_context/user/all-user-reviews';

import styles from './styles.module.scss';

export default function Reviews() {
  const { currentUser, loading } = useCurrentUser();
  const {
    allUserReviews,
    loading: allUserReviewsLoading,
    error: allUserReviewsError,
    refetch: refetchReviews
  } = useAllUserReviews();
  const hasCurrentUserReview = Boolean(
    currentUser?.id && allUserReviews?.reviews?.some((review) => review.userId === currentUser.id)
  );
  const currentUserReview = allUserReviews?.reviews?.find(
    (review) => review.userId === currentUser?.id
  );

  const [modalIsOpen, setIsOpen] = useState(false);
  const slickSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: 'review_slider',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className={styles.review_wrap}>
        <div className={styles.review_wrap__inner}>
          <div className={styles.review_wrap__heading}>
            <Heading title="Customers" isUnderline={true} />
            {currentUser && !loading && (
              <button className="btn btn_fill_primary" onClick={() => setIsOpen(true)}>
                {hasCurrentUserReview ? 'Edit Review' : 'Add Review'}
              </button>
            )}
          </div>

          <div className={styles.reviews}>
            {!allUserReviewsLoading && (
              <SlickSlider settings={slickSettings}>
                {allUserReviews?.reviews?.map((review) => (
                  <Review key={review.id} {...review} />
                ))}
              </SlickSlider>
            )}
          </div>
        </div>
      </div>

      {currentUser && !loading && (
        <Modal isOpen={modalIsOpen} setIsOpen={setIsOpen}>
          <AddReview
            name={currentUser.firstName + ' ' + currentUser.lastName}
            userId={currentUser.id}
            avatar={currentUser.avatarLink}
            setIsOpen={setIsOpen}
            existingReview={currentUserReview}
            refetchReviews={refetchReviews}
          />
        </Modal>
      )}
    </>
  );
}
