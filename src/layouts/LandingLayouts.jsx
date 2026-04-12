import Navbar from "../components/Navbar";
import Hero from "../pages/landing/hero/Hero";
import About from "../pages/landing/about/AboutPages";
import Values from "../pages/landing/values/Values";
import Info from "../pages/landing/info/Info";
import Footer from "../components/Footer";

export default function LandingLayout() {
    return (
        <>
        <Navbar />
        <section id="beranda" className="scroll-mt-24"><Hero /></section>
        <section id="tentang" className="scroll-mt-15"><About /></section>
        <section id="values" className="scroll-mt-5"><Values /></section>
        <section id="info" className="scroll-mt-24"><Info /></section>
        <Footer />
        </>
    );
}