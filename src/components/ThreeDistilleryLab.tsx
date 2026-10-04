import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Flame, Sparkles, Droplets, RotateCw, Play, Pause, Compass } from 'lucide-react';

export const ThreeDistilleryLab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [temperature, setTemperature] = useState<number>(85); // 60 - 110 °C
  const [botanicalType, setBotanicalType] = useState<'kannauj_rose' | 'mysore_sandal' | 'assam_oud'>('kannauj_rose');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [collectedDrops, setCollectedDrops] = useState<number>(142);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.003);

  // References to animate Three.js dynamically
  const animRefs = useRef<{
    heatLight?: THREE.PointLight;
    fireParticles?: THREE.Points;
    steamParticles?: THREE.Points;
    oilDroplets?: THREE.Mesh[];
    liquidLevelMesh?: THREE.Mesh;
    condenserWaterMesh?: THREE.Mesh;
    copperGroup?: THREE.Group;
    targetRotationY?: number;
  }>({});

  const botanicalInfo = {
    kannauj_rose: {
      name: 'Rosa Damascena (Damask Rose)',
      tempOptimal: 82,
      origin: 'Kannauj, India',
      color: '#e11d48',
      yieldRate: '1 drop per 1,000 petals',
      note: 'Top Note: Sparkling dew-kissed rose Otto with honey undertones.'
    },
    mysore_sandal: {
      name: 'Santalum Album (Aged Sandalwood)',
      tempOptimal: 95,
      origin: 'Mysore, Karnataka',
      color: '#d97706',
      yieldRate: '1 drop per 50g heartwood',
      note: 'Heart Note: Creamy, sacred golden lactonic warmth.'
    },
    assam_oud: {
      name: 'Aquilaria Agallocha (Dark Oud Wood)',
      tempOptimal: 102,
      origin: 'Upper Assam Valley',
      color: '#451a03',
      yieldRate: '1 drop per 100g wild resin',
      note: 'Base Note: Smoky resinous leather and ancient jungle soil.'
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050403, 0.04);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.8, 6.5);
    camera.lookAt(0, 0.8, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xfffaed, 0.7);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.SpotLight(0xd4af37, 3.5, 20, Math.PI / 4, 0.3);
    goldKeyLight.position.set(3, 5, 4);
    goldKeyLight.castShadow = true;
    scene.add(goldKeyLight);

    const blueCondenserLight = new THREE.PointLight(0x38bdf8, 2, 8);
    blueCondenserLight.position.set(2, 0.5, 0.5);
    scene.add(blueCondenserLight);

    const heatLight = new THREE.PointLight(0xff5500, 4, 6);
    heatLight.position.set(-1.8, -0.6, 0);
    scene.add(heatLight);
    animRefs.current.heatLight = heatLight;

    // MATERIALS
    const hammeredCopperMaterial = new THREE.MeshStandardMaterial({
      color: 0xc87533,
      metalness: 0.88,
      roughness: 0.28,
      bumpScale: 0.05
    });

    const brassFittingMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5c158,
      metalness: 0.95,
      roughness: 0.2
    });

    const glassBhapkaMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.5,
      thickness: 0.4
    });

    const waterMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      transmission: 0.85,
      opacity: 0.8,
      transparent: true,
      roughness: 0.1,
      ior: 1.33
    });

    const attarOilMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(botanicalInfo[botanicalType].color),
      roughness: 0.1,
      metalness: 0.1
    });

    // DISTILLERY APPARATUS ROOT GROUP
    const labGroup = new THREE.Group();
    animRefs.current.copperGroup = labGroup;
    scene.add(labGroup);

    // 1. CLAY & BRICK OVEN FURNACE (BHATTI)
    const furnaceGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.8, 24);
    const furnaceMat = new THREE.MeshStandardMaterial({ color: 0x271e1b, roughness: 0.9 });
    const furnace = new THREE.Mesh(furnaceGeo, furnaceMat);
    furnace.position.set(-1.8, -0.9, 0);
    labGroup.add(furnace);

    // Furnace Opening for Fire
    const archGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.4, 16, 1, false, 0, Math.PI);
    const archMat = new THREE.MeshBasicMaterial({ color: 0x0a0502 });
    const arch = new THREE.Mesh(archGeo, archMat);
    arch.position.set(-1.8, -0.85, 1.25);
    arch.rotation.x = Math.PI / 2;
    labGroup.add(arch);

    // 2. COPPER STILL (DEGH POT)
    const deghPotGroup = new THREE.Group();
    deghPotGroup.position.set(-1.8, -0.2, 0);

    // Pot Base Sphere
    const deghBellyGeo = new THREE.SphereGeometry(1.05, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.7);
    const deghBelly = new THREE.Mesh(deghBellyGeo, hammeredCopperMaterial);
    deghPotGroup.add(deghBelly);

    // Pot Neck
    const deghNeckGeo = new THREE.CylinderGeometry(0.5, 0.7, 0.6, 24);
    const deghNeck = new THREE.Mesh(deghNeckGeo, hammeredCopperMaterial);
    deghNeck.position.y = 0.95;
    deghPotGroup.add(deghNeck);

    // Sarposh (Still Lid / Copper Helmet)
    const lidGeo = new THREE.ConeGeometry(0.65, 0.6, 24);
    const lid = new THREE.Mesh(lidGeo, hammeredCopperMaterial);
    lid.position.y = 1.4;
    deghPotGroup.add(lid);

    // Traditional Clay/Mud Seal band (Gilkari)
    const sealGeo = new THREE.TorusGeometry(0.56, 0.08, 12, 32);
    const sealMat = new THREE.MeshStandardMaterial({ color: 0x6e4b37, roughness: 0.95 });
    const seal = new THREE.Mesh(sealGeo, sealMat);
    seal.rotation.x = Math.PI / 2;
    seal.position.y = 1.25;
    deghPotGroup.add(seal);

    labGroup.add(deghPotGroup);

    // 3. BAMBOO / COPPER VAPOR PIPE (CHONGA)
    // Curved pipe connecting Degh to Bhapka
    const pipeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, 1.15, 0),
      new THREE.Vector3(-0.9, 1.85, 0.2),
      new THREE.Vector3(0.5, 1.6, 0.3),
      new THREE.Vector3(1.6, 0.4, 0)
    ]);
    const pipeGeo = new THREE.TubeGeometry(pipeCurve, 40, 0.07, 16, false);
    const pipe = new THREE.Mesh(pipeGeo, brassFittingMaterial);
    labGroup.add(pipe);

    // 4. WATER CONDENSER TANK (GANDA KUND)
    const tankGeo = new THREE.CylinderGeometry(1.1, 1.1, 1.5, 24);
    const tankMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      metalness: 0.4,
      roughness: 0.6,
      transparent: true,
      opacity: 0.7
    });
    const waterTank = new THREE.Mesh(tankGeo, tankMat);
    waterTank.position.set(1.6, -0.4, 0);
    labGroup.add(waterTank);

    // Condenser Water Top Surface
    const tankWaterGeo = new THREE.CylinderGeometry(1.08, 1.08, 1.35, 24);
    const tankWater = new THREE.Mesh(tankWaterGeo, waterMaterial);
    tankWater.position.set(1.6, -0.45, 0);
    labGroup.add(tankWater);
    animRefs.current.condenserWaterMesh = tankWater;

    // 5. RECEIVER COPPER FLASK (BHAPKA) INSIDE WATER TANK
    const bhapkaGeo = new THREE.SphereGeometry(0.65, 24, 20);
    const bhapka = new THREE.Mesh(bhapkaGeo, glassBhapkaMaterial);
    bhapka.position.set(1.6, -0.3, 0);
    labGroup.add(bhapka);

    // Base Sandalwood Oil Level in Bhapka
    const oilBaseGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 20);
    const oilBase = new THREE.Mesh(oilBaseGeo, attarOilMaterial);
    oilBase.position.set(1.6, -0.65, 0);
    labGroup.add(oilBase);
    animRefs.current.liquidLevelMesh = oilBase;

    // 6. FIRE PARTICLES (UNDER DEGH)
    const fireCount = 120;
    const fireGeo = new THREE.BufferGeometry();
    const firePositions = new Float32Array(fireCount * 3);
    const fireVelocities: number[] = [];

    for (let i = 0; i < fireCount; i++) {
      firePositions[i * 3] = -1.8 + (Math.random() - 0.5) * 0.7;
      firePositions[i * 3 + 1] = -1.1 + Math.random() * 0.4;
      firePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.7;
      fireVelocities.push(0.01 + Math.random() * 0.03);
    }
    fireGeo.setAttribute('position', new THREE.BufferAttribute(firePositions, 3));

    const fireMat = new THREE.PointsMaterial({
      color: 0xff7700,
      size: 0.12,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85
    });
    const fireSystem = new THREE.Points(fireGeo, fireMat);
    labGroup.add(fireSystem);
    animRefs.current.fireParticles = fireSystem;

    // 7. STEAM VAPOR PARTICLES (TRAVELLING THROUGH CHONGA PIPE)
    const steamCount = 80;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    const steamProg: number[] = [];

    for (let i = 0; i < steamCount; i++) {
      steamProg.push(i / steamCount);
      const pt = pipeCurve.getPointAt(steamProg[i]);
      steamPositions[i * 3] = pt.x;
      steamPositions[i * 3 + 1] = pt.y;
      steamPositions[i * 3 + 2] = pt.z;
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    const steamMat = new THREE.PointsMaterial({
      color: 0xffeedd,
      size: 0.1,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.65
    });
    const steamSystem = new THREE.Points(steamGeo, steamMat);
    labGroup.add(steamSystem);
    animRefs.current.steamParticles = steamSystem;

    // 8. ATTAR OIL CONDENSING DROPLETS (FALLING INTO BHAPKA)
    const droplets: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const dropGeo = new THREE.SphereGeometry(0.04, 12, 12);
      const dropMesh = new THREE.Mesh(dropGeo, attarOilMaterial);
      dropMesh.position.set(1.6, 0.2 - i * 0.2, 0);
      dropMesh.scale.set(0.8, 1.4, 0.8);
      labGroup.add(dropMesh);
      droplets.push(dropMesh);
    }
    animRefs.current.oilDroplets = droplets;

    // FLOATING BOTANICAL PARTICLES (ROSE PETALS / WOOD FIBERS)
    const botanicCount = 45;
    const botanicGeo = new THREE.BufferGeometry();
    const botanicPos = new Float32Array(botanicCount * 3);
    for (let i = 0; i < botanicCount; i++) {
      botanicPos[i * 3] = (Math.random() - 0.5) * 6;
      botanicPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      botanicPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    botanicGeo.setAttribute('position', new THREE.BufferAttribute(botanicPos, 3));
    const botanicMat = new THREE.PointsMaterial({
      color: new THREE.Color(botanicalInfo[botanicalType].color),
      size: 0.08,
      transparent: true,
      opacity: 0.7
    });
    const botanicPoints = new THREE.Points(botanicGeo, botanicMat);
    scene.add(botanicPoints);

    // MOUSE INTERACTION FOR ORBIT ROTATION
    let isDragging = false;
    let prevMouseX = 0;
    let targetRotationY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        targetRotationY += deltaX * 0.005;
        prevMouseX = e.clientX;
      }
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // ANIMATION LOOP
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth group rotation
      if (!isDragging) {
        targetRotationY += rotationSpeed;
      }
      labGroup.rotation.y += (targetRotationY - labGroup.rotation.y) * 0.05;

      // 1. Dynamic heat flicker
      if (animRefs.current.heatLight) {
        const heatIntensity = (temperature / 85) * (3.5 + Math.sin(elapsedTime * 12) * 0.8 + Math.random() * 0.4);
        animRefs.current.heatLight.intensity = isSimulating ? heatIntensity : 0.4;
      }

      // 2. Fire particles rising
      if (animRefs.current.fireParticles && isSimulating) {
        const posAttr = animRefs.current.fireParticles.geometry.attributes.position as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;
        for (let i = 0; i < fireCount; i++) {
          arr[i * 3 + 1] += fireVelocities[i] * (temperature / 70);
          arr[i * 3] += (Math.random() - 0.5) * 0.008;
          if (arr[i * 3 + 1] > -0.4) {
            arr[i * 3 + 1] = -1.1;
            arr[i * 3] = -1.8 + (Math.random() - 0.5) * 0.6;
          }
        }
        posAttr.needsUpdate = true;
      }

      // 3. Steam vapor along distillation pipe
      if (animRefs.current.steamParticles && isSimulating) {
        const posAttr = animRefs.current.steamParticles.geometry.attributes.position as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;
        const speed = (temperature / 85) * 0.004;

        for (let i = 0; i < steamCount; i++) {
          steamProg[i] = (steamProg[i] + speed) % 1.0;
          const pt = pipeCurve.getPointAt(steamProg[i]);
          arr[i * 3] = pt.x + (Math.random() - 0.5) * 0.04;
          arr[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 0.04;
          arr[i * 3 + 2] = pt.z + (Math.random() - 0.5) * 0.04;
        }
        posAttr.needsUpdate = true;
      }

      // 4. Oil droplets condensation into Bhapka
      if (animRefs.current.oilDroplets && isSimulating) {
        const dropSpeed = (temperature / 85) * 0.008;
        animRefs.current.oilDroplets.forEach((drop, idx) => {
          drop.position.y -= dropSpeed;
          if (drop.position.y < -0.55) {
            drop.position.y = 0.25 + idx * 0.15;
            setCollectedDrops(prev => prev + 1);
          }
        });
      }

      // 5. Water shimmer in condenser
      if (animRefs.current.condenserWaterMesh) {
        animRefs.current.condenserWaterMesh.rotation.y = elapsedTime * 0.1;
      }

      // 6. Floating botanical petals
      if (botanicPoints) {
        botanicPoints.rotation.y = elapsedTime * 0.04;
        botanicPoints.rotation.x = Math.sin(elapsedTime * 0.08) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [botanicalType]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#090807] via-[#120f0c] to-[#090807] border border-[#d4af37]/30 shadow-2xl p-4 md:p-8">
      {/* 3D Canvas Container */}
      <div className="relative w-full h-[420px] md:h-[520px] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />

        {/* 3D Spatial Tag Overlay */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#d4af37]/40 flex items-center gap-2 text-xs text-[#d4af37] tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
          <span>Live 3D Deg-Bhapka Alembic Simulation</span>
        </div>

        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-700/50 flex items-center gap-2 text-xs text-stone-300">
          <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Click & Drag to Rotate 360°</span>
        </div>

        {/* Real-time Telemetry Overlay */}
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 bg-black/75 backdrop-blur-xl border border-[#d4af37]/30 rounded-xl p-4 text-stone-200">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Distillation Telemetry</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${isSimulating ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-stone-800 text-stone-400'}`}>
              {isSimulating ? 'ACTIVE BOIL' : 'STANDBY'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-stone-400 text-[10px] uppercase">Firebox Temp</p>
              <p className="text-base font-serif font-bold text-amber-400">{temperature}°C</p>
            </div>
            <div>
              <p className="text-stone-400 text-[10px] uppercase">Pure Yield</p>
              <div className="flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                <p className="text-base font-serif font-bold text-sky-300">{collectedDrops} drops</p>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-stone-800/80 text-[11px] text-stone-400 leading-snug">
            {botanicalInfo[botanicalType].yieldRate}
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Select Botanical */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-serif">
            Select Botanical Essence
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['kannauj_rose', 'mysore_sandal', 'assam_oud'] as const).map(type => (
              <button
                key={type}
                onClick={() => {
                  setBotanicalType(type);
                  setTemperature(botanicalInfo[type].tempOptimal);
                }}
                className={`px-3 py-2 text-xs rounded-lg font-serif transition-all text-center border ${
                  botanicalType === type
                    ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-lg font-bold'
                    : 'bg-black/40 text-stone-300 border-stone-800 hover:border-[#d4af37]/50'
                }`}
              >
                {type === 'kannauj_rose' ? 'Damask Rose' : type === 'mysore_sandal' ? 'Sandalwood' : 'Wild Oud'}
              </button>
            ))}
          </div>
        </div>

        {/* Temperature / Fire Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs uppercase tracking-widest text-[#d4af37] font-serif flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Furnace Heat ({temperature}°C)
            </label>
            <span className="text-[10px] text-stone-400">
              Optimal: {botanicalInfo[botanicalType].tempOptimal}°C
            </span>
          </div>
          <input
            type="range"
            min={60}
            max={115}
            value={temperature}
            onChange={e => setTemperature(Number(e.target.value))}
            className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
          />
          <div className="flex justify-between text-[10px] text-stone-500 mt-1">
            <span>60°C (Slow Infusion)</span>
            <span>115°C (Rapid Vapor)</span>
          </div>
        </div>

        {/* Simulation Toggles & Rotation */}
        <div className="flex items-center gap-3 justify-start md:justify-end">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-4 py-2 rounded-xl text-xs flex items-center gap-2 border font-serif tracking-wider transition-all ${
              isSimulating
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'Pause Still' : 'Ignite Furnace'}</span>
          </button>

          <button
            onClick={() => setRotationSpeed(prev => (prev === 0 ? 0.003 : 0))}
            className="p-2.5 rounded-xl text-xs bg-stone-900 text-stone-300 border border-stone-800 hover:border-[#d4af37]/40 transition-all"
            title="Toggle Auto Rotation"
          >
            <RotateCw className={`w-4 h-4 ${rotationSpeed > 0 ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Botanical Profile Note */}
      <div className="mt-4 p-4 rounded-xl bg-black/40 border border-stone-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-stone-400">
        <div>
          <span className="text-[#d4af37] font-semibold">{botanicalInfo[botanicalType].name}</span> — {botanicalInfo[botanicalType].origin}
        </div>
        <div className="italic text-stone-300">{botanicalInfo[botanicalType].note}</div>
      </div>
    </div>
  );
};
