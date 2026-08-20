import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function BaseIcon({ size = 20, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return <BaseIcon {...props}><path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></BaseIcon>;
}
export function IconArrowRight(props: IconProps) {
  return <BaseIcon {...props}><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></BaseIcon>;
}
export function IconArrowDown(props: IconProps) {
  return <BaseIcon {...props}><path d="M12 4v15M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></BaseIcon>;
}
export function IconCheck(props: IconProps) {
  return <BaseIcon {...props}><path d="m5 12 4.5 4.5L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></BaseIcon>;
}
export function IconMenu(props: IconProps) {
  return <BaseIcon {...props}><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></BaseIcon>;
}
export function IconX(props: IconProps) {
  return <BaseIcon {...props}><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></BaseIcon>;
}
export function IconPhone(props: IconProps) {
  return <BaseIcon {...props}><path d="M7.2 4.5 9.5 4c.6-.1 1.1.2 1.3.8l1.1 2.7c.2.5.1 1-.3 1.3l-1.5 1.2a15.4 15.4 0 0 0 4 4l1.2-1.5c.3-.4.8-.5 1.3-.3l2.7 1.1c.6.2.9.7.8 1.3l-.5 2.3c-.1.6-.7 1.1-1.3 1.1C10.3 17.7 6.3 13.7 4.1 5.8c-.2-.6.3-1.2 1.1-1.3l2-.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></BaseIcon>;
}
export function IconMail(props: IconProps) {
  return <BaseIcon {...props}><rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="m4.5 7 6.2 4.8a2 2 0 0 0 2.6 0L19.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></BaseIcon>;
}
export function IconMapPin(props: IconProps) {
  return <BaseIcon {...props}><path d="M19 10.2c0 4.8-7 10.3-7 10.3S5 15 5 10.2a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6" /></BaseIcon>;
}
export function IconClock(props: IconProps) {
  return <BaseIcon {...props}><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></BaseIcon>;
}
export function IconSparkles(props: IconProps) {
  return <BaseIcon {...props}><path d="m12 3-1.3 4.2L7 8.5l3.7 1.3L12 14l1.3-4.2L17 8.5l-3.7-1.3L12 3ZM18.5 14l-.7 2.3-2.3.7 2.3.7.7 2.3.7-2.3 2.3-.7-2.3-.7-.7-2.3ZM5.5 13l-.7 2.3-2.3.7 2.3.7.7 2.3.7-2.3 2.3-.7-2.3-.7-.7-2.3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></BaseIcon>;
}
export function IconBook(props: IconProps) {
  return <BaseIcon {...props}><path d="M4.5 5.7A2.7 2.7 0 0 1 7.2 3H12v16H7.2a2.7 2.7 0 0 0-2.7 2.7V5.7ZM19.5 5.7A2.7 2.7 0 0 0 16.8 3H12v16h4.8a2.7 2.7 0 0 1 2.7 2.7V5.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></BaseIcon>;
}
export function IconUsers(props: IconProps) {
  return <BaseIcon {...props}><circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 19c.3-3.1 2.1-5 5.5-5s5.2 1.9 5.5 5M16 5.5a2.7 2.7 0 0 1 0 5.2M16.5 14c2.4.3 3.7 1.9 4 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></BaseIcon>;
}
export function IconAward(props: IconProps) {
  return <BaseIcon {...props}><circle cx="12" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.5" /><path d="m8.7 12.4-1 7.1 4.3-2.3 4.3 2.3-1-7.1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></BaseIcon>;
}
export function IconAtom(props: IconProps) {
  return <BaseIcon {...props}><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(30 12 12)" stroke="currentColor" strokeWidth="1.4" /><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(-30 12 12)" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="1.7" fill="currentColor" /></BaseIcon>;
}
export function IconFlask(props: IconProps) {
  return <BaseIcon {...props}><path d="M9 3h6M10 3v5.1L4.8 17a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 8.1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M7.2 15h9.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></BaseIcon>;
}
export function IconLeaf(props: IconProps) {
  return <BaseIcon {...props}><path d="M19.5 4.5C12 4.8 7 8 7 13.1c0 3.3 2.3 5.4 5.4 5.4 5.2 0 7-5.3 7.1-14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M4 20c3-5.3 6.7-8.6 12.4-11.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></BaseIcon>;
}
export function IconCalculator(props: IconProps) {
  return <BaseIcon {...props}><rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 7h8M8.5 11h.1M12 11h.1M15.5 11h.1M8.5 15h.1M12 15h.1M15.5 15h.1M8.5 18h.1M12 18h.1M15.5 18h.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></BaseIcon>;
}
export function IconPlay(props: IconProps) {
  return <BaseIcon {...props}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="m10 8.5 5.5 3.5-5.5 3.5v-7Z" fill="currentColor" /></BaseIcon>;
}
export function IconQuote(props: IconProps) {
  return <BaseIcon {...props}><path d="M8.4 10.2H4.8A1.8 1.8 0 0 0 3 12v4.2A1.8 1.8 0 0 0 4.8 18h3.6a1.8 1.8 0 0 0 1.8-1.8v-6.5A5.7 5.7 0 0 0 4.5 4M17.6 10.2h-3.6a1.8 1.8 0 0 0-1.8 1.8v4.2a1.8 1.8 0 0 0 1.8 1.8h3.6a1.8 1.8 0 0 0 1.8-1.8v-6.5A5.7 5.7 0 0 0 13.7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></BaseIcon>;
}
