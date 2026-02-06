import BrandsSection from "../../component/Home/Brands"
import FinalCTA from "../../component/Home/CallToAction"
import HeroSection from "../../component/Home/HeroSection"
import FAQSection from "../../component/Home/popularQuestions"
import ShowCars from "../../component/Home/ShowCars"
import StatsSection from "../../component/Home/Stats"
import TestimonialsSection from "../../component/Home/TestimonialsSection"
import WhyChooseUs from "../../component/Home/WhyChooseUs"
import Footer from "../../component/Layout/Footer"


function Home() {




    return (
        <div>
            <HeroSection />
            <BrandsSection />
            <WhyChooseUs />
            <StatsSection />
            <TestimonialsSection />
            <ShowCars />
            <FAQSection />
            <FinalCTA />
            <Footer />
        </div>
    )
}

export default Home
