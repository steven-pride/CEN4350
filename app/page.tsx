export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Page Title & Intro */}
      <div>
        <h1 className="text-2xl font-bold text-ludavault-gold">
          About LudaVault
        </h1>
        <p className="mt-1 text-base">
          A digital board game collection managemer built for enthusiasts to catalog, track, and rate their games.
        </p>
      </div>

      {/* Purpose & Overview */}
      <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs space-y-3">
        <h2 className="text-lg font-bold text-ludavault-blue">
          Project Overview
        </h2>
        <p className="leading-relaxed text-sm sm:text-base">
          LudaVault provides board gamers with an all-in-one platform to manage their board game collections.
          Whether you want to catalog your favorite base games, keep track of multiple related expansions, rate your games, or quickly find games by player count and playtime on game night.
        </p>
      </section>

      {/* Target Personas */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-ludavault-blue">
          Target Personas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Casual Persona */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-2">
            <h3 className="font-semibold text-ludavault-gold text-base">
              Casual Gamer
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wide">
              {'< 15 Games'}
            </p>
            <p className="text-gray-600 text-sm">
              Focuses on simple cataloging, personal ratings, and quick reference for casual game nights with friends and family.
            </p>
          </div>

          {/* Hobbyist Persona */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-2">
            <h3 className="font-semibold text-ludavault-gold text-base">
              Hobbyist
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wide">
              {'< 50 Games'}
            </p>
            <p className="text-sm">
              Plays frequently and relies on fast searching and filtering by player count, weight, and play time to pick the right title.
            </p>
          </div>

          {/* Enthusiast Persona */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-2">
            <h3 className="font-semibold text-ludavault-gold text-base">
              Enthusiast
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wide">
              {'> 100 Games'}
            </p>
            <p className="text-sm">
              Manages a large collection with and extensive expansion tracking.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
