import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12h3" />
      <path d="M19 12h3" />
      <path d="M6.6 7.1a8.94 8.94 0 0 1 10.8 0" />
      <path d="M5.1 4.2a13 13 0 0 1 13.8 0" />
      <path d="M12 12v8" />
    </svg>
  );
}
