import { notFound } from 'next/navigation'

// Forces any unmatched path to resolve inside the [locale] segment, so
// app/[locale]/not-found.js (translated, locale-aware) renders instead of
// Next's generic untranslated 404 fallback.
export default function CatchAll() {
  notFound()
}
