import HomePageHero from "./HomePageHero/HomePageHero"
import HomePageServices from "./HomePageServices/HomePageServices"
import HomePageTestimonials from "./HomePageTestimonials/HomePageTestimonials"
import HomePageCTA from "./HomePageCTA/HomePageCTA"

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HomePageHero />
      <HomePageServices />
      <HomePageTestimonials />
      <HomePageCTA />
    </div>
  )
}

export default HomePage
