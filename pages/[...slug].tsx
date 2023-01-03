import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/Home.module.css'
import { useStoryblokState, getStoryblokApi, StoryblokComponent } from '@storyblok/react'

export default function Page({ story }: any) {
  story = useStoryblokState(story)

  return (
    <div className={styles.container}>
      <Head>
        <title>{story ? story.name : 'My Site'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>{story ? story.name : 'My Site'}</h1>
      </header>

      <main className={styles.main}>
        <StoryblokComponent blok={story.content} />
      </main>
    </div>
  )
}

export async function getStaticProps({ params }: any) {
  const slug = params.slug ? params.slug.join('/') : 'home'

  const sbParams = {
    version: 'draft', // or 'published'
  }

  const storyblokApi = getStoryblokApi()
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams)

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  }
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi()
  const { data } = await storyblokApi.get('cdn/links/')
  const paths: any = []

  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === 'home') {
      return
    }

    const slug = data.links[linkKey].slug
    const splittedSlug = slug.split('/')
    paths.push({ params: { slug: splittedSlug } })
  })

  return {
    paths: paths,
    fallback: false,
  }
}
