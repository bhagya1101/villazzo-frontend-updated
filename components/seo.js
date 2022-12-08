import Head from "next/head"
import { useContext } from "react"
import { GlobalContext } from "../pages/_app"
import { getStrapiMedia } from "../lib/media"

const Seo = ({ seo }) => {
  const { defaultSeo, siteName } = useContext(GlobalContext)
  const seoWithDefaults = {
    ...defaultSeo,
    ...seo,
  }
  const fullSeo = {
    ...seoWithDefaults,
    // Add title suffix
    metaTitle: `${seoWithDefaults.metaTitle} | ${siteName}`,
    // Get full image URL
    shareImage: getStrapiMedia(seoWithDefaults.shareImage),
  }

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} maximum-scale="1" />
          <meta name="twitter:title" content={fullSeo.metaTitle} maximum-scale="1" />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} maximum-scale="1" />
          <meta property="og:description" content={fullSeo.metaDescription} maximum-scale="1" />
          <meta name="twitter:description" content={fullSeo.metaDescription} maximum-scale="1" />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} maximum-scale="1" />
          <meta name="twitter:image" content={fullSeo.shareImage} maximum-scale="1" />
          <meta name="image" content={fullSeo.shareImage} maximum-scale="1" />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" maximum-scale="1" />}
      <meta name="twitter:card" content="summary_large_image" maximum-scale="1" />
    </Head>
  )
}

export default Seo
