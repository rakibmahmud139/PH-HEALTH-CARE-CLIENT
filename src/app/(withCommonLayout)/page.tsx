import HeroSection from "@/components/UI/HomePage/heroSection/HeroSection";
import Specialist from "@/components/UI/HomePage/specialist/Specialist";
import TopRatedDoctors from "@/components/UI/HomePage/topRatedDoctors/TopRatedDoctors";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Specialist />
      <TopRatedDoctors />
    </>
  );
};

export default HomePage;
