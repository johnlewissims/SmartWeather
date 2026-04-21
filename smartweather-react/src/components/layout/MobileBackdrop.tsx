import React from 'react';

interface MobileBackdropProps {
  onClick: () => void;
}

export function MobileBackdrop({ onClick }: MobileBackdropProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-30 animate-slide-in"
      onClick={onClick}
      aria-hidden="true"
    />
  );
}
