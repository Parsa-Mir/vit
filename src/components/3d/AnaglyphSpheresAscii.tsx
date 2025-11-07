import { useEffect, useRef } from "react";
import * as THREE from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";

export type AnaglyphSpheresProps = {
  className?: string;
  width?: number;
  height?: number;
  sphereCount?: number;
};

export function AnaglyphSpheresAscii({
  className,
  width,
  height,
  sphereCount = 500,
}: AnaglyphSpheresProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Scene basics
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.01, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    // ASCII dithering effect wrapper with many more items
    const asciiChars = " .'`^\"l!i~+-?][}{10)(|\\/*#@";
    const effect = new AsciiEffect(renderer, asciiChars, { invert: true });

    // Sizing
    const getSize = () => {
      const w = (width ?? container.clientWidth) || 2;
      const h = (height ?? container.clientHeight) || 2;
      return { w, h };
    };

    const setSize = () => {
      const { w, h } = getSize();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      effect.setSize(w, h);
    };

    // Special: append effect DOM element instead of renderer's canvas
    container.appendChild(effect.domElement);
    setSize();

    // Content: many spheres with retro color palette
    const spheres: THREE.Mesh[] = [];
    const materials: THREE.MeshBasicMaterial[] = [];
    const geometry = new THREE.SphereGeometry(0.1, 22, 16);
    const palette = [
      0x0000eb, // retro blue
      0x00000b, // retro blue
      0x0000bb, // retro blue
      0x0000ff, // retro blue
    ];

    for (let i = 0; i < sphereCount; i++) {
      const color = palette[Math.floor(Math.random() * palette.length)];
      const material = new THREE.MeshBasicMaterial({ color });
      materials.push(material);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 20 - 5;
      mesh.position.y = Math.random() * 20 - 5;
      mesh.position.z = Math.random() * 10 - 5;
      const s = Math.random() * 3 + 1;
      mesh.scale.set(s, s, s);
      scene.add(mesh);
      spheres.push(mesh);
    }

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX = (e.clientX - centerX) / 100;
      mouseY = (e.clientY - centerY) / 100;
    };

    const onResize = () => {
      setSize();
    };

    container.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    // Ensure canvas fills the container's CSS box
    effect.domElement.style.width = "100%";
    effect.domElement.style.height = "100%";
    effect.domElement.style.display = "block";
    effect.domElement.style.backgroundColor = "#000088"; // match scene background gray
    effect.domElement.style.color = "#222222"; // black ASCII glyphs
    effect.domElement.style.fontWeight = "bold";

    // Observe container resizes (responsive to layout changes)
    const resizeObserver = new ResizeObserver(() => setSize());
    resizeObserver.observe(container);

    renderer.setAnimationLoop(() => {
      const timer = 0.0001 * Date.now();
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      spheres.forEach((mesh, i) => {
        mesh.position.x = 5 * Math.cos(timer + i);
        mesh.position.y = 5 * Math.sin(timer + i * 1.1);
      });

      effect.render(scene, camera);
    });

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
      renderer.setAnimationLoop(null);
      // Cleanup
      spheres.forEach((m) => scene.remove(m));
      geometry.dispose();
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      container.removeChild(effect.domElement);
    };
  }, [width, height, sphereCount]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}

export default AnaglyphSpheresAscii;
