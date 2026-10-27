import React from 'react';
import { Zap, ShieldCheck, Truck, RefreshCw, Cpu, Database } from 'lucide-react';

export default function TickerMarquee() {
  const items = [
    { icon: <Database size={14} color="var(--accent-cyan)" />, text: "FIREBASE STORAGE INTEGRATION ACTIVE" },
    { icon: <Cpu size={14} color="var(--accent-cyan)" />, text: "HIGH-FIDELITY BASE64 ASSET PIPELINE" },
    { icon: <Zap size={14} color="#ffaa00" />, text: "NITRO-AIR HYPER-PROPULSION MIDSOLE" },
    { icon: <Truck size={14} color="#00e676" />, text: "FREE GLOBAL AIR EXPRESS OVER $150" },
    { icon: <RefreshCw size={14} color="#d946ef" />, text: "30-DAY RUNNER RISK-FREE WEAR TEST" },
    { icon: <ShieldCheck size={14} color="#00f0ff" />, text: "100% AUTHENTICATED CARBON PLATE FOOTWEAR" },
  ];

  return (
    <div className="marquee-container" aria-hidden="true">
      <div className="marquee-content">
        {items.map((item, index) => (
          <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
            {item.icon}
            <span>{item.text}</span>
          </span>
        ))}
      </div>
      <div className="marquee-content">
        {items.map((item, index) => (
          <span key={`dup-${index}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
            {item.icon}
            <span>{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
