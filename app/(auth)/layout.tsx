export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="relative z-10">
        <div className="container mx-auto p-4">
          <a href="/" className="inline-block mb-8">
            <h1 className="text-2xl font-bold">Tether</h1>
          </a>
        </div>
        {children}
      </div>
    </div>
  );
}
