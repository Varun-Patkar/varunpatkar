"use client";

import { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Component to load and display the GLB model
function Model({ theme, ...props }) {
	const { scene } = useGLTF("/logo.glb");
	const modelRef = useRef();
	const originalMaterials = useRef({}); // Store original materials

	// Apply rotation animation
	useFrame((state, delta) => {
		if (modelRef.current) {
			modelRef.current.rotation.z += delta * 0.3;
		}
	});

	// Effect to change material color/shader based on theme
	useEffect(() => {
		if (scene) {
			const colorPink = new THREE.Color("#db2777");
			const colorPurple = new THREE.Color("#9333ea");
			const colorWhite = new THREE.Color("white");

			scene.traverse((child) => {
				if (child.isMesh && child.material) {
					// Store original material if not already stored
					if (!originalMaterials.current[child.uuid]) {
						originalMaterials.current[child.uuid] = child.material.clone();
					}

					let targetMaterial = child.material;

					// Ensure we're working with a standard material for color/onBeforeCompile
					if (
						!(
							targetMaterial.isMeshStandardMaterial ||
							targetMaterial.isMeshBasicMaterial
						)
					) {
						// If not standard, maybe revert to original or handle differently
						// For now, let's try cloning the original if it was standard
						const originalMat = originalMaterials.current[child.uuid];
						if (
							originalMat &&
							(originalMat.isMeshStandardMaterial ||
								originalMat.isMeshBasicMaterial)
						) {
							targetMaterial = originalMat.clone();
							child.material = targetMaterial; // Assign the clone
						} else {
							return; // Skip if we can't handle the material type
						}
					}

					if (theme === "dark") {
						// Dark Theme: Set color to white, provide empty function for onBeforeCompile
						targetMaterial.color.set(colorWhite);
						targetMaterial.onBeforeCompile = () => {}; // Use empty function instead of null
					} else {
						// Light Theme: Apply gradient via onBeforeCompile
						targetMaterial.color.set(colorWhite); // Base color (might be overridden by shader)

						targetMaterial.onBeforeCompile = (shader) => {
							// Add uniforms for gradient colors
							shader.uniforms.colorA = { value: colorPink };
							shader.uniforms.colorB = { value: colorPurple };
							shader.uniforms.bboxMin = { value: new THREE.Vector3() };
							shader.uniforms.bboxMax = { value: new THREE.Vector3() };

							// Compute bounding box only if modelRef is available
							if (modelRef.current) {
								const box = new THREE.Box3().setFromObject(modelRef.current);
								shader.uniforms.bboxMin.value = box.min;
								shader.uniforms.bboxMax.value = box.max;
							} else {
								// Fallback or default values if ref is not ready (might cause incorrect gradient initially)
								console.warn(
									"Model ref not available for bounding box calculation in onBeforeCompile"
								);
							}

							// Modify Vertex Shader (revert to include replacement)
							shader.vertexShader = `
                varying vec3 vWorldPosition; // Declare varying
                ${shader.vertexShader}
              `.replace(
								/#include <fog_vertex>/, // Find a reliable spot near the end
								`
                #include <fog_vertex>
                vWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz; // Calculate world pos using transformed vertex
                `
							);

							// Fragment Shader: Calculate gradient based on world position x (horizontal)
							shader.fragmentShader = `
                uniform vec3 colorA;
                uniform vec3 colorB;
                uniform vec3 bboxMin;
                uniform vec3 bboxMax;
                varying vec3 vWorldPosition;
                ${shader.fragmentShader}
              `.replace(
								`vec4 diffuseColor = vec4( diffuse, opacity );`,
								`
                // Calculate normalized x-position within the bounding box (0 to 1)
                float normalizedX = smoothstep(bboxMin.x, bboxMax.x, vWorldPosition.x); // Use X axis
                // Mix colors based on normalized position
                vec3 gradientColor = mix(colorA, colorB, normalizedX); // Use normalizedX
                vec4 diffuseColor = vec4( gradientColor, opacity );
                `
							);
						};
					}
					// Mark material for update
					targetMaterial.needsUpdate = true;
				}
			});
		}
	}, [scene, theme]); // Rerun effect if scene or theme changes

	// Cleanup function to restore original materials on unmount (optional)
	useEffect(() => {
		return () => {
			if (scene) {
				scene.traverse((child) => {
					if (child.isMesh && originalMaterials.current[child.uuid]) {
						child.material = originalMaterials.current[child.uuid];
					}
				});
			}
		};
	}, [scene]);

	return <primitive ref={modelRef} object={scene} scale={0.4} {...props} />;
}

function Scene() {
	const { resolvedTheme } = useTheme();
	const lightRef = useRef();

	// Optional: Move light slightly
	useFrame(({ clock }) => {
		if (lightRef.current) {
			lightRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.5) * 5;
			lightRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.5) * 5;
		}
	});

	// Increase ambient light intensity
	const ambientIntensity = resolvedTheme === "dark" ? 0.6 : 1.0; // Increased values
	const neutralLightColor = new THREE.Color("white");

	return (
		<>
			{/* Adjusted lighting for potentially complex models */}
			<ambientLight intensity={ambientIntensity} />
			<pointLight
				ref={lightRef}
				position={[10, 10, 10]}
				intensity={1.2} // Increased intensity
				color={neutralLightColor}
			/>
			<directionalLight
				position={[-8, 10, 8]}
				intensity={1.5} // Increased intensity
				color={neutralLightColor}
			/>{" "}
			{/* Optional: make this white too */}
			<directionalLight
				position={[8, -5, -8]}
				intensity={0.8} // Increased intensity
				color={neutralLightColor} // Use neutral white
			/>
			{/* Load the model and pass the theme */}
			<Suspense fallback={null}>
				<Model
					theme={resolvedTheme}
					position={[0, 0, 0]}
					rotation={[Math.PI / 2, 0, 0]}
				/>{" "}
				{/* Adjust position as needed */}
			</Suspense>
			{/* Enable OrbitControls */}
			<OrbitControls
				enableZoom={true} // Allow zoom
				enablePan={true} // Allow panning
				minPolarAngle={Math.PI / 4} // Allow looking from top
				maxPolarAngle={(3 * Math.PI) / 4} // Allow looking from bottom
				target={[0, 0, 0]} // Point controls at the center
			/>
		</>
	);
}

export default function HeroCanvas() {
	return (
		// Ensure camera starts horizontally (y=0)
		<Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
			<Scene />
		</Canvas>
	);
}

// Preload the model
useGLTF.preload("/logo.glb");
