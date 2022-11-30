import Footer from "../components/footer"
import Header from "../components/header"
import { fetchAPI } from "../lib/api"



const ComingSoon = ({
  global,
  footerData,
  navigation,
}) => {
  return (
    <>
		
      <div className="bg-img bg-white new_dev_pg_wrap coming_soon_wrap">
        <Header navigation={navigation} global={global} />
		<div className="container">
			<h1 className="soon_title">PAGE COMING SOON!</h1>
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
    footerRes,
    navigationRes,
  ] = await Promise.all([
    fetchAPI("/global", { populate: "*" }),
    fetchAPI("/footer", { populate: "deep" }),
    fetchAPI("/header-nav", { populate: "*" }),
  ])

  return {
    props: {
      global: globalRes.data,
      footerData: footerRes.data,
      navigation: navigationRes.data,
    },
    revalidate: 1,
  }
}

export default ComingSoon
