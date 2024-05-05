import HeroSection from "@/components/UI/HomePage/heroSection/HeroSection";
import HowItWorks from "@/components/UI/HomePage/howItsWork/HowItsWork";
import Specialist from "@/components/UI/HomePage/specialist/Specialist";
import TopRatedDoctors from "@/components/UI/HomePage/topRatedDoctors/TopRatedDoctors";
import WhyUs from "@/components/UI/HomePage/whyUs/WhyUs";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Specialist />
      <TopRatedDoctors />
      <WhyUs />
      <HowItWorks />
    </>
  );
};

export default HomePage;
