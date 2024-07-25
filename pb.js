


import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import {testy_var as tv } from '/test.js'

const test_loop = () => {
    const loader = new GLTFLoader();
    requestAnimationFrame(test_loop);
}


test_loop();