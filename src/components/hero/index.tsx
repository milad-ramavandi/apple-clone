import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { splitText } from "../../utils";
gsap.registerPlugin(useGSAP);

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const paraphRef1 = useRef<HTMLParagraphElement | null>(null);
  const paraphRef2 = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    if (
      !headingRef.current ||
      !videoRef.current ||
      !buttonRef.current ||
      !paraphRef1.current ||
      !paraphRef2.current
    )
      return;
    videoRef.current.playbackRate = 2;
    splitText(headingRef.current as HTMLElement);
    gsap
      .timeline()
      .from(videoRef.current, { y: 150 })
      .from(paraphRef1.current, { opacity: 0, y: -15 }, "+=0.5")
      .from(".mil-letter-span", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "sine",
      })
      .fromTo(buttonRef.current, {opacity:0, x:20}, {opacity:1, x:0}, "-=1")
      .from(paraphRef2.current, { opacity: 0, x: -20 });
  }, []);

  return (
    <section id="hero">
      <div>
        <p ref={paraphRef1}>MacBook Pro</p>
        <h1 ref={headingRef}>Built for Apple Intelligence</h1>
        <video
          ref={videoRef}
          src="./videos/hero.mp4"
          autoPlay
          playsInline
          muted
        />
        <button ref={buttonRef} type="button">
          Buy
        </button>
        <p ref={paraphRef2} className="lg:h3-semibold base-semibold">From $1599 or $133/mon for 12 months</p>
      </div>
    </section>
  );
};

export default Hero;
