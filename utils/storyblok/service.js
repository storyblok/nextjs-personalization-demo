import storyblokApi, { resolve_relations_fields } from "utils/storyblok/client";
import sources from "utils/data/path-data-mapping";
import fs from "fs";

class StoryblokService {
  constructor() {
    this.version =
      process.env.VERCEL_ENV !== "production" ? "draft" : "published";
  }

  async getPaths() {
    const stories = await storyblokApi.getAll("cdn/links", {
      version: this.version,
    });
    const personalized_stories = await storyblokApi.getAll("cdn/stories", {
      version: this.version,
      search_term: "personalized_content",
    });
    const stories_out = [];
    let personalized_stories_out = {};

    stories
      .filter((s) => !s.real_path.includes("products"))
      .forEach((story) => {
        const story_path = story.real_path.replace(/^\//, "");
        const personalized_content = personalized_stories.find(
          (s) => s.uuid === story.uuid
        );
        const variants = [];

        if (personalized_content) {
          personalized_content.content.body
            .filter((block) => block.component === "personalized_content")
            .forEach((block) => {
              block.variants.forEach((v) => {
                if (!variants.includes(v.user_type) && v.user_type != "") {
                  variants.push(v.user_type);
                }
              });
            });
          variants.forEach((v) => {
            stories_out.push({
              params: { slug: `${story_path}-pers-${v}`.split("/") },
            });
          });
          personalized_stories_out[story.real_path] = variants.map(
            (v) => `${story.real_path}-pers-${v}`
          );
        }
        stories_out.push({ params: { slug: story_path.split("/") } });
      });

    fs.writeFileSync(
      "./public/personalized-paths.json",
      JSON.stringify(personalized_stories_out)
    );

    return stories_out;
  }

  async getStory(slug) {
    slug = slug === "/" || slug === "" ? "home/" : slug.replace(/^\//, "");
    slug = slug.replace(/^\//, "");
    let res = await storyblokApi.get(`cdn/stories/${slug}`, {
      resolve_relations: resolve_relations_fields.join(","),
      version: this.version,
      resolve_links: "url",
    });
    return res.data.story;
  }

  async getStories(endpoint, parameters) {
    storyblokApi.flushCache();
    return await storyblokApi.getAll(endpoint, {
      ...parameters,
      version: this.version,
    });
  }

  getLinkUrl(link) {
    if (!link) return "";
    return link.cached_url ? `/${link.cached_url}` : "";
  }

  async getPathSpecificData(slug) {
    let data = {};
    try {
      for (let index = 0; index < sources.length; index++) {
        const source = sources[index];
        if (source.rule(slug)) {
          const source_data = await source.data();
          data = { ...data, ...source_data };
        }
      }
    } catch (err) {
      console.log(err);
    }
    return data;
  }
}

const storyblokService = new StoryblokService();

export default storyblokService;
