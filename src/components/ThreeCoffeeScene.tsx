import { useEffect, useRef, useState } from 'react';
import type { MotionValue } from 'motion';
import { useReducedMotion } from 'motion/react';
import * as THREE from 'three';

type SceneProps = { progress: MotionValue<number>; className?: string };
const clamp = (x: number, min = 0, max = 1) => Math.min(max, Math.max(min, x));
const ramp = (x: number, a: number, b: number) => clamp((x - a) / (b - a));
const lerp = THREE.MathUtils.lerp;

/** An actual, procedurally modelled Three.js coffee set. No external model downloads. */
export default function ThreeCoffeeScene({ progress, className = '' }: SceneProps) {
  const mount = useRef<HTMLDivElement>(null);
  const reduced = Boolean(useReducedMotion());
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const parent = mount.current;
    if (!parent) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      // WebGL can be unavailable on browsers with GPU acceleration disabled.
      setFallback(true);
      return;
    }
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.5 : 2));
    renderer.setClearColor(0xf0e5d7, 0);
    renderer.shadowMap.enabled = window.innerWidth >= 700;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    parent.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 100);
    camera.position.set(0, 1.3, 10.4);
    camera.lookAt(0, -0.05, 0);

    const ambient = new THREE.HemisphereLight(0xfff5e6, 0x6e5647, 2.45);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffead1, 3.4);
    key.position.set(-3, 8, 6);
    key.castShadow = renderer.shadowMap.enabled;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -8; key.shadow.camera.right = 8;
    key.shadow.camera.top = 8; key.shadow.camera.bottom = -8;
    scene.add(key);
    const rim = new THREE.PointLight(0xffc48a, 65, 14);
    rim.position.set(4, 2.8, -3);
    scene.add(rim);
    const fill = new THREE.PointLight(0xb5c5b0, 22, 16);
    fill.position.set(-4, 1.5, -2.3);
    scene.add(fill);

    const matte = (color: number, roughness = 0.88, metalness = 0) =>
      new THREE.MeshStandardMaterial({ color, roughness, metalness });
    const ceramic = new THREE.MeshPhysicalMaterial({color:0xb37959, roughness:.36, metalness:.05, clearcoat:.45, clearcoatRoughness:.23});
    const terracottaLight = matte(0xce916c, 0.72);
    const dark = matte(0x3a2923, 0.83);
    const walnut = matte(0x684633, 0.84);
    const brass = new THREE.MeshPhysicalMaterial({color:0xc3a06e, roughness:.26, metalness:.72, clearcoat:.22});
    const cream = matte(0xf2d7b6, 0.8);
    const coffeeMat = matte(0x4e2418, .4);

    const circle = (radius: number, material: THREE.Material) => {
      const obj = new THREE.Mesh(new THREE.CircleGeometry(radius, 64), material);
      obj.rotation.x = -Math.PI / 2;
      return obj;
    };
    const cylinder = (rTop: number, rBottom: number, h: number, material: THREE.Material, sides = 64) =>
      new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, h, sides), material);
    const torus = (r: number, tube: number, material: THREE.Material) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 12, 72), material);
      ring.rotation.x = Math.PI / 2;
      return ring;
    };
    const sphere = (r: number, material: THREE.Material, seg = 28) =>
      new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.max(12, Math.floor(seg / 2))), material);

    const set = new THREE.Group();
    scene.add(set);
    const tray = cylinder(3.9, 3.9, .19, matte(0xd2b698));
    tray.position.set(0, -1.82, -.3);
    tray.receiveShadow = true;
    set.add(tray);
    const trayRim = torus(3.89, .045, brass);
    trayRim.position.set(0, -1.705, -.3);
    set.add(trayRim);

    const grinder = new THREE.Group();
    grinder.position.set(-2.35, -.45, 0);
    set.add(grinder);
    const grinderBody = cylinder(.46, .49, 1.55, walnut);
    grinderBody.position.y = -.15;
    grinderBody.castShadow = true;
    grinder.add(grinderBody);
    const baseBand = cylinder(.49, .49, .16, brass);
    baseBand.position.y = -.83;
    grinder.add(baseBand);
    const grinderCollar = cylinder(.50, .50, .13, brass);
    grinderCollar.position.y = .67;
    grinder.add(grinderCollar);
    const hopper = cylinder(.37, .24, .56, dark);
    hopper.position.y = 1;
    grinder.add(hopper);
    const hopperLip = torus(.37, .042, brass);
    hopperLip.position.y = 1.28;
    grinder.add(hopperLip);
    const handle = new THREE.Group();
    handle.position.y = 1.44;
    grinder.add(handle);
    const handleBar = cylinder(.041, .041, 1.1, brass, 20);
    handleBar.rotation.z = Math.PI / 2;
    handleBar.position.x = .46;
    handle.add(handleBar);
    const handleKnob = sphere(.14, walnut);
    handleKnob.scale.y = 1.45;
    handleKnob.position.x = .99;
    handle.add(handleKnob);

    const server = new THREE.Group();
    server.position.set(.15, -1.13, .1);
    set.add(server);
    const cup = cylinder(.72, .57, 1.02, cream);
    cup.position.y = .09;
    cup.castShadow = true;
    server.add(cup);
    const cupRim = torus(.715, .055, terracottaLight);
    cupRim.position.y = .60;
    server.add(cupRim);
    const cupInside = circle(.65, matte(0x8b5d3c));
    cupInside.position.y = .582;
    server.add(cupInside);
    const cupCoffee = circle(.615, coffeeMat);
    cupCoffee.position.y = .592;
    server.add(cupCoffee);
    const cupHandle = new THREE.Mesh(new THREE.TorusGeometry(.36, .095, 16, 44, Math.PI * 1.72), cream);
    cupHandle.rotation.y = Math.PI / 2;
    cupHandle.position.set(.74, .13, 0);
    server.add(cupHandle);
    const saucer = cylinder(.96, .94, .07, terracottaLight);
    saucer.position.y = -.48;
    server.add(saucer);
    const saucerRim = torus(.94, .04, brass);
    saucerRim.position.y = -.43;
    server.add(saucerRim);

    const brewer = new THREE.Group();
    brewer.position.set(.15, .47, .1);
    set.add(brewer);
    const v60 = cylinder(.91, .19, 1.35, ceramic);
    v60.position.y = .18;
    v60.castShadow = true;
    brewer.add(v60);
    const v60Lip = torus(.90, .062, terracottaLight);
    v60Lip.position.y = .86;
    brewer.add(v60Lip);
    const grounds = circle(.81, dark);
    grounds.position.y = .86;
    brewer.add(grounds);
    const bloom = sphere(.36, coffeeMat);
    bloom.scale.set(1.75, .12, 1.75);
    bloom.position.y = .872;
    brewer.add(bloom);
    const filterRing = torus(.73, .02, cream);
    filterRing.position.y = .873;
    brewer.add(filterRing);
    const dripperSpout = cylinder(.20, .17, .14, ceramic);
    dripperSpout.position.y = -.55;
    brewer.add(dripperSpout);

    const kettle = new THREE.Group();
    kettle.position.set(2.38, .53, -.13);
    set.add(kettle);
    const kettleBody = sphere(.78, brass, 40);
    kettleBody.scale.set(1.15, .92, .97);
    kettleBody.castShadow = true;
    kettle.add(kettleBody);
    const lid = cylinder(.35, .43, .11, dark);
    lid.position.y = .73;
    kettle.add(lid);
    const lidKnob = sphere(.105, walnut);
    lidKnob.position.y = .86;
    kettle.add(lidKnob);
    const wireHandle = new THREE.Mesh(new THREE.TorusGeometry(.59, .065, 12, 48, Math.PI * 1.1), dark);
    wireHandle.rotation.z = Math.PI * -.25;
    wireHandle.position.set(.61, .33, 0);
    kettle.add(wireHandle);
    const spoutCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-.61, .14, 0),
      new THREE.Vector3(-1.02, .13, .03),
      new THREE.Vector3(-1.06, .67, .07),
      new THREE.Vector3(-1.39, .67, .07),
    );
    const spout = new THREE.Mesh(new THREE.TubeGeometry(spoutCurve, 32, .073, 9, false), brass);
    kettle.add(spout);
    const spoutTip = sphere(.078, dark);
    spoutTip.position.set(-1.39, .67, .07);
    kettle.add(spoutTip);

    const waterMaterial = new THREE.MeshPhysicalMaterial({ color: 0xa4e5e6, roughness: .14, metalness: .1, transparent: true, opacity: 0, depthWrite: false });
    const waterCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.00, 1.35, -.06),
      new THREE.Vector3(.83, 1.19, -.01),
      new THREE.Vector3(.57, 1.02, .04),
      new THREE.Vector3(.25, .78, .1)
    ]);
    const water = new THREE.Mesh(new THREE.TubeGeometry(waterCurve, 40, .037, 8, false), waterMaterial);
    set.add(water);
    const rippleMaterial = new THREE.MeshBasicMaterial({ color: 0xf0c7a0, transparent: true, opacity: 0, depthWrite: false });
    const ripples = [0, 1, 2].map((i) => {
      const ripple = torus(.23 + i * .13, .014, rippleMaterial.clone());
      ripple.position.set(.15, 1.358, .1);
      set.add(ripple);
      return ripple;
    });

    const beanGeo = new THREE.SphereGeometry(.15, 16, 12);
    const beanMat = matte(0x6b3a23, .95);
    const beans: THREE.Mesh[] = [];
    for (let i = 0; i < 18; i++) {
      const bean = new THREE.Mesh(beanGeo, beanMat);
      bean.scale.set(.80, 1.20, .52);
      bean.castShadow = i < 8;
      grinder.add(bean);
      beans.push(bean);
    }

    const steamMat = new THREE.MeshBasicMaterial({ color: 0xfff4db, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    const steams: THREE.Mesh[] = [];
    for (let i = 0; i < 7; i++) {
      const x = -.52 + i * .17;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(x, 1.37, .1),
        new THREE.Vector3(x + .09, 1.65, .1),
        new THREE.Vector3(x - .08, 1.93, .1),
        new THREE.Vector3(x + .1, 2.27, .1)
      ]);
      const strand = new THREE.Mesh(new THREE.TubeGeometry(curve, 30, .014, 5, false), steamMat.clone());
      set.add(strand);
      steams.push(strand);
    }

    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffe1b4, transparent: true, opacity: .9, depthWrite: false });
    const stars: THREE.Mesh[] = [];
    for (let i = 0; i < 14; i++) {
      const star = sphere(.035 + (i % 3) * .013, starMaterial, 8);
      star.position.set(Math.sin(i * 2.5) * 3.3, -.25 + Math.cos(i * 4) * 1.45, -1.2 + Math.cos(i) * .5);
      stars.push(star);
      set.add(star);
    }

    let frame = 0;
    let inView = false;
    let disposed = false;
    const clock = new THREE.Clock();
    const currentProgress = { value: progress.get() };
    const unsubscribe = progress.on('change', (v: number) => { currentProgress.value = clamp(v); });
    const resize = () => {
      if (!parent) return;
      const width = Math.max(1, parent.clientWidth);
      const height = Math.max(1, parent.clientHeight);
      camera.aspect = width / height;
      camera.position.z = width < 560 ? 14.9 : width < 900 ? 12.4 : 10.4;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    const animate = () => {
      if (disposed || !inView) return;
      frame = requestAnimationFrame(animate);
      const t = reduced ? 0 : clock.getElapsedTime();
      const p = currentProgress.value;
      const bloomPhase = ramp(p, .22, .58);
      const pouring = ramp(p, .60, .88);
      const finishing = ramp(p, .88, 1);
      const grinderPhase = 1 - ramp(p, .24, .45);
      grinder.position.x = -2.35 - bloomPhase * .26;
      grinder.rotation.y = -0.12 + p * .15;
      handle.rotation.y = reduced ? .15 : -t * 3.2 * grinderPhase;
      beans.forEach((bean, i) => {
        const a = i * 2.39996 + t * (.26 + i * .012) * grinderPhase;
        const dist = .34 + (i % 5) * .115;
        bean.position.set(Math.cos(a) * dist, 1.54 + (i % 7) * .25 - ramp(p, .04, .29) * 1.0, Math.sin(a) * dist);
        bean.rotation.set(a, a * .5 + t * .22, .4 * i);
        bean.scale.setScalar(.78 * grinderPhase + .0001);
      });
      bloom.scale.set(1.75 + bloomPhase * .46 + Math.sin(t * 2.1) * .055, .12 + bloomPhase * .22, 1.75 + bloomPhase * .46);
      brewer.rotation.y = p * .20;
      kettle.position.x = 2.38 - .36 * pouring;
      kettle.rotation.z = .06 + pouring * .54;
      kettle.rotation.y = .08 + pouring * .1;
      waterMaterial.opacity = .72 * ramp(p, .62, .71) * (1 - finishing * .7);
      water.visible = waterMaterial.opacity > .01;
      ripples.forEach((ripple, i) => {
        const f = (t * 1.25 + i / 3) % 1;
        ripple.scale.setScalar(.7 + f * .95);
        (ripple.material as THREE.MeshBasicMaterial).opacity = pouring * (1 - f) * .60;
      });
      cupCoffee.scale.setScalar(1 + pouring * .01);
      steams.forEach((steam, i) => {
        steam.position.x = Math.sin(t * .65 + i * .8) * .045;
        steam.position.y = ((t * (.25 + i * .018)) % .5) - .25;
        (steam.material as THREE.MeshBasicMaterial).opacity = (.08 + .21 * Math.sin(Math.PI * ((t * .24 + i / 7) % 1))) * (bloomPhase * .6 + pouring * .4);
      });
      stars.forEach((star, i) => {
        star.position.y += reduced ? 0 : Math.sin(t * .7 + i) * .0005;
        star.scale.setScalar(.65 + .35 * Math.sin(t * 1.8 + i * .91));
      });
      // Subtle orbital camera travel with scroll progress, never DOM re-renders per frame.
      set.rotation.y = -.12 + p * .26;
      camera.position.x = lerp(-.21, .37, p);
      camera.position.y = lerp(1.45, 1.15, p);
      camera.lookAt(.1, -.03, 0);
      renderer.render(scene, camera);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) {
        clock.start();
        cancelAnimationFrame(frame);
        animate();
      } else {
        cancelAnimationFrame(frame);
      }
    }, { threshold: 0 });
    observer.observe(parent);
    resize();
    return () => {
      disposed = true;
      unsubscribe();
      observer.disconnect();
      ro.disconnect();
      cancelAnimationFrame(frame);
      scene.traverse((o: THREE.Object3D) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m: THREE.Material) => m.dispose());
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [progress, reduced]);

  return <div ref={mount} className={`three-coffee-canvas ${className}`} role="img" aria-label="Interactive three-dimensional scene of coffee beans, a hand grinder, a ceramic pour-over dripper, a brass kettle, and a coffee cup">
    {fallback && <div className="three-fallback" aria-hidden="true"><span>◌</span><span>☕</span><span>◌</span></div>}
  </div>;
}
