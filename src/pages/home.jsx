import Navbar from "../components/navbar";
import Hero from "../components/hero";
import About from "../components/about";
import Services from "../components/services";
import Projects from "../components/projects";
import Blog from "../components/blog";
import Contact from "../components/contact";
import Footer from "../components/footer";

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Projects />
            <Blog />
            <Contact />
            <Footer />
        </>
    )
}