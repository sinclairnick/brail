import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome to Brail</h1>
      <p>
        View your first template at <Link href="/welcome">/welcome</Link>
      </p>
    </div>
  );
}
