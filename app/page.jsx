import { PortfolioProvider, T } from "../components/portfolio-provider";
import { Header } from "../components/header";
import { Hero } from "../components/sections/hero";
import { About } from "../components/sections/about";
import { Experience } from "../components/sections/experience";
import { Expertise } from "../components/sections/expertise";
import { Contact } from "../components/sections/contact";
import { Footer } from "../components/footer";
import { MotionController } from "../components/motion-controller";
import { profile } from "../lib/profile";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profile).replace(/</g, "\\u003c"),
        }}
      />
      <PortfolioProvider>
        <a className="skip-link" href="#main">
          <T id="skip">Skip to content</T>
        </a>
        <Header />
        <main id="main">
          <Hero />
          <About />
          <Experience />
          <Expertise />
          <Contact />
        </main>
        <Footer />
        <MotionController />
      </PortfolioProvider>
    </>
  );
}
