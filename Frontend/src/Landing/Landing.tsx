import "../index.css";
import LandingHeader from "./LandingHeader";
import LandingMain from "./LandingMain";
import LandingAbout from "./LandingAbout";
import LandingContact from "./LandingContact";
import LandingProduct from "./LandingProduct";
import LandingFooter from "./LandingFooter";

export default function Landing() {
  return (
    <div className="w-full min-h-screen flex flex-col pt-20 bg-[#6b7b69] border border-emerald-500/30">
      <LandingHeader />

      <section id="home" className="min-h-screen">
        <LandingMain />
      </section>

      <section id="product" className="min-h-screen">
        <LandingProduct />
      </section>

      <section id="about" className="min-h-screen">
        <LandingAbout />
      </section>

      <section id="contact" className="min-h-screen">
        <LandingContact />
      </section>

      <section id="footer">
        <LandingFooter />
      </section>
    </div>
  );
}
