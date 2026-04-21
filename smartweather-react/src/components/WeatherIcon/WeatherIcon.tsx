import React from 'react';
import { getWeatherMeta, getWeatherType } from '../../utils';
import styles from './WeatherIcon.module.css';

interface WeatherIconProps {
  code: number;
  isNight?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

export function WeatherIcon({
  code,
  isNight = false,
  size = 'md',
  className = '',
  animate = true,
}: WeatherIconProps) {
  const { icon } = getWeatherMeta(code);
  const weatherType = getWeatherType(code, isNight);

  const animationClass = animate ? styles[weatherType] || '' : '';
  const sizeClass = styles[size] || styles.md;

  return (
    <span
      className={`${styles.iconContainer} ${animationClass} ${sizeClass} ${className}`.trim()}
      role="img"
      aria-label={`Weather icon: ${weatherType}`}
    >
      {icon}
    </span>
  );
}
