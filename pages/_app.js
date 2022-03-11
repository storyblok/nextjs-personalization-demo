import "styles/globals.css";
import GlobalContextProvider from "utils/data/global-context";
import Head from "next/head";

import CallToAction from "../components/blocks/CallToAction";
import Catalog from "../components/blocks/Catalog";
import Page from "../components/content-types/Page";
import PersonalizedContent from "../components/blocks/PersonalizedContent";
import RichText from "../components/blocks/RichText";

import { storyblokInit, apiPlugin } from "@storyblok/react";

const components = {
  call_to_action: CallToAction,
  catalog: Catalog,
  page: Page,
  personalized_content: PersonalizedContent,
  rich_text: RichText,
};

storyblokInit({
  accessToken: "AK2gOnJ2NjAyx1nhomncXwtt",
  use: [apiPlugin],
  components: components,
});

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider {...pageProps}>
      {pageProps.story && (
        <Head>
          <title>
            {pageProps.story.content.seo_fields?.title || pageProps.story?.name}
          </title>
          {pageProps.story.content.seo_fields?.description && (
            <meta
              name="description"
              content={pageProps.story.content.seo_fields.description}
            />
          )}
          {pageProps.story.content.seo_fields?.og_title && (
            <meta
              property="og:title"
              content={pageProps.story.content.seo_fields.og_title}
            />
          )}
          {pageProps.story.content.seo_fields?.og_description && (
            <meta
              property="og:description"
              content={pageProps.story.content.seo_fields.og_description}
            />
          )}
          {pageProps.story.content.seo_fields?.og_image && (
            <meta
              property="og:image"
              content={pageProps.story.content.seo_fields.og_image}
            />
          )}
        </Head>
      )}
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}

export default MyApp;
