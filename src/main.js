import './style.css'
import * as THREE from 'three'
import * as ScrollMagic from 'scrollmagic';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const controller = new ScrollMagic.Controller();

const renederer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renederer.setPixelRatio(window.devicePixelRatio);
renederer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(110);

renederer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x5a089c});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus)

function updateTextPosition() {
  const vector = new THREE.Vector3();
  torus.getWorldPosition(vector);
  vector.project(camera);

  const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
  const y = (vector.y * -0.5 + 0.5) * window.innerHeight;
  // calculate the distance between the camera and the torus
  const distance = camera.position.distanceTo(vector);

  // calculate scale based on the distance
  const scale = Math.max(0.0, 1 / (distance * 0.1));  // Ensure scale does not go to infinity

  const torusText = document.getElementById('torusText');
  torusText.style.left = `${x}px`;
  torusText.style.top = `${y}px`;
  torusText.style.transform = `translate(-50%, -50%) scale(${scale})`;
  // Enhance sticky effect by snapping camera focus when close
  if (distance < 50) { // Adjust this value based on desired sensitivity
    camera.lookAt(torus.position);
  }
}

const pointLight = new THREE.PointLight(0xffffff, 200.0);
pointLight.position.set(9,12,6);
pointLight.distance = 200;
const pointLight2 = new THREE.PointLight(0xffffff, 35.0);
pointLight2.position.set(-8,-10,6);
pointLight2.distance = 100;
const pointLight3 = new THREE.PointLight(0xffffff, 50.0);
pointLight3.position.set(1,1,5);
pointLight3.distance = 100;
const pointLight4 = new THREE.PointLight(0xffffff, 25.0);
pointLight4.position.set(-10,-10,67.5);
pointLight4.distance = 25;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);

scene.add(pointLight, pointLight2, pointLight3, pointLight4, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight)
//const lightHelper2 = new THREE.PointLightHelper(pointLight2)
//const lightHelper3 = new THREE.PointLightHelper(pointLight4)
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper, lightHelper2, lightHelper3);

const controls = new OrbitControls(camera, renederer.domElement);

function calculateOpacityZoomIn(scrollPosition, totalHeight) {
  const distanceFromTop = scrollPosition;
  return Math.sqrt((distanceFromTop / totalHeight),3.75) * 3.75;
}

function calculateOpacityZoomOut(scrollPosition, totalHeight) {
  const distanceFromBottom = totalHeight - scrollPosition;
  return Math.pow((distanceFromBottom / totalHeight), 5) * 3.75;
}

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  brain.rotation.x += 0.025;
  brain.rotation.y += 0.035;
  brain.rotation.z += 0.025;
  const newZ = 100 - Math.abs(t) * 0.1;
  camera.position.z = newZ > 100 ? 100 : (newZ < 10 ? 10 : newZ);
  camera.position.x = t * -0.0200 
  camera.position.y = t * -0.0002

  const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
  const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let opacity;
  if (scrollPosition < totalHeight * 0.18) {
    opacity = calculateOpacityZoomIn(scrollPosition, totalHeight);
  } else {
    opacity = calculateOpacityZoomOut(scrollPosition, totalHeight);
  }
  
  // Assuming torusText and torusTextBackground are HTML elements
  torusText.style.opacity = opacity;
}

document.body.onscroll = moveCamera;


document.body.onscroll = moveCamera;

function animate(){
  requestAnimationFrame(animate);
  updateTextPosition();
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renederer.render(scene, camera);
}

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xFFAEC9});
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star)
}
Array(200).fill().forEach(addStar)

const spaceTexture =  new THREE.TextureLoader().load('static/images/img-5.jpg')
scene.background = spaceTexture;

const brainTexture = new THREE.TextureLoader().load('static/images/img-6.jpg');
const normalTexture = new THREE.TextureLoader().load('static/images/img-1.jpg');

const brain = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ 
    map: brainTexture,
    normalMap: normalTexture
   })
);
scene.add(brain);
brain.position.z = 67.5;
brain.position.y = -10;
brain.position.setX(-10);

animate();
