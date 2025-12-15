import { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2;
    }
  }, []);

  return (
    <section id="hero">
      <div>
        <h1>MacBook Pro</h1>
        <img src="./title.png" alt="MacBook Title" />
        <video
          ref={videoRef}
          src="./videos/hero.mp4"
          autoPlay
          playsInline
          muted
        />
        <button type="button">Buy</button>
        <p>From $1599 or $133/mon for 12 months</p>
      </div>
    </section>
  );
};

export default Hero;
