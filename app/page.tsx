import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
import MainLayout from "./layout";

function HomePage() {
  const currentYear = new Date().getFullYear();
  return (
    <MainLayout currentYear={currentYear}>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </MainLayout>
  );
}
export default HomePage;
