<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

type Shape = 'cube' | 'prism' | 'triangular' | 'cylinder' | 'cone'
const geometries: { id: Shape; name: string; subtitle: string; icon: string }[] = [
  { id: 'cube', name: '正方体', subtitle: 'Cube', icon: '◇' },
  { id: 'prism', name: '长方体', subtitle: 'Rectangular prism', icon: '▱' },
  { id: 'triangular', name: '三棱柱', subtitle: 'Triangular prism', icon: '△' },
  { id: 'cylinder', name: '圆柱', subtitle: 'Cylinder', icon: '○' },
  { id: 'cone', name: '圆锥', subtitle: 'Cone', icon: '△' }
]
const selected = ref<Shape | null>(null)
const host = ref<HTMLDivElement>()
const cutPosition = ref(0)
const showSection = ref(true)
const selectedName = computed(() => geometries.find(g => g.id === selected.value)?.name ?? '')

let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer
let controls: OrbitControls, model: THREE.Mesh, section: THREE.Mesh, plane: THREE.Plane
let frame = 0
let sceneReady = false

function makeGeometry(shape: Shape) {
  if (shape === 'cube') return new THREE.BoxGeometry(3, 3, 3, 1, 1, 1)
  if (shape === 'prism') return new THREE.BoxGeometry(4.4, 2.6, 2.8, 1, 1, 1)
  if (shape === 'triangular') {
    const g = new THREE.CylinderGeometry(1.9, 1.9, 3.5, 3, 1, false, Math.PI / 2)
    g.rotateX(Math.PI / 2)
    return g
  }
  if (shape === 'cylinder') return new THREE.CylinderGeometry(1.6, 1.6, 3.8, 48)
  return new THREE.ConeGeometry(1.9, 4, 48)
}
function initScene() {
  if (!host.value) return
  scene = new THREE.Scene(); scene.background = new THREE.Color('#f7faff')
  camera = new THREE.PerspectiveCamera(42, host.value.clientWidth / host.value.clientHeight, .1, 100)
  camera.position.set(6.5, 5.8, 7)
  renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(devicePixelRatio); renderer.setSize(host.value.clientWidth, host.value.clientHeight)
  renderer.localClippingEnabled = true; host.value.appendChild(renderer.domElement)
  sceneReady = true
  controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping = true; controls.target.set(0, 0, 0)
  scene.add(new THREE.HemisphereLight(0xffffff, 0x9bbbe0, 2.4))
  const light = new THREE.DirectionalLight(0xffffff, 2); light.position.set(4, 7, 6); scene.add(light)
  scene.add(new THREE.GridHelper(12, 12, 0xd7e4f4, 0xe7eef8).translateY(-2.15))
  plane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0)
  const helper = new THREE.PlaneHelper(plane, 5.8, 0x4d7cff); const helperMaterial = helper.material as THREE.LineBasicMaterial; helperMaterial.transparent = true; helperMaterial.opacity = .52; scene.add(helper)
  model = new THREE.Mesh(); section = new THREE.Mesh(); scene.add(model, section)
  window.addEventListener('resize', resize)
  animate()
}
function setModel(shape: Shape) {
  if (!scene) return
  model.geometry?.dispose(); (model.material as THREE.Material)?.dispose()
  model.geometry = makeGeometry(shape)
  model.material = new THREE.MeshStandardMaterial({ color: 0x55a6ec, roughness: .34, metalness: .05, clippingPlanes: [plane], clipShadows: true, side: THREE.DoubleSide })
  section.geometry?.dispose(); (section.material as THREE.Material)?.dispose()
  section.geometry = new THREE.PlaneGeometry(5.7, 5.7)
  section.material = new THREE.MeshBasicMaterial({ color: 0x2767e8, transparent: true, opacity: .19, side: THREE.DoubleSide, depthWrite: false })
  section.rotation.y = Math.PI / 2
  updateCut()
}
function updateCut() {
  if (!plane) return
  plane.constant = -cutPosition.value
  if (section) { section.position.x = cutPosition.value; section.visible = showSection.value }
}
function openShape(shape: Shape) { selected.value = shape; nextTick(() => { if (!sceneReady) initScene(); setModel(shape) }) }
function disposeScene() {
  cancelAnimationFrame(frame)
  if (renderer) {
    renderer.dispose()
    renderer.domElement.remove()
  }
  sceneReady = false
}
function home() { disposeScene(); selected.value = null }
function preset(kind: 'triangle' | 'trapezoid' | 'hexagon') {
  if (kind === 'triangle') { selected.value = 'cone'; cutPosition.value = 0; nextTick(() => setModel('cone')) }
  if (kind === 'trapezoid') { selected.value = 'triangular'; cutPosition.value = .2; nextTick(() => setModel('triangular')) }
  if (kind === 'hexagon') { selected.value = 'cylinder'; cutPosition.value = 0; nextTick(() => setModel('cylinder')) }
}
function resize() { if (!host.value || !camera) return; camera.aspect = host.value.clientWidth / host.value.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(host.value.clientWidth, host.value.clientHeight) }
function animate() { frame = requestAnimationFrame(animate); controls?.update(); renderer?.render(scene, camera) }
watch([cutPosition, showSection], updateCut)
onBeforeUnmount(() => { disposeScene(); window.removeEventListener('resize', resize) })
</script>

<template>
  <main>
    <header><div class="brand"><span>∠</span> 几何切割实验室</div><p>观察空间几何体截面的奇妙变化</p><button v-if="selected" class="home-btn" @click="home">← 返回首页</button></header>
    <section v-if="!selected" class="home"><div class="hero"><div><span class="eyebrow">MATH EXPLORATION</span><h1>亲手切一切，<em>看见</em>空间几何</h1><p>拖动切割平面，实时探索不同角度下的截面形状。</p></div><div class="hero-shape">✦</div></div><h2>选择一个几何体开始实验</h2><div class="cards"><button v-for="g in geometries" :key="g.id" class="geometry-card" @click="openShape(g.id)"><span class="shape-icon">{{ g.icon }}</span><strong>{{ g.name }}</strong><small>{{ g.subtitle }}</small><i>开始探索 →</i></button></div></section>
    <section v-else class="lab"><aside><div class="breadcrumb">几何实验 / {{ selectedName }}</div><h2>{{ selectedName }}切割实验</h2><p>使用鼠标拖拽旋转模型，滚轮缩放视图。</p><div class="panel"><label>切割平面位置 <b>{{ cutPosition.toFixed(1) }}</b></label><input v-model.number="cutPosition" type="range" min="-2.2" max="2.2" step="0.1" /><label class="toggle"><input v-model="showSection" type="checkbox" /> 显示截面辅助平面</label></div><div class="panel"><h3>预设截面</h3><div class="presets"><button @click="preset('triangle')">△<span>三角形</span></button><button @click="preset('trapezoid')">▱<span>梯形</span></button><button @click="preset('hexagon')">⬡<span>六边形</span></button></div></div><div class="tip">💡 尝试旋转模型，再调整切割位置，观察截面如何变化。</div></aside><div ref="host" class="viewer"><div class="viewer-label"><span></span> 切割平面</div><div class="controls-hint">拖拽旋转 · 滚轮缩放</div></div></section>
  </main>
</template>
