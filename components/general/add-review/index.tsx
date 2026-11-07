import Image from 'next/image';
import Rating from 'components/general/rating';
import styles from './style.module.scss';

import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import ADD_REVIEW from '../../../pages/api/query/user/add-review.gql';

const AddReview = ({ name, avatar, setIsOpen, userId, existingReview }) => {
  const [addReview, { loading }] = useMutation(ADD_REVIEW);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    console.log('existingReview', existingReview);
    setRating(existingReview?.rating || 0);
    setReviewText(existingReview?.reviewText || '');
  }, [existingReview]);

  const setReview = async () => {
    await addReview({
      variables: {
        input: {
          userId,
          rating,
          reviewText
        }
      }
    });
    setIsOpen(false);
  };

  return (
    <div className={styles.add_review}>
      <h3>Write Review</h3>
      <p>
        Tell us about your experience & <br />
        earn coins instantly.
      </p>

      <div className={styles.add_review__author}>
        <Image
          src={avatar}
          alt="avatar"
          width={64}
          height={64}
          className={styles.add_review__avatar}
        />
        <h4>{name}</h4>
        <Rating
          key={rating}
          rating={String(rating)}
          id="add-review"
          isEditable={true}
          onChange={(value) => setRating(parseFloat(value))}
        />
      </div>
      <textarea
        name=""
        id=""
        cols={30}
        rows={10}
        placeholder="Write about your expereince"
        onChange={(event) => setReviewText(event.target.value)}
        value={reviewText}></textarea>
      <div className={styles.add_review__footer}>
        <button onClick={() => setIsOpen(false)} className="btn btn_fill_primary">
          Skip
        </button>
        <button
          onClick={setReview}
          disabled={loading || rating === 0}
          className="btn btn_fill_primary">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddReview;
