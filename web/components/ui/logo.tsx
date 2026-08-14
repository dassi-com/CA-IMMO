import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  /** Version du logo Monabris */
  variant?: 'primary' | 'white-on-red' | 'dark-background' | 'app-icon';
  /** Afficher le nom de la marque à côté de l'icône */
  showName?: boolean;
  /** Utiliser un fond de carte pour les versions sur fond rouge/sombre */
  containerClassName?: string;
  className?: string;
  size?: number;
}

const LOGO_ASSETS = {
  primary: '/monabris-app-icons1.gif',
  'white-on-red': '/monabris-app-icons1.gif',
  'dark-background': '/monabris-app-icons1.gif',
  'app-icon': '/monabris-app-icons1.gif',
} as const;

export default function Logo({
  variant = 'primary',
  showName = true,
  className = '',
  size = 40,
}: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div className="relative flex-shrink-0">
        <Image
          src={LOGO_ASSETS[variant]}
          alt="Monabris"
          width={size}
          height={size}
          className="drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
      {showName && (
        <div className="leading-tight">
          <span className="font-extrabold text-xl tracking-tight text-gray-900">
            Mona<span className="text-primary-600">bris</span>
          </span>
          <p className="text-[10px] text-gray-500 font-medium tracking-wide hidden sm:block">
            Where Vision Finds Home
          </p>
        </div>
      )}
    </Link>
  );
}

/** Icône Monabris seule (version app icon) */
export function MonabrisMark({
  variant = 'primary',
  className = '',
  size = 40,
}: Omit<LogoProps, 'showName'>) {
  return (
    <Image
      src={LOGO_ASSETS[variant]}
      alt="Monabris"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}