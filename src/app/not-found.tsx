import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-emerald-50 px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <h3 className="text-2xl font-semibold text-slate-700 mb-2">
          Stránka nenalezena
        </h3>
        <p className="text-slate-600 mb-8">
          Omlouvám se, stránka kterou hledáte, neexistuje.
        </p>
        <Link href="/" className="btn-primary">
          Zpět na domovskou stránku
        </Link>
      </div>
    </div>
  );
}
