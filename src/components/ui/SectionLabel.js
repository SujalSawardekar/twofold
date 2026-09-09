export default function SectionLabel({ children, className = '' }) {
  return (
    <span className={`section-label ${className}`.trim()}>
      {children}
    </span>
  );
}
