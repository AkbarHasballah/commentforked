import React from 'react';
import AboutUs from '../components/AboutUs/AboutUs';
import VisionMission from '../components/AboutUs/VisionMission';
import OurTeams from '../components/AboutUs/OurTeams';
import FAQ from '../components/AboutUs/FAQ';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AboutPage() {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <AboutUs />
      <VisionMission />
      <OurTeams />
      <FAQ />
      <Footer />
    </div>
  );
}

export default AboutPage;
