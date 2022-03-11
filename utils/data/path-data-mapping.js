import storyblokService from "utils/storyblok/service";

export default [
  {
    rule: (slug) => {
      return slug.includes("/catalog");
    },
    data: async () => {
      const products = await storyblokService.getStories("cdn/stories", {
        filter_query: {
          component: {
            in: "product",
          },
        },
      });

      return { products };
    },
  },
];
