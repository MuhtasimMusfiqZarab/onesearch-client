import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'components/layouts/dashboard';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Link from 'next/link';

import GET_LINKEDIN_PROFILE from '../../../../../pages/api/query/linkedin/get-linkedin-profile.gql';
import {
  Copy,
  External,
  ArrowLeft,
  ArrowRight,
  Save,
  Lock,
  DownloadsIcon
} from 'components/_icons';
import styles from './styles.module.scss';

export default function Channel() {
  const router = useRouter();
  const Id: string = router.query['id'] as string;

  const { data, error, loading, refetch } = useQuery(GET_LINKEDIN_PROFILE, {
    variables: {
      id: Id
    }
  });

  return (
    <div>
      <Head>
        <title>{Id}</title>
        <meta property="og:profileId" content="profileId" key="profileId" />
        <link rel="shortcut icon" href="/search.svg" />
      </Head>
      <DashboardLayout>
        <div className={styles.user_infos}>
          <div className={styles.paginations}>
            <Link href="/dashboard/search/linkedin" legacyBehavior>
              <a className="btn btn_fill_primary">
                <ArrowLeft /> Previous
              </a>
            </Link>
          </div>
          <div className={styles.user_infos_header}>
            <h1>{data?.getLinkedinProfile?.fullName}</h1>

            <div className={styles.controller_list}>
              <a href="#" className={styles.wishlist}>
                <Save color={'#8F8F8F'} />
                <span>Save in Wishlist</span>
              </a>
              <a href="#" className={styles.unlock}>
                <Lock color={'#8F8F8F'} />
                <span>Unlock</span>
              </a>
              <a href="#" className={styles.download}>
                <DownloadsIcon color={'#8F8F8F'} />
                <span>Download</span>
              </a>
            </div>
          </div>
          <Channel.BasicInfo data={data} />
          <Channel.AnvancedInfo />

          <div className={styles.update}>
            <span className={styles.update__last}>{data?.getLinkedinProfile?.updatedAt}</span>
            <a href="#" className="btn">
              Request for Update
            </a>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

Channel.BasicInfo = ({ data }: any) => {
  return (
    <>
      <div className={styles.basic__info}>
        <h3>Basic information</h3>
        <ul>
          <li>
            <span className={styles.info__title}>Full Name:</span>
            {data?.getLinkedinProfile?.fullName}
          </li>
          <li>
            <span className={styles.info__title}>Location:</span>
            {data?.getLinkedinProfile?.location}
          </li>
          <li>
            <span className={styles.info__title}>Company:</span>
            {data?.getLinkedinProfile?.company}
          </li>
          <li>
            <span className={styles.info__title}>Title:</span>
            {data?.getLinkedinProfile?.title}
          </li>
        </ul>
      </div>
    </>
  );
};

Channel.AnvancedInfo = ({}) => {
  return (
    <div className={styles.advanced__info}>
      <h3>Advanced information</h3>
      {/* <p>
        Coming Soon! .... Contact Email , Channel URL, Description, social media links (facebook,
        instagram, twitter,pinterest and many more )
      </p> */}
      <ul>
        <li>
          <span className={styles.info__title}>
            Channel link <span>:</span>
          </span>
          <div className={styles.info__description}>
            <div className={styles.info__item}>
              <a href="#">www.youtube.com/luizhollander</a>
              <span className={styles.copy__link}>
                <Copy />
              </span>
              <a href="" className={styles.external__link}>
                <External />
              </a>
            </div>
          </div>
        </li>

        <li>
          <span className={styles.info__title}>
            Email address <span>:</span>
          </span>
          <div className={styles.info__description}>
            <div className={styles.info__item}>
              <a href="#">luizhollander@gmail.com</a>
              <span className={styles.copy__link}>
                <Copy />
              </span>
              <a href="" className={styles.external__link}>
                <External />
              </a>
            </div>

            <div className={styles.info__item}>
              <a href="#">luizhollander@gmail.com</a>
              <span className={styles.copy__link}>
                <Copy />
              </span>
              <a href="" className={styles.external__link}>
                <External />
              </a>
            </div>

            <div className={styles.info__item}>
              <a href="#">luizhollander@gmail.com</a>
              <span className={styles.copy__link}>
                <Copy />
              </span>
              <a href="" className={styles.external__link}>
                <External />
              </a>
            </div>
          </div>
        </li>
        <li>
          <span className={styles.info__title}>
            Facebook link <span>:</span>
          </span>
          <div className={styles.info__description}>
            <div className={styles.info__item}>
              <a href="#">www.youtube.com/luizhollander</a>
              <span className={styles.copy__link}>
                <Copy />
              </span>
              <a href="" className={styles.external__link}>
                <External />
              </a>
            </div>
          </div>
        </li>
        <li>
          <span className={styles.info__title}>
            Tiktok link <span>:</span>
          </span>
          <div className={styles.info__description}>
            <div className={styles.info__item}>
              <a href="#">www.youtube.com/luizhollander</a>
              <span className={styles.copy__link}>
                <Copy />
              </span>
              <a href="" className={styles.external__link}>
                <External />
              </a>
            </div>
          </div>
        </li>
        <li>
          <span className={styles.info__title}>
            Instagram link <span>:</span>
          </span>
          <div className={styles.info__description}>
            <div className={styles.info__item}>
              <a href="#">www.youtube.com/luizhollander</a>
              <span className={styles.copy__link}>
                <Copy />
              </span>
              <a href="" className={styles.external__link}>
                <External />
              </a>
            </div>
          </div>
        </li>
        <li>
          <span className={styles.info__title}>
            Pinterest link <span>:</span>
          </span>
          <div className={styles.info__description}>
            <div className={styles.info__item}>
              <a href="#">www.youtube.com/luizhollander</a>
              <span className={styles.copy__link}>
                <Copy />
              </span>
              <a href="" className={styles.external__link}>
                <External />
              </a>
            </div>
          </div>
        </li>
        <li>
          <span className={styles.info__title}>
            Twitter link <span>:</span>
          </span>
          <div className={styles.info__description}>
            <div className={styles.info__item}>
              <a href="#">www.youtube.com/luizhollander</a>
              <span className={styles.copy__link}>
                <Copy />
              </span>
              <a href="" className={styles.external__link}>
                <External />
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
