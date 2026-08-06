import type { SVGProps } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

type P = SVGProps<SVGSVGElement>;

export const WaveIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M2 16c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" />
    <path d="M2 20c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" />
    <circle cx="17" cy="6" r="3" />
  </svg>
);

export const SearchIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const ChevronRightIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);

export const CalendarIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </svg>
);

export const CardIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20M6 15h4" />
  </svg>
);

export const PlaneIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M10.5 3.5 13 3l7 7-4 1.5-2 6L12 19l-1.5-5.5L5 12l-2-2 6-4z" />
  </svg>
);

export const HotelIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 21h18M5 21V6l7-3 7 3v15" />
    <path d="M10 21v-5h4v5M9 10h1M14 10h1" />
  </svg>
);

export const XCircleIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m9 9 6 6M15 9l-6 6" />
  </svg>
);

export const ClipboardIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4V3h6v1M9 11h6M9 15h4" />
  </svg>
);

export const HeadsetIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="2" y="13" width="4" height="6" rx="1.5" />
    <rect x="18" y="13" width="4" height="6" rx="1.5" />
    <path d="M20 19v1a3 3 0 0 1-3 3h-2" />
  </svg>
);

export const HelpIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.6.2-.7.7-.7 1.3M12 16.5h.01" />
  </svg>
);

export const PhoneIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 3h3l2 5-2.5 1.5a12 12 0 0 0 5.5 5.5L15 12.5l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 5.2 2 2 0 0 1 5 3z" />
  </svg>
);

export const ChatIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.5A8 8 0 1 1 21 12z" />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const WhatsAppIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M21 12a9 9 0 0 1-13.3 7.9L3 21l1.2-4.5A9 9 0 1 1 21 12z" />
    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1l-1.6-.8-.9.9a5 5 0 0 1-2.1-2.1l.9-.9L11 9.5c0-.5-.4-1-1-1s-1 .4-1 1z" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
