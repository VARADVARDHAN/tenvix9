
import React from 'react';

export const Logo = () => (
    <svg width="48" height="48" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="logoGradient" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A855F7"/>
                <stop offset="1" stopColor="#3B82F6"/>
            </linearGradient>
        </defs>
        <path d="M75 25C75 36.0457 66.0457 45 55 45C43.9543 45 35 36.0457 35 25C35 13.9543 43.9543 5 55 5C66.0457 5 75 13.9543 75 25ZM25 25C25 13.9543 33.9543 5 45 5C56.0457 5 65 13.9543 65 25C65 36.0457 56.0457 45 45 45C33.9543 45 25 36.0457 25 25Z" stroke="url(#logoGradient)" strokeWidth="10" strokeLinecap="round"/>
    </svg>
);

export const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
        <svg width="60" height="60" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
            <defs>
                <linearGradient id="spinnerGradient" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A855F7"/>
                    <stop offset="1" stopColor="#3B82F6"/>
                </linearGradient>
            </defs>
            <path d="M75 25C75 36.0457 66.0457 45 55 45C43.9543 45 35 36.0457 35 25C35 13.9543 43.9543 5 55 5C66.0457 5 75 13.9543 75 25ZM25 25C25 13.9543 33.9543 5 45 5C56.0457 5 65 13.9543 65 25C65 36.0457 56.0457 45 45 45C33.9543 45 25 36.0457 25 25Z" stroke="url(#spinnerGradient)" strokeWidth="10" strokeLinecap="round">
                 <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from="0 50 25"
                    to="360 50 25"
                    dur="2s"
                    repeatCount="indefinite"
                />
            </path>
        </svg>
    </div>
);

export const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const CameraIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const MusicIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
  </svg>
);

export const SocialIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
