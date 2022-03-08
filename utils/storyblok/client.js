import { storyblokInit, apiPlugin } from '@storyblok/js';

const { storyblokApi } = storyblokInit({
  accessToken: "AK2gOnJ2NjAyx1nhomncXwtt",
  use: [apiPlugin],
});

export default storyblokApi

export const resolve_relations_fields = []
