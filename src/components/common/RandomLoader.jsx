import React, { useMemo } from 'react';
import LeafLoader from './LeafLoader';
import SoilLoader from './SoilLoader';
import DroneLoader from './DroneLoader';

const loaders = [LeafLoader, SoilLoader, DroneLoader];

export default function RandomLoader({ text }) {
  // Pick randomly synchronously so we never return null on the first frame
  // This prevents framer-motion from capturing a 0x0 bounding box.
  const LoaderComponent = useMemo(() => loaders[Math.floor(Math.random() * loaders.length)], []);

  return <LoaderComponent text={text} />;
}
