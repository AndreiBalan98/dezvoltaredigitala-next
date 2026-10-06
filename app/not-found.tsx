import Link from "next/link";

export default function NotFound() {
  return (
    <div className="reading">
      <h1>Pagina nu a fost găsită</h1>
      <p>Adresa nu există sau a fost mutată.</p>
      <p>
        <Link href="/">Mergi la pagina principală</Link> sau vezi{" "}
        <Link href="/finantari-nerambursabile/">finanțările nerambursabile</Link>.
      </p>
    </div>
  );
}
