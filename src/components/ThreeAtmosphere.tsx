import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Procedural 3D Petal Geometry Builder
function createPetalGeometry(width = 0.8, length = 1.4, curvature = 0.35) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(-width * 0.8, length * 0.4, -width * 0.6, length * 0.8);
  shape.quadraticCurveTo(0, length * 1.1, width * 0.6, length * 0.8);
  shape.quadraticCurveTo(width * 0.8, length * 0.4, 0, 0);

  const geometry = new THREE.ShapeGeometry(shape, 8);
  const pos = geometry.attributes.position as THREE.BufferAttribute;
  
  // Curve the petal in 3D along Z axis for realistic cupping
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

// Procedural 3D Rose Flower Builder
function create3DRose(petalMat: THREE.Material, coreMat: THREE.Material): THREE.Group {
  const roseGroup = new THREE.Group();
  const petalGeoOuter = createPetalGeometry(0.7, 1.1, 0.4);
  const petalGeoMid = createPetalGeometry(0.5, 0.85, 0.35);
  const petalGeoInner = createPetalGeometry(0.35, 0.6, 0.25);

  // Outer Petal Ring (6 petals)
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const petal = new THREE.Mesh(petalGeoOuter, petalMat);
    petal.rotation.z = angle;
    petal.rotation.x = 0.65 + Math.random() * 0.1;
    petal.position.set(Math.cos(angle) * 0.25, Math.sin(angle) * 0.25, -0.05);
    roseGroup.add(petal);
  }

  // Middle Petal Ring (5 petals)
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 + 0.3;
    const petal = new THREE.Mesh(petalGeoMid, petalMat);
    petal.rotation.z = angle;
    petal.rotation.x = 0.45 + Math.random() * 0.1;
    petal.position.set(Math.cos(angle) * 0.16, Math.sin(angle) * 0.16, 0.05);
    roseGroup.add(petal);
  }

  // Inner Petal Core / Spiral Bud (4 tightly curled petals)
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + 0.6;
    const petal = new THREE.Mesh(petalGeoInner, coreMat);
    petal.rotation.z = angle;
    petal.rotation.x = 0.25 + Math.random() * 0.1;
    petal.position.set(Math.cos(angle) * 0.08, Math.sin(angle) * 0.08, 0.12);
    roseGroup.add(petal);
  }

  // Center bud sphere
  const centerGeo = new THREE.SphereGeometry(0.12, 8, 8);
  const centerMesh = new THREE.Mesh(centerGeo, coreMat);
  centerMesh.position.z = 0.15;
  roseGroup.add(centerMesh);

  return roseGroup;
}

// Procedural 3D Jasmine (Mogra / Sambac) Flower Builder
function create3DJasmine(whiteMat: THREE.Material, centerMat: THREE.Material, calyxMat: THREE.Material): THREE.Group {
  const jasmineGroup = new THREE.Group();
  const petalGeo = createPetalGeometry(0.45, 1.0, 0.18);

  // 5 delicate starry white petals
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const petal = new THREE.Mesh(petalGeo, whiteMat);
    petal.rotation.z = angle;
    petal.rotation.x = 0.35 + (Math.random() - 0.5) * 0.08;
    petal.position.set(Math.cos(angle) * 0.15, Math.sin(angle) * 0.15, 0);
    jasmineGroup.add(petal);
  }

  // Golden Amber Center Pistil / Stamen
  const centerGeo = new THREE.CylinderGeometry(0.08, 0.04, 0.25, 8);
  const center = new THREE.Mesh(centerGeo, centerMat);
  center.rotation.x = Math.PI / 2;
  center.position.z = 0.1;
  jasmineGroup.add(center);

  // Tiny Green Sepal / Calyx at the back
  const sepalGeo = new THREE.ConeGeometry(0.15, 0.35, 6);
  const sepal = new THREE.Mesh(sepalGeo, calyxMat);
  sepal.rotation.x = -Math.PI / 2;
  sepal.position.z = -0.15;
  jasmineGroup.add(sepal);

  return jasmineGroup;
}

export default function ThreeAtmosphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flowerDensity, setFlowerDensity] = useState<'high' | 'subtle'>('high');

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dynamic Lighting for 3D Petals & Flowers
    const ambientLight = new THREE.AmbientLight(0xfffaed, 1.2);
    scene.add(ambientLight);

    const goldDirLight = new THREE.DirectionalLight(0xd4af37, 2.0);
    goldDirLight.position.set(20, 30, 25);
    scene.add(goldDirLight);

    const roseGlowLight = new THREE.PointLight(0xf43f5e, 1.5, 60);
    roseGlowLight.position.set(-15, 10, 10);
    scene.add(roseGlowLight);

    // MATERIALS FOR 3D FLOWERS
    // Velvet Damask Rose Material (Double-sided with soft sheen)
    const rosePetalMat = new THREE.MeshStandardMaterial({
      color: 0xbe123c, // deep crimson rose
      roughness: 0.45,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    const roseCoreMat = new THREE.MeshStandardMaterial({
      color: 0x881337, // dark royal rose core
      roughness: 0.4,
      side: THREE.DoubleSide
    });

    // Pristine White Jasmine Material
    const jasminePetalMat = new THREE.MeshStandardMaterial({
      color: 0xfaf5f0, // ivory white
      roughness: 0.35,
      metalness: 0.02,
      side: THREE.DoubleSide
    });

    const jasmineCenterMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // warm amber stamen
      roughness: 0.3
    });

    const calyxMat = new THREE.MeshStandardMaterial({
      color: 0x3f6212, // botanical olive green
      roughness: 0.6
    });

    // Individual Falling Petal Materials
    const looseRosePetalMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48, // vibrant Damask rose petal
      roughness: 0.4,
      side: THREE.DoubleSide
    });

    const looseJasminePetalMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      side: THREE.DoubleSide
    });

    // --- INSTANTIATE 3D FLOWERS & PETALS ---
    interface FloatingFlowerItem {
      group: THREE.Object3D;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      driftSpeedY: number;
      driftSpeedX: number;
      oscFreq: number;
      oscAmp: number;
      baseX: number;
    }

    const floatingItems: FloatingFlowerItem[] = [];

    // 1. Fully Formed 3D Rose Flower Blossoms (6 blossoms)
    for (let i = 0; i < 6; i++) {
      const rose = create3DRose(rosePetalMat, roseCoreMat);
      const scale = 1.2 + Math.random() * 1.0;
      rose.scale.set(scale, scale, scale);
      
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 35;
      rose.position.set(x, y, z);
      rose.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      
      scene.add(rose);
      floatingItems.push({
        group: rose,
        rotSpeedX: (Math.random() - 0.5) * 0.012,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        rotSpeedZ: (Math.random() - 0.5) * 0.01,
        driftSpeedY: 0.015 + Math.random() * 0.02,
        driftSpeedX: (Math.random() - 0.5) * 0.01,
        oscFreq: 0.8 + Math.random() * 1.2,
        oscAmp: 0.01 + Math.random() * 0.02,
        baseX: x
      });
    }

    // 2. Fully Formed 3D Jasmine (Mogra) Flower Blossoms (8 blossoms)
    for (let i = 0; i < 8; i++) {
      const jasmine = create3DJasmine(jasminePetalMat, jasmineCenterMat, calyxMat);
      const scale = 1.0 + Math.random() * 0.8;
      jasmine.scale.set(scale, scale, scale);

      const x = (Math.random() - 0.5) * 85;
      const y = (Math.random() - 0.5) * 65;
      const z = (Math.random() - 0.5) * 35;
      jasmine.position.set(x, y, z);
      jasmine.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

      scene.add(jasmine);
      floatingItems.push({
        group: jasmine,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.018,
        rotSpeedZ: (Math.random() - 0.5) * 0.012,
        driftSpeedY: 0.02 + Math.random() * 0.025,
        driftSpeedX: (Math.random() - 0.5) * 0.012,
        oscFreq: 1.0 + Math.random() * 1.5,
        oscAmp: 0.015 + Math.random() * 0.025,
        baseX: x
      });
    }

    // 3. Falling Single 3D Damask Rose Petals (18 petals)
    const singleRosePetalGeo = createPetalGeometry(0.8, 1.3, 0.45);
    for (let i = 0; i < 18; i++) {
      const petalMesh = new THREE.Mesh(singleRosePetalGeo, looseRosePetalMat);
      const scale = 0.9 + Math.random() * 0.7;
      petalMesh.scale.set(scale, scale, scale);

      const x = (Math.random() - 0.5) * 90;
      const y = (Math.random() - 0.5) * 70;
      const z = (Math.random() - 0.5) * 40;
      petalMesh.position.set(x, y, z);
      petalMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

      scene.add(petalMesh);
      floatingItems.push({
        group: petalMesh,
        rotSpeedX: 0.01 + Math.random() * 0.02,
        rotSpeedY: 0.008 + Math.random() * 0.015,
        rotSpeedZ: (Math.random() - 0.5) * 0.02,
        driftSpeedY: 0.025 + Math.random() * 0.035,
        driftSpeedX: (Math.random() - 0.5) * 0.015,
        oscFreq: 1.2 + Math.random() * 1.5,
        oscAmp: 0.03 + Math.random() * 0.04,
        baseX: x
      });
    }

    // 4. Falling Single 3D White Jasmine Petals (16 petals)
    const singleJasminePetalGeo = createPetalGeometry(0.5, 1.1, 0.25);
    for (let i = 0; i < 16; i++) {
      const petalMesh = new THREE.Mesh(singleJasminePetalGeo, looseJasminePetalMat);
      const scale = 0.8 + Math.random() * 0.6;
      petalMesh.scale.set(scale, scale, scale);

      const x = (Math.random() - 0.5) * 90;
      const y = (Math.random() - 0.5) * 70;
      const z = (Math.random() - 0.5) * 40;
      petalMesh.position.set(x, y, z);
      petalMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

      scene.add(petalMesh);
      floatingItems.push({
        group: petalMesh,
        rotSpeedX: 0.012 + Math.random() * 0.02,
        rotSpeedY: 0.01 + Math.random() * 0.018,
        rotSpeedZ: (Math.random() - 0.5) * 0.025,
        driftSpeedY: 0.02 + Math.random() * 0.03,
        driftSpeedX: (Math.random() - 0.5) * 0.015,
        oscFreq: 1.4 + Math.random() * 1.6,
        oscAmp: 0.025 + Math.random() * 0.035,
        baseX: x
      });
    }

    // 5. Golden Aromatic Scent Dust Particles
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      gradient.addColorStop(0, "rgba(245, 208, 115, 1)");
      gradient.addColorStop(0.3, "rgba(225, 29, 72, 0.7)");
      gradient.addColorStop(0.7, "rgba(212, 188, 150, 0.2)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const dustMaterial = new THREE.PointsMaterial({
      size: 1.5,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color("#fcd34d")
    });
    const dustParticles = new THREE.Points(geometry, dustMaterial);
    scene.add(dustParticles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.012;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.012;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      dustParticles.rotation.y = elapsedTime * 0.015 + targetX * 0.15;
      dustParticles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.04 - targetY * 0.15;

      // Animate 3D Roses, Jasmine, and Falling Petals
      floatingItems.forEach((item) => {
        // Continuous gentle rotation in 3D
        item.group.rotation.x += item.rotSpeedX;
        item.group.rotation.y += item.rotSpeedY;
        item.group.rotation.z += item.rotSpeedZ;

        // Downward drift with floating oscillation
        item.group.position.y -= item.driftSpeedY;
        item.group.position.x = item.baseX + Math.sin(elapsedTime * item.oscFreq) * (item.oscAmp * 20) + targetX * 5;

        // Wrap around when falling off bottom
        if (item.group.position.y < -40) {
          item.group.position.y = 40;
          item.baseX = (Math.random() - 0.5) * 85;
          item.group.position.x = item.baseX;
          item.group.position.z = (Math.random() - 0.5) * 35;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      dustMaterial.dispose();
      texture.dispose();
      rosePetalMat.dispose();
      roseCoreMat.dispose();
      jasminePetalMat.dispose();
      jasmineCenterMat.dispose();
      calyxMat.dispose();
      looseRosePetalMat.dispose();
      looseJasminePetalMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    />
  );
}
