const TAU = Math.PI * 2;
export const GALAXY_INCLINATION = 0.5;

function scatter(random) {
  return (random() + random() + random() + random() - 2) * 1.73;
}

/** A thin stellar disk, two broad winding arms and a resolved bulge. */
export function sampleGalaxy(random, index) {
  const section = random();
  const core = section < 0.14;
  const arm = section >= 0.14 && section < 0.78;
  let radius, angle, width = 0;

  if (core) {
    radius = 0.012 + random() ** 0.7 * 0.125;
    angle = random() * TAU;
  } else if (arm) {
    const progress = random() ** 0.85;
    radius = 0.065 + progress * 0.77;
    angle = 1.15 + 10.5 * (1 - radius / 0.835) + (index % 2) * Math.PI;
    // Broad middle sections taper into fine outer tips, with gentle local variation.
    const fullness = Math.sin(Math.PI * progress) ** 0.85;
    const variation = 0.92 + 0.08 * Math.sin(progress * TAU * 2 + (index % 2) * Math.PI);
    width = (0.004 + 0.008 * (1 - progress) + 0.029 * fullness) * variation;
  } else {
    radius = 0.08 + random() ** 0.75 * 0.78;
    angle = random() * TAU;
  }

  const across = scatter(random) * width;
  const along = scatter(random) * width * 0.6;
  const thickness = core ? 0.024 * Math.exp(-radius * 4)
    : 0.007 + 0.01 * Math.exp(-radius * 6);
  return {
    core, arm,
    brightEligible: arm && Math.abs(across) < width * 0.5 && Math.abs(along) < width * 0.6,
    position: [Math.cos(angle) * (radius + across) - Math.sin(angle) * along,
      Math.sin(angle) * (radius + across) + Math.cos(angle) * along,
      scatter(random) * thickness],
  };
}
