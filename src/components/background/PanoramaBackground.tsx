import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useUIStore } from '../../stores/uiStore';

interface Props {
  faces: [string, string, string, string, string, string];
}

export default function PanoramaBackground({ faces }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useUIStore((s) => s.reduceMotion);
  const reduceMotionRef = useRef(reduceMotion);
  reduceMotionRef.current = reduceMotion;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const texture = new THREE.CubeTextureLoader().load([
      faces[1],
      faces[3],
      faces[4],
      faces[5],
      faces[0],
      faces[2],
    ]);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    scene.background = texture;

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let id: number;
    const loop = () => {
      id = requestAnimationFrame(loop);
      if (!reduceMotionRef.current) {
        camera.rotation.y += 0.0005;
      }
      renderer.render(scene, camera);
    };
    id = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [faces]);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
