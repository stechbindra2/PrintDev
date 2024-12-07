import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const footerLinks = {
  'ABOUT PRINTDEV': [
    { name: 'Who We Are', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Work With Us', href: '/careers' },
    { name: 'Investor Relations', href: '/investors' },
    { name: 'Report Fraud', href: '/report-fraud' },
    { name: 'Contact Us', href: '/contact' }
  ],
  'PRINTVERSE': [
    { name: 'PrintDev', href: '/' },
    { name: 'Blinkit', href: '/blinkit' },
    { name: 'District', href: '/district' },
    { name: 'Hyperpure', href: '/hyperpure' },
    { name: 'PrintDev Live', href: '/live' }
  ],
  'FOR PRINT SHOPS': [
    { name: 'Partner With Us', href: '/partner' },
    { name: 'Apps For You', href: '/apps' }
  ],
  'LEARN MORE': [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Security', href: '/security' },
    { name: 'Terms', href: '/terms' }
  ]
};

const socialLinks = [
  { Icon: Linkedin, href: 'https://linkedin.com' },
  { Icon: Instagram, href: 'https://instagram.com' },
  { Icon: Twitter, href: 'https://twitter.com' },
  { Icon: Youtube, href: 'https://youtube.com' },
  { Icon: Facebook, href: 'https://facebook.com' }
];

export function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo className="h-8 w-auto mb-6" />
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-gray-900 font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-500 hover:text-gray-600 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://b.zmtcdn.com/data/webuikit/9f0c85a5e33adb783fa0aef667075f9e1556003622.png"
                  alt="Download on App Store"
                  className="h-10"
                />
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://b.zmtcdn.com/data/webuikit/23e930757c3df49840c482a8638bf5c31556001144.png"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
            </div>
            <p className="text-sm text-gray-500">
              By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-{new Date().getFullYear()} © PrintDev™ Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}