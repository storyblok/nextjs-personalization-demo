import Layout from "components/core/Layout";
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";

export default function Page({ story }) {
  console.log("before " + story?.name);

  const storyData = story ? useStoryblokState(story) : null;

  console.log("after " + storyData?.name);

  if (!storyData?.content) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <StoryblokComponent blok={storyData.content} />
    </Layout>
  );
}

export { getStaticProps, getStaticPaths } from "utils/data/get-static-data";
