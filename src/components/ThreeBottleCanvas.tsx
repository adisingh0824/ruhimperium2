import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCw, Sparkles, Droplet, RefreshCw, Eye } from "lucide-react";

interface ThreeBottleCanvasProps {
  initialColor?: string;
  productName?: string;
  bottleSize?: string;
  className?: string;
  autoRotate?: boolean;
  interactive?: boolean;
}

// Procedural 3D Petal Geometry Builder
function createPetalGeo(width = 0.8, length = 1.4, curvature = 0.35) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(-width * 0.8, length * 0.4, -width * 0.6, length * 0.8);
  shape.quadraticCurveTo(0, length * 1.1, width * 0.6, length * 0.8);
  shape.quadraticCurveTo(width * 0.8, length * 0.4, 0, 0);

  const geometry = new THREE.ShapeGeometry(shape, 6);
  const pos = geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const x = pos.getX(i);
    const distFromCenter = Math.abs(x) / width;
    const distAlongLength = y / length;
    const zCurve = Math.sin(distAlongLength * Math.PI) * curvature - Math.pow(distFromCenter, 2) * 0.15;
    pos.setZ(i, zCurve);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function createRoseFlower(roseMat: THREE.Material, coreMat: THREE.Material): THREE.Group {
  const group = new THREE.Group();
  const petalOuter = createPetalGeo(0.6, 0.9, 0.35);
  const petalMid = createPetalGeo(0.45, 0.7, 0.28);
  const petalInner = createPetalGeo(0.3, 0.5, 0.2);

  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const m = new THREE.Mesh(petalOuter, roseMat);
    m.rotation.z = a;
    m.rotation.x = 0.6;
    m.position.set(Math.cos(a) * 0.2, Math.sin(a) * 0.2, -0.05);
    group.add(m);
  }
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.4;
    const m = new THREE.Mesh(petalMid, roseMat);
    m.rotation.z = a;
    m.rotation.x = 0.4;
    m.position.set(Math.cos(a) * 0.12, Math.sin(a) * 0.12, 0.05);
    group.add(m);
  }
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.8;
    const m = new THREE.Mesh(petalInner, coreMat);
    m.rotation.z = a;
    m.rotation.x = 0.2;
    m.position.set(Math.cos(a) * 0.06, Math.sin(a) * 0.06, 0.1);
    group.add(m);
  }
  return group;
}

function createJasmineFlower(jasMat: THREE.Material, centerMat: THREE.Material): THREE.Group {
  const group = new THREE.Group();
  const petalGeo = createPetalGeo(0.4, 0.85, 0.15);

  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const m = new THREE.Mesh(petalGeo, jasMat);
    m.rotation.z = a;
    m.rotation.x = 0.35;
    m.position.set(Math.cos(a) * 0.12, Math.sin(a) * 0.12, 0);
    group.add(m);
  }
  const centerGeo = new THREE.CylinderGeometry(0.06, 0.03, 0.2, 8);
  const center = new THREE.Mesh(centerGeo, centerMat);
  center.rotation.x = Math.PI / 2;
  center.position.z = 0.08;
  group.add(center);

  return group;
}

const SCENT_THEMES: { name: string; hex: string; desc: string }[] = [
  { name: "Ruh Khus Imperial", hex: "#2E5A36", desc: "Wild Green Vetiver & Rain" },
  { name: "Aged Assam Oud", hex: "#633B18", desc: "Smoky Balsamic Agarwood" },
  { name: "Kashmiri Saffron", hex: "#D49438", desc: "Golden Solar Spice" },
  { name: "Damask Rose Royale", hex: "#A83248", desc: "Hydro-distilled Crimson Rose" },
  { name: "Mysore Sandalwood", hex: "#C79D6B", desc: "Creamy Sacred Wood Oil" },
];

export default function ThreeBottleCanvas({
  initialColor = "#2E5A36",
  productName = "Ruh Khus Imperial",
  bottleSize = "50 ml Flagon",
  className = "",
  autoRotate = true,
  interactive = true,
}: ThreeBottleCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeColor, setActiveColor] = useState<string>(initialColor);
  const [isRotating, setIsRotating] = useState<boolean>(autoRotate);
  const [isSpraying, setIsSpraying] = useState<boolean>(false);
  const sprayEmitterRef = useRef<(() => void) | null>(null);
  const updateLiquidColorRef = useRef<((hex: string) => void) | null>(null);
  const resetOrientationRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 6.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.0);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4bc96, 2.5);
    rimLight.position.set(-4, -2, -4);
    scene.add(rimLight);

    const topSpot = new THREE.PointLight(0xffffff, 2.0, 10);
    topSpot.position.set(0, 4, 2);
    scene.add(topSpot);

    // --- 3D Bottle Group Hierarchy ---
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);

    // 1. Crystal Glass Body (Outer Shell)
    const glassGeo = new THREE.CylinderGeometry(1.05, 0.95, 2.6, 32, 1);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.52,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
    });
    const glassBody = new THREE.Mesh(glassGeo, glassMat);
    glassBody.position.y = 0;
    glassBody.castShadow = true;
    bottleGroup.add(glassBody);

    // Heavy Glass Base Foot (Luxury weighted bottom)
    const baseGeo = new THREE.CylinderGeometry(0.95, 0.9, 0.35, 32);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88,
      transparent: true,
      roughness: 0.05,
      ior: 1.54,
      clearcoat: 1.0,
    });
    const glassBase = new THREE.Mesh(baseGeo, baseMat);
    glassBase.position.y = -1.45;
    bottleGroup.add(glassBase);

    // 2. Liquid Fragrance Core (Inner Volume)
    const liquidGeo = new THREE.CylinderGeometry(0.92, 0.84, 2.15, 32);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(activeColor),
      transmission: 0.65,
      roughness: 0.12,
      transparent: true,
      opacity: 0.92,
      ior: 1.38,
      clearcoat: 0.8,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = -0.15;
    bottleGroup.add(liquidMesh);

    // 3. Gold Metallic Shoulder & Atomizer Neck
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4bc96,
      metalness: 0.92,
      roughness: 0.22,
    });

    const shoulderGeo = new THREE.ConeGeometry(1.05, 0.45, 32);
    const shoulder = new THREE.Mesh(shoulderGeo, goldMat);
    shoulder.position.y = 1.45;
    bottleGroup.add(shoulder);

    const collarGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.5, 32);
    const collar = new THREE.Mesh(collarGeo, goldMat);
    collar.position.y = 1.8;
    bottleGroup.add(collar);

    // 4. Faceted Gold Imperial Gem Stopper Cap
    const capGeo = new THREE.CylinderGeometry(0.48, 0.44, 0.95, 8);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xe0c8a8,
      metalness: 0.95,
      roughness: 0.18,
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 2.4;
    bottleGroup.add(cap);

    // Crown Finial Ornament on top of cap
    const finialGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const finial = new THREE.Mesh(finialGeo, goldMat);
    finial.position.y = 2.95;
    bottleGroup.add(finial);

    // 5. Metallic Label Plaque (Front Emblem)
    const labelGeo = new THREE.PlaneGeometry(1.2, 1.4);
    const labelMat = new THREE.MeshStandardMaterial({
      color: 0x1a1918,
      metalness: 0.8,
      roughness: 0.35,
      side: THREE.DoubleSide,
    });
    const label = new THREE.Mesh(labelGeo, labelMat);
    label.position.set(0, 0, 1.06);
    bottleGroup.add(label);

    const labelBorderGeo = new THREE.RingGeometry(0.5, 0.53, 32);
    const borderMat = new THREE.MeshBasicMaterial({ color: 0xd4bc96, side: THREE.DoubleSide });
    const border = new THREE.Mesh(labelBorderGeo, borderMat);
    border.position.set(0, 0.15, 1.07);
    bottleGroup.add(border);

    // Dynamic label update handler
    updateLiquidColorRef.current = (hex: string) => {
      liquidMat.color.set(hex);
    };

    // 6. Scent Mist / Vapor Particle System (Spray effect)
    const mistCount = 120;
    const mistGeo = new THREE.BufferGeometry();
    const mistPos = new Float32Array(mistCount * 3);
    const mistVel: { x: number; y: number; z: number; life: number }[] = [];

    for (let i = 0; i < mistCount; i++) {
      mistPos[i * 3] = 0;
      mistPos[i * 3 + 1] = 2.4;
      mistPos[i * 3 + 2] = 0;
      mistVel.push({ x: 0, y: 0, z: 0, life: 0 });
    }
    mistGeo.setAttribute("position", new THREE.BufferAttribute(mistPos, 3));

    const mistMat = new THREE.PointsMaterial({
      size: 0.18,
      color: 0xfff4d6,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const mistPoints = new THREE.Points(mistGeo, mistMat);
    bottleGroup.add(mistPoints);

    sprayEmitterRef.current = () => {
      mistMat.opacity = 0.85;
      for (let i = 0; i < mistCount; i++) {
        mistPos[i * 3] = 0;
        mistPos[i * 3 + 1] = 2.5;
        mistPos[i * 3 + 2] = 0;

        mistVel[i] = {
          x: (Math.random() - 0.5) * 0.08,
          y: Math.random() * 0.12 + 0.05,
          z: Math.random() * 0.08 + 0.02,
          life: 1.0,
        };
      }
      mistGeo.attributes.position.needsUpdate = true;
    };

    // 7. Ground Pedestal Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.25 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.7;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 8. Orbiting 3D Rose & Jasmine Botanical Flowers around Flagon
    const rosePetalMat = new THREE.MeshStandardMaterial({
      color: 0xbe123c,
      roughness: 0.4,
      side: THREE.DoubleSide
    });
    const roseCoreMat = new THREE.MeshStandardMaterial({
      color: 0x881337,
      roughness: 0.35,
      side: THREE.DoubleSide
    });
    const jasminePetalMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      side: THREE.DoubleSide
    });
    const jasmineCenterMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.3
    });

    const bottleFlowers: { mesh: THREE.Group; speed: number; angle: number; radius: number; height: number }[] = [];

    // Add 2 Rose blossoms floating near bottle
    for (let i = 0; i < 2; i++) {
      const rose = createRoseFlower(rosePetalMat, roseCoreMat);
      rose.scale.set(0.65, 0.65, 0.65);
      scene.add(rose);
      bottleFlowers.push({
        mesh: rose,
        speed: 0.4 + i * 0.2,
        angle: (i / 2) * Math.PI * 2,
        radius: 2.2 + i * 0.4,
        height: -0.6 + i * 1.2
      });
    }

    // Add 3 Jasmine blossoms floating near bottle
    for (let i = 0; i < 3; i++) {
      const jas = createJasmineFlower(jasminePetalMat, jasmineCenterMat);
      jas.scale.set(0.55, 0.55, 0.55);
      scene.add(jas);
      bottleFlowers.push({
        mesh: jas,
        speed: 0.35 + i * 0.15,
        angle: (i / 3) * Math.PI * 2 + 1.0,
        radius: 2.5 + i * 0.3,
        height: -0.2 + i * 0.8
      });
    }

    // --- Mouse & Touch Orbital Controls ---
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0 };
    let targetRotation = { x: 0.1, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      rotationVelocity.y = deltaX * 0.008;
      rotationVelocity.x = deltaY * 0.008;

      targetRotation.y += rotationVelocity.y;
      targetRotation.x += rotationVelocity.x;
      targetRotation.x = Math.max(-0.4, Math.min(0.5, targetRotation.x));

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      isDragging = true;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;

      targetRotation.y += deltaX * 0.008;
      targetRotation.x += deltaY * 0.008;
      targetRotation.x = Math.max(-0.4, Math.min(0.5, targetRotation.x));

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    resetOrientationRef.current = () => {
      targetRotation = { x: 0.1, y: 0 };
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", handleResize);

    // --- Animation Loop ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isRotating && !isDragging) {
        targetRotation.y += 0.008;
      }

      // Smooth dampening
      bottleGroup.rotation.y += (targetRotation.y - bottleGroup.rotation.y) * 0.08;
      bottleGroup.rotation.x += (targetRotation.x - bottleGroup.rotation.x) * 0.08;

      // Gentle floating hover
      const time = clock.getElapsedTime();
      bottleGroup.position.y = Math.sin(time * 1.5) * 0.06;

      // Animate orbiting 3D Rose and Jasmine flowers
      bottleFlowers.forEach((f) => {
        const curAngle = f.angle + time * f.speed * 0.6;
        f.mesh.position.x = Math.cos(curAngle) * f.radius;
        f.mesh.position.z = Math.sin(curAngle) * f.radius;
        f.mesh.position.y = f.height + Math.sin(time * 2 + f.angle) * 0.15;
        f.mesh.rotation.x += 0.01;
        f.mesh.rotation.y += 0.015;
        f.mesh.rotation.z += 0.008;
      });

      // Animate mist particles
      if (mistMat.opacity > 0.01) {
        const posArr = mistGeo.attributes.position.array as Float32Array;
        let anyAlive = false;

        for (let i = 0; i < mistCount; i++) {
          if (mistVel[i].life > 0) {
            anyAlive = true;
            posArr[i * 3] += mistVel[i].x;
            posArr[i * 3 + 1] += mistVel[i].y;
            posArr[i * 3 + 2] += mistVel[i].z;
            mistVel[i].life -= delta * 1.2;
          }
        }
        mistGeo.attributes.position.needsUpdate = true;

        if (!anyAlive) {
          mistMat.opacity = Math.max(0, mistMat.opacity - delta * 2);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);

      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      glassGeo.dispose();
      glassMat.dispose();
      baseGeo.dispose();
      baseMat.dispose();
      liquidGeo.dispose();
      liquidMat.dispose();
      goldMat.dispose();
      shoulderGeo.dispose();
      collarGeo.dispose();
      capGeo.dispose();
      capMat.dispose();
      finialGeo.dispose();
      labelGeo.dispose();
      labelMat.dispose();
      labelBorderGeo.dispose();
      borderMat.dispose();
      mistGeo.dispose();
      mistMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      renderer.dispose();
    };
  }, [interactive]);

  const handleColorChange = (hex: string) => {
    setActiveColor(hex);
    if (updateLiquidColorRef.current) {
      updateLiquidColorRef.current(hex);
    }
  };

  const handleSpray = () => {
    setIsSpraying(true);
    if (sprayEmitterRef.current) {
      sprayEmitterRef.current();
    }
    setTimeout(() => setIsSpraying(false), 1200);
  };

  const handleReset = () => {
    if (resetOrientationRef.current) {
      resetOrientationRef.current();
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        className="w-full h-[420px] sm:h-[480px] cursor-grab active:cursor-grabbing relative rounded-3xl overflow-hidden bg-radial from-stone-900/40 via-stone-950/20 to-transparent"
      />

      {/* Interactive Controls Pill Bar */}
      {interactive && (
        <div className="absolute bottom-4 inset-x-4 flex flex-wrap items-center justify-between gap-2 bg-stone-950/80 backdrop-blur-xl border border-sand-200/20 p-2.5 rounded-2xl z-20 shadow-2xl">
          {/* Scent Shade Swatches */}
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] uppercase tracking-widest text-[#D4BC96] font-mono hidden sm:inline mr-1">
              Extract:
            </span>
            {SCENT_THEMES.map((theme) => (
              <button
                key={theme.name}
                type="button"
                onClick={() => handleColorChange(theme.hex)}
                className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer relative ${
                  activeColor === theme.hex ? "border-[#D4BC96] scale-110 shadow-md" : "border-white/20 hover:scale-105"
                }`}
                style={{ backgroundColor: theme.hex }}
                title={`${theme.name} — ${theme.desc}`}
              />
            ))}
          </div>

          {/* Action Triggers */}
          <div className="flex items-center gap-1.5 ml-auto">
            <button
              type="button"
              onClick={handleSpray}
              disabled={isSpraying}
              className="px-3 py-1.5 bg-[#D4BC96] hover:bg-[#c4ac86] text-stone-950 text-[9.5px] uppercase font-mono tracking-wider font-bold rounded-lg flex items-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Release Scent Vapor Mist"
            >
              <Sparkles className="w-3 h-3" />
              <span>{isSpraying ? "Spraying..." : "Spray Scent"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsRotating(!isRotating)}
              className={`p-1.5 rounded-lg border text-[10px] font-mono transition-colors cursor-pointer ${
                isRotating
                  ? "bg-[#D4BC96]/20 border-[#D4BC96] text-[#D4BC96]"
                  : "bg-white/5 border-white/10 text-stone-300 hover:bg-white/10"
              }`}
              title={isRotating ? "Pause Turntable" : "Auto Rotate"}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRotating ? "animate-spin" : ""}`} style={{ animationDuration: "6s" }} />
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-stone-300 text-[10px] font-mono transition-colors cursor-pointer"
              title="Reset 3D Angle"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
