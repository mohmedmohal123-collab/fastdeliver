/**
 * Haversine formula — calculates great-circle distance between two coordinates in km.
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Estimate ETA in minutes given distance in km and average speed (default 30 km/h in city).
 */
export function estimateETA(distanceKm: number, speedKmh = 30): number {
  return Math.round((distanceKm / speedKmh) * 60);
}

/**
 * Deterministic lat/lng generator from an address string.
 * Hashes the string into a coordinate roughly within greater Cairo.
 * Used for demo/mock purposes when real geocoding is unavailable.
 */
export function addressToLatLng(address: string): [number, number] {
  // Simple hash
  let hash = 0;
  for (let i = 0; i < address.length; i++) {
    hash = (hash << 5) - hash + address.charCodeAt(i);
    hash |= 0;
  }
  // Cairo bounding box approx: lat 29.8–30.2, lng 31.1–31.5
  const lat = 29.9 + ((Math.abs(hash) % 1000) / 1000) * 0.35;
  const lng = 31.1 + (((Math.abs(hash) >> 10) % 1000) / 1000) * 0.4;
  return [lat, lng];
}
