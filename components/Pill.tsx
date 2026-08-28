import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';

type Variant = 'solid' | 'ghost' | 'plain';

function Chip({ mark }: { mark?: ReactNode }) {
  return (
    <span className="pill-chip" aria-hidden>
      {mark ?? <ArrowUpRight weight="bold" />}
    </span>
  );
}

export function PillLink({
  href,
  children,
  variant = 'solid',
  mark,
  className: extra,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  mark?: ReactNode;
  className?: string;
}) {
  const external = href.startsWith('http');
  const cls = [
    'pill',
    variant === 'ghost' && 'pill-ghost',
    variant === 'plain' && 'pill-plain',
    extra,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="pill-text">{children}</span>
      {variant !== 'plain' && <Chip mark={mark} />}
    </>
  );

  return external ? (
    <a className={cls} href={href} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <Link className={cls} href={href}>
      {content}
    </Link>
  );
}

export function PillButton({
  children,
  variant = 'solid',
  mark,
  className: extra,
  ...rest
}: ComponentProps<'button'> & { variant?: Variant; mark?: ReactNode }) {
  const cls = [
    'pill',
    variant === 'ghost' && 'pill-ghost',
    variant === 'plain' && 'pill-plain',
    extra,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={cls} {...rest}>
      <span className="pill-text">{children}</span>
      {variant !== 'plain' && <Chip mark={mark} />}
    </button>
  );
}
