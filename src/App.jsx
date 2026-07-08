import { useEffect } from 'react';
import { LenisProvider, useLenis } from './context/LenisContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import DiagDivider from './components/DiagDivider';
import Heritage from './components/Heritage';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Cursor from './components/Cursor';

function ScrollRestore() {
  const { lenis } = useLenis();
  useEffect(() => {
    if (lenis) {
      window.history.scrollRestoration = 'manual';
    }
  }, [lenis]);
  return null;
}

function Home() {
  return (
    <>
      <ScrollRestore />
      <Nav />
      <Hero />
      <Heritage />
      <DiagDivider />
      <Services />
      <DiagDivider flip />
      <Gallery />
      <DiagDivider />
      <Testimonials />
      <DiagDivider flip />
      <Booking />
      <Footer />
      <WhatsAppButton />
      <Cursor />
    </>
  );
}

export default function App() {
  return (
    <LenisProvider>
      <Home />
    </LenisProvider>
  );
}
