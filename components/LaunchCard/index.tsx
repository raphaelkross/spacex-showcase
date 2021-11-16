import styles from './styles.module.css'

const LaunchCard = (props: {
  data: {
    mission_name: string;
    rocket: {
      rocket_name: string;
    };
    details: string;
    links: {
      article_link: string;
      flickr_images: Array<string>;
    }
  };
}) => {
  const {
    mission_name: missionName,
    rocket,
    details,
    links
  } = props.data;

  const {
    rocket_name: rocketName
  } = rocket;

  const {
    article_link: articleLink,
    flickr_images: images,
  } = links;

  const hasImage = images.length > 0 ? true : false;

  const thumbnail = hasImage ? images[0] : null;

  return (
    <a className={styles.card} href={articleLink}>
      <div className={styles.thumb} style={{backgroundImage: `url(${thumbnail})`}}></div>
      <div className={styles.meta}>
        <h3>{missionName}</h3>
        <p className={styles.rocket}>{rocketName}</p>
        {details ?
          <p className={styles.description}>{details.length > 150 ? details.substring(0, 147) + '...' : details}</p>
          : null }
      </div>

    </a>
  )
}

export default LaunchCard
