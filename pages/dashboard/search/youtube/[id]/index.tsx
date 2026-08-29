import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'components/layouts/dashboard';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Link from 'next/link';

import GET_CHANNEL from '../../../../../pages/api/query/youtube/get-channel.gql';
import { seedChannels, findSeedChannel } from 'components/_context/youtube/seed';
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
  const channelId: string = router.query['id'] as string;
  const isSeedChannel = typeof channelId === 'string' && channelId.startsWith('seed-');

  const { data, error, loading, refetch } = useQuery(GET_CHANNEL, {
    variables: {
      id: channelId
    },
    skip: isSeedChannel
  });

  const channel = isSeedChannel ? findSeedChannel(channelId) : data?.channel;
  const updatedAt = channel?.updatedAt ? new Date(channel.updatedAt).toDateString() : 'Recently';

  return (
    <div>
      <Head>
        <title>{channel?.channel_name ?? channelId}</title>
        <meta property="og:channelId" content="channelId" key="channelId" />
        <link rel="shortcut icon" href="/search.svg" />
      </Head>
      <DashboardLayout>
        <div className={styles.user_infos}>
          <div className={styles.paginations}>
            <Link href="/dashboard/search/youtube/">
              <a href="#" className="btn btn_fill_primary">
                <ArrowLeft /> Previous
              </a>
            </Link>
          </div>
          <div className={styles.user_infos_header}>
            <h1>{channel?.channel_name}</h1>

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

          <Channel.BasicInfo data={channel} />
          <Channel.AnvancedInfo data={channel} />

          <div className={styles.update}>
            <span className={styles.update__last}>Last Updated: {updatedAt}</span>
            {/* <a href="#" className="btn">
              Request for Update
            </a> */}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

Channel.BasicInfo = ({ data }: { data?: any }) => {
  return (
    <>
      <div className={styles.basic__info}>
        <h3>Basic information</h3>
        <ul>
          <li>
            <span className={styles.info__title}>Channel name:</span>
            {data?.channel_name ?? 'null'}
          </li>
          <li>
            <span className={styles.info__title}>Subscribers:</span>
            {data?.subscribers ?? 'null'}
          </li>
          <li>
            <span className={styles.info__title}>Category:</span>
            {data?.socialblade_category ?? 'null'}
          </li>
          <li>
            <span className={styles.info__title}>Views:</span>
            {data?.views ?? 'null'}
          </li>
          <li>
            <span className={styles.info__title}>Location:</span>
            {data?.location ?? 'null'}
          </li>
          <li>
            <span className={styles.info__title}>Joining Date:</span>
            {data?.joined ?? 'null'}
          </li>
        </ul>
      </div>
    </>
  );
};

Channel.AnvancedInfo = ({ data }: { data?: any }) => {
  return (
    <div className={styles.advanced__info}>
      <h3>Advanced information</h3>
      <ul>
        <li>
          <span className={styles.info__title}>Channel URL:</span>
          <div className={styles.info__description}>
            <div className={styles.info__item}>
              <a href={data?.channel_url ?? '#'} target="_blank" rel="noreferrer">
                {data?.channel_url ?? 'No URL available'}
              </a>
            </div>
          </div>
        </li>

        <li>
          <span className={styles.info__title}>Description:</span>
          <div className={styles.info__description}>
            {data?.description ?? 'No description available'}
          </div>
        </li>
      </ul>
      {/* <p>
        Coming Soon! .... Contact Email , Channel URL, Description, social media links (facebook,
        instagram, twitter,pinterest and many more )
      </p>
      {/* <ul>
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
      </ul> */}
    </div>
  );
};
