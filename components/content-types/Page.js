import DynamicComponent from "components/core/DynamicComponent";
import { storyblokEditable } from "@storyblok/js";
import { useStory } from "utils/hooks";

const Page = ({ blok }) => {
  return (
    <main {...storyblokEditable(blok)}>
      <h1 className="text-4xl mt-[30px] font-bold text-center">
        {useStory().name}
      </h1>
      <div>
        {blok.body
          ? blok.body.map((nestedBlok) => (
              <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))
          : null}
      </div>
    </main>
  );
};

export default Page;
