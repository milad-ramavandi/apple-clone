import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { splitText } from "../../utils";
gsap.registerPlugin(useGSAP);

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const paraphRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    if (
      !headingRef.current ||
      !videoRef.current ||
      !imageRef.current ||
      !buttonRef.current ||
      !paraphRef.current
    )
      return;
    videoRef.current.playbackRate = 2;
    splitText(headingRef.current as HTMLElement);
    gsap
      .timeline()
      .from(".mil-letter-span", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.3,
        ease: "sine",
      })
      .from(imageRef.current, { opacity: 0, y: -30 }, "-=1")
      .from(videoRef.current, { y: 150, opacity: 0 }, "-=0.8")
      .fromTo(buttonRef.current, {opacity:0, x:20}, {opacity:1, x:0}, "+=0.1")
      .from(paraphRef.current, { opacity: 0, x: -20 });
  }, []);

  return (
    <section id="hero">
      <div>
        <h1 ref={headingRef}>MacBook Pro</h1>
        <img ref={imageRef} src="./title.png" alt="MacBook Title" />
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
        <p ref={paraphRef}>From $1599 or $133/mon for 12 months</p>
      </div>
    </section>
  );
};

export default Hero;
