import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { useUserType } from "utils/hooks";

const PersonalizedContent = ({ blok }) => {
  const user_type = useUserType();
  const variant = blok.variants.find((v) => v.user_type === user_type);

  return (
    <div {...storyblokEditable(blok)} className="">
      {variant &&
        variant.content.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
    </div>
  );
};

export default PersonalizedContent;
