import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.css';

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

const cx = (...classNames) =>
  classNames
    .filter(Boolean)
    .map((className) => styles[className] ?? className)
    .join(' ');

const resolveUrl = (url) =>
  url.replace('https://developers.stellar.org/docs', '/docs');

const isExternalUrl = (url) => /^https?:\/\//.test(url);

const trackThemes = {
  contract: {
    accent: '#fdda24',
    accentSoft: 'rgba(253, 218, 36, 0.18)',
    edge: '#fdda24',
    edgePalette: ['#fdda24'],
  },
  frontend: {
    accent: '#fdda24',
    accentSoft: 'rgba(253, 218, 36, 0.18)',
    edge: '#fdda24',
    edgePalette: ['#fdda24'],
  },
  entrepreneurs: {
    accent: '#fdda24',
    accentSoft: 'rgba(253, 218, 36, 0.18)',
    edge: '#fdda24',
    edgePalette: ['#fdda24'],
  },
  enterprise: {
    accent: '#fdda24',
    accentSoft: 'rgba(253, 218, 36, 0.18)',
    edge: '#fdda24',
    edgePalette: ['#fdda24'],
  },
};

const trackNodes = {
  contract: [
    {
      id: 'contract-smart',
      data: {
        label: 'Stellar Smart Contracts',
        description: 'Core concepts and overview of Soroban smart contracts.',
        url: 'https://developers.stellar.org/docs/learn/fundamentals/contract-development',
        variant: 'root',
      },
      position: { x: 0, y: 0 },
    },
    {
      id: 'contract-started',
      data: {
        label: 'Getting Started',
        description: 'Step-by-step setup to deploy your first contract.',
        url: 'https://developers.stellar.org/docs/build/smart-contracts/getting-started',
      },
      position: { x: 260, y: -80 },
    },
    {
      id: 'contract-faucet',
      data: {
        label: 'Testnet Faucet',
        description: 'Fund a testnet account to experiment safely.',
        url: 'https://lab.stellar.org/account/fund',
      },
      position: { x: 520, y: -220 },
    },
    {
      id: 'contract-hello',
      data: {
        label: 'Hello World',
        description: 'Review a minimal Soroban contract example.',
        url: 'https://github.com/stellar/soroban-examples/blob/main/hello_world/src/lib.rs',
      },
      position: { x: 600, y: -140 },
    },
    {
      id: 'contract-examples',
      data: {
        label: 'Examples',
        description: 'Browse additional Soroban reference contracts.',
        url: 'https://github.com/stellar/soroban-examples',
      },
      position: { x: 600, y: -40 },
    },
    {
      id: 'contract-guides',
      data: {
        label: 'How To Guides',
        description: 'Practical how-tos for common contract tasks.',
        url: 'https://developers.stellar.org/docs/build/guides',
      },
      position: { x: 260, y: 60 },
    },
    {
      id: 'contract-migration',
      data: {
        label: 'Solidity Dev Migration',
        description: 'Guide for EVM devs moving to Stellar.',
        url: 'https://developers.stellar.org/docs/learn/migrate/evm',
      },
      position: { x: 520, y: 40 },
    },
    {
      id: 'contract-tools',
      data: {
        label: 'Dev Tools',
        description: 'Explore tooling for Soroban development.',
        url: 'https://developers.stellar.org/docs/tools',
      },
      position: { x: 260, y: 180 },
    },
    {
      id: 'contract-cli',
      data: {
        label: 'Stellar CLI',
        description: 'Use the CLI for build and deployment.',
        url: 'https://developers.stellar.org/docs/tools/cli',
      },
      position: { x: 520, y: 140 },
    },
    {
      id: 'contract-online-ide',
      data: {
        label: 'SoroPG',
        description: 'Online IDE, code and deploy without local setup.',
        url: 'https://soropg.com',
      },
      position: { x: 600, y: 220 },
    },
    {
      id: 'contract-oz',
      data: {
        label: 'OpenZeppelin',
        description: 'Audit-ready contract libraries for Stellar.',
        url: 'https://developers.stellar.org/docs/tools/openzeppelin-contracts',
      },
      position: { x: 600, y: 320 },
    },
    {
      id: 'contract-scaffold',
      data: {
        label: 'Scaffold Stellar',
        description: 'Scaffold a full Soroban project quickly.',
        url: 'https://developers.stellar.org/docs/tools/scaffold-stellar',
      },
      position: { x: 520, y: 380 },
    },
  ],
  frontend: [
    {
      id: 'frontend-dapps',
      data: {
        label: 'Decentralized Applications',
        description: 'Overview of building Stellar dApps.',
        url: 'https://developers.stellar.org/docs/build/apps',
        variant: 'root',
      },
      position: { x: 0, y: 0 },
    },
    {
      id: 'frontend-guides',
      data: {
        label: 'Build dApps Guides',
        description: 'Guides focused on dApp UX and flows.',
        url: 'https://developers.stellar.org/docs/build/apps',
      },
      position: { x: 260, y: -80 },
    },
    {
      id: 'frontend-dapp-frontend',
      data: {
        label: 'dApp Frontend',
        description: 'Frontend patterns for Stellar web apps.',
        url: 'https://developers.stellar.org/docs/build/guides/dapps/frontend-guide',
      },
      position: { x: 520, y: -160 },
    },
    {
      id: 'frontend-hello',
      data: {
        label: 'Hello World',
        description: 'Simple dApp frontend walkthrough.',
        url: 'https://developers.stellar.org/docs/build/smart-contracts/getting-started/hello-world-frontend',
      },
      position: { x: 560, y: -80 },
    },
    {
      id: 'frontend-passkey',
      data: {
        label: 'Passkey Dapp',
        description: 'Build a passkey-enabled guestbook.',
        url: 'https://developers.stellar.org/docs/build/apps/guestbook/overview',
      },
      position: { x: 520, y: 0 },
    },
    {
      id: 'frontend-tools',
      data: {
        label: 'Dev Tools',
        description: 'SDKs and kits for frontend integration.',
        url: 'https://developers.stellar.org/docs/tools',
      },
      position: { x: 260, y: 80 },
    },
    {
      id: 'frontend-sdk',
      data: {
        label: 'Javascript SDK',
        description: 'Interact with Stellar via JS SDK.',
        url: 'https://stellar.github.io/js-stellar-sdk/',
      },
      position: { x: 480, y: 120 },
    },
    {
      id: 'frontend-wallet',
      data: {
        label: 'Stellar Wallet Kit',
        description: 'Integrate wallets into your UI.',
        url: 'https://github.com/Creit-Tech/Stellar-Wallets-Kit',
      },
      position: { x: 560, y: 200 },
    },
    {
      id: 'frontend-scaffold',
      data: {
        label: 'Scaffold Stellar',
        description: 'Spin up a dApp starter project.',
        url: 'https://developers.stellar.org/docs/tools/scaffold-stellar',
      },
      position: { x: 480, y: 280 },
    },
    {
      id: 'frontend-llms',
      data: {
        label: 'llms.txt',
        description: 'LLM-friendly reference for Stellar docs.',
        url: 'https://developers.stellar.org/llms.txt',
      },
      position: { x: 560, y: 360 },
    },
    {
      id: 'frontend-security',
      data: {
        label: 'Security',
        description: 'Best practices for securing web dApps.',
        url: 'https://developers.stellar.org/docs/build/security-docs/securing-web-based-projects',
      },
      position: { x: 260, y: 220 },
    },
  ],
  entrepreneurs: [
    {
      id: 'biz-intro',
      data: {
        label: 'Introducing Stellar',
        description: 'High-level overview of Stellar network.',
        url: 'https://stellar.org/learn/intro-to-stellar',
        variant: 'root',
      },
      position: { x: 0, y: 0 },
    },
    {
      id: 'biz-sdf',
      data: {
        label: 'Stellar Development Foundation',
        description: 'About SDF and its mission.',
        url: 'https://stellar.org/foundation',
      },
      position: { x: 260, y: -140 },
    },
    {
      id: 'biz-case',
      data: {
        label: 'Case Studies',
        description: 'Real-world Stellar deployments.',
        url: 'https://stellar.org/case-studies',
      },
      position: { x: 620, y: -220 },
    },
    {
      id: 'biz-events',
      data: {
        label: 'Events',
        description: 'Upcoming community events.',
        url: 'https://stellar.org/events',
      },
      position: { x: 620, y: -140 },
    },
    {
      id: 'biz-careers',
      data: {
        label: 'Careers',
        description: 'Work with the Stellar ecosystem.',
        url: 'https://stellar.org/foundation/careers',
      },
      position: { x: 620, y: -60 },
    },
    {
      id: 'biz-grants',
      data: {
        label: 'Grants & Funding',
        description: 'Funding opportunities for builders.',
        url: 'https://stellar.org/foundation/grants-and-funding',
      },
      position: { x: 260, y: 0 },
    },
    {
      id: 'biz-community-fund',
      data: {
        label: 'Stellar Community Fund',
        description: 'Apply for community grant rounds.',
        url: 'https://communityfund.stellar.org/',
      },
      position: { x: 400, y: -60 },
    },
    {
      id: 'biz-ecosystem',
      data: {
        label: 'Ecosystem',
        description: 'Explore companies and partners.',
        url: 'https://stellar.org/ecosystem',
      },
      position: { x: 400, y: 60 },
    },
    {
      id: 'biz-technology',
      data: {
        label: 'Technology',
        description: 'Understand the core technology stack.',
        url: 'https://developers.stellar.org/docs/learn/fundamental',
      },
      position: { x: 360, y: 140 },
    },
    {
      id: 'biz-stack',
      data: {
        label: 'Stellar Stack',
        description: 'Components of the Stellar stack.',
        url: 'https://developers.stellar.org/docs/learn/fundamentals/stellar-stack',
      },
      position: { x: 620, y: 120 },
    },
    {
      id: 'biz-lumens',
      data: {
        label: 'Lumens (XLM)',
        description: "Learn about the network's native asset.",
        url: 'https://developers.stellar.org/docs/learn/fundamentals/lumens',
      },
      position: { x: 620, y: 200 },
    },
    {
      id: 'biz-contracts',
      data: {
        label: 'Smart Contracts',
        description: 'Overview of contract capabilities.',
        url: 'https://developers.stellar.org/docs/learn/fundamentals/contract-development',
      },
      position: { x: 620, y: 280 },
    },
    {
      id: 'biz-roadmap',
      data: {
        label: 'Roadmap',
        description: 'View the Stellar roadmap.',
        url: 'https://stellar.org/foundation/roadmap',
      },
      position: { x: 620, y: 360 },
    },
  ],
  enterprise: [
    {
      id: 'enterprise-hub',
      data: {
        label: 'Enterprise & Institutions',
        description: 'Resources for large-scale Stellar adoption.',
        url: 'https://stellar.org/enterprise-fund',
        variant: 'root',
      },
      position: { x: 0, y: 0 },
    },
    {
      id: 'enterprise-use-cases',
      data: {
        label: 'Use Cases',
        description: 'Enterprise-grade applications built on Stellar.',
        url: 'https://stellar.org/use-cases',
      },
      position: { x: 260, y: -160 },
    },
    {
      id: 'enterprise-payments',
      data: {
        label: 'Payments',
        description: 'Cross-border and real-time payment rails.',
        url: 'https://stellar.org/use-cases/payments',
      },
      position: { x: 520, y: -280 },
    },
    {
      id: 'enterprise-tokenization',
      data: {
        label: 'Tokenization',
        description: 'Issue and manage tokenized assets.',
        url: 'https://stellar.org/use-cases/tokenization',
      },
      position: { x: 520, y: -180 },
    },
    {
      id: 'enterprise-ramps',
      data: {
        label: 'On/Off Ramps',
        description: 'Bridge fiat rails into Stellar.',
        url: 'https://stellar.org/use-cases/ramps',
      },
      position: { x: 520, y: -80 },
    },
    {
      id: 'enterprise-disbursement',
      data: {
        label: 'Disbursement',
        description: 'Distribute funds and aid at scale.',
        url: 'https://stellar.org/use-cases/stellar-for-aid',
      },
      position: { x: 520, y: 20 },
    },
    {
      id: 'enterprise-defi',
      data: {
        label: 'DeFi',
        description: 'Institutional DeFi opportunities.',
        url: 'https://stellar.org/use-cases/defi',
      },
      position: { x: 520, y: 120 },
    },
    {
      id: 'enterprise-case-studies',
      data: {
        label: 'Case Studies',
        description: 'Enterprise deployments and outcomes.',
        url: 'https://stellar.org/case-studies',
      },
      position: { x: 260, y: 80 },
    },
    {
      id: 'enterprise-products',
      data: {
        label: 'Products',
        description: 'Stellar products and tools for institutions.',
        url: 'https://stellar.org/products-and-tools',
      },
      position: { x: 260, y: 240 },
    },
  ],
};

const trackEdges = {
  contract: [
    { id: 'c-smart-started', source: 'contract-smart', target: 'contract-started' },
    { id: 'c-started-faucet', source: 'contract-started', target: 'contract-faucet' },
    { id: 'c-started-hello', source: 'contract-started', target: 'contract-hello' },
    { id: 'c-started-examples', source: 'contract-started', target: 'contract-examples' },
    { id: 'c-started-migration', source: 'contract-started', target: 'contract-migration' },
    { id: 'c-smart-guides', source: 'contract-smart', target: 'contract-guides' },
    { id: 'c-smart-tools', source: 'contract-smart', target: 'contract-tools' },
    { id: 'c-tools-cli', source: 'contract-tools', target: 'contract-cli' },
    { id: 'c-tools-ide', source: 'contract-tools', target: 'contract-online-ide' },
    { id: 'c-tools-oz', source: 'contract-tools', target: 'contract-oz' },
    { id: 'c-tools-scaffold', source: 'contract-tools', target: 'contract-scaffold' },
  ],
  frontend: [
    { id: 'f-dapps-guides', source: 'frontend-dapps', target: 'frontend-guides' },
    {
      id: 'f-guides-frontend',
      source: 'frontend-guides',
      target: 'frontend-dapp-frontend',
    },
    { id: 'f-guides-hello', source: 'frontend-guides', target: 'frontend-hello' },
    { id: 'f-guides-passkey', source: 'frontend-guides', target: 'frontend-passkey' },
    { id: 'f-dapps-tools', source: 'frontend-dapps', target: 'frontend-tools' },
    { id: 'f-tools-sdk', source: 'frontend-tools', target: 'frontend-sdk' },
    { id: 'f-tools-wallet', source: 'frontend-tools', target: 'frontend-wallet' },
    { id: 'f-tools-scaffold', source: 'frontend-tools', target: 'frontend-scaffold' },
    { id: 'f-tools-llms', source: 'frontend-tools', target: 'frontend-llms' },
    { id: 'f-dapps-security', source: 'frontend-dapps', target: 'frontend-security' },
  ],
  entrepreneurs: [
    { id: 'e-intro-sdf', source: 'biz-intro', target: 'biz-sdf' },
    { id: 'e-sdf-case', source: 'biz-sdf', target: 'biz-case' },
    { id: 'e-sdf-events', source: 'biz-sdf', target: 'biz-events' },
    { id: 'e-sdf-careers', source: 'biz-sdf', target: 'biz-careers' },
    { id: 'e-intro-grants', source: 'biz-intro', target: 'biz-grants' },
    { id: 'e-grants-fund', source: 'biz-grants', target: 'biz-community-fund' },
    {
      id: 'e-grants-eco',
      source: 'biz-grants',
      target: 'biz-ecosystem',
      forceVertical: true,
    },
    { id: 'e-intro-tech', source: 'biz-intro', target: 'biz-technology' },
    { id: 'e-tech-stack', source: 'biz-technology', target: 'biz-stack' },
    { id: 'e-tech-lumens', source: 'biz-technology', target: 'biz-lumens' },
    { id: 'e-tech-contracts', source: 'biz-technology', target: 'biz-contracts' },
    { id: 'e-tech-roadmap', source: 'biz-technology', target: 'biz-roadmap' },
  ],
  enterprise: [
    { id: 'ent-hub-use-cases', source: 'enterprise-hub', target: 'enterprise-use-cases' },
    { id: 'ent-use-payments', source: 'enterprise-use-cases', target: 'enterprise-payments' },
    {
      id: 'ent-use-tokenization',
      source: 'enterprise-use-cases',
      target: 'enterprise-tokenization',
    },
    { id: 'ent-use-ramps', source: 'enterprise-use-cases', target: 'enterprise-ramps' },
    {
      id: 'ent-use-disbursement',
      source: 'enterprise-use-cases',
      target: 'enterprise-disbursement',
    },
    { id: 'ent-use-defi', source: 'enterprise-use-cases', target: 'enterprise-defi' },
    {
      id: 'ent-hub-case-studies',
      source: 'enterprise-hub',
      target: 'enterprise-case-studies',
    },
    { id: 'ent-hub-products', source: 'enterprise-hub', target: 'enterprise-products' },
  ],
};

const edgeColorByTrack = {
  contract: {
    'c-smart-started': 0,
    'c-started-faucet': 0,
    'c-started-hello': 0,
    'c-started-examples': 0,
    'c-started-migration': 2,
    'c-smart-guides': 1,
    'c-smart-tools': 3,
    'c-tools-cli': 3,
    'c-tools-ide': 3,
    'c-tools-oz': 3,
    'c-tools-scaffold': 3,
  },
  frontend: {
    'f-dapps-guides': 0,
    'f-guides-frontend': 0,
    'f-guides-hello': 0,
    'f-guides-passkey': 0,
    'f-dapps-tools': 1,
    'f-tools-sdk': 1,
    'f-tools-wallet': 1,
    'f-tools-scaffold': 1,
    'f-tools-llms': 1,
    'f-dapps-security': 2,
  },
  entrepreneurs: {
    'e-intro-sdf': 0,
    'e-sdf-case': 0,
    'e-sdf-events': 0,
    'e-sdf-careers': 0,
    'e-intro-grants': 1,
    'e-grants-fund': 1,
    'e-grants-eco': 1,
    'e-intro-tech': 2,
    'e-tech-stack': 2,
    'e-tech-lumens': 2,
    'e-tech-contracts': 2,
    'e-tech-roadmap': 2,
  },
  enterprise: {
    'ent-hub-use-cases': 0,
    'ent-use-payments': 0,
    'ent-use-tokenization': 0,
    'ent-use-ramps': 0,
    'ent-use-disbursement': 0,
    'ent-use-defi': 0,
    'ent-hub-case-studies': 1,
    'ent-hub-products': 2,
  },
};

const defaultNodeSize = { width: 220, height: 96 };
const TWO_PI = Math.PI * 2;

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) return null;
  const value = Number.parseInt(normalized, 16);
  if (Number.isNaN(value)) return null;
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function mixColors(colors) {
  if (!colors.length) return null;
  const totals = colors.reduce(
    (acc, color) => {
      const rgb = hexToRgb(color);
      if (!rgb) return acc;
      acc.r += rgb.r;
      acc.g += rgb.g;
      acc.b += rgb.b;
      acc.count += 1;
      return acc;
    },
    { r: 0, g: 0, b: 0, count: 0 }
  );
  if (!totals.count) return null;
  const r = Math.round(totals.r / totals.count);
  const g = Math.round(totals.g / totals.count);
  const b = Math.round(totals.b / totals.count);
  return `rgba(${r}, ${g}, ${b}, 0.18)`;
}

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededValue(seed, offset) {
  const mixed = (seed + offset * 1013904223) % 2147483647;
  return (mixed % 1000) / 1000;
}

function getEdgeCurve(source, target, edge) {
  const sourceCenterX = source.position.x + source.size.width / 2;
  const sourceCenterY = source.position.y + source.size.height / 2;
  const targetCenterX = target.position.x + target.size.width / 2;
  const targetCenterY = target.position.y + target.size.height / 2;
  const dx = targetCenterX - sourceCenterX;
  const dy = targetCenterY - sourceCenterY;
  const isHorizontal = edge?.forceVertical
    ? false
    : edge?.forceHorizontal
      ? true
      : Math.abs(dx) >= Math.abs(dy);
  const edgePadding = 12;

  if (isHorizontal) {
    const startX =
      dx >= 0
        ? source.position.x + source.size.width + edgePadding
        : source.position.x - edgePadding;
    const endX =
      dx >= 0
        ? target.position.x - edgePadding
        : target.position.x + target.size.width + edgePadding;
    const startY = sourceCenterY;
    const endY = targetCenterY;
    const controlOffset = Math.max(80, Math.abs(endX - startX) * 0.4);
    const startControlX = startX + (dx >= 0 ? controlOffset : -controlOffset);
    const endControlX = endX + (dx >= 0 ? -controlOffset : controlOffset);

    return {
      start: { x: startX, y: startY },
      c1: { x: startControlX, y: startY },
      c2: { x: endControlX, y: endY },
      end: { x: endX, y: endY },
    };
  }

  const startY =
    dy >= 0
      ? source.position.y + source.size.height + edgePadding
      : source.position.y - edgePadding;
  const endY =
    dy >= 0
      ? target.position.y - edgePadding
      : target.position.y + target.size.height + edgePadding;
  const startX = sourceCenterX;
  const endX = targetCenterX;
  const controlOffset = Math.max(60, Math.abs(endY - startY) * 0.4);
  const startControlY = startY + (dy >= 0 ? controlOffset : -controlOffset);
  const endControlY = endY + (dy >= 0 ? -controlOffset : controlOffset);

  return {
    start: { x: startX, y: startY },
    c1: { x: startX, y: startControlY },
    c2: { x: endX, y: endControlY },
    end: { x: endX, y: endY },
  };
}

function cubicPoint(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;
  const a = mt2 * mt;
  const b = 3 * mt2 * t;
  const c = 3 * mt * t2;
  const d = t2 * t;
  return {
    x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
    y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
  };
}

function cubicTangent(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const a = 3 * mt * mt;
  const b = 6 * mt * t;
  const c = 3 * t * t;
  return {
    x: a * (p1.x - p0.x) + b * (p2.x - p1.x) + c * (p3.x - p2.x),
    y: a * (p1.y - p0.y) + b * (p2.y - p1.y) + c * (p3.y - p2.y),
  };
}

function buildRibbonPath(edgeId, curve, widthStart, widthEnd) {
  const seed = hashString(edgeId);
  const phase1 = seededValue(seed, 3) * TWO_PI;
  const phase2 = seededValue(seed, 7) * TWO_PI;
  const freq1 = 1.2 + seededValue(seed, 11) * 1.6;
  const freq2 = 2.2 + seededValue(seed, 17) * 2.2;
  const samples = 22;
  const left = [];
  const right = [];

  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const baseWidth = widthStart + (widthEnd - widthStart) * t;
    const wobble =
      Math.sin(t * freq1 * TWO_PI + phase1) * (widthStart * 0.08) +
      Math.sin(t * freq2 * TWO_PI + phase2) * (widthStart * 0.05);
    const width = Math.max(1.6, baseWidth + wobble);
    const point = cubicPoint(curve.start, curve.c1, curve.c2, curve.end, t);
    const tangent = cubicTangent(curve.start, curve.c1, curve.c2, curve.end, t);
    const length = Math.hypot(tangent.x, tangent.y) || 1;
    const normal = { x: -tangent.y / length, y: tangent.x / length };
    const offset = width / 2;
    left.push({ x: point.x + normal.x * offset, y: point.y + normal.y * offset });
    right.push({ x: point.x - normal.x * offset, y: point.y - normal.y * offset });
  }

  let path = `M ${left[0].x} ${left[0].y}`;
  for (let i = 1; i < left.length; i += 1) {
    path += ` L ${left[i].x} ${left[i].y}`;
  }
  for (let i = right.length - 1; i >= 0; i -= 1) {
    path += ` L ${right[i].x} ${right[i].y}`;
  }
  path += ' Z';
  return path;
}

function useTrackData(track) {
  return useMemo(() => {
    const theme = trackThemes[track];
    const baseNodes = trackNodes[track];
    const xScale = 2.45;
    const yScale = 1.12;
    const minY = Math.min(...baseNodes.map((node) => node.position.y));
    const offsetX = Math.max(100, -minY * xScale + 100);
    const palette = theme.edgePalette ?? [theme.edge];
    const colorMap = edgeColorByTrack[track] ?? {};
    const edges = trackEdges[track].map((edge) => {
      const colorIndex = colorMap[edge.id];
      const color = palette[colorIndex] ?? theme.edge;
      return { ...edge, color };
    });
    const rootIds = baseNodes
      .filter((node) => node.data?.variant === 'root')
      .map((node) => node.id);
    const adjacency = edges.reduce((acc, edge) => {
      if (!acc[edge.source]) acc[edge.source] = [];
      acc[edge.source].push(edge.target);
      return acc;
    }, {});
    const depthById = {};
    const queue = [];
    rootIds.forEach((id) => {
      depthById[id] = 1;
      queue.push(id);
    });
    while (queue.length) {
      const current = queue.shift();
      const nextDepth = (depthById[current] ?? 1) + 1;
      (adjacency[current] ?? []).forEach((target) => {
        if (!depthById[target] || nextDepth < depthById[target]) {
          depthById[target] = nextDepth;
          queue.push(target);
        }
      });
    }

    const nodes = baseNodes.map((node) => {
      const depth = depthById[node.id] ?? 2;
      return {
        ...node,
        position: {
          x: node.position.y * xScale + offsetX,
          y: node.position.x * yScale,
        },
        type: 'link',
        data: {
          ...node.data,
          accent: theme.accent,
          accentSoft: theme.accentSoft,
          tint: '#ffffff',
          depth,
        },
      };
    });

    return { nodes, edges, theme };
  }, [track]);
}

export default function StellarFlowChart({ track }) {
  const { nodes, edges, theme } = useTrackData(track);
  const containerRef = useRef(null);
  const nodeRefs = useRef({});
  const [nodeSizes, setNodeSizes] = useState({});
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [isStacked, setIsStacked] = useState(false);
  const chartShiftY = isStacked ? 0 : 50;

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const measureNodes = () => {
      const nextSizes = {};
      nodes.forEach((node) => {
        const element = nodeRefs.current[node.id];
        if (!element) return;
        nextSizes[node.id] = {
          width: element.offsetWidth,
          height: element.offsetHeight,
        };
      });

      setNodeSizes((prev) => {
        const prevKeys = Object.keys(prev);
        const nextKeys = Object.keys(nextSizes);
        if (prevKeys.length !== nextKeys.length) return nextSizes;
        for (const key of nextKeys) {
          if (!prev[key]) return nextSizes;
          if (
            prev[key].width !== nextSizes[key].width ||
            prev[key].height !== nextSizes[key].height
          ) {
            return nextSizes;
          }
        }
        return prev;
      });
    };

    measureNodes();
    window.addEventListener('resize', measureNodes);
    return () => window.removeEventListener('resize', measureNodes);
  }, [nodes]);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(max-width: 720px)');
    const handleChange = (event) => setIsStacked(event.matches);
    handleChange(mediaQuery);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (
      !container ||
      typeof ResizeObserver === 'undefined'
    ) {
      return;
    }

    const getContentSize = () => {
      const styles = window.getComputedStyle(container);
      const paddingX =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      const paddingY =
        parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);

      return {
        width: Math.max(0, container.clientWidth - paddingX),
        height: Math.max(0, container.clientHeight - paddingY),
      };
    };

    const updateSize = () => {
      const nextSize = getContentSize();
      setCanvasSize((prev) => {
        if (prev.width === nextSize.width && prev.height === nextSize.height) {
          return prev;
        }
        return nextSize;
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const nodesById = useMemo(() => {
    return nodes.reduce((acc, node) => {
      acc[node.id] = {
        ...node,
        size: nodeSizes[node.id] ?? defaultNodeSize,
      };
      return acc;
    }, {});
  }, [nodes, nodeSizes]);

  const layoutSize = useMemo(() => {
    let maxX = 0;
    let maxY = 0;
    nodes.forEach((node) => {
      const size = nodeSizes[node.id] ?? defaultNodeSize;
      maxX = Math.max(maxX, node.position.x + size.width);
      maxY = Math.max(maxY, node.position.y + size.height);
    });

    return {
      width: Math.max(900, maxX + 140),
      height: Math.max(520, maxY + 140),
    };
  }, [nodes, nodeSizes]);

  const scale = useMemo(() => {
    if (isStacked) return 1;
    if (!canvasSize.width || !canvasSize.height) return 1;
    const padding = 48;
    const availableWidth = Math.max(0, canvasSize.width - padding);
    const availableHeight = Math.max(0, canvasSize.height - padding);
    if (!availableWidth || !availableHeight) return 1;
    const fitScale = Math.min(
      availableWidth / layoutSize.width,
      availableHeight / layoutSize.height
    );
    return Math.max(0.45, Math.min(1.8, fitScale));
  }, [canvasSize, layoutSize, isStacked]);

  const scaledLayout = useMemo(() => {
    return {
      width: layoutSize.width * scale,
      height: layoutSize.height * scale,
    };
  }, [layoutSize, scale]);

  const viewSize = useMemo(() => {
    return {
      width: isStacked
        ? canvasSize.width || layoutSize.width
        : canvasSize.width || scaledLayout.width,
      height: isStacked
        ? canvasSize.height || layoutSize.height
        : canvasSize.height || scaledLayout.height,
    };
  }, [scaledLayout, canvasSize, layoutSize, isStacked]);

  const viewportOffset = useMemo(() => {
    return {
      x: Math.max(0, (viewSize.width - scaledLayout.width) / 2),
      y: Math.max(0, (viewSize.height - scaledLayout.height) / 2),
    };
  }, [viewSize, scaledLayout]);

  const handleCanvasPointerDown = (event) => {
    const container = containerRef.current;
    if (!container || event.button !== 0) return;
    if (isStacked) return;
    if (
      container.scrollWidth <= container.clientWidth &&
      container.scrollHeight <= container.clientHeight
    ) {
      return;
    }
    if (event.pointerType === 'touch') return;
    if (event.target.closest(`.${styles['flow-node']}`)) return;
    container.classList.add(styles.dragging);
    const startX = event.clientX;
    const startY = event.clientY;
    const startScrollLeft = container.scrollLeft;
    const startScrollTop = container.scrollTop;

    const handleMove = (moveEvent) => {
      container.scrollLeft = startScrollLeft - (moveEvent.clientX - startX);
      container.scrollTop = startScrollTop - (moveEvent.clientY - startY);
    };

    const handleUp = () => {
      container.classList.remove(styles.dragging);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
  };

  return (
    <section className={styles['flow-wrapper']}>
      <div
        className={styles['flow-card']}
        style={{ '--accent': theme.accent, '--accent-soft': theme.accentSoft }}
      >
        <div
          className={cx('flow-canvas', isStacked && 'stacked')}
          ref={containerRef}
          onPointerDown={handleCanvasPointerDown}
          style={{ '--chart-shift-y': `${chartShiftY}px` }}
        >
          <div
            className={cx('flow-content', isStacked && 'stacked')}
            style={
              isStacked
                ? { width: '100%', height: 'auto' }
                : { width: viewSize.width, height: viewSize.height }
            }
          >
            <div
              className={cx('flow-viewport', isStacked && 'stacked')}
              style={{
                width: isStacked ? '100%' : layoutSize.width,
                height: isStacked ? 'auto' : layoutSize.height,
                left: isStacked ? 0 : viewportOffset.x,
                top: isStacked ? 0 : viewportOffset.y - chartShiftY,
                transform: isStacked ? 'none' : `scale(${scale})`,
              }}
            >
              {!isStacked ? (
                <svg
                  className={styles['flow-edges']}
                  width={layoutSize.width}
                  height={layoutSize.height}
                  aria-hidden="true"
                >
                  {edges.map((edge) => {
                    const source = nodesById[edge.source];
                    const target = nodesById[edge.target];
                    if (!source || !target) return null;
                    const curve = getEdgeCurve(source, target, edge);
                    const edgeColor = edge.color ?? theme.edge;
                  const corePath = buildRibbonPath(edge.id, curve, 20, 7.8);
                  const glowPath = buildRibbonPath(edge.id, curve, 32, 12.8);
                    return (
                      <g key={edge.id} style={{ color: edgeColor }}>
                        <path
                          d={glowPath}
                          className={cx('flow-edge', 'flow-edge-glow')}
                        />
                        <path
                          d={corePath}
                          className={cx('flow-edge', 'flow-edge-core')}
                        />
                      </g>
                    );
                  })}
                </svg>
              ) : null}
              {nodes.map((node) => {
                const nodeClassName = cx(
                  'flow-node',
                  node.data.variant,
                  node.data.url && 'clickable',
                  node.data.depth >= 3 && 'is-deep'
                );
                const sharedProps = {
                  className: nodeClassName,
                  style: {
                    left: node.position.x,
                    top: node.position.y,
                    '--accent': theme.accent,
                    '--accent-soft': theme.accentSoft,
                    '--node-tint': node.data.tint,
                  },
                  'data-depth': node.data.depth,
                  ref: (element) => {
                    if (element) {
                      nodeRefs.current[node.id] = element;
                    }
                  },
                  'aria-label': node.data.label,
                  onPointerDown: (event) => event.stopPropagation(),
                };

                if (node.data.url) {
                  return (
                    <a
                      key={node.id}
                      {...sharedProps}
                      href={resolveUrl(node.data.url)}
                      target={isExternalUrl(resolveUrl(node.data.url)) ? '_blank' : undefined}
                      rel={isExternalUrl(resolveUrl(node.data.url)) ? 'noopener noreferrer' : undefined}
                    >
                      <div className={styles['node-title']}>{node.data.label}</div>
                      {node.data.description ? (
                        <div className={styles['node-hint']}>{node.data.description}</div>
                      ) : null}
                    </a>
                  );
                }

                return (
                  <div key={node.id} {...sharedProps}>
                    <div className={styles['node-title']}>{node.data.label}</div>
                    {node.data.description ? (
                      <div className={styles['node-hint']}>{node.data.description}</div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
