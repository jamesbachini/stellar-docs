import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const cx = (...classNames) =>
  classNames
    .filter(Boolean)
    .map((className) => styles[className] ?? className)
    .join(" ");

const resolveUrl = (url) =>
  url.replace("https://developers.stellar.org/docs", "/docs");

const isExternalUrl = (url) => /^https?:\/\//.test(url);

const trackThemes = {
  contract: {
    accent: "#fdda24",
    accentSoft: "rgba(253, 218, 36, 0.18)",
  },
  frontend: {
    accent: "#fdda24",
    accentSoft: "rgba(253, 218, 36, 0.18)",
  },
  entrepreneurs: {
    accent: "#fdda24",
    accentSoft: "rgba(253, 218, 36, 0.18)",
  },
  enterprise: {
    accent: "#fdda24",
    accentSoft: "rgba(253, 218, 36, 0.18)",
  },
};

const trackNodes = {
  contract: [
    {
      id: "contract-smart",
      data: {
        label: "Smart Contracts",
        description: "Core concepts and overview of Stellar smart contracts.",
        url: "https://developers.stellar.org/docs/learn/fundamentals/contract-development",
        variant: "root",
      },
      position: { x: 0, y: 0 },
    },
    {
      id: "contract-started",
      data: {
        label: "Getting Started",
        description: "Step-by-step setup to deploy your first contract.",
        url: "https://developers.stellar.org/docs/build/smart-contracts/getting-started",
      },
      position: { x: 260, y: -80 },
    },
    {
      id: "contract-faucet",
      data: {
        label: "Testnet Faucet",
        description: "Fund a testnet account to experiment safely.",
        url: "https://lab.stellar.org/account/fund",
      },
      position: { x: 520, y: -350 },
    },
    {
      id: "contract-hello",
      data: {
        label: "Hello World",
        description: "Review a minimal Soroban contract example.",
        url: "https://github.com/stellar/soroban-examples/blob/main/hello_world/src/lib.rs",
      },
      position: { x: 600, y: -240 },
    },
    {
      id: "contract-examples",
      data: {
        label: "Examples",
        description: "Browse additional Soroban reference contracts.",
        url: "https://github.com/stellar/soroban-examples",
      },
      position: { x: 600, y: -120 },
    },
    {
      id: "contract-guides",
      data: {
        label: "How To Guides",
        description: "Practical how-tos for common contract tasks.",
        url: "https://developers.stellar.org/docs/build/guides",
      },
      position: { x: 260, y: 60 },
    },
    {
      id: "contract-migration",
      data: {
        label: "Solidity Dev Migration",
        description: "Guide for EVM devs moving to Stellar.",
        url: "https://developers.stellar.org/docs/learn/migrate/evm",
      },
      position: { x: 520, y: 0 },
    },
    {
      id: "contract-tools",
      data: {
        label: "Dev Tools",
        description: "Explore tooling for Soroban development.",
        url: "https://developers.stellar.org/docs/tools",
      },
      position: { x: 260, y: 180 },
    },
    {
      id: "contract-cli",
      data: {
        label: "Stellar CLI",
        description: "Use the CLI for build and deployment.",
        url: "https://developers.stellar.org/docs/tools/cli",
      },
      position: { x: 520, y: 140 },
    },
    {
      id: "contract-online-ide",
      data: {
        label: "SoroPG",
        description: "Online IDE, code and deploy without local setup.",
        url: "https://soropg.com",
      },
      position: { x: 600, y: 260 },
    },
    {
      id: "contract-oz",
      data: {
        label: "OpenZeppelin",
        description: "Audit-ready contract libraries for Stellar.",
        url: "https://developers.stellar.org/docs/tools/openzeppelin-contracts",
      },
      position: { x: 600, y: 390 },
    },
    {
      id: "contract-scaffold",
      data: {
        label: "Scaffold Stellar",
        description: "Scaffold a full Soroban project quickly.",
        url: "https://developers.stellar.org/docs/tools/scaffold-stellar",
      },
      position: { x: 520, y: 500 },
    },
  ],
  frontend: [
    {
      id: "frontend-dapps",
      data: {
        label: "dApps",
        description: "Overview of building decentralized applications.",
        url: "https://developers.stellar.org/docs/build/apps",
        variant: "root",
      },
      position: { x: 0, y: 0 },
    },
    {
      id: "frontend-guides",
      data: {
        label: "Builders Guides",
        description: "Guides focused on dApp UX and flows.",
        url: "https://developers.stellar.org/docs/build/apps",
      },
      position: { x: 260, y: -80 },
    },
    {
      id: "frontend-dapp-frontend",
      data: {
        label: "dApp Frontend",
        description: "Frontend patterns for Stellar web apps.",
        url: "https://developers.stellar.org/docs/build/guides/dapps/frontend-guide",
      },
      position: { x: 520, y: -260 },
    },
    {
      id: "frontend-hello",
      data: {
        label: "Hello World",
        description: "Simple dApp frontend walkthrough.",
        url: "https://developers.stellar.org/docs/build/smart-contracts/getting-started/hello-world-frontend",
      },
      position: { x: 560, y: -150 },
    },
    {
      id: "frontend-passkey",
      data: {
        label: "Passkey Dapp",
        description: "Build a passkey-enabled guestbook.",
        url: "https://developers.stellar.org/docs/build/apps/guestbook/overview",
      },
      position: { x: 520, y: -40 },
    },
    {
      id: "frontend-tools",
      data: {
        label: "Dev Tools",
        description: "SDKs and kits for frontend integration.",
        url: "https://developers.stellar.org/docs/tools",
      },
      position: { x: 260, y: 80 },
    },
    {
      id: "frontend-sdk",
      data: {
        label: "Javascript SDK",
        description: "Interact with Stellar via JS SDK.",
        url: "https://stellar.github.io/js-stellar-sdk/",
      },
      position: { x: 480, y: 100 },
    },
    {
      id: "frontend-wallet",
      data: {
        label: "Stellar Wallet Kit",
        description: "Integrate wallets into your UI.",
        url: "https://github.com/Creit-Tech/Stellar-Wallets-Kit",
      },
      position: { x: 560, y: 220 },
    },
    {
      id: "frontend-scaffold",
      data: {
        label: "Scaffold Stellar",
        description: "Spin up a dApp starter project.",
        url: "https://developers.stellar.org/docs/tools/scaffold-stellar",
      },
      position: { x: 480, y: 340 },
    },
    {
      id: "frontend-llms",
      data: {
        label: "llms.txt",
        description: "LLM-friendly reference for Stellar docs.",
        url: "https://developers.stellar.org/llms.txt",
      },
      position: { x: 560, y: 460 },
    },
    {
      id: "frontend-security",
      data: {
        label: "Security",
        description: "Best practices for securing web dApps.",
        url: "https://developers.stellar.org/docs/build/security-docs/securing-web-based-projects",
      },
      position: { x: 260, y: 220 },
    },
  ],
  entrepreneurs: [
    {
      id: "biz-intro",
      data: {
        label: "Introducing Stellar",
        description: "High-level overview of Stellar network.",
        url: "https://stellar.org/learn/intro-to-stellar",
        variant: "root",
      },
      position: { x: 0, y: 0 },
    },
    {
      id: "biz-sdf",
      data: {
        label: "SDF",
        description: "About the Stellar Development Foundation.",
        url: "https://stellar.org/foundation",
      },
      position: { x: 260, y: -240 },
    },
    {
      id: "biz-case",
      data: {
        label: "Case Studies",
        description: "Real-world Stellar deployments.",
        url: "https://stellar.org/case-studies",
      },
      position: { x: 620, y: -320 },
    },
    {
      id: "biz-events",
      data: {
        label: "Events",
        description: "Upcoming community events.",
        url: "https://stellar.org/events",
      },
      position: { x: 620, y: -200 },
    },
    {
      id: "biz-careers",
      data: {
        label: "Careers",
        description: "Work with the Stellar ecosystem.",
        url: "https://stellar.org/foundation/careers",
      },
      position: { x: 620, y: -80 },
    },
    {
      id: "biz-grants",
      data: {
        label: "Grants & Funding",
        description: "Funding opportunities for builders.",
        url: "https://stellar.org/foundation/grants-and-funding",
      },
      position: { x: 260, y: 0 },
    },
    {
      id: "biz-community-fund",
      data: {
        label: "SCF",
        description: "Learn more about the Stellar Community Fund",
        url: "https://communityfund.stellar.org/",
      },
      position: { x: 400, y: -60 },
    },
    {
      id: "biz-ecosystem",
      data: {
        label: "Ecosystem",
        description: "Explore companies and partners.",
        url: "https://stellar.org/ecosystem",
      },
      position: { x: 400, y: 60 },
    },
    {
      id: "biz-technology",
      data: {
        label: "Technology",
        description: "Understand the core technology stack.",
        url: "https://developers.stellar.org/docs/learn/fundamental",
      },
      position: { x: 360, y: 240 },
    },
    {
      id: "biz-stack",
      data: {
        label: "Stellar Stack",
        description: "Components of the Stellar stack.",
        url: "https://developers.stellar.org/docs/learn/fundamentals/stellar-stack",
      },
      position: { x: 620, y: 120 },
    },
    {
      id: "biz-lumens",
      data: {
        label: "Lumens (XLM)",
        description: "Learn about the network's native asset.",
        url: "https://developers.stellar.org/docs/learn/fundamentals/lumens",
      },
      position: { x: 620, y: 240 },
    },
    {
      id: "biz-contracts",
      data: {
        label: "Smart Contracts",
        description: "Overview of contract capabilities.",
        url: "https://developers.stellar.org/docs/learn/fundamentals/contract-development",
      },
      position: { x: 620, y: 360 },
    },
    {
      id: "biz-roadmap",
      data: {
        label: "Roadmap",
        description: "View the Stellar roadmap.",
        url: "https://stellar.org/foundation/roadmap",
      },
      position: { x: 620, y: 480 },
    },
  ],
  enterprise: [
    {
      id: "enterprise-hub",
      data: {
        label: "Enterprise",
        description: "Resources for large-scale Stellar adoption.",
        url: "https://stellar.org/enterprise-fund",
        variant: "root",
      },
      position: { x: 0, y: 0 },
    },
    {
      id: "enterprise-use-cases",
      data: {
        label: "Use Cases",
        description: "Enterprise-grade applications built on Stellar.",
        url: "https://stellar.org/use-cases",
      },
      position: { x: 260, y: -160 },
    },
    {
      id: "enterprise-payments",
      data: {
        label: "Payments",
        description: "Cross-border and real-time payment rails.",
        url: "https://stellar.org/use-cases/payments",
      },
      position: { x: 520, y: -380 },
    },
    {
      id: "enterprise-tokenization",
      data: {
        label: "Tokenization",
        description: "Issue and manage tokenized assets.",
        url: "https://stellar.org/use-cases/tokenization",
      },
      position: { x: 520, y: -230 },
    },
    {
      id: "enterprise-ramps",
      data: {
        label: "On/Off Ramps",
        description: "Bridge fiat rails into Stellar.",
        url: "https://stellar.org/use-cases/ramps",
      },
      position: { x: 520, y: -80 },
    },
    {
      id: "enterprise-disbursement",
      data: {
        label: "Disbursement",
        description: "Distribute funds and aid at scale.",
        url: "https://stellar.org/use-cases/stellar-for-aid",
      },
      position: { x: 520, y: 70 },
    },
    {
      id: "enterprise-defi",
      data: {
        label: "DeFi",
        description: "Institutional DeFi opportunities.",
        url: "https://stellar.org/use-cases/defi",
      },
      position: { x: 520, y: 220 },
    },
    {
      id: "enterprise-case-studies",
      data: {
        label: "Case Studies",
        description: "Enterprise deployments and outcomes.",
        url: "https://stellar.org/case-studies",
      },
      position: { x: 260, y: 80 },
    },
    {
      id: "enterprise-products",
      data: {
        label: "Products",
        description: "Stellar products and tools for institutions.",
        url: "https://stellar.org/products-and-tools",
      },
      position: { x: 260, y: 240 },
    },
  ],
};

const trackEdges = {
  contract: [
    {
      id: "c-smart-started",
      source: "contract-smart",
      target: "contract-started",
    },
    {
      id: "c-started-faucet",
      source: "contract-started",
      target: "contract-faucet",
    },
    {
      id: "c-started-hello",
      source: "contract-started",
      target: "contract-hello",
    },
    {
      id: "c-started-examples",
      source: "contract-started",
      target: "contract-examples",
    },
    {
      id: "c-started-migration",
      source: "contract-started",
      target: "contract-migration",
    },
    {
      id: "c-smart-guides",
      source: "contract-smart",
      target: "contract-guides",
    },
    { id: "c-smart-tools", source: "contract-smart", target: "contract-tools" },
    { id: "c-tools-cli", source: "contract-tools", target: "contract-cli" },
    {
      id: "c-tools-ide",
      source: "contract-tools",
      target: "contract-online-ide",
    },
    { id: "c-tools-oz", source: "contract-tools", target: "contract-oz" },
    {
      id: "c-tools-scaffold",
      source: "contract-tools",
      target: "contract-scaffold",
    },
  ],
  frontend: [
    {
      id: "f-dapps-guides",
      source: "frontend-dapps",
      target: "frontend-guides",
    },
    {
      id: "f-guides-frontend",
      source: "frontend-guides",
      target: "frontend-dapp-frontend",
    },
    {
      id: "f-guides-hello",
      source: "frontend-guides",
      target: "frontend-hello",
    },
    {
      id: "f-guides-passkey",
      source: "frontend-guides",
      target: "frontend-passkey",
    },
    { id: "f-dapps-tools", source: "frontend-dapps", target: "frontend-tools" },
    { id: "f-tools-sdk", source: "frontend-tools", target: "frontend-sdk" },
    {
      id: "f-tools-wallet",
      source: "frontend-tools",
      target: "frontend-wallet",
    },
    {
      id: "f-tools-scaffold",
      source: "frontend-tools",
      target: "frontend-scaffold",
    },
    { id: "f-tools-llms", source: "frontend-tools", target: "frontend-llms" },
    {
      id: "f-dapps-security",
      source: "frontend-dapps",
      target: "frontend-security",
    },
  ],
  entrepreneurs: [
    { id: "e-intro-sdf", source: "biz-intro", target: "biz-sdf" },
    { id: "e-sdf-case", source: "biz-sdf", target: "biz-case" },
    { id: "e-sdf-events", source: "biz-sdf", target: "biz-events" },
    { id: "e-sdf-careers", source: "biz-sdf", target: "biz-careers" },
    { id: "e-intro-grants", source: "biz-intro", target: "biz-grants" },
    { id: "e-grants-fund", source: "biz-grants", target: "biz-community-fund" },
    {
      id: "e-grants-eco",
      source: "biz-grants",
      target: "biz-ecosystem",
      forceVertical: true,
    },
    { id: "e-intro-tech", source: "biz-intro", target: "biz-technology" },
    { id: "e-tech-stack", source: "biz-technology", target: "biz-stack" },
    { id: "e-tech-lumens", source: "biz-technology", target: "biz-lumens" },
    {
      id: "e-tech-contracts",
      source: "biz-technology",
      target: "biz-contracts",
    },
    { id: "e-tech-roadmap", source: "biz-technology", target: "biz-roadmap" },
  ],
  enterprise: [
    {
      id: "ent-hub-use-cases",
      source: "enterprise-hub",
      target: "enterprise-use-cases",
    },
    {
      id: "ent-use-payments",
      source: "enterprise-use-cases",
      target: "enterprise-payments",
    },
    {
      id: "ent-use-tokenization",
      source: "enterprise-use-cases",
      target: "enterprise-tokenization",
    },
    {
      id: "ent-use-ramps",
      source: "enterprise-use-cases",
      target: "enterprise-ramps",
    },
    {
      id: "ent-use-disbursement",
      source: "enterprise-use-cases",
      target: "enterprise-disbursement",
    },
    {
      id: "ent-use-defi",
      source: "enterprise-use-cases",
      target: "enterprise-defi",
    },
    {
      id: "ent-hub-case-studies",
      source: "enterprise-hub",
      target: "enterprise-case-studies",
    },
    {
      id: "ent-hub-products",
      source: "enterprise-hub",
      target: "enterprise-products",
    },
  ],
};

const defaultNodeSize = { width: 200, height: 96 };

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

function getCurvePath(curve) {
  return `M ${curve.start.x} ${curve.start.y} C ${curve.c1.x} ${curve.c1.y}, ${curve.c2.x} ${curve.c2.y}, ${curve.end.x} ${curve.end.y}`;
}

function useTrackData(track) {
  return useMemo(() => {
    const theme = trackThemes[track];
    const baseNodes = trackNodes[track];
    const xScale = 2.45;
    const yScale = 1.12;
    const minY = Math.min(...baseNodes.map((node) => node.position.y));
    const offsetX = Math.max(100, -minY * xScale + 100);
    const edges = trackEdges[track];
    const rootIds = baseNodes
      .filter((node) => node.data?.variant === "root")
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
        type: "link",
        data: {
          ...node.data,
          accent: theme.accent,
          accentSoft: theme.accentSoft,
          tint: "#ffffff",
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
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const centeredLayoutRef = useRef(null);
  const chartShiftY = isStacked ? 0 : 50;

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

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
    window.addEventListener("resize", measureNodes);
    return () => window.removeEventListener("resize", measureNodes);
  }, [nodes]);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(max-width: 720px)");
    const handleChange = (event) => setIsStacked(event.matches);
    handleChange(mediaQuery);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") {
      return;
    }

    const getContentSize = () => {
      const styles = window.getComputedStyle(container);
      const paddingX =
        parseFloat(styles.paddingLeft);
      const paddingY =
        parseFloat(styles.paddingTop);

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

    const fitScale = Math.min(
      canvasSize.width / layoutSize.width,
      canvasSize.height / layoutSize.height,
    );

    if (!Number.isFinite(fitScale) || fitScale <= 0) return 1;
    return Math.min(1, fitScale);
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
        : Math.max(canvasSize.width || 0, scaledLayout.width),
      height: isStacked
        ? canvasSize.height || layoutSize.height
        : Math.max(canvasSize.height || 0, scaledLayout.height),
    };
  }, [canvasSize, layoutSize, scaledLayout, isStacked]);

  const viewportOffset = useMemo(() => {
    return {
      x: Math.max(0, (viewSize.width - scaledLayout.width) / 2),
      y: Math.max(0, (viewSize.height - scaledLayout.height) / 2),
    };
  }, [viewSize, scaledLayout]);

  useEffect(() => {
    const container = containerRef.current;
    if (isStacked || !container || !canvasSize.width) return undefined;

    const layoutKey = `${track}:${scaledLayout.width}`;
    if (centeredLayoutRef.current === layoutKey) return undefined;
    centeredLayoutRef.current = layoutKey;

    const animationFrameId = window.requestAnimationFrame(() => {
      if (container.scrollWidth > container.clientWidth) {
        container.scrollLeft =
          (container.scrollWidth - container.clientWidth) / 2;
      }
    });

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [canvasSize.width, isStacked, scaledLayout.width, track]);

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
    if (event.pointerType === "touch") return;
    if (event.target.closest(`.${styles["flow-node"]}`)) return;
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
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  return (
    <section className={styles["flow-wrapper"]}>
      <div
        className={styles["flow-card"]}
        style={{ "--accent": theme.accent, "--accent-soft": theme.accentSoft }}
      >
        <div
          className={cx("flow-canvas", isStacked && "stacked")}
          ref={containerRef}
          onPointerDown={handleCanvasPointerDown}
          style={{ "--chart-shift-y": `${chartShiftY}px` }}
        >
          <div
            className={cx("flow-content", isStacked && "stacked")}
            style={
              isStacked
                ? { width: "100%", height: "auto" }
                : { width: viewSize.width, height: viewSize.height }
            }
          >
            <div
              className={cx("flow-viewport", isStacked && "stacked")}
              style={{
                width: isStacked ? "100%" : layoutSize.width,
                height: isStacked ? "auto" : layoutSize.height,
                left: isStacked ? 0 : viewportOffset.x,
                top: isStacked
                  ? 0
                  : Math.max(0, viewportOffset.y - chartShiftY),
                transform: isStacked ? "none" : `scale(${scale})`,
              }}
            >
              {!isStacked ? (
                <svg
                  className={styles["flow-edges"]}
                  width={layoutSize.width}
                  height={layoutSize.height}
                  aria-hidden="true"
                >
                  {edges.map((edge) => {
                    const source = nodesById[edge.source];
                    const target = nodesById[edge.target];
                    if (!source || !target) return null;
                    const curve = getEdgeCurve(source, target, edge);
                    const isHighlighted =
                      hoveredNodeId === edge.source ||
                      hoveredNodeId === edge.target;
                    return (
                      <path
                        key={edge.id}
                        d={getCurvePath(curve)}
                        className={styles["flow-edge"]}
                        strokeDasharray="5 7"
                        style={{
                          color: isHighlighted
                            ? "var(--stellar-yellow)"
                            : "var(--stellar-rule-strong)",
                        }}
                      />
                    );
                  })}
                </svg>
              ) : null}
              {nodes.map((node) => {
                const nodeClassName = cx(
                  "flow-node",
                  node.data.variant,
                  node.data.url && "clickable",
                  node.data.depth >= 3 && "is-deep",
                );
                const sharedProps = {
                  className: nodeClassName,
                  style: {
                    left: node.position.x,
                    top: node.position.y,
                    "--accent": theme.accent,
                    "--accent-soft": theme.accentSoft,
                    "--node-tint": node.data.tint,
                  },
                  "data-depth": node.data.depth,
                  ref: (element) => {
                    if (element) {
                      nodeRefs.current[node.id] = element;
                    }
                  },
                  "aria-label": node.data.label,
                  onPointerDown: (event) => event.stopPropagation(),
                  onMouseEnter: () => setHoveredNodeId(node.id),
                  onMouseLeave: () => setHoveredNodeId(null),
                  onFocus: () => setHoveredNodeId(node.id),
                  onBlur: () => setHoveredNodeId(null),
                };

                if (node.data.url) {
                  return (
                    <a
                      key={node.id}
                      {...sharedProps}
                      href={resolveUrl(node.data.url)}
                      target={
                        isExternalUrl(resolveUrl(node.data.url))
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        isExternalUrl(resolveUrl(node.data.url))
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      <div className={styles["node-title"]}>
                        {node.data.label}
                      </div>
                      {node.data.description ? (
                        <div className={styles["node-hint"]}>
                          {node.data.description}
                        </div>
                      ) : null}
                    </a>
                  );
                }

                return (
                  <div key={node.id} {...sharedProps}>
                    <div className={styles["node-title"]}>
                      {node.data.label}
                    </div>
                    {node.data.description ? (
                      <div className={styles["node-hint"]}>
                        {node.data.description}
                      </div>
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
