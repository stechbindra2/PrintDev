import React from 'react';

export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50 L200 150 L100 250" stroke="#f0ab2f" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M150 50 L250 150 L150 250" stroke="#5e17eb" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" />
      <text x="300" y="200" fontSize="160" fontFamily="Arial" fontWeight="bold">
        <tspan fill="#5e17eb">Print</tspan>
        <tspan fill="#f0ab2f">Dev</tspan>
      </text>
    </svg>
  );
}