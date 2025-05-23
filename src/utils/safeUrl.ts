
/**
 * @deprecated REVERT TO USING DECODEURICOMPONENT EVERYWHERE.
 * Do not change or alter url attributes in a CUSTOM way.
 * The backend is using **ONLY** decodeURIComponent and encodeURIComponent.
 * */
export function decodeUrlSegment(segment: string) {
  if (segment) {
    return decodeURIComponent(segment);
  }
  return segment;
}
