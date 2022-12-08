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
import Link from 'next/link'
import axios from 'axios'


const Sell = ({
  global,
  homepage,
  footerData,
  navigation,
}) => {
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  const [toggleMenuClass, toggleMenu] = useState(false)
  const [subMenuClass, subMenuToggleMenu] = useState(false)
  
  const navRef = React.useRef(null);
  const onAddClick = (e) => {
    navRef.current.classList.add("show_popup");
  };

  const onRemoveClick = (e) => {
    navRef.current.classList.remove("show_popup");
    setShowSuccessMessage(false);
        setShowFailureMessage(false);
  };
  
  // States for contact form fields
  const [fullname, setFullname] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const onchange = event => {
    const result = event.target.value.replace(/\D/g, '');
    setPhone(result);
  };

  //   Form validation state
  const [errors, setErrors] = useState({});

  // Setting success or failure messages states
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  const re = /^[0-9\b]+$/;
  const handleChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setPhone(e.target.value)
    }
  }

  // Validation check method
  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (fullname.length <= 0) {
      tempErrors["fullname"] = true;
      isValid = false;
    }
    if (lastName.length <= 0) {
      tempErrors["lastName"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (phone.length <= 0) {
      tempErrors["phone"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
  // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    
    let isValidForm = handleValidation();

    if (isValidForm) {
      axios.post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/contactforms`,
        {
          "data": {
            firstName: fullname,
            lastName: lastName,
            email: email,
            phoneNo: phone,
            message: message,
          }
        }
      );
      
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      // Reset form fields
      setFullname("");
      setlastName("");
      setEmail("");
      setPhone("");
      setMessage("");

      return;
    }
      setShowSuccessMessage(false);
      setShowFailureMessage(true);
      // Reset form fields
      setFullname("");
      setlastName("");
      setEmail("");
      setPhone("");
      setMessage("");
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
          <video loop muted autoPlay={"autoplay"} >
              <source src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${global.attributes.videoURL}`}  type="video/mp4" />
              <source src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${global.attributes.videoURL}`} type="video/webm" />
          </video>
        </div>
        <Header navigation={navigation} global={global} />
        <div className="buttons-wrap">
            <div className="sell-search-container">
              <div className="selltxt">
                <h3 className="propertytxt">SELL YOUR PROPERTY</h3>
                <p>We have represented many sellers in South Florida successfully sell their homes at the best prices. Allow us the opportunity to give you a property presentation to see what your condo or home can sell for and what we have to offer for you as a seller. Villazzo  has represented several record breaking sales.</p>
              </div>
              {/* <div className="sell-search-box">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input type="text" className="search-input"/>
                <Link href="#">
                  <a className="search-button">MLS SEARCH</a>
                </Link>
              </div> */}
              <div className="sell-search-box">
                <div className="video-btn contact-btn">
                  <a href="javascript:;"  onClick={onAddClick}>Contact Us</a>
                </div>
              </div>
            </div>
            <div ref={navRef} id="popover" className="main_popup hide">
              <div className="custom_model">
                <div className="custom_model_dialog">
                  <div className="custom_model_content">
                    <a href="javascript:;" onClick={onRemoveClick} className="model_close"><i className="fa-solid fa-xmark"></i></a>
                    <div className="Popup_wrap">
                      <form onSubmit={handleSubmit}>
                        <div className="contact-form">
                          <h2>CONTACT US</h2>
                          <div className="contact-form-label">
                            <div className="form-item">
                              <input
                                placeholder="FIRST NAME" 
                                type="text"
                                value={fullname}
                                onChange={(e) => {
                                  setFullname(e.target.value);
                                }}
                                name="fullname"
                                className="input-name contact-lebel"
                              />
                              {errors?.fullname && (
                                <p className="error_msg">First name cannot be empty.</p>
                              )}
                            </div>
                            <div className="form-item">
                              <input
                                placeholder="LAST NAME" 
                                name="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => {
                                  setlastName(e.target.value);
                                }}
                                className="contact-lebel"
                              />
                              {errors?.lastName && (
                                <p className="error_msg">Last name cannot be empty.</p>
                              )}
                            </div>
                          </div>
                          <div className="contact-form-label">
                            <div className="form-item">
                              <input
                                placeholder="EMAIL ADDRESS" 
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                                className="input-name contact-lebel"
                              />
                              {errors?.email && (
                                <p className="error_msg">Email cannot be empty.</p>
                              )}
                            </div>
                            <div className="form-item">
                              <input
                                placeholder="PHONE" 
                                type="tel"
                                name="phone"
                                pattern="[0-9]*"
                                value={phone}
                                onChange={handleChange}
                                className="input-name contact-lebel"
                                
                              />
                              {errors?.email && (
                                <p className="error_msg">Phone number cannot be empty.</p>
                              )}
                            </div>
                          </div>
                          <div className="contact-form-label">
                            <div className="form-item full-width">
                              <textarea
                                name="message"
                                value={message}
                                onChange={(e) => {
                                  setMessage(e.target.value);
                                }}
                                className="form-message contact-lebel" rows="4" cols="50" placeholder="MESSAGE">
                              </textarea>
                            </div>
                          </div>
                          <div className="submit_btn_wrap">
                            <button type="submit" >Submit</button>
                          </div>
                          <div className="final_msg_wrap">
                            {showSuccessMessage && (
                              <p className="thankyou_msg">
                                Thank you for your message! A team member from Villazzo Realty will get back to you shortly.
                              </p>
                            )}
                            {showFailureMessage && (
                              <p className="error_msg">
                                Please fill the form
                              </p>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>  
                  </div>
              </div>
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

export default Sell
