import Layout from "components/core/Layout";
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";

export default function Page({ story }) {
  const storyData = story ? useStoryblokState(story) : null;

  if (!storyData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <StoryblokComponent blok={storyData.content} />
    </Layout>
  );
}

export { getStaticProps, getStaticPaths } from "utils/data/get-static-data";
