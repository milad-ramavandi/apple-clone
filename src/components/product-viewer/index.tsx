import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import { BODY_MATERIAL_NAMES } from "../../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

const ProductViewer = () => {
  const [color, setcolor] = useState<string>("#2e2c2e");
  const [scale, setScale] = useState<number>(0.04);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const initialCameraPos = useRef<THREE.Vector3 | null>(new THREE.Vector3());
  const initialCameraTarget = useRef<THREE.Vector3 | null>(new THREE.Vector3());
  // const [debugIndex, setDebugIndex] = useState(0);
  // useEffect(() => {
  //   if (!modelRef.current) return;

  //   const mats: THREE.MeshStandardMaterial[] = [];

  //   modelRef.current.traverse((child: any) => {
  //     if (
  //       child.isMesh &&
  //       child.material instanceof THREE.MeshStandardMaterial
  //     ) {
  //       mats.push(child.material);
  //     }
  //   });

  //   mats.forEach((mat, i) => {
  //     if (i === debugIndex) {
  //       mat.color.set("red");
  //       mat.emissive.set("red");
  //       mat.emissiveIntensity = 0.5;
  //     } else {
  //       mat.color.set("white");
  //       mat.emissive.set("black");
  //     }
  //     mat.needsUpdate = true;
  //   });

  //   console.log("DEBUG MATERIAL:", debugIndex, mats[debugIndex]);
  // }, [debugIndex]);
  useEffect(() => {
    if (!canvasRef.current) return;
    if (!initialCameraPos.current) return;
    if (!initialCameraTarget.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 2, 3);
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
    controls.rotateSpeed = 0.7;
    controls.enableZoom = false;
    initialCameraPos.current.copy(camera.position);
    initialCameraTarget.current.copy(controls.target);

    controls.addEventListener("end", () => {
      if (!initialCameraPos.current) return;
      if (!initialCameraTarget.current) return;
      gsap.to(camera.position, {
        x: initialCameraPos.current.x,
        y: initialCameraPos.current.y,
        z: initialCameraPos.current.z,
        duration: 1,
        ease: "expo.out",
        onUpdate: () => {
          if (!initialCameraTarget.current) return;
          camera.lookAt(initialCameraTarget.current);
        },
      });

      gsap.to(controls.target, {
        x: initialCameraTarget.current.x,
        y: initialCameraTarget.current.y,
        z: initialCameraTarget.current.z,
        duration: 1,
        ease: "expo.out",
      });
    });

    const loader = new GLTFLoader();
    loader.load("/models/macbook-16-1.glb", (gltf) => {
      gltf.scene.scale.set(scale, scale, scale);
      gltf.scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          if (BODY_MATERIAL_NAMES.includes(child.material.name)) {
            child.material.color.set(color);
            child.material.metalness = 0.9;
            child.material.roughness = 0.25;
          }
        }
      });

      scene.add(gltf.scene);
      modelRef.current = gltf.scene;
    });

    const pmrem = new THREE.PMREMGenerator(renderer);

    new THREE.TextureLoader().load("./screen.png", (texture) => {
      const envMap = pmrem.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      texture.dispose();
    });

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  useEffect(() => {
    if (!modelRef.current) return;
    modelRef.current.scale.set(scale, scale, scale);
  }, [scale]);

  useEffect(() => {
    if (!modelRef.current) return;

    modelRef.current.traverse((child: any) => {
      if (child.isMesh && child.material) {
        if (BODY_MATERIAL_NAMES.includes(child.material.name)) {
          child.material.color.set(color);
          child.material.metalness = 0.9;
          child.material.roughness = 0.25;
        }
      }
    });
  }, [color]);

  useGSAP(() => {
    if (!modelRef.current) return;

    gsap
      .timeline({
        defaults: {
          duration: 0.6,
          ease: "expo.inOut",
        },
      })
      .to(modelRef.current.position, {
        x: -1000,
      })
      .to(modelRef.current.position, {
        x: 0,
      });
  }, [scale]);

  return (
    <section id="product-viewer">
      <h2>Take a closer look.</h2>
      <div className="controls">
        <div className="flex-center gap-5 mt-5">
          <div className="color-control">
            <div
              onClick={() => setcolor("#adb5bd")}
              className={`bg-neutral-300 ${color === "#adb5bd" && "active"}`}
            />
            <div
              onClick={() => setcolor("#2e2c2e")}
              className={`bg-neutral-900 ${color === "#2e2c2e" && "active"}`}
            />
          </div>
          <div className="size-control">
            <div
              onClick={() => setScale(0.032)}
              className={`${
                scale === 0.032
                  ? "bg-white text-black"
                  : "bg-transparent text-white"
              }`}
            >
              <p>14"</p>
            </div>
            <div
              onClick={() => setScale(0.04)}
              className={`${
                scale === 0.04
                  ? "bg-white text-black"
                  : "bg-transparent text-white"
              }`}
            >
              <p>16"</p>
            </div>
          </div>
          {/* <button onClick={() => setDebugIndex((i) => i + 1)}>Next Part</button> */}
        </div>
      </div>
      <canvas id="canvas" ref={canvasRef} />
    </section>
  );
};

export default ProductViewer;
