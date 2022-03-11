import storyblokService from "utils/storyblok/service";

export async function getStaticProps({ params }) {
  try {
    let slug = params.slug?.join("/") || "/";

    if (typeof (params.slug === "string") && slug != "/") {
      slug = `/${slug}`;
    }
    // Supporting pages with personalized content
    let user_type = "";
    if (slug.includes("-pers-")) {
      user_type = slug.split("-pers-")[1];
      slug = slug.split("-pers-")[0];
    }
    const story = await storyblokService.getStory(slug);
    const path_data = await storyblokService.getPathSpecificData(slug);

    let props = {
      story,
      settings: {},
      user_type,
      ...path_data,
    };

    return {
      props,
      revalidate: 1000,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const paths = await storyblokService.getPaths();

  return {
    paths,
    fallback: process.env.VERCEL_ENV !== "production",
  };
}
