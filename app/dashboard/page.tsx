import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <main className="mx-auto max-w-5xl py-12">
        <h1 className="text-3xl font-medium text-neutral-900 tracking-[-0.03em] mb-8 px-6">
          Half-Life Dashboard
        </h1>
        <div className="rounded-[2.5rem] overflow-hidden border border-neutral-800 shadow-[0_30px_70px_rgba(0,0,0,0.5)] bg-white mx-6">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}
