/**
 * globe.js
 * 3D dünya sahnesi — responsive yerleşim ile başlık/dünya çakışması önlenir.
 */

const Globe = (() => {
  let scene, camera, renderer, earth, earthGroup, markerGroup, container;
  const markers = {};
  let autoRotate = true;
  let animState = null;
  let onArriveCallback = null;

  const EARTH_TEXTURE_URL =
    "https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-blue-marble.jpg";

  const EARTH_RADIUS = 2.2;

  function init(el) {
    container = el;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 7);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    earthGroup = new THREE.Group();
    scene.add(earthGroup);

    buildStars();
    buildEarth();
    buildLights();
    buildMarkers();

    window.addEventListener("resize", onResize);
    onResize();
    animate();
  }

  function getLayout() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMobile = w < 768;
    const isShort = h < 600;

    let earthY = isMobile ? -0.55 : -0.35;
    let earthScale = 1;
    let camZ = 7;

    if (isShort) {
      earthY = -0.45;
      earthScale = 0.85;
      camZ = 6.5;
    }

    if (w < 480) {
      earthY = -0.65;
      earthScale = 0.78;
      camZ = 6.2;
    }

    return { earthY, earthScale, camZ, isMobile };
  }

  function applyLayout() {
    const layout = getLayout();
    earthGroup.position.y = layout.earthY;
    earthGroup.scale.setScalar(layout.earthScale);

    if (!animState) {
      camera.position.z = layout.camZ;
      camera.position.y = layout.isMobile ? 0.15 : 0;
      camera.lookAt(0, layout.earthY * 0.3, 0);
    }
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    applyLayout();
  }

  function buildStars() {
    const geo = new THREE.BufferGeometry();
    const count = 1800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 60 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x88aadd, size: 0.5, transparent: true, opacity: 0.6,
    });
    scene.add(new THREE.Points(geo, mat));
  }

  function fallbackDotTexture() {
    const w = 1600, h = 800;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#0b1d3a");
    grad.addColorStop(1, "#091428");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    return new THREE.CanvasTexture(canvas);
  }

  function buildEarth() {
    const earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({
      map: fallbackDotTexture(),
      shininess: 6,
    });
    earth = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earth);

    const loader = new THREE.TextureLoader();
    loader.load(
      EARTH_TEXTURE_URL,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace || tex.colorSpace;
        earthMat.map = tex;
        earthMat.needsUpdate = true;
      },
      undefined,
      () => console.warn("Dünya dokusu CDN'den yüklenemedi, yedek görünüm kullanılıyor.")
    );

    const glowGeo = new THREE.SphereGeometry(EARTH_RADIUS + 0.12, 64, 64);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x4ea0ff, transparent: true, opacity: 0.07, side: THREE.BackSide,
    });
    earthGroup.add(new THREE.Mesh(glowGeo, glowMat));
  }

  function buildLights() {
    scene.add(new THREE.AmbientLight(0x666f88, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.0);
    sun.position.set(5, 3, 5);
    scene.add(sun);
  }

  function latLonToVec3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  function buildGlowSprite() {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(255, 214, 160, 0.95)");
    grad.addColorStop(0.25, "rgba(255, 184, 92, 0.55)");
    grad.addColorStop(0.6, "rgba(255, 184, 92, 0.12)");
    grad.addColorStop(1, "rgba(255, 184, 92, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }

  function buildMarkers() {
    markerGroup = new THREE.Group();
    earth.add(markerGroup);

    const glowTexture = buildGlowSprite();
    const markerRadius = EARTH_RADIUS + 0.02;

    Object.values(window.COUNTRIES).forEach((c) => {
      const pos = latLonToVec3(c.lat, c.lon, markerRadius);

      const dotGeo = new THREE.SphereGeometry(0.022, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xfff1da });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      markerGroup.add(dot);

      const glowMat = new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const glow = new THREE.Sprite(glowMat);
      glow.scale.set(0.32, 0.32, 1);
      glow.position.copy(pos);
      markerGroup.add(glow);

      markers[c.key] = { dot, glow, localPos: pos, baseScale: 0.32 };
    });
  }

  function focusOnCountry(key) {
    autoRotate = false;
    const localPos = markers[key].localPos.clone();
    const targetDir = new THREE.Vector3(0, 0, 1);
    const sourceDir = localPos.clone().normalize();
    const quatTo = new THREE.Quaternion().setFromUnitVectors(sourceDir, targetDir);
    const layout = getLayout();

    animState = {
      t: 0,
      duration: 1.8,
      camFrom: camera.position.clone(),
      camTo: new THREE.Vector3(0, layout.isMobile ? 0.1 : 0, 4.1),
      quatFrom: earth.quaternion.clone(),
      quatTo: quatTo,
    };
  }

  function resetToGlobe() {
    autoRotate = true;
    const layout = getLayout();
    animState = {
      t: 0,
      duration: 1.2,
      camFrom: camera.position.clone(),
      camTo: new THREE.Vector3(0, layout.isMobile ? 0.15 : 0, layout.camZ),
      quatFrom: earth.quaternion.clone(),
      quatTo: new THREE.Quaternion(),
    };
  }

  function onArrive(cb) {
    onArriveCallback = cb;
  }

  let clock = 0;

  function animate() {
    requestAnimationFrame(animate);
    clock += 0.016;

    if (autoRotate && !animState) {
      earth.rotation.y += 0.0016;
    }

    Object.values(markers).forEach((m, i) => {
      const pulse = 1 + Math.sin(clock * 1.6 + i) * 0.18;
      m.glow.scale.set(m.baseScale * pulse, m.baseScale * pulse, 1);
    });

    if (animState) {
      animState.t += 1 / 60 / animState.duration;
      const t = Math.min(animState.t, 1);
      const ease = 1 - Math.pow(1 - t, 3);

      camera.position.lerpVectors(animState.camFrom, animState.camTo, ease);
      earth.quaternion.slerpQuaternions(animState.quatFrom, animState.quatTo, ease);

      const layout = getLayout();
      camera.lookAt(0, layout.earthY * 0.3, 0);

      if (t >= 1) {
        const finished = animState;
        animState = null;
        if (finished.camTo.z < 5 && onArriveCallback) onArriveCallback();
      }
    }

    renderer.render(scene, camera);
  }

  return { init, focusOnCountry, resetToGlobe, onArrive };
})();

window.Globe = Globe;
