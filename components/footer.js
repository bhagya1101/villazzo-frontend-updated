import React, { useState } from "react"
import Image from "next/image"
import { getStrapiMedia } from "../lib/media"
import axios from 'axios';

const Footer = ({ footerProp }) => {
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }
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

      const qs = require('qs');
        axios.post('https://webdevfolio.com/Villazzomail/Villazzomail.php',  qs.stringify({
            "firstName": fullname,
            "lastName": lastName,
            "email": email,
            "phoneNo": phone,
            "message": message,

        }))
        .then((res) => {
          console.log(`statusCode: ${res.statusCode}`)
          console.log(res)
          console.log(`statusCode: ${res.data}`)
        })
        .catch((error) => {
          console.error(error)
        })
      
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
      <div className="footer-bg-color">
        <div className="footer-container container-fluid">
          <footer>
            <div className="footer-wrap">
              <div className="footer-links">
                <div className="footer-sec1">
                  <div className="toll-wrap left-section" dangerouslySetInnerHTML={{__html: footerProp.attributes.leftSectionContent}}>
                  </div>
                </div>
                <div className="navigate-wrap">
                  <b>
                    <p className="text-navigate">NAVIGATE</p>
                  </b>
                  <div className="navigate">
                    <div className="navigate-links">
                      {footerProp.attributes.navigateLinksLeft.map((value, index) => (
                        <div className="navigate-sec1" key={`left${index}`}>
                          <a href={value.URL} key={`left-links${index}`}>{value.Label}</a>
                        </div>
                      ))}
                      <div className="navigate-sec1"><a href="javascript:;" onClick={onAddClick}>CONTACT</a></div>
                    </div>
                    <div className="navigate-links">
                      {footerProp.attributes.navigateLinksRight.map((value, index) => (
                        <div className="navigate-sec1" key={`right${index}`}>
                          <a href={value.URL} key={`right-links${index}`}>{value.Label}</a>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="connect-wrap">
                    <div className="footer-icons">
                      <p>CONNECT</p>
                      <div className="icons-wrap">
                        {footerProp.attributes.socialConnect.map((value, index) => (
                          value.Account=='Email' ? <a href={value.URL} key={`footer-links${index}`}>
                          <i className='fa-solid fa-envelope' key={`ico${index}`}></i>
                          </a> :
                          value.URL && <a href={value.URL} key={`social${index}`}>
                            <i className={`fa-brands fa-${value.Account.toLowerCase()}`}></i>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-images-wrap">
                <div className="footer-images">
                  {footerProp.attributes.featuredImages.map((fImage, index) => (
                    <a href={fImage.URL} className="footer-img" key={`featuredImages${index}`}>
                      <div className="featured-img">
                        <Image
                          loader={myLoader}
                          src={getStrapiMedia(
                            fImage.Hero
                          )}
                          key={`featuredImage${index}`}
                          layout="fill"
                          alt="footerImage"
                        />
                      </div>
                      <div className="footer-logo-img">
                        <Image
                          loader={myLoader}
                          src={getStrapiMedia(
                            fImage.Logo
                          )}
                          key={`featuredImageLogo${index}`}
                          layout="fill"
                          alt="Logo"
                        />
                      </div>
                    </a>
                  ))}
                  {/* <div className="footer-img">
                    <Image
                      loader={myLoader}
                      src={getStrapiMedia(
                        footerProp.attributes.firstFeaturedImage
                      )}
                      layout="fill"
                      alt="footerImage"
                    />
                  </div>
                  <div className="footer-img">
                    <Image
                      loader={myLoader}
                      src={getStrapiMedia(
                        footerProp.attributes.secondFeaturedImage
                      )}
                      layout="fill"
                      alt="footerImage"
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-page-links">
          {footerProp.attributes.copyrightLinks.map((value, index) => (
            <div className="year" key={`copyright${index}`}>
              <a href={value.URL} key={`links${index}`}>{value.Label}</a>
            </div>
          ))}
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
    </>
  )
}

export default Footer
