import type { NextPage } from 'next'
import Head from 'next/head'
import { gql } from "@apollo/client";
import client from "../interfaces/apollo-client";
import styles from '../styles/Home.module.css'
import LaunchCard from '../components/LaunchCard';

const Home: NextPage = (props) => {
  const {launchesPast} = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Missions</title>
        <meta name="description" content="See your favorite missions." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {launchesPast.map((l,i) => <LaunchCard key={i} data={l} />)}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query LaunchesPast {
        launchesPast(limit: 200) {
          mission_name
          rocket {
            rocket_name
          }
          details
          links {
            article_link
            flickr_images
            reddit_media
          }
        }
      }
    `,
  });

  return {
    props: {
      launchesPast: data.launchesPast,
    },
 };
}

export default Home
