const iconProps = {
  fill: "none",
  height: "18",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "2",
  viewBox: "0 0 24 24",
  width: "18",
  "aria-hidden": "true",
};

export function EyeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function ChevronDownIcon() {
  return (
    <svg {...iconProps}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function LogOutIcon() {
  return (
    <svg {...iconProps}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

export function PencilIcon() {
  return (
    <svg {...iconProps}>
      <path d="M17 3a2.85 2.85 0 0 1 4 4L8 20l-5 1 1-5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="m19 6-1 14H6L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  );
}

export function UserIcon() {
  return (
    <svg {...iconProps}>
      <path d="M19 21a7 7 0 0 0-14 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
