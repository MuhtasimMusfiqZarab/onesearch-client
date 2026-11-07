import Image from 'next/image';
import styles from './styles.module.scss';
import Rating from 'components/general/rating';
import { useQuery } from '@apollo/client';
import GET_REVIEWER from '../../../pages/api/query/user/get-reviewer.gql';

type ReviewType = {
  createdAt: string;
  createdBy?: string;
  id: string;
  rating: number;
  reviewText?: string;
  updatedAt: string;
  updatedBy?: string;
  userId: string;
};

export default function Review({ id, rating, reviewText, userId }: ReviewType) {
  const { data } = useQuery(GET_REVIEWER, {
    variables: { id: userId }
  });
  const reviewer = data?.getUser;
  const name = `${reviewer?.firstName || ''} ${reviewer?.lastName || ''}`.trim() || userId;
  const avatar = reviewer?.avatarLink || '/no-avatar.png';

  return (
    <div className={styles.review}>
      <div className={styles.review__info}>
        <div className={styles.review__thumb}>
          <Image src={avatar} alt={name} width={48} height={48} />
        </div>
        <div className={styles.review__details}>
          <span className={styles.review__name}>{name}</span>
          <span className={styles.review__rating}>
            <Rating key={rating} rating={String(rating)} id={id} isEditable={false} />
          </span>
        </div>
      </div>
      <p className={styles.review__copy}>{reviewText || ''}</p>
    </div>
  );
}
