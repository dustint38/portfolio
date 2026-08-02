import Nav from '@/components/Nav';
import BackgroundBurst from '@/components/BackgroundBurst';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import SignatureMark from '@/components/SignatureMark';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <BackgroundBurst />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Experience />
        <Contact />
        <SignatureMark />
      </main>
      <Footer />
    </>
  );
}
