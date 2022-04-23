import LandingPage from "components/LandingPage";
import Navbar from "components/Navbar";
import RightSidebar from "components/RightSidebar";

const Index = () => (
  <div className="relative min-h-screen">
    <Navbar />
    <div className="py-28">
      <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-screen-2xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
        <LandingPage />
        <RightSidebar />
      </div>
    </div>
  </div>
);

export default Index;
