import Head from 'next/head';
import DashboardLayout from 'components/layouts/dashboard';
import UnderConstruction from 'components/uicontainers/under-construction';

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Projects</title>
        <meta property="og:projects" content="Projects" key="projects" />
        <link rel="shortcut icon" href="/search.svg" />
      </Head>
      <DashboardLayout hideSideNav>
        <UnderConstruction />
      </DashboardLayout>
    </>
  );
}
