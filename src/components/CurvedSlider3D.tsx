import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CurvedSlider3DProps {
    images: string[];
    onImageClick?: (image: string, index: number) => void;
    speed?: number;
    gap?: number;
    curve?: number;
    reverse?: boolean;
    height?: string;
}

const CurvedSlider3D = ({
    images,
    onImageClick,
    speed = 30,
    gap = 10,
    curve = 12,
    reverse = false,
    height = '200px'
}: CurvedSlider3DProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const planesRef = useRef<THREE.Mesh[]>([]);
    const timeRef = useRef(0);
    const animationFrameRef = useRef<number>(0);
    const clickablesRef = useRef<Array<{ mesh: THREE.Mesh; image: string; index: number }>>([]);

    const direction = reverse ? 1 : -1;

    const getWidth = (gapPercent: number) => 1 + gapPercent / 100;

    const getPlaneWidth = (el: HTMLElement, camera: THREE.PerspectiveCamera) => {
        const vFov = (camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(vFov / 2) * camera.position.z;
        const aspect = el.clientWidth / el.clientHeight;
        const width = height * aspect;
        return el.clientWidth / width;
    };

    useEffect(() => {
        if (!containerRef.current || images.length === 0) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            20
        );
        camera.position.z = 2;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Clear previous canvas
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(renderer.domElement);

        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;

        const geometry = new THREE.PlaneGeometry(2, 1.6, 20, 20);
        const planeSpace = getPlaneWidth(container, camera) * getWidth(gap) * 0.7;
        const totalImage = Math.ceil(container.clientWidth / planeSpace) + 1 + images.length;
        const initialOffset = Math.ceil(container.clientWidth / (2 * planeSpace) - 0.5);

        const allImages = [...images];
        for (let i = images.length; i < totalImage; i++) {
            allImages.push(images[i % images.length]);
        }

        const planes: THREE.Mesh[] = [];
        const clickables: Array<{ mesh: THREE.Mesh; image: string; index: number }> = [];

        const vertexShader = `
            uniform float curve;
            varying vec2 vertexUV;
            void main(){
                vertexUV = uv;
                vec3 newPosition = position;
                float distanceFromCenter = abs(modelMatrix*vec4(position, 1.0)).x;
                newPosition.y *= 1.0 + (curve/100.0)*pow(distanceFromCenter,2.0);
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
        `;

        const fragmentShader = `
            uniform sampler2D tex;
            varying vec2 vertexUV;
            void main(){
                gl_FragColor = texture2D(tex, vertexUV);
            }
        `;

        allImages.forEach((image, i) => {
            const loader = new THREE.TextureLoader();
            loader.load(image, (texture: THREE.Texture) => {
                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        tex: { value: texture },
                        curve: { value: curve }
                    },
                    vertexShader,
                    fragmentShader
                });

                const plane = new THREE.Mesh(geometry, material);
                plane.position.x = -1 * direction * (i - initialOffset) * getWidth(gap);
                scene.add(plane);
                planes.push(plane);

                // Store all planes for click handling, map to original image index
                const originalIndex = i % images.length;
                clickables.push({ 
                    mesh: plane, 
                    image: images[originalIndex], 
                    index: originalIndex 
                });
            });
        });

        planesRef.current = planes;
        clickablesRef.current = clickables;

        // Handle clicks on canvas
        const handleClick = (event: MouseEvent) => {
            if (!containerRef.current || !cameraRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

            const intersects = raycaster.intersectObjects(planesRef.current);
            if (intersects.length > 0) {
                const clickedMesh = intersects[0].object as THREE.Mesh;
                const clickable = clickablesRef.current.find(c => c.mesh === clickedMesh);
                if (clickable && onImageClick) {
                    onImageClick(clickable.image, clickable.index);
                }
            }
        };

        container.addEventListener('click', handleClick);

        // Animation
        let previousTime = 0;
        const animate = (currentTime: number) => {
            const timePassed = currentTime - previousTime;

            if (Math.abs(scene.position.x) >= getWidth(gap) * images.length) {
                timeRef.current = 0;
            }
            timeRef.current += direction * timePassed * 0.00001;
            scene.position.x = timeRef.current * speed;
            renderer.render(scene, camera);

            previousTime = currentTime;
            animationFrameRef.current = requestAnimationFrame(animate);
        };
        animationFrameRef.current = requestAnimationFrame(animate);

        // Resize handler
        const handleResize = () => {
            if (!container || !camera || !renderer) return;

            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('click', handleClick);
            
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
            
            planesRef.current.forEach(plane => {
                if (plane.geometry) plane.geometry.dispose();
                if (plane.material) {
                    if (Array.isArray(plane.material)) {
                        plane.material.forEach((mat: THREE.Material) => mat.dispose());
                    } else {
                        plane.material.dispose();
                    }
                }
            });

            if (sceneRef.current) {
                while (sceneRef.current.children.length > 0) {
                    sceneRef.current.remove(sceneRef.current.children[0]);
                }
            }

            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
    }, [images, speed, gap, curve, direction, onImageClick]);

    return (
        <div
            ref={containerRef}
            className="curved-slider-3d relative w-full overflow-hidden rounded-lg"
            style={{ height }}
        />
    );
};

export default CurvedSlider3D;
