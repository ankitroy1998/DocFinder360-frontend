import React from "react";
import Landing from "../components/Landing";
import About from "../components/About";
import Services from "../components/Services";
import Footer from "../components/Footer";

export default function Home() {
  return (<>
      <Landing/>
      <Services />
      <About />
      <Footer />
    </>
  );
}
