// components/Hero.tsx
export function Hero() {
  return (
    <section className="text-center py-24">
      <p className="text-teal-400 text-xs tracking-widest mb-4">
        VOICE AI RELIABILITY PLATFORM
      </p>

      <h1 className="text-5xl font-bold leading-tight">
        Your voice agents work in the demo.
        <br />
        <span className="text-purple-400 italic">
          They break in production.
        </span>
      </h1>

      <p className="text-gray-300 max-w-xl mx-auto mt-6">
        Monitor failures, call drops, and language mismatches across every
        real customer interaction.
      </p>
    </section>
  );
}
