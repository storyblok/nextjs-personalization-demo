import { useEffect, useState } from "react";
import { resolve_relations_fields } from "utils/storyblok/client";
import { useStoryblokBridge } from "@storyblok/js";

export default function useStoryblok(originalStory) {
  let [story, setStory] = useState(originalStory);

  useStoryblokBridge(story.id, (newStory) => setStory(newStory), {
    resolveRelations: resolve_relations_fields,
  });

  useEffect(() => {
    setStory(originalStory);
  }, [originalStory]);

  return story;
}
