import React, { useState, useEffect } from "react"
// import Articles from "../components/articles";
// import Layout from "../components/layout";
// import Seo from "../components/seo";
// import menuIcon from "../assets/images/villazzo-symbol.png"
import Footer from "../components/footer"
import Header from "../components/header"
import { fetchAPI } from "../lib/api"
import Image from "next/image"
import { getStrapiMedia } from "../lib/media"
import { Range } from "react-range"
import Link from "next/link"
import { useRouter } from 'next/router'

const Buy = ({ global, homepage, footerData, navigation }) => {
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }
  const router = useRouter()
  let defaultState = { values: [100] }
  let [state, setState] = useState(defaultState)
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("8")
  const handleSubmit = (event) => {
    event.preventDefault();
    let searchURL = '/search/?loc='+location+'&t='+propertyType+'&p='+state.values[0]
    router.push(searchURL)
    // alert(JSON.stringify(state))
    // alert(`The state you entered was: ${state}`)
  }
  const currencyFormat = (num)=> {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
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
              <source src={global.attributes.videoURL} type="video/mp4" />
              <source src={global.attributes.videoURL} type="video/webm" />
          </video>
        </div>
        <Header navigation={navigation} global={global} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
        <div className="buttons-wrap">
          <div className="sell-search-container buy">
            <div className="selltxt">
              <h3 className="propertytxt">THE PERFECT HOME FOR YOU</h3>
              <p>Villazzo is here to help acquire your dream home or condo. We have helped many clients successfully secure their new residence in South Florida. Let us do the same for you.</p>
            </div>
            <div className="buy-search-box">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <label className="">LOCATION</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="CITY, REGION"
                    />
                  </div>
                  <div className="col-md-3 prop_type">
                    <label className="">PROPERTY TYPE</label>
                    <select
                      className="form-control"
                      placeholder="PROPERTY TYPE"
                      onChange={(e) => setPropertyType(e.target.value)}
                    >
                      <option value="8">Commercial</option>
                      <option value="2">Condo/Townhouse/Co-Op</option>
                      <option value="4">Farms/Ranch</option>
                      <option value="9">Lot/Land/Acreage</option>
                      <option value="3">Mobile/Manufactured</option>
                      <option value="6">Multi Family</option>
                      <option value="5">Rental Properties</option>
                      <option value="7">Residential Income</option>
                      <option value="7">Single Family</option>
                      <option value="10">Vacation/Time-Share</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="">PRICE RANGE</label>
                    <Range
                      step={100}
                      initial={100}
                      min={100}
                      max={100000}
                      values={state.values}
                      onChange={(values) => setState({ values })}
                      renderTrack={({ props, children }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: "4px",
                            width: "100%",
                            marginTop: "15px",
                            backgroundColor: "#f7dd80",
                          }}
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: "15px",
                            width: "15px",
                            borderRadius: "25px",
                            backgroundColor: "#fff",
                            borderColor: "#f7dd80",
                            borderStyle: "solid",
                            borderWidth: "4px",
                          }}
                        />
                      )}
                    />
                    <output style={{ marginTop: "5px", float:"right" }} id="output">
                      {currencyFormat(state.values[0])}
                    </output>
                  </div>
                  <div className="col-md-1 search-icon-box">
                    {/* <Link href="/search">
                      <a className="search-button icon-btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </a>
                    </Link> */}
                    <button type="submit" className="search-button icon-btn"><i className="fa fa-search" aria-hidden="true"></i></button>
                    <Link href="/search">
                      <a className="search-button for-mobile">
                        <i className="fa fa-search" aria-hidden="true"></i>{" "}
                        Search
                      </a>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
            {/* <div className="sell-search-box">
              <i className="fa fa-search" aria-hidden="true"></i>
              <input type="text" className="search-input" />
              <Link href="/search">
                <a className="search-button">MLS SEARCH</a>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      <Footer footerProp={footerData} />
    </>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [globalRes, homepageRes, footerRes, navigationRes] = await Promise.all([
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

export default Buy
