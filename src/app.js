import * as THREE from 'three';
import {
  OrbitControls
} from './vendor/OrbitControls'
import {
  load
} from './load';

let renderer, scene, camera, controls

function create3DScene() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  controls = new OrbitControls(camera, renderer.domElement);

  camera.position.set(0, 0, 5);
  renderer.outputEncoding = THREE.sRGBEncoding;
  controls.update();

  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2)
  scene.add(ambientLight)

  const spotLight = new THREE.SpotLight(0xFFFFFF)
  spotLight.position.set(-1, 1, 1)
  spotLight.lookAt(0, 0, 0)
  scene.add(spotLight)

  load().then(res => {
    const [dae, textureMap] = res
    scene.add(dae.scene)
    const mat = new THREE.MeshStandardMaterial(textureMap)
    dae.scene.children[0].material = mat
    animate()
  })
}

function animate() {
  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}

const token = 'BQBIceMXKuAjLuwOvQikrpM_Tc86Za62MFFl0nSnK8_YBcgYmk1zrcy_1_wT5EYtrO2aoLeu01lUxzht-wN-cM-YLmU4Ffh7I7tlAYd-U3ul1ypSsr_K_lhIcIAYfgRNjMyUw7ZbMGUDEQhAKrL_21YqCubjA_1i2w';
let player;

function enableSpotifyPlayback() {
  window.onSpotifyWebPlaybackSDKReady = () => {
    player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => {
        cb(token);
      }
    });

    // Error handling
    player.addListener('initialization_error', ({
      message
    }) => {
      console.error(message);
    });
    player.addListener('authentication_error', ({
      message
    }) => {
      console.error(message);
    });
    player.addListener('account_error', ({
      message
    }) => {
      console.error(message);
    });
    player.addListener('playback_error', ({
      message
    }) => {
      console.error(message);
    });

    // Playback status updates
    player.addListener('player_state_changed', state => {
      console.log(state);
    });

    // Ready
    player.addListener('ready', ({
      device_id
    }) => {
      console.log('Ready with Device ID', device_id);
      playSong()
    });

    // Not Ready
    player.addListener('not_ready', ({
      device_id
    }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();
  };
}

function playSong() {
  const play = ({
    spotify_uri,
    playerInstance: {
      _options: {
        getOAuthToken,
        id
      }
    }
  }) => {
    getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          uris: [spotify_uri]
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });
    });
  };

  play({
    playerInstance: player,
    spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
  });
}

enableSpotifyPlayback()
// create3DScene()