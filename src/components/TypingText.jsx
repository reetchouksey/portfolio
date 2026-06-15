import { useEffect, useState } from "react";

export default function TypingText({
  words = [],
  typingSpeed = 80,
  deletingSpeed = 40,
  pause = 1300,
}) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const word = words[index % words.length];

    if (!deleting && sub === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && sub === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => {
        setSub((s) =>
          deleting ? word.substring(0, s.length - 1) : word.substring(0, s.length + 1)
        );
      },
      deleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(t);
  }, [sub, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className="inline-flex items-center">
      <span>{sub || "\u00A0"}</span>
      <span className="ml-1 inline-block h-[0.85em] w-[2px] bg-ink-900 animate-pulse translate-y-[2px]" />
    </span>
  );
}
