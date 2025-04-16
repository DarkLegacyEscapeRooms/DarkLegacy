
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const audioRef = useRef(null);
  const logoRef = useRef(null);
  const heroRef = useRef(null);
  const [shadowVisible, setShadowVisible] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/spooky-intro.mp3");
    audioRef.current.volume = 0.4;
    audioRef.current.play().catch(() => {});

    const handleScroll = () => {
      const yOffset = window.scrollY;
      if (logoRef.current) {
        logoRef.current.style.transform = `translateY(${yOffset * 0.2}px)`;
      }
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${yOffset * 0.05}px)`;
      }
    };

    const shadowInterval = setInterval(() => {
      setShadowVisible(true);
      setTimeout(() => setShadowVisible(false), 3000);
    }, 10000);

    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 600);
    }, 20000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(shadowInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  const playWhisper = () => {
    const whisper = new Audio("/sounds/whisper.mp3");
    whisper.volume = 0.3;
    whisper.play().catch(() => {});
  };

  return (
    <div className={`bg-black text-white font-serif relative overflow-hidden ${glitchActive ? "glitch" : ""}`}>
      {shadowVisible && (
        <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
          <img
            src="/images/shadow-figure.png"
            alt="Shadow"
            className="absolute animate-[floatAcross_10s_linear] opacity-20 w-32 md:w-48 top-1/3"
          />
        </div>
      )}

      <img
        src="/images/dark-legacy-logo.png"
        alt="Background Logo"
        ref={logoRef}
        className="absolute inset-0 m-auto w-[80%] opacity-5 z-0 object-contain pointer-events-none transition-transform duration-300 ease-out"
      />

      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center z-10 transition-transform duration-500 ease-out"
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
          autoPlay
          loop
          muted
          playsInline
          src="/videos/checkin-dark-loop.mp4"
        />
        <div className="absolute top-6 left-6 z-20">
          <img src="/images/dark-legacy-logo.png" alt="Dark Legacy Logo" className="h-16 md:h-20" />
        </div>
        <div className="relative z-20 text-center p-4">
          <h1 className="text-5xl md:text-7xl font-bold text-orange-500 drop-shadow-lg">
            Dark Legacy Escape Rooms
          </h1>
          <h2 className="text-2xl md:text-3xl mt-4 text-white">
            Δωμάτιο: <span className="text-orange-400 italic">Check-In</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-lg">
            Βίωσε ένα ψυχολογικό θρίλερ που θολώνει τα όρια μεταξύ φαντασίας και πραγματικότητας.
          </p>
          <Button className="mt-6 bg-orange-500 hover:bg-orange-600 text-black text-lg px-6 py-3 rounded-2xl shadow-xl">
            Κλείσε τώρα
          </Button>
        </div>
      </section>

      <section className="bg-black py-20 px-6 md:px-20 z-10 relative">
        <h3 className="text-4xl text-orange-400 font-bold mb-6">Το Σενάριο</h3>
        <p className="max-w-3xl text-lg leading-relaxed">
          Καλώς ήρθατε στο κατάλυμα "Check-In". Ένα εγκαταλελειμμένο καταφύγιο με σκοτεινά μυστικά που δεν έμειναν ποτέ θαμμένα.
          Κάθε δωμάτιο, κάθε ήχος, κάθε σκιερή φιγούρα κρύβει ένα στοιχείο... ή έναν εφιάλτη. Θα καταφέρεις να δραπετεύσεις από τη δική σου ψευδαίσθηση;
        </p>
      </section>

      <section className="bg-zinc-900 py-20 px-6 md:px-20 z-10 relative">
        <h3 className="text-4xl text-orange-400 font-bold mb-6">Μια Ματιά στον Χώρο</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <img
              key={n}
              src={`/images/checkin${n}.jpg`}
              alt={`Check-In Room ${n}`}
              onMouseEnter={playWhisper}
              className="rounded-2xl shadow-lg cursor-pointer transition-transform hover:scale-105"
            />
          ))}
        </div>
      </section>

      <section className="bg-black py-20 px-6 md:px-20 z-10 relative">
        <h3 className="text-4xl text-orange-400 font-bold mb-6">Κράτηση</h3>
        <div className="bg-zinc-800 p-10 rounded-2xl shadow-lg text-center">
          <p className="text-lg mb-4">Σύντομα θα μπορείτε να κάνετε κράτηση από εδώ!</p>
          <div className="h-32 border-2 border-dashed border-orange-400 flex items-center justify-center">
            Booking Plugin Placeholder
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes floatAcross {
          0% { left: -20%; opacity: 0; }
          25% { opacity: 0.2; }
          50% { opacity: 0.3; }
          75% { opacity: 0.2; }
          100% { left: 120%; opacity: 0; }
        }
        .glitch {
          animation: glitch-flicker 0.6s ease-in-out;
        }
        @keyframes glitch-flicker {
          0% { filter: brightness(1); }
          20% { filter: brightness(0.7) contrast(1.2); }
          40% { filter: brightness(1.5) contrast(1.5); }
          60% { filter: brightness(0.8) contrast(0.9); }
          80% { filter: brightness(1.3); }
          100% { filter: brightness(1); }
        }
      `}</style>
    </div>
  );
}
