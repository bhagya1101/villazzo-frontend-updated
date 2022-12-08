import React, { useState } from "react"
import Footer from "../components/footer"
import { fetchAPI } from "../lib/api"
import Image from "next/image"
import { getStrapiMedia } from "../lib/media"
import Link from 'next/link'
import axios from 'axios'

const Home = ({
  global,
  homepage,
  footerData,
  articles,
  categories,
  navigation,
}) => {
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }
  let navElements = navigation.attributes.Navigation
  let mainNavigation = []
  let menucount = 0
  navElements.forEach((element, index) => {
    if (element.__component === "shared.header-navigation") {
      console.log(index)
      mainNavigation.push(element)
      if (index === 0) {
        menucount = 0
        mainNavigation[menucount].submenu = []
      } else {
        menucount = menucount + 1
        mainNavigation[menucount].submenu = []
      }
    } else {
      mainNavigation[menucount].submenu.push(element)
    }
  })

  const [toggleMenuClass, toggleMenu] = useState(false)
  const [subMenuClass, subMenuToggleMenu] = useState(false)

  const navRef = React.useRef(null);
  const onAddClick = (e) => {
    navRef.current.classList.add("show_popup");
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
        },
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
  const onRemoveClick = (e) => {
    navRef.current.classList.remove("show_popup");
    setShowSuccessMessage(false);
    setShowFailureMessage(false);
  };
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
              <source src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${global.attributes.videoURL}`} type="video/mp4" />
              <source src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${global.attributes.videoURL}`} type="video/webm" />
          </video>
        </div>
        <header className="header">
          <div className="main-wrap container">
            <div className="mobile-nav">
              <nav className="navbar navbar-expand-lg navbar-light hideOnDesk">
                <div className="container-fluid">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => toggleMenu((toggleMenuClass = !toggleMenuClass))}
                  >
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </button>
                  <div
                    className={`navbar-collapse ${ toggleMenuClass ? "" : "collapse"}`}
                    id="navbarNavDropdown"
                  >
                    <ul className="navbar-nav">
                      {mainNavigation.map((menu, index) => (
                        <li className="nav-item" key={`nav-menu-mobile${index}`}>
                          <a href={menu.URL} key={`nav-link-mobile${index}`} className={`nav-link ${menu.showIcon === "Yes" ? "showIcon" : ""}`} onClick={() => subMenuToggleMenu((subMenuClass = !subMenuClass))}>
                            {menu.Label}
                            {menu.submenu.length ? <span className="arrow"><i className="fa fa-chevron-down" aria-hidden="true"></i></span> : ""}
                          </a>
                          {menu.submenu.length ? (
                            <ul className={`dropdown-menu ${ subMenuClass ? "active" : ""}`} key={`nav-submenu-mobile${index}`}>
                              {menu.submenu.map((submenu) => (
                                <li key={`nav-li-mobile${index}sub${submenu.Label}`}>
                                  <a className="dropdown-item" href={submenu.URL} key={`nav-menu-item${index}dd${submenu.Label}`}>
                                    {submenu.Label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : ("")}
                        </li>
                      ))}
                      <li className="nav-item cursor"><a className="nav-link"  onClick={onAddClick}>Contact Us</a></li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div className="logo-wrap">
              <div className="villazzo-logo-wrap">
                <div className="main-logo">
                  <Image
                    loader={myLoader}
                    src={getStrapiMedia(global.attributes.companyLogo)}
                    alt="Image"
                    layout="fill"
                  />
                </div>
                <div className="visit-text">
                  <div className="visit-text-wrap">
                    <p>Visit Our Sites</p>
                    <p className="drop-down mb-drop">
                      <a href="#">
                        <i className="fa-solid fa-caret-down"></i>
                      </a>
                    </p>
                    <div className="dropdownMenu">
                      <p><a href="https://www.villazzo.com/">VILLAZZO HOTELS</a></p>
                      <p><a href="http://www.global-luxury-villas.com/">GREAT VILLA DEALS</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="inquiry-wrap">
              <div className="inquiry">
                <a href="tel:+1(305)777 0146" className="desktop-inquiry-call">+1 (877) VILLAZZO</a>
                <a href="tel:+1(305)777 0146" className="mobile-inquiry-call"><i className="fa fa-phone" aria-hidden="true"></i></a>
              </div>
              <div className="see-more-text">
                <div className="see-more-text-wrap">
                  <p>SEE MORE OPTIONS</p>
                  <p className="drop-down">
                    <a href="#">
                      <i className="fa-solid fa-caret-down"></i>
                    </a>
                  </p>
                  <div className="dropdownMenu">
                    <p><a href="mailto:Lisa.Blake@Villazzo.com">Lisa.Blake@Villazzo.com</a></p>
                    <p><a href="tel:+1 (305) 340-2727">+1 (305) 340-2727</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="inqury-btn">
              <a href="javascript:;"  onClick={onAddClick}>INQUIRE</a>
            </div>
          </div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light hideOnMob">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  {mainNavigation.map((menu, index) => (
                    <li className="nav-item" key={`nav-menu-desk${index}`}>
                      <a
                        className={`nav-link ${
                          menu.showIcon === "Yes" ? "showIcon" : ""
                        }`}
                        href={menu.URL}
                        key={`nav-links-desk${index}`}
                      >
                        {menu.Label}
                      </a>
                      {menu.submenu.length ? (
                        <ul
                          className="dropdown-menu"
                          key={`nav-drop-desk${index}`}
                        >
                          {menu.submenu.map((submenu) => (
                            <li key={`nav-li-desk${index}dd${submenu.Label}`}>
                              <a
                                className="dropdown-item"
                                href={submenu.URL}
                                key={`nav-drop-item-desk${index}dd${submenu.Label}`}
                              >
                                {submenu.Label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
                  <li className="nav-item cursor"><a className="nav-link"  onClick={onAddClick}>Contact Us</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div className="buttons-wrap">
           <div className="sell-buy-rent-buttons">
                <div className="sell-btn">
                  <Link href="/sell">SELL</Link>
                </div>
                <div className="sell-btn">
                  <Link href="/buy">BUY</Link>
                </div>
                <div className="sell-btn">
                  <Link href="/buy">RENT</Link>
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
                                Thankyou! We will connect you shortly.
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
    homepageRes,
    footerRes,
    articleRes,
    categoryRes,
    navigationRes,
  ] = await Promise.all([
    fetchAPI("/global", { populate: "*" }),
    fetchAPI("/homepage", { populate: "*" }),
    fetchAPI("/footer", { populate: "deep" }),
    fetchAPI("/articles", { populate: "*" }),
    fetchAPI("/categories", { populate: "*" }),
    fetchAPI("/header-nav", { populate: "*" }),
  ])

  return {
    props: {
      global: globalRes.data,
      homepage: homepageRes.data,
      footerData: footerRes.data,
      articles: articleRes.data,
      categories: categoryRes.data,
      navigation: navigationRes.data,
    },
    revalidate: 1,
  }
}

export default Home
