import React, { useState, useEffect } from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import { fetchAPI } from "../lib/api"
import Image from "next/image"
import { getStrapiMedia } from "../lib/media"
import Link from 'next/link'


const TeamsInside = ({
  global,
  meettheteam,
  footerData,
  navigation,
}) => {
	let propertyList = meettheteam.attributes.Proprties
	let mainPropertyList = []
	propertyList.forEach((element) => {
		mainPropertyList.push(element)
	})
    const myLoader = ({ src, width, quality }) => {
      return `${src}?w=${width}&q=${quality || 75}`
    }
  return (
    <> 
      <div className="bg-img bg-white">
        <Header navigation={navigation} global={global} />
		<div className="container">
			<div className="buttons-wrap video-wrapper team-wrapper inside-wrap">
				<h1 className="team-heading">MEET THE TEAM</h1>
				<div className="meet-wrap">
					<div className="meet-left">
						<p className="meet-left-img">
							<Image
								loader={myLoader}
								src={meettheteam.attributes.memberImageURL}
								className="header_image"
								layout="fill"
								alt="Villazzo"
							/>
						</p>
						<h3 className="meet-left-name">{meettheteam.attributes.memberName}</h3>
						<p className="broker">{meettheteam.attributes.memberType}</p>
						<a className="number" href="#">{meettheteam.attributes.contactNo}</a>
						<a className="email" href="#">{meettheteam.attributes.memberEmail}</a>
					</div>
					<div className="meet-right">
						<p>{meettheteam.attributes.Content}</p>
					</div>
				</div>
				<div className="properties">
					<h1 className="team-heading">FEATURED PROPERTIES</h1>
					<div className="property-wrap">
						{mainPropertyList.map((element) => (
						<div key={mainPropertyList.key} className="property-box">
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
				</div>
				<div className="video-btn contact-btn">
					<a href="#">CONTACT US</a>
				</div>
				<div className="find-hotel">
					<a href="#">Find More about our Villa Hotels</a>
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
	meettheteamRes,
    footerRes,
    navigationRes,
  ] = await Promise.all([
    fetchAPI("/global", { populate: "*" }),
	fetchAPI("/meettheteam", { populate: "*" }),
    fetchAPI("/footer", { populate: "deep" }),
    fetchAPI("/header-nav", { populate: "*" }),
  ])

  return {
    props: {
      global: globalRes.data,
	  meettheteam: meettheteamRes.data,
      footerData: footerRes.data,
      navigation: navigationRes.data,
    },
    revalidate: 1,
  }
}

export default TeamsInside
