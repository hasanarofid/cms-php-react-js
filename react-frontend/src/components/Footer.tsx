import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { getImageUrl } from '../lib/utils-image-url'

interface FooterProps {
  locale?: 'id' | 'en'
  logo?: string | null
  websiteName?: string | null
  websiteTagline?: string | null
  address?: string | null
  phone?: string | null
  email?: string | null
  facebookUrl?: string | null
  instagramUrl?: string | null
  youtubeUrl?: string | null
}

export function Footer({ 
  locale = 'id',
  logo,
  websiteName,
  websiteTagline,
  address,
  phone,
  email,
  facebookUrl,
  instagramUrl,
  youtubeUrl,
}: FooterProps) {
  const currentYear = new Date().getFullYear()
  const displayName = websiteName || ''

  return (
    <footer className="bg-primary-900 text-white border-t border-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              {logo ? (
                <div className="flex flex-col space-y-4">
                  <div className="bg-white p-2 rounded-xl inline-block w-fit shadow-lg shadow-white/5">
                    <img
                      src={getImageUrl(logo)}
                      alt={displayName}
                      className="h-16 w-auto object-contain"
                      onError={(e) => {
                        console.error('Failed to load footer logo:', logo)
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                  {websiteName && (
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {websiteName}
                    </h3>
                  )}
                </div>
              ) : websiteName ? (
                <h3 className="text-3xl font-bold mb-4 text-white tracking-tight">
                  {websiteName}
                </h3>
              ) : null}
            </div>
            <p className="text-primary-200 text-sm leading-relaxed mb-8 italic opacity-80">
              "{websiteTagline || (locale === 'en' 
                ? 'Sken Malang - Affordable Mattress Rental'
                : 'Sken Malang - Sewa Kasur Murah Malang')}"
            </p>
            
            {/* Social Media Links */}
            {(facebookUrl || instagramUrl || youtubeUrl) && (
              <div className="flex space-x-3">
                {facebookUrl && (
                  <a 
                    href={facebookUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-primary-800 hover:bg-accent hover:text-primary-900 p-3 rounded-xl transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                )}
                {instagramUrl && (
                  <a 
                    href={instagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-primary-800 hover:bg-accent hover:text-primary-900 p-3 rounded-xl transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                )}
                {youtubeUrl && (
                  <a 
                    href={youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-primary-800 hover:bg-accent hover:text-primary-900 p-3 rounded-xl transition-all duration-300"
                    aria-label="YouTube"
                  >
                    <Youtube size={20} />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-8 text-accent uppercase tracking-widest">
              {locale === 'en' ? 'Contact Us' : 'Kontak Kami'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {address && (
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-800 p-2.5 rounded-lg text-accent mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <p className="text-primary-100 text-sm leading-relaxed">
                    {address}
                  </p>
                </div>
              )}
              <div className="space-y-6">
                {phone && (
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-800 p-2.5 rounded-lg text-accent">
                      <Phone size={18} />
                    </div>
                    <a 
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="text-primary-100 hover:text-accent transition-colors text-sm font-medium"
                    >
                      {phone}
                    </a>
                  </div>
                )}
                {email && (
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-800 p-2.5 rounded-lg text-accent">
                      <Mail size={18} />
                    </div>
                    <a 
                      href={`mailto:${email}`}
                      className="text-primary-100 hover:text-accent transition-colors text-sm font-medium"
                    >
                      {email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 text-accent uppercase tracking-widest">
              {locale === 'en' ? 'Navigation' : 'Navigasi'}
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="/" className="text-primary-200 hover:text-accent transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all"></span>
                  {locale === 'en' ? 'Home' : 'Beranda'}
                </a>
              </li>
              <li>
                <a href="/kasur" className="text-primary-200 hover:text-accent transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all"></span>
                  {locale === 'en' ? 'Mattress Options' : 'Pilihan Kasur'}
                </a>
              </li>
              <li>
                <a href="/tentang" className="text-primary-200 hover:text-accent transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all"></span>
                  {locale === 'en' ? 'About Us' : 'Tentang Kami'}
                </a>
              </li>
              <li>
                <a href="/kontak" className="text-primary-200 hover:text-accent transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all"></span>
                  {locale === 'en' ? 'Contact' : 'Kontak'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-primary-800 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-primary-400 font-medium tracking-wider uppercase">
            <p>
              &copy; {currentYear} {displayName && `${displayName}. `}{locale === 'en' ? 'All rights reserved.' : 'Hak cipta dilindungi.'}
            </p>
            <p className="flex items-center">
              Made with <span className="text-accent mx-1">❤</span> by <a href="#" className="hover:text-accent ml-1 transition-colors">@hasanarofid</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

