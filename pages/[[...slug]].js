import Layout from 'components/core/Layout'
import DynamicComponent from 'components/core/DynamicComponent'
import useStoryblok from 'utils/storyblok/bridge'
import { useRouter } from 'next/router'

export default function Page({ story }) {
  const storyData = story ? useStoryblok(story) : null
  const router = useRouter()

  return (
    <>
    {!router.isFallback && storyData && <Layout>
      <DynamicComponent blok={storyData.content} />
    </Layout>}
    {router.isFallback && <p>Loading...</p>}
    </>
  )
}

export { getStaticProps, getStaticPaths } from 'utils/data/get-static-data'
