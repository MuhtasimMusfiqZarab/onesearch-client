import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Home from 'components/uicontainers/home';

import { CurrentUserProvider } from 'components/_context/user/current-user';
import { GetAllUserReviewsProvider } from 'components/_context/user/all-user-reviews';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const sessionId = router.query.session_id;

    if (typeof sessionId === 'string') {
      fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/payment/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + window.localStorage.getItem('jwtToken')
        },
        body: JSON.stringify({
          payments: [
            {
              session_Id: sessionId.slice(0, -2)
            }
          ]
        })
      })
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          }

          return res.json().then((json) => Promise.reject(json));
        })
        .then(({ url }) => {
          window.location.href = '/';
        })
        .catch((e) => console.log(e));
    }
  }, [router.isReady, router.query.session_id]);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta property="og:home" content="Home" key="home" />
        <link rel="shortcut icon" href="/search.svg" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        />
      </Head>
      <CurrentUserProvider>
        <GetAllUserReviewsProvider>
          <Home />
        </GetAllUserReviewsProvider>
      </CurrentUserProvider>
    </>
  );
}
