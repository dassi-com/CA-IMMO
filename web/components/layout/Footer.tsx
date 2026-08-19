import Link from 'next/link';
import { MonabrisMark } from '@/components/ui/logo';
import { Globe, Share2, AtSign, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-gray-400 mt-16 relative overflow-hidden">
      <div className="brand-pattern-light absolute inset-0 opacity-60 pointer-events-none" />
      <div className="container relative mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white rounded-2xl p-1.5 shadow-card flex-shrink-0">
                <MonabrisMark variant="dark-background" size={48} />
              </div>
              <div className="leading-tight">
                <span className="font-extrabold text-2xl text-white tracking-tight">
                  Mona<span className="text-primary-400">bris</span>
                </span>
                <p className="text-[11px] text-gray-400 font-medium tracking-wide hidden sm:block">
                  Where Vision Finds Home
                </p>
              </div>
            </div>
            <p className="text-xs leading-relaxed mb-4">
              Où la vision trouve son foyer. Le réseau immobilier premium d'Afrique centrale.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" aria-label="Site web" className="p-2 rounded-lg bg-white/5 hover:bg-primary-600 text-gray-300 hover:text-white transition-colors"><Globe size={16} /></a>
              <a href="#" aria-label="Partager" className="p-2 rounded-lg bg-white/5 hover:bg-primary-600 text-gray-300 hover:text-white transition-colors"><Share2 size={16} /></a>
              <a href="#" aria-label="Email" className="p-2 rounded-lg bg-white/5 hover:bg-primary-600 text-gray-300 hover:text-white transition-colors"><AtSign size={16} /></a>
              <a href="#" aria-label="Messagerie" className="p-2 rounded-lg bg-white/5 hover:bg-primary-600 text-gray-300 hover:text-white transition-colors"><MessageCircle size={16} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-sm mb-3 font-semibold">Entreprise</h3>
            <ul className="space-y-2">
              <li><Link href="/search" className="text-xs hover:text-primary-400 transition-colors">Explorer les biens</Link></li>
              <li><Link href="/login" className="text-xs hover:text-primary-400 transition-colors">Se connecter</Link></li>
              <li><Link href="/register" className="text-xs hover:text-primary-400 transition-colors">Créer un compte</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm mb-3 font-semibold">Acheteurs</h3>
            <ul className="space-y-2">
              <li><Link href="/search" className="text-xs hover:text-primary-400 transition-colors">Recherche de biens</Link></li>
              <li><Link href="/favorites" className="text-xs hover:text-primary-400 transition-colors">Propriétés favorites</Link></li>
              <li><Link href="/search" className="text-xs hover:text-primary-400 transition-colors">Acheter / Louer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm mb-3 font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs"><Mail size={14} className="text-primary-400" /> contact@monabris.com</li>
              <li className="flex items-center gap-2 text-xs"><Phone size={14} className="text-primary-400" /> +241 01 234 5678</li>
              <li className="flex items-center gap-2 text-xs"><MapPin size={14} className="text-primary-400" /> Libreville, Gabon</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs">
          © 2026 Monabris. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}