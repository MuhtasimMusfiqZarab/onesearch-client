import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import DashboardLayout from 'components/layouts/dashboard';
import GET_REQUEST from '../../../api/query/request/get-request.gql';
import GET_USER from '../../../api/query/user/get-user.gql';
import styles from './[id].module.scss';

const formatDate = (value?: string) => {
  if (!value) return '-';

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
};

const formatFieldName = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/^./, (character) => character.toUpperCase());

export default function RequestDetailsPage() {
  const router = useRouter();
  const requestId = router.query.id;
  const hasRequestId = typeof requestId === 'string';
  const { data, loading, error } = useQuery(GET_REQUEST, {
    variables: { id: hasRequestId ? requestId : '' },
    skip: !hasRequestId
  });

  const request = data?.getRequest;
  const {
    data: userData,
    loading: loadingUser,
    error: userError
  } = useQuery(GET_USER, {
    variables: { id: request?.userId ?? '' },
    skip: !request?.userId
  });
  const user = userData?.getUser;

  return (
    <>
      <Head>
        <title>Request Details</title>
      </Head>
      <DashboardLayout>
        <main className={styles.page}>
          <Link href="/dashboard/request/all">
            <a className={styles.backLink}>Back to requests</a>
          </Link>
          <section className={styles.content}>
            <h1>Request Details</h1>
            {loading && <p>Loading request...</p>}
            {error && <p role="alert">Unable to load this request.</p>}
            {!loading && !error && !request && <p>Request not found.</p>}
            {request && (
              <>
                <h2>Request</h2>
                <dl className={styles.details}>
                  <div>
                    <dt>Request ID</dt>
                    <dd>{request.id}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{request.status || '-'}</dd>
                  </div>
                  <div>
                    <dt>Platform</dt>
                    <dd>{request.platform || '-'}</dd>
                  </div>
                  <div>
                    <dt>Category</dt>
                    <dd>{request.category || '-'}</dd>
                  </div>
                  <div>
                    <dt>Location</dt>
                    <dd>{request.location || '-'}</dd>
                  </div>
                  <div>
                    <dt>Data Size</dt>
                    <dd>{request.datasize || '-'}</dd>
                  </div>
                  <div>
                    <dt>Description</dt>
                    <dd>{request.description || '-'}</dd>
                  </div>
                  <div>
                    <dt>Created</dt>
                    <dd>{formatDate(request.createdAt)}</dd>
                  </div>
                  <div>
                    <dt>Created By</dt>
                    <dd>{request.createdBy || '-'}</dd>
                  </div>
                  <div>
                    <dt>Updated</dt>
                    <dd>{formatDate(request.updatedAt)}</dd>
                  </div>
                  <div>
                    <dt>Updated By</dt>
                    <dd>{request.updatedBy || '-'}</dd>
                  </div>
                  <div>
                    <dt>User ID</dt>
                    <dd>{request.userId || '-'}</dd>
                  </div>
                </dl>
                <h2>Requester</h2>
                {loadingUser && <p>Loading requester...</p>}
                {userError && <p role="alert">Unable to load requester details.</p>}
                {user && (
                  <dl className={styles.details}>
                    {Object.entries(user).map(([key, value]) => (
                      <div key={key}>
                        <dt>{formatFieldName(key)}</dt>
                        <dd>
                          {value === null || value === undefined ? (
                            '-'
                          ) : typeof value === 'object' ? (
                            <pre className={styles.nestedValue}>
                              {JSON.stringify(value, null, 2)}
                            </pre>
                          ) : typeof value === 'boolean' ? (
                            value ? (
                              'Yes'
                            ) : (
                              'No'
                            )
                          ) : key.endsWith('At') ? (
                            formatDate(String(value))
                          ) : (
                            String(value)
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </>
            )}
          </section>
        </main>
      </DashboardLayout>
    </>
  );
}
