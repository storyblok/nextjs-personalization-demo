import 'styles/globals.css'
import GlobalContextProvider from 'utils/data/global-context'
import Head from 'next/head'

function MyApp({ Component, pageProps}) {
  return (
    <GlobalContextProvider {...pageProps}>
      {pageProps.story && <Head>
        <title>{pageProps.story.content.seo_fields?.title || pageProps.story?.name}</title>
        {pageProps.story.content.seo_fields?.description && <meta name="description" content={pageProps.story.content.seo_fields.description} />}
        {pageProps.story.content.seo_fields?.og_title && <meta property="og:title" content={pageProps.story.content.seo_fields.og_title} />}
        {pageProps.story.content.seo_fields?.og_description && <meta property="og:description" content={pageProps.story.content.seo_fields.og_description} />}
        {pageProps.story.content.seo_fields?.og_image && <meta property="og:image" content={pageProps.story.content.seo_fields.og_image} />}
      </Head>}
      <Component {...pageProps} />
    </GlobalContextProvider>
  )
}

export default MyApp
