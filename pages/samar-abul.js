import React, { useState, useEffect } from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import { fetchAPI } from "../lib/api"
import Image from "next/image"
import { getStrapiMedia } from "../lib/media"
import Link from 'next/link'
import axios from 'axios'


const TeamsInside = ({
  global,
  samarabul,
  footerData,
  navigation,
}) => {
	let propertyListSamar = samarabul.attributes.Properties
	let mainPropertyListSamar = []
	propertyListSamar.forEach((element) => {
		mainPropertyListSamar.push(element)
	})
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
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${samarabul.attributes.memberImageURL}`}
                  className="header_image"
                  layout="fill"
                  alt="Villazzo"
                />
              </p>
              <h3 className="meet-left-name">{samarabul.attributes.memberName}</h3>
              <p className="broker">{samarabul.attributes.memberType}</p>
              <a className="number" href={`tel:${encodeURIComponent(samarabul.attributes.contactNo)}`}>{samarabul.attributes.contactNo}</a>
              <a className="email" href={`mailto:${encodeURIComponent(samarabul.attributes.memberEmail)}`}>{samarabul.attributes.memberEmail}</a>
            </div>
            <div className="meet-right">
              <p>{samarabul.attributes.Content}</p>
            </div>
          </div>
          <div className="properties">
            <h1 className="team-heading">FEATURED PROPERTIES</h1>
            <div className="property-wrap">
              {mainPropertyListSamar.map((element) => (
              <div key={mainPropertyListSamar.key} className="property-box">
                <p className="img_Wrap">
                  <Image
                    loader={myLoader}
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${element.propertyImageURL}`}
                    className="header_image"
                    layout="fill"
                    alt="Villazzo"
                  /> 
                </p>
                <h4 className="pro-name">{element.heading}</h4>
                <div className="pro-text" dangerouslySetInnerHTML={{ __html: element.subheading }}></div>
              </div>
              ))}
            </div>
          </div>
          <div className="video-btn contact-btn">
            <a href="javascript:;" onClick={onAddClick}>CONTACT US</a>
          </div>
          <div className="find-hotel">
            <a href="https://www.villazzo.com">Find Out More About Our Villa Hotels</a>
          </div>
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
                                max-length="12"
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
    <Footer footerProp={footerData} />
    </>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [
    globalRes,
	samarabulRes,
    footerRes,
    navigationRes,
  ] = await Promise.all([
    fetchAPI("/global", { populate: "*" }),
	fetchAPI("/samarabul", { populate: "*" }),
    fetchAPI("/footer", { populate: "deep" }),
    fetchAPI("/header-nav", { populate: "*" }),
  ])

  return {
    props: {
      global: globalRes.data,
	  samarabul: samarabulRes.data,
      footerData: footerRes.data,
      navigation: navigationRes.data,
    },
    revalidate: 1,
  }
}

export default TeamsInside
