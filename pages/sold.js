import React, { useState, useEffect } from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import { fetchAPI } from "../lib/api"
import Image from "next/image"
import { getStrapiMedia } from "../lib/media"
import Link from 'next/link'


const Sold = ({
  global,
  soldbypage,
  footerData,
  navigation,
}) => {
	let soldPropList = soldbypage.attributes.soldProperties
	let mainsoldPropList = []
	soldPropList.forEach((element) => {
		mainsoldPropList.push(element)
	})
    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
      }
  return (
    <>
      <div className="bg-img bg-white new_dev_pg_wrap sold_pg_wrap">
        <Header navigation={navigation} global={global} />
        <div className="container">
			<div className="buttons-wrap video-wrapper team-wrapper dev-wrapper sold-by-wrapper">
				<h1 className="sold-heading sold-by-heading">SOLD BY 
					<span className="heading-img">
						<Image
							loader={myLoader}
							src='https://res.cloudinary.com/usability-designs/image/upload/v1666246805/sold_9a1ea02a6e.png?updated_at=2022-10-20T06:20:05.427Z'
							className="img"
							layout="fill"
							alt="Villazzo"
						/>
					</span>
				</h1>
				<div className="property-wrap">
					{mainsoldPropList.map((element) => (
					<div key={mainsoldPropList.key} className="property-box">
						<p className="img_Wrap">
							<Image
								loader={myLoader}
								src={element.propertyImageURL}
								className="header_image"
								layout="fill"
								alt="Villazzo"
							/>
						</p>
						<h4 className="pro-name">{element.heading}</h4>
						<p className="pro-text">{element.subheading}</p>
					</div>
					))}
				</div>
				<div className="video-btn sold-btn contact-btn">
					<a href="#">MORE</a>
				</div>	
			</div>
		</div>
      </div>
      <Footer footerProp={footerData} />
    </>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [
    globalRes,
	soldbypageRes,
    footerRes,
    navigationRes,
  ] = await Promise.all([
    fetchAPI("/global", { populate: "*" }),
	fetchAPI("/soldbypage", { populate: "*" }),
    fetchAPI("/footer", { populate: "deep" }),
    fetchAPI("/header-nav", { populate: "*" }),
  ])

  return {
    props: {
      global: globalRes.data,
	  soldbypage: soldbypageRes.data,
      footerData: footerRes.data,
      navigation: navigationRes.data,
    },
    revalidate: 1,
  }
}

export default Sold
