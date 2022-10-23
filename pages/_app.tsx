import '../styles/globals.css'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import Page from '../components/Page'
import Feature from '../components/Feature'
import Grid from '../components/Grid'
import Teaser from '../components/Teaser'

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
}

storyblokInit({
  accessToken: process.env.STORY_BLOK_KEY,
  use: [apiPlugin],
  components,
})

function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />
}

export default MyApp
