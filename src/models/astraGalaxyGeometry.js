const TAU = Math.PI * 2;
export const GALAXY_INCLINATION = 0.5;

function scatter(random) {
  return (random() + random() + random() + random() - 2) * 1.73;
}

function armAngle(radius, arm) {
  return 1.15 + 10.5 * (1 - radius / 0.835) + arm * Math.PI;
}

/** A stellar disk with broad arms, short connected spurs and small disk clusters. */
export function sampleGalaxy(random, index) {
  const section = random();
  const core = section < 0.14;
  const arm = section >= 0.14 && section < 0.78;
  const cluster = section >= 0.965;
  let radius, angle, width = 0;

  if (core) {
    radius = 0.012 + random() ** 0.7 * 0.125;
    angle = random() * TAU;
  } else if (arm) {
    const progress = random() ** 0.85;
    radius = 0.065 + progress * 0.77;
    angle = armAngle(radius, index % 2);
    // Broad middle sections taper into fine outer tips, with gentle local variation.
    const fullness = Math.sin(Math.PI * progress) ** 0.85;
    const variation = 0.92 + 0.08 * Math.sin(progress * TAU * 2 + (index % 2) * Math.PI);
    width = (0.004 + 0.008 * (1 - progress) + 0.029 * fullness) * variation;
    if (index % 17 === 0 && radius > 0.3 && radius < 0.62) {
      // Smoothly join the parent arm at both ends rather than displacing isolated stars.
      const branch = Math.sin(Math.PI * (radius - 0.3) / 0.32);
      angle += 0.12 * branch * branch;
      width *= 0.6;
    }
  } else if (cluster) {
    const group = Math.floor(random() * 6);
    radius = 0.34 + group * 0.08;
    angle = armAngle(radius, group % 2) + 0.06;
    width = 0.005 + (group % 3) * 0.002;
  } else {
    radius = 0.08 + random() ** 0.75 * 0.78;
    angle = random() * TAU;
  }

  const across = scatter(random) * width;
  const along = scatter(random) * width * 0.6;
  const thickness = core ? 0.024 * Math.exp(-radius * 4)
    : 0.007 + 0.01 * Math.exp(-radius * 6);
  return {
    core, arm, cluster,
    brightEligible: (arm || cluster) && Math.abs(across) < width * 0.5 && Math.abs(along) < width * 0.6,
    position: [Math.cos(angle) * (radius + across) - Math.sin(angle) * along,
      Math.sin(angle) * (radius + across) + Math.cos(angle) * along,
      scatter(random) * thickness],
  };
}
