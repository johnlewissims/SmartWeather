import React, { useState, useCallback } from 'react';
import { Banner, BannerProps } from './Banner';

export interface BannerData {
  id: string;
  message: string;
  type?: 'info' | 'warning' | 'error';
  dismissible?: boolean;
}

let bannerIdCounter = 0;
let addBannerCallback: ((banner: BannerData) => void) | null = null;
let removeBannerCallback: ((id: string) => void) | null = null;

export function showBanner(message: string, type?: BannerData['type'], dismissible = true) {
  if (addBannerCallback) {
    const id = `banner-${++bannerIdCounter}`;
    addBannerCallback({ id, message, type, dismissible });
  }
}

export function hideBanner(id: string) {
  if (removeBannerCallback) {
    removeBannerCallback(id);
  }
}

export function BannerContainer() {
  const [banners, setBanners] = useState<BannerData[]>([]);

  const addBanner = useCallback((banner: BannerData) => {
    setBanners((prev) => [...prev, banner]);
  }, []);

  const removeBanner = useCallback((id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  }, []);

  // Register the callbacks
  React.useEffect(() => {
    addBannerCallback = addBanner;
    removeBannerCallback = removeBanner;
    return () => {
      addBannerCallback = null;
      removeBannerCallback = null;
    };
  }, [addBanner, removeBanner]);

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {banners.map((banner) => (
        <Banner
          key={banner.id}
          id={banner.id}
          message={banner.message}
          type={banner.type}
          dismissible={banner.dismissible}
          onDismiss={removeBanner}
        />
      ))}
    </div>
  );
}
