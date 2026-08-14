'use client';

import {
  Home,
  Building2,
  MapPin,
  Key,
  Search,
  Map,
  Construction,
  FileSignature,
  Headset,
  type LucideIcon,
} from 'lucide-react';

/**
 * Système d'iconographie Monabris.
 * Mappe les icônes de la charte graphique vers les icônes lucide-react.
 * Convention : une icône par usage sémantique.
 */
export const brandIcons = {
  home: Home,
  building: Building2,
  location: MapPin,
  key: Key,
  search: Search,
  map: Map,
  construction: Construction,
  contract: FileSignature,
  support: Headset,
} as const;

export type BrandIconName = keyof typeof brandIcons;

export interface BrandIconProps {
  name: BrandIconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function BrandIcon({
  name,
  size = 20,
  className,
  strokeWidth = 2,
}: BrandIconProps) {
  const Icon: LucideIcon = brandIcons[name];
  return <Icon size={size} className={className} strokeWidth={strokeWidth} />;
}

export { Home, Building2, MapPin, Key, Search, Map, Construction, FileSignature, Headset };