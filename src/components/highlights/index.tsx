import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const Highlights = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          scrub: true,
        },
      })
      .to(".left-column", {
        y: 0,
        opacity: 1,
        stagger: 0.5,
        duration: 1,
        ease: "power1.inOut",
      })
      .to(".right-column", {
        y: 0,
        opacity: 1,
        stagger: 0.5,
        duration: 1,
        ease: "power1.inOut",
      })
      
    },
    { scope: sectionRef }
  );

  return (
    <section id="highlights" ref={sectionRef}>
      <h2>There’s never been a better time to upgrade.</h2>
      <h3>Here’s what you get with the new MacBook Pro.</h3>

      <div className="masonry">
        <div className="left-column">
          <div>
            <img src="/laptop.png" alt="Laptop" width={106} height={106}/>
            <p>Fly through demanding tasks up to 9.8x faster.</p>
          </div>
          <div>
            <img src="/sun.png" alt="Sun" width={87} height={113}/>
            <p>
              A stunning <br />
              Liquid Retina XDR <br />
              display.
            </p>
          </div>
        </div>
        <div className="right-column">
          <div className="apple-gradient">
            <img src="/ai.png" alt="AI" width={78} height={100}/>
            <p>
              Built for <br />
              <span>Apple Intelligence.</span>
            </p>
          </div>
          <div>
            <img src="/battery.png" alt="Battery" width={93} height={106}/>
            <p>
              Up to
              <span className="green-gradient"> 14 more hours </span>
              battery life.
              <span className="text-dark-100"> (Up to 24 hours total.)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Highlights;
