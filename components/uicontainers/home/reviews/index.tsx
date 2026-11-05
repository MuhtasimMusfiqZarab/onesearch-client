import React, { useState } from 'react';
import SlickSlider from 'components/general/slick';
import { Heading } from '../heading';
import Modal from 'components/general/modal';
import AddReview from 'components/general/add-review';
import Review from 'components/general/review';

import { useCurrentUser } from 'components/_context/user/current-user';
import { useAllUserReviews } from 'components/_context/user/all-user-reviews';

import styles from './styles.module.scss';

import ClientImage from '/public/client.png';
import ClientImage1 from '/public/client1.png';
import ClientImage4 from '/public/client4.jpeg';
import ClientImage3 from '/public/client3.jpeg';

export default function Reviews() {
  const { currentUser, loading } = useCurrentUser();
  const { allUserReviews, loading: allUserReviewsLoading } = useAllUserReviews();

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
                Add Review
              </button>
            )}
          </div>

          <div className={styles.reviews}>
            <SlickSlider settings={slickSettings}>
              <Review
                name="clipPath"
                quote="Very pleased with their service."
                avatar={ClientImage}
                rating="5"
                ratingId="clipPath"
              />

              <Review
                name="Jhon"
                quote="Highly recommended!"
                avatar={ClientImage1}
                rating="4.5"
                ratingId="jhon"
              />

              <Review
                name="Doe"
                quote="Need some improvement"
                avatar={ClientImage4}
                rating="4"
                ratingId="doe"
              />

              <Review
                name="Deniel"
                quote="Very pleased with their service. Highly recommended!"
                avatar={ClientImage3}
                rating="3.5"
                ratingId="deniel"
              />
            </SlickSlider>
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
          />
        </Modal>
      )}
    </>
  );
}
