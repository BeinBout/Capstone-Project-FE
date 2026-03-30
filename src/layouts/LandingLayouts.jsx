import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Values from "../components/Values";
import Info from "../components/Info";
import Footer from "../../src/components/Footer";

export default function LandingLayout() {
    return (
        <>
        <Navbar />
        <Hero />
        <Values />
        <Info />
        <Footer />
        </>
    );
}