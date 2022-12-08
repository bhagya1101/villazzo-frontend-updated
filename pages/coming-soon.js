import Footer from "../components/footer"
import Header from "../components/header"
import { fetchAPI } from "../lib/api"



const ComingSoon = ({
  global,
  comingsoonpage,
  footerData,
  navigation,
}) => {
  return (
    <>
		
      <div className="bg-img bg-white new_dev_pg_wrap coming_soon_wrap">
        <Header navigation={navigation} global={global} />
		<div className="container">
			<h1 className="soon_title">{comingsoonpage.attributes.Content}</h1>
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
    comingsoonpageRes,
    footerRes,
    navigationRes,
  ] = await Promise.all([
    fetchAPI("/global", { populate: "*" }),
    fetchAPI("/comingsoonpage", { populate: "*" }),
    fetchAPI("/footer", { populate: "deep" }),
    fetchAPI("/header-nav", { populate: "*" }),
  ])

  return {
    props: {
      global: globalRes.data,
      comingsoonpage: comingsoonpageRes.data,
      footerData: footerRes.data,
      navigation: navigationRes.data,
    },
    revalidate: 1,
  }
}

export default ComingSoon
