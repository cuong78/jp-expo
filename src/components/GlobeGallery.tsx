import { useEffect, useRef } from 'react';

interface GlobeGalleryProps {
    images: string[];
    imageWidth?: number;
    imageHeight?: number;
    imageRepeat?: number;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    minHeight?: number;
}

declare global {
    interface Window {
        THREE: any;
    }
}

const GlobeGallery = ({
    images,
    imageWidth = 10,
    imageHeight = 10,
    imageRepeat = 2,
    autoRotate = true,
    autoRotateSpeed = 10,
    minHeight = 550
}: GlobeGalleryProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<any>(null);
    const sceneRef = useRef<any>(null);
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        if (!containerRef.current || typeof window === 'undefined' || !window.THREE) {
            return;
        }

        const container = containerRef.current;
        const THREE = window.THREE;

        // Check if mobile
        const isMobile = window.innerWidth < 768;
        const scaleFactor = isMobile ? 2.3 : 1.5; // Lớn hơn trên mobile

        // Configuration
        const planeWidth = (imageWidth / (100 / 9)) * scaleFactor;
        const planeHeight = (imageHeight / (100 / 9)) * scaleFactor;
        const planeRatio = planeWidth / planeHeight;
        const totalItems = Math.floor(images.length * imageRepeat);

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
            75,
            container.offsetWidth / container.offsetHeight,
            0.1,
            1000
        );
        camera.position.z = isMobile ? 10 : 7.5; // Closer on desktop for better view

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current = renderer;
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Controls
        const OrbitControls = (THREE as any).OrbitControls;
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 1.2;
        controls.enableZoom = false;
        controls.enablePan = false;

        if (autoRotate) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = autoRotateSpeed / 10;
        }

        // Animation loop
        function animate() {
            animationFrameRef.current = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        // Create sphere with images
        function createSphere() {
            const fullRepeat = Math.floor(imageRepeat);
            const partialLength = Math.floor((imageRepeat % 1) * images.length);
            const allImageLinks = [
                ...Array(fullRepeat).fill(images).flat(),
                ...images.slice(0, partialLength)
            ];

            let loadedCount = 0;
            const sphereRadius = isMobile ? 6 : 4.5; // Tăng kích thước trên mobile
            const textureLoader = new THREE.TextureLoader();

            for (let i = 0; i < totalItems; i++) {
                textureLoader.load(
                    allImageLinks[i],
                    (texture: any) => {
                        const phi = Math.acos(-1 + (2 * i) / totalItems);
                        const theta = Math.sqrt(totalItems * Math.PI) * phi;
                        const imageRatio = texture.image.width / texture.image.height;

                        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;

                        // Scale texture to fit plane
                        if (imageRatio > planeRatio) {
                            const scale = planeRatio / imageRatio;
                            texture.repeat.set(scale, 1);
                            texture.offset.set((1 - scale) / 2, 0);
                        } else {
                            const scale = imageRatio / planeRatio;
                            texture.repeat.set(1, scale);
                            texture.offset.set(0, (1 - scale) / 2);
                        }
                        texture.encoding = THREE.sRGBEncoding;

                        const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
                        const material = new THREE.MeshBasicMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                        const mesh = new THREE.Mesh(geometry, material);

                        mesh.position.x = sphereRadius * Math.cos(theta) * Math.sin(phi);
                        mesh.position.y = sphereRadius * Math.sin(theta) * Math.sin(phi);
                        mesh.position.z = sphereRadius * Math.cos(phi);
                        mesh.lookAt(0, 0, 0);
                        mesh.rotateY(Math.PI);

                        scene.add(mesh);
                        loadedCount++;
                        if (loadedCount === totalItems) {
                            animate();
                        }
                    }
                );
            }
        }

        createSphere();

        // Handle resize
        const handleResize = () => {
            if (!container || !renderer || !camera) return;
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
                container.removeChild(rendererRef.current.domElement);
            }
            if (sceneRef.current) {
                sceneRef.current.traverse((object: any) => {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) {
                        if (object.material.map) object.material.map.dispose();
                        object.material.dispose();
                    }
                });
            }
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
        };
    }, [images, imageWidth, imageHeight, imageRepeat, autoRotate, autoRotateSpeed]);

    return (
        <div
            ref={containerRef}
            className="mdw-3d-globe-gallery w-full"
            style={{ 
                minHeight: window.innerWidth < 768 ? `${minHeight * 0.6}px` : `${minHeight * 1.2}px`,
                height: window.innerWidth < 768 ? `${minHeight * 0.6}px` : `${minHeight * 1.2}px`
            }}
        />
    );
};

export default GlobeGallery;
