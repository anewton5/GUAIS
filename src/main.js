import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renederer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renederer.setPixelRatio(window.devicePixelRatio);
renederer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renederer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF69B4});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff, 8.0)
pointLight.position.set(8,8,6 )
const pointLight2 = new THREE.PointLight(0xffffff, 8.0)
pointLight2.position.set(-8,-10,6 )
const pointLight3 = new THREE.PointLight(0xffffff, 8.0)
pointLight3.position.set(1,1,1 )
const pointLight4 = new THREE.PointLight(0xffffff, 8.0)
pointLight4.position.set(8,-3,10 )


const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);

scene.add(pointLight, pointLight2, pointLight3, pointLight4, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
const lightHelper2 = new THREE.PointLightHelper(pointLight2)
const lightHelper3 = new THREE.PointLightHelper(pointLight4)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper, lightHelper2, lightHelper3);

const controls = new OrbitControls(camera, renederer.domElement);

function animate(){
  requestAnimationFrame(animate);
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

animate();