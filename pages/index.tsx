import type { NextPage } from 'next'
import { useState } from 'react';
import Head from 'next/head'
import { gql } from "@apollo/client";
import client from "../interfaces/apollo-client";
import styles from '../styles/Home.module.css'
import LaunchCard from '../components/LaunchCard';

const Home: NextPage = (props) => {
  const {launchesPast} = props;
  const [query, setQuery] = useState('');

  const updateQuery = (e) => {
    const text = e.target.value;

    setQuery(text);
  }

  const results = query !== '' ? launchesPast.filter((l) => {
    const q = query.toLowerCase();

    const {
      mission_name: missionName,
      rocket,
    } = l;

    const {
      rocket_name: rocketName
    } = rocket;

    return missionName.toLowerCase().includes(q) || rocketName.toLowerCase().includes(q);
  }): launchesPast;

  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Missions</title>
        <meta name="description" content="See your favorite missions." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.searchBar}>
        <input type="text" value={query} placeholder="Search mission..." onChange={updateQuery} />
        <p>Showing {results.length} results.</p>
      </div>

      <main className={styles.main}>
        {results.map((l,i) => <LaunchCard key={i} data={l} />)}
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
