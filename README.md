# Immersive 3D Homepage (React + R3F)

This scaffold implements an immersive homepage with:
- Glass navbar with scroll shrink + hover sweep
- React Three Fiber scene + lazy GLTF robot loading (`/public/robot.glb`)
- Scroll-driven environmental phases
- Fixed HTML overlays and end-state CTA buttons
- Mobile static fallback poster

## Run

```bash
npm install
npm run dev
```

## Assets to add

- `public/robot.glb` (optimized/Draco compressed, target <5MB)

## Visual source note

The requested Spline visual reference was preserved as target art direction:

```js
import { Application } from '@splinetool/runtime';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/96bzds6CkX4xyoPK/scene.splinecode');
```

The React implementation uses R3F + GLTF pipeline while maintaining the black-glass / futuristic visual style.
