import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import SEOHead from "../../components/seo/SEOHead";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Profiles from "./Profiles";
import Projects from "./Projects";
import Blog from "./Blog";
import Contact from "./Contact";

export default function HomePage() {
    return (
        <>
            <SEOHead
                title="Adil Hassan | adil12hassan - MERN Stack Developer & Blogger"
                description="Portfolio and blog of Adil Hassan (adil12hassan). Modern MERN Stack web developer offering responsive web apps, single-page sites, and tech articles."
                url="/"
            />
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Profiles />
            <Projects />
            <Blog />
            <Contact />
            <Footer />
        </>
    )
}
