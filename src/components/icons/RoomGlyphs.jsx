/**
 * Hand-inked line-art glyphs for each room — a tiny vintage logo per page.
 * Each icon uses currentColor so it tints with the surrounding text/badge.
 *
 *   about         → open book with ruled pages
 *   skills        → vintage typewriter
 *   projects      → paper tag with hole punch & string
 *   achievements  → medal with hanging ribbon
 *   contact       → sealed envelope (wax stamp)
 */

const baseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function BookGlyph({ size = 16, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      {...baseProps}
      {...props}
    >
      <path d="M4 5.5c0-.4.3-.7.7-.7H11c.6 0 1 .4 1 1v13" />
      <path d="M20 5.5c0-.4-.3-.7-.7-.7H13c-.6 0-1 .4-1 1v13" />
      <path d="M4 19h7.5M12.5 19H20" />
      <path d="M4 5.5v13.5M20 5.5v13.5" />
      <path d="M5.5 8.5h4.5M5.5 11h4.5M5.5 13.5h3.5" />
      <path d="M14 8.5h4.5M14 11h4.5M14 13.5h3.5" />
    </svg>
  );
}

export function TypewriterGlyph({ size = 16, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      {...baseProps}
      {...props}
    >
      {/* Paper sticking out top */}
      <path d="M9 4h6v3H9z" />
      <path d="M10 5.4h4" />
      {/* Carriage rail */}
      <path d="M5 9h14" />
      {/* Body */}
      <path d="M4 9.5l1-1h14l1 1v8.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      {/* Spool dots */}
      <circle cx="7" cy="11.5" r="0.7" />
      <circle cx="17" cy="11.5" r="0.7" />
      {/* Two key rows */}
      <path d="M6.5 14h11" />
      <path d="M7.5 16h9" />
      {/* Space bar */}
      <path d="M9 17.8h6" />
    </svg>
  );
}

export function TagGlyph({ size = 16, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      {...baseProps}
      {...props}
    >
      {/* String trailing out */}
      <path d="M3 3.5c1.5 1.4 2.6 2.4 3.7 3.5" strokeDasharray="1.5 1.5" />
      {/* Tag shape (notched corner) */}
      <path d="M7 8.2L10.2 5H19a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" />
      {/* Hole punch */}
      <circle cx="9.2" cy="9.2" r="0.9" />
      {/* Lines of text on tag */}
      <path d="M11.5 12.5h6.5" />
      <path d="M11.5 15h5.5" />
      <path d="M11.5 17.5h4" />
    </svg>
  );
}

export function MedalGlyph({ size = 16, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      {...baseProps}
      {...props}
    >
      {/* Ribbons */}
      <path d="M8 3l3 7" />
      <path d="M16 3l-3 7" />
      <path d="M8 3h8" />
      {/* Medal disc */}
      <circle cx="12" cy="15" r="5" />
      {/* Inner star */}
      <path d="M12 12.4l.9 1.8 2 .3-1.5 1.4.3 2-1.7-.9-1.7.9.3-2-1.5-1.4 2-.3z" />
    </svg>
  );
}

export function EnvelopeGlyph({ size = 16, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      {...baseProps}
      {...props}
    >
      {/* Outer envelope */}
      <rect x="3" y="6" width="18" height="13" rx="1.2" />
      {/* Flap fold */}
      <path d="M3 7l9 6.5L21 7" />
      {/* Wax seal */}
      <circle cx="12" cy="14.5" r="1.6" />
      <path d="M11.4 13.9l1.2 1.2M12.6 13.9l-1.2 1.2" />
    </svg>
  );
}

const GLYPHS = {
  about: BookGlyph,
  skills: TypewriterGlyph,
  projects: TagGlyph,
  achievements: MedalGlyph,
  contact: EnvelopeGlyph,
};

export default function RoomGlyph({ roomId, size = 16, ...props }) {
  const Component = GLYPHS[roomId];
  if (!Component) return null;
  return <Component size={size} {...props} />;
}
