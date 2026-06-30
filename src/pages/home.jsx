import Navbar from "../components/navbar";
import Hero from "../components/hero";
import About from "../components/about";
import Services from "../components/services";
import Projects from "../components/projects";
import Blog from "../components/blog";
import Contact from "../components/contact";
import Footer from "../components/footer";
import SEOHead from "../components/SEOHead";
import Profile from "../components/profile";

export default function Home() {
    return (
        <>
            <SEOHead 
                title="Adil Hassan | adil12hassan — MERN Stack Developer & Blogger"
                description="Portfolio and blog of Adil Hassan (adil12hassan). Modern MERN Stack web developer offering responsive web apps, single-page sites, and tech articles."
                url="/"
            />
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Profile />
            <Projects />
            <Blog />
            <Contact />
            <Footer />
        </>
    )
}
