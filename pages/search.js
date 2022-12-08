import React, { useState, useEffect } from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import { fetchAPI } from "../lib/api"
import Image from "next/image"
import { getStrapiMedia } from "../lib/media"
import { useRouter } from 'next/router'

const Search = ({
  global,
  homepage,
  footerData,
  navigation,
}) => {
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }
  const router = useRouter()
  const query = router.query
  var searchURL = `https://idx.diversesolutions.com/link/477490#&PerformSearch&MinBeds=1&MinBaths=1&MinImprovedSqFt=0&MinPrice=10&MaxPrice=${query.p}&Location=${query.loc}&PropertyTypes=${query.t}`
  // useEffect(() => {
  //   document.title = "Villazzo | Search"
  //   const script = document.createElement("script")
  //   // script.src = "//idx.diversesolutions.com/scripts/controls/Remote-Frame.aspx?MasterAccountID=1519186&amp;SearchSetupID=124&amp;LinkID=477464&amp;Height=2000";
  //   script.src = "https://idx.diversesolutions.com/link/477490#&PerformSearch&MinBeds=1&MinBaths=1&MinImprovedSqFt=0&MinPrice=100000&MaxPrice=200000&location=India";
  //   script.async = true
  //   document.body.appendChild(script)
  //   return () => {
  //     document.body.removeChild(script)
  //   }
  // }, [])

  return (
    <>
      <div className="bg-img">
        <div className="homepage-image">
          {/* <Image
            loader={myLoader}
            src={getStrapiMedia(homepage.attributes.headerImage)}
            className="header_image"
            layout="fill"
            alt="Villazzo"
          /> */}
          <div className="blankDiv"></div>
          <video loop muted autoPlay={"autoplay"} playsinline>
              <source src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${global.attributes.videoURL}`} type="video/mp4" />
              <source src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${global.attributes.videoURL}`} type="video/webm" />
          </video>
        </div>
        <Header navigation={navigation} global={global} />
        <div id="searchPage" className="page_layout">
            <iframe id="_dsSearchAgent_Idx_Frame_0" name="_dsSearchAgent_Idx_Frame_0" src={searchURL} scrolling="no" style={{width: '100%', height: '940px', background: 'transparent', overflow: 'hidden'}} allowTransparency="true" frameBorder="0" seamless="seamless" mozAllowFullscreen="true" webkitAllowFullScreen="true" allowFullScreen="true" sandbox="allow-top-navigation allow-scripts allow-forms allow-modals allow-popups allow-same-origin"></iframe>
            {/* <iframe id="_dsSearchAgent_Idx_Frame_0" name="_dsSearchAgent_Idx_Frame_0" src="https://idx.diversesolutions.com/link/477464#-" scrolling="no" style={{width: '100%', height: '940px', background: 'transparent', overflow: 'hidden'}} allowTransparency="true" frameBorder="0" seamless="seamless" mozAllowFullscreen="true" webkitAllowFullScreen="true" allowFullScreen="true" sandbox="allow-top-navigation allow-scripts allow-forms allow-modals allow-popups allow-same-origin"></iframe> */}
        </div>
      </div>
      <Footer footerProp={footerData} />
    </>
  )
}

export async function getStaticProps(props) {
  // Run API calls in parallel
  const [
    globalRes,
    homepageRes,
    footerRes,
    navigationRes,
  ] = await Promise.all([
    fetchAPI("/global", { populate: "*" }),
    fetchAPI("/homepage", { populate: "*" }),
    fetchAPI("/footer", { populate: "deep" }),
    fetchAPI("/header-nav", { populate: "*" }),
  ])

  return {
    props: {
      global: globalRes.data,
      homepage: homepageRes.data,
      footerData: footerRes.data,
      navigation: navigationRes.data,
    },
    revalidate: 1,
  }
}

export default Search
