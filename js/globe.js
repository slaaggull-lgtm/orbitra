/**
 * globe.js
 * 3D dünya sahnesi: yıldız alanı, gerçek dünya dokusu, ülke marker'ları
 * ve "keşif hissi" veren kamera/dünya zoom animasyonu.
 */

const Globe = (() => {
  let scene, camera, renderer, earth, markerGroup;
  const markers = {};
  let autoRotate = true;
  let animState = null;
  let onArriveCallback = null;

  // NASA Blue Marble tabanlı genel kullanım dünya dokusu (jsdelivr CDN, three-globe paketi içinden)
  const EARTH_TEXTURE_URL =
    "https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-blue-marble.jpg";

  function init(container) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 7);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    buildStars();
    buildEarth();
    buildLights();
    buildMarkers();

    animate();
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
    const mat = new THREE.PointsMaterial({ color: 0x88aadd, size: 0.5, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Points(geo, mat));
  }

  function fallbackDotTexture() {
    // Gerçek doku CDN'den yüklenemezse devreye giren basit yedek görünüm
    const w = 1600, h = 800;
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#0b1d3a");
    grad.addColorStop(1, "#091428");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    return new THREE.CanvasTexture(canvas);
  }

  function buildEarth() {
    const earthGeo = new THREE.SphereGeometry(2.2, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({
      map: fallbackDotTexture(),
      shininess: 6,
    });
    earth = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earth);

    const loader = new THREE.TextureLoader();
    loader.load(
      EARTH_TEXTURE_URL,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace || tex.colorSpace;
        earthMat.map = tex;
        earthMat.needsUpdate = true;
      },
      undefined,
      () => {
        console.warn("Dünya dokusu CDN'den yüklenemedi, yedek görünüm kullanılıyor.");
      }
    );

    const glowGeo = new THREE.SphereGeometry(2.32, 64, 64);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x4ea0ff, transparent: true, opacity: 0.07, side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(glowGeo, glowMat));
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

  function buildMarkers() {
    markerGroup = new THREE.Group();
    earth.add(markerGroup);

    Object.values(window.COUNTRIES).forEach((c) => {
      const pos = latLonToVec3(c.lat, c.lon, 2.22);

      const markerGeo = new THREE.SphereGeometry(0.045, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({ color: 0xffb85c });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.copy(pos);
      markerGroup.add(marker);

      const ringGeo = new THREE.RingGeometry(0.07, 0.09, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffb85c, transparent: true, opacity: 0.6, side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));
      markerGroup.add(ring);

      markers[c.key] = { marker, ring, localPos: pos };
    });
  }

  function focusOnCountry(key) {
    autoRotate = false;
    const localPos = markers[key].localPos.clone();
    const targetDir = new THREE.Vector3(0, 0, 1);
    const sourceDir = localPos.clone().normalize();
    const quatTo = new THREE.Quaternion().setFromUnitVectors(sourceDir, targetDir);

    animState = {
      t: 0,
      duration: 1.8,
      camFrom: camera.position.clone(),
      camTo: new THREE.Vector3(0, 0, 4.1),
      quatFrom: earth.quaternion.clone(),
      quatTo: quatTo,
    };
  }

  function resetToGlobe() {
    autoRotate = true;
    animState = {
      t: 0,
      duration: 1.2,
      camFrom: camera.position.clone(),
      camTo: new THREE.Vector3(0, 0, 7),
      quatFrom: earth.quaternion.clone(),
      quatTo: new THREE.Quaternion(),
    };
  }

  function onArrive(cb) {
    onArriveCallback = cb;
  }

  function animate() {
    requestAnimationFrame(animate);

    if (autoRotate && !animState) {
      earth.rotation.y += 0.0016;
    }

    if (animState) {
      animState.t += 1 / 60 / animState.duration;
      const t = Math.min(animState.t, 1);
      const ease = 1 - Math.pow(1 - t, 3);

      camera.position.lerpVectors(animState.camFrom, animState.camTo, ease);
      earth.quaternion.slerpQuaternions(animState.quatFrom, animState.quatTo, ease);
      camera.lookAt(0, 0, 0);

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
