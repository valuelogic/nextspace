import Head from 'next/head'
//import { json } from 'stream/consumers'
import styles from '../styles/Home.module.css'

// tutaj wrzucilem funkcje zamiast const nextjs page bo nie wiedzialem czy wogole sie da wyciagnac w srodku conts rzeczy z propsa z '.map'

function SsrPage({ rockets }: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>SSR page</h1>
        <>
          {rockets.map((rocket: any) => (
            <div key={rocket.id}>
              <h2>{rocket.rocket_name}</h2>
              <div className={styles.dflexcol}>
                <span>type: {rocket.rocket_type}</span>
                <span>{rocket.description}</span>
              </div>
            </div>
          ))}
        </>
      </main>
    </div> // container
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.spacexdata.com/v3/rockets`)
  const data = await res.json()

  // Pass data to the page via props
  return {
    props: {
      rockets: data,
    },
  }
}

export default SsrPage
