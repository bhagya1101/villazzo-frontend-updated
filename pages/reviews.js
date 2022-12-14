import React, { useState, useEffect } from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import { fetchAPI } from "../lib/api"
import Image from "next/image"
import { getStrapiMedia } from "../lib/media"
import Link from 'next/link'
import Slider from 'react-slick';

var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots:true,
    arrows: true,
    adaptiveHeight: true
  };

const Reviews = ({
  global,
  reviewspage,
  footerData,
  navigation,
}) => {
  let reviewsList = reviewspage.attributes.Reviews
  let mainReviewsList = []
  reviewsList.forEach((element) => {
    mainReviewsList.push(element)
  }) 
  return (
    <>
      <div className="bg-img bg-white reviews_pg_wrap">
        <Header navigation={navigation} global={global} />
        <div className="container">
          <div className="slider-wrapper">
          <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css"
          />
          <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css"
          />    
              <h2 className="sliderHeader">REVIEWS</h2>
              <Slider {...settings}>
                  {mainReviewsList.map((element) => (
                    <div key={element} className="slider-content">
                        <p>{element.Content}</p>
                    </div>
                  ))}
              </Slider>
          </div>
          {/* <div className="read-reviews">
              <a href="#">READ ALL REVIEWS</a>
          </div> */}
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
    reviewspageRes,
    footerRes,
    navigationRes,
  ] = await Promise.all([
    fetchAPI("/global", { populate: "*" }),
    fetchAPI("/reviewspage", { populate: "*" }),
    fetchAPI("/footer", { populate: "deep" }),
    fetchAPI("/header-nav", { populate: "*" }),
  ])

  return {
    props: {
      global: globalRes.data,
      reviewspage: reviewspageRes.data,
      footerData: footerRes.data,
      navigation: navigationRes.data,
    },
    revalidate: 1,
  }
}

export default Reviews
