import Link from 'next/link';
import styles from './Button.module.css';

export default function Button({
  variant = 'primary',
  size = 'default',
  href,
  children,
  className = '',
  fullWidth = false,
  hasArrow = false,
  onClick,
  type = 'button',
  suppressHydrationWarning = true,
  ...props
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {children}
      {hasArrow && (
        <svg className={styles.arrow} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_arrow)">
            <path d="M0.5 7H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 10.5L13.5 7L10 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_arrow">
              <rect width="14" height="14" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      suppressHydrationWarning={suppressHydrationWarning}
      {...props}
    >
      {content}
    </button>
  );
}
