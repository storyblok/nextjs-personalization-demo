import React from "react";
import { storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

const RichText = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)}>
      <div className="container mx-auto mt-[40px] mb-[40px] w-2/5 text-center">
        {render(blok.content)}
      </div>
    </div>
  );
};

export default RichText;
