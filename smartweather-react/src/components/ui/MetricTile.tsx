import React from 'react';

interface MetricTileProps {
  label: string;
  value: string | number;
  icon?: string;
  unit?: string;
  subtext?: string;
  color?: string;
  className?: string;
}

export function MetricTile({
  label,
  value,
  icon,
  unit,
  subtext,
  color,
  className = '',
}: MetricTileProps) {
  return (
    <div className={`bg-sw-surface border border-sw-border rounded-lg p-4 ${className}`.trim()}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sw-muted text-sm mb-1">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-sw-text" style={color ? { color } : undefined}>
              {value}
            </span>
            {unit && <span className="text-sw-muted text-sm">{unit}</span>}
          </div>
          {subtext && <p className="text-sw-muted text-xs mt-1">{subtext}</p>}
        </div>
        {icon && <span className="text-2xl opacity-50">{icon}</span>}
      </div>
    </div>
  );
}
