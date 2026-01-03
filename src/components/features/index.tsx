import { useEffect, useRef, useState } from "react";
import {
  FEATURE_VIDEO_1,
  FEATURE_VIDEO_2,
  FEATURE_VIDEO_3,
  FEATURE_VIDEO_4,
  FEATURE_VIDEO_5,
  features,
  IMAGE_TEXTURE,
  MACBOOK_MODEL_GLB,
  MATERIAL_NAME_SCREEN,
} from "../../constants";
import * as THREE from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Features = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoTexture, setVideoTexture] = useState<string>("");
  const [isModelReady, setIsModelReady] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: "(max-width:1024px)" });
  useEffect(() => {
    if (!sectionRef.current) return;
    if (!canvasRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 1.5, 4);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setClearColor("#000");
    renderer.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const point1 = new THREE.PointLight("white", 1);
    point1.position.set(0, -25, 10);
    scene.add(point1);

    const point2 = new THREE.PointLight("white", 1);
    point2.position.set(0, 15, 10);
    scene.add(point2);

    const dirLight1 = new THREE.DirectionalLight("white", 1);
    dirLight1.position.set(5, 10, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight("white", 1);
    dirLight2.position.set(0, 5, 0);
    scene.add(dirLight2);

    const point3 = new THREE.PointLight("white", 0.5);
    point3.position.set(-5, 5, 5);
    scene.add(point3);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enableRotate = false;

    const video = document.createElement("video");
    video.src = FEATURE_VIDEO_1;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;

    video.play();

    videoRef.current = video;

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.flipY = false;

    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.load(MACBOOK_MODEL_GLB, (gltf) => {
      gltf.scene.scale.set(isMobile ? 0.045 : 0.03, isMobile ? 0.025: 0.045, isMobile ? 0.045 : 0.035);
      gltf.scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          if (child.material.name === MATERIAL_NAME_SCREEN) {
            child.material.map = videoTexture;
            child.material.emissiveMap = videoTexture;
            child.material.emissive.set(0xffffff);
            child.material.emissiveIntensity = 0.6;
            child.material.needsUpdate = true;
          }
        }
      });

      scene.add(gltf.scene);
      modelRef.current = gltf.scene;
      setIsModelReady(true);
    });

    const pmrem = new THREE.PMREMGenerator(renderer);

    new THREE.TextureLoader().load(IMAGE_TEXTURE, (texture) => {
      const envMap = pmrem.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      texture.dispose();
    });

    const animate = () => {
      controls.update()
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  useEffect(() => {
    if (!videoTexture) return;
    if (!videoRef.current) return;
    if (videoRef.current?.src === videoTexture) return;
    videoRef.current.pause();
    videoRef.current.src = videoTexture;
    videoRef.current.load();
    videoRef.current.play();
  }, [videoTexture]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (!modelRef.current) return;
      // 3D MODEL ROTATION ANIMATION
      const modelTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#f-canvas",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        },
      });

      // SYNC THE FEATURE CONTENT
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#f-canvas",
          start: "top center",
          end: "bottom  top",
          scrub: 1,
        },
      });

      // 3D SPIN

      modelTimeline.to(modelRef.current.rotation, {
        y: Math.PI * 2,
        ease: "power1.inOut",
      });

      // Content & Texture Sync
      timeline
        .call(() => setVideoTexture(FEATURE_VIDEO_1))
        .to(".box1", { opacity: 1, y: 0, delay: 1 })

        .call(() => setVideoTexture(FEATURE_VIDEO_2))
        .to(".box2", { opacity: 1, y: 0 })

        .call(() => setVideoTexture(FEATURE_VIDEO_3))
        .to(".box3", { opacity: 1, y: 0 })

        .call(() => setVideoTexture(FEATURE_VIDEO_4))
        .to(".box4", { opacity: 1, y: 0 })

        .call(() => setVideoTexture(FEATURE_VIDEO_5))
        .to(".box5", { opacity: 1, y: 0 });
    },
    { scope: sectionRef, dependencies:[isModelReady] }
  );
  return (
    <section id="features" ref={sectionRef}>
      <h2>See it all in a new light.</h2>
      <canvas id="f-canvas" ref={canvasRef} />
      <div className="absolute inset-0">
        {features.map((item, index) => (
          <div key={index} className={`box box${index + 1}`}>
            <img src={item.icon} alt={item.highlight} />
            <p>
              <span className="text-white">{item.highlight}</span>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
