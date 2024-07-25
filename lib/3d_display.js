import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const FRUIT_DISPLAY = (ely, canvasy, model) => {
    let renderer, scene, camera, orbit, lightHolder, mesh;
    initScene();
    window.addEventListener("resize", updateSceneSize);

    function initScene() {
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: canvasy,
            alpha: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.physicallyCorrectLights = true;
        renderer.outputEncoding =  THREE.sRGBEncoding;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, ely.clientWidth / ely.clientHeight, .1, 1000);
        camera.position.set(0, 1, 2);
        camera.lookAt(0, 0, 0);

        updateSceneSize();

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);
        const sideLight = new THREE.DirectionalLight(0xffffff, 5);
        sideLight.position.set(15, 0, 15);
        const sideLight1 = new THREE.DirectionalLight(0xffffff, 5);
        sideLight1.position.set(-15, 0, 0);
        lightHolder = new THREE.Group();
        lightHolder.add(sideLight);
        lightHolder.add(sideLight1);
        scene.add(lightHolder);

        orbit = new OrbitControls(camera, canvasy);
        orbit.enabled = false;
        orbit.enableZoom = false;
        orbit.enablePan = false;
        orbit.enableDamping = true;
        orbit.autoRotate = true;
        orbit.autoRotateSpeed = 4;

        const gltfLoader = new GLTFLoader()
        gltfLoader.load(
            model,
            (gltf) => {

                mesh = gltf.scene.children[0];
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                const material = mesh.material;
                material.userData.time = {value: 0};
                material.userData.speed = {value: .2};
                material.userData.frequency = {value: .8};
                material.userData.distortion = {value: .5};

                const headers = `
                    uniform float u_time;
                    uniform float u_speed;
                    uniform float u_frequency;
                    uniform float u_distortion;

                    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                    vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
                    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
                    vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

                    float pnoise(vec3 P) {
                        vec3 Pi0 = mod(floor(P), vec3(4.));
                        vec3 Pi1 = mod(Pi0 + vec3(1.0), vec3(4.));
                        Pi0 = mod289(Pi0);
                        Pi1 = mod289(Pi1);
                        vec3 Pf0 = fract(P); // Fractional part for interpolation
                        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
                        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
                        vec4 iy = vec4(Pi0.yy, Pi1.yy);
                        vec4 iz0 = Pi0.zzzz;
                        vec4 iz1 = Pi1.zzzz;

                        vec4 ixy = permute(permute(ix) + iy);
                        vec4 ixy0 = permute(ixy + iz0);
                        vec4 ixy1 = permute(ixy + iz1);

                        vec4 gx0 = ixy0 * (1.0 / 7.0);
                        vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
                        gx0 = fract(gx0);
                        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
                        vec4 sz0 = step(gz0, vec4(0.0));
                        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
                        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

                        vec4 gx1 = ixy1 * (1.0 / 7.0);
                        vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
                        gx1 = fract(gx1);
                        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
                        vec4 sz1 = step(gz1, vec4(0.0));
                        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
                        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

                        vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
                        vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
                        vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
                        vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
                        vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
                        vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
                        vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
                        vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

                        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
                        g000 *= norm0.x;
                        g010 *= norm0.y;
                        g100 *= norm0.z;
                        g110 *= norm0.w;
                        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
                        g001 *= norm1.x;
                        g011 *= norm1.y;
                        g101 *= norm1.z;
                        g111 *= norm1.w;

                        float n000 = dot(g000, Pf0);
                        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
                        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
                        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
                        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
                        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
                        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
                        float n111 = dot(g111, Pf1);

                        vec3 fade_xyz = fade(Pf0);
                        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
                        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
                        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
                        return 2.2 * n_xyz;
                    }

                    vec3 displacement(vec3 p) {
                        float t = 3. * u_speed * u_time;
                        float noise_shape = pnoise(p * u_frequency + mod(t, 4.));
                        vec3 pos = p - p * u_distortion * noise_shape;
                        return pos;
                    }

                    vec3 orthogonal(vec3 v) {
                        return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y));
                    }
                    `;

                const displacementCalculation = `
                    vec3 displacedPosition = displacement(position);
                    vec3 displacedNormal = normalize(normal);

                    float offset = 1. / 128.;
                    vec3 tangent = orthogonal(normal);
                    vec3 bitangent = normalize(cross(normal, tangent));
                    vec3 neighbour1 = position + tangent * offset;
                    vec3 neighbour2 = position + bitangent * offset;
                    vec3 displacedNeighbour1 = displacement(neighbour1);
                    vec3 displacedNeighbour2 = displacement(neighbour2);

                    vec3 displacedTangent = displacedNeighbour1 - displacedPosition;
                    vec3 displacedBitangent = displacedNeighbour2 - displacedPosition;
                    displacedNormal = normalize(cross(displacedTangent, displacedBitangent));
                    `;

                material.onBeforeCompile = shader => {
                    shader.uniforms.u_time = material.userData.time;
                    shader.uniforms.u_speed = material.userData.speed;
                    shader.uniforms.u_frequency = material.userData.frequency;
                    shader.uniforms.u_distortion = material.userData.distortion;

                    shader.vertexShader = headers + shader.vertexShader;
                    shader.vertexShader = shader.vertexShader.replace(
                        'void main() {',
                        'void main() {' + displacementCalculation);

                    shader.vertexShader = shader.vertexShader.replace(
                        '#include <displacementmap_vertex>',
                        'transformed = displacedPosition;'
                    );

                    shader.vertexShader = shader.vertexShader.replace(
                        '#include <defaultnormal_vertex>',
                        THREE.ShaderChunk.defaultnormal_vertex.replace(
                            'vec3 transformedNormal = objectNormal;',
                            'vec3 transformedNormal = displacedNormal;'
                        )
                    );
                };

                scene.add(gltf.scene.children[0])
                render();

            }
        )
    }

    function render(time) {
        orbit.update();
        lightHolder.quaternion.copy(camera.quaternion);
        mesh.material.userData.time.value = .001 * time;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function updateSceneSize() {
        camera.aspect = ely.clientWidth / ely.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(ely.clientWidth, ely.clientHeight);
    }
}


const OBJ_DISPLAY = (ely, canvasy, model) => {
    let renderer, scene, camera, orbit, lightHolder, mesh;
    initScene();
    window.addEventListener("resize", updateSceneSize);

    function initScene() {
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: canvasy,
            alpha: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, ely.clientWidth / ely.clientHeight, .1, 1000);
        camera.position.set(0, 1, 2);
        camera.lookAt(0, 0, 0);

        updateSceneSize();

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);
        const sideLight = new THREE.DirectionalLight(0xffffff, 3);
        sideLight.position.set(15, 0, 15);
        const sideLight1 = new THREE.DirectionalLight(0xffffff, 3);
        sideLight1.position.set(-15, 0, 15);
        lightHolder = new THREE.Group();
        lightHolder.add(sideLight);
        lightHolder.add(sideLight1);
        scene.add(lightHolder);

        orbit = new OrbitControls(camera, canvasy);
        orbit.enabled         = true;
        orbit.enableZoom      = false;
        orbit.enablePan       = false;
        orbit.enableDamping   = true;
        orbit.autoRotate      = true;
        orbit.autoRotateSpeed = .1;

        const gltfLoader = new GLTFLoader()
        gltfLoader.load(
            model,
            (gltf) => {

                mesh = gltf.scene.children[0];
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                scene.add(gltf.scene.children[0])
                render();

            }
        )
    }

    function render(time) {
        orbit.update();
        lightHolder.quaternion.copy(camera.quaternion);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function updateSceneSize() {
        camera.aspect = ely.clientWidth / ely.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(ely.clientWidth, ely.clientHeight);
    }
} 


export {
    FRUIT_DISPLAY,
    OBJ_DISPLAY
}