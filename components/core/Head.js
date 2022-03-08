import React from "react";
import NextHead from "next/head";
import { useStory } from 'utils/hooks'

const Head = () => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{useStory().name || ""}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </NextHead>
);

export default Head;
