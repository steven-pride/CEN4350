import Link from "next/dist/client/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Page Title & Intro */}
      <div>
        <h1 className="text-2xl font-bold text-ludavault-gold">
          About LudaVault
        </h1>
        <p className="mt-1 text-base">
          A digital board game collection manager built for enthusiasts to catalog, track, and rate their games.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4">
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

        {/* Login or Signup Section */}
        <div className="bg-white h-max my-auto p-6 rounded-lg border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-ludavault-blue">
            Get Started
          </h2>
          <p className="leading-relaxed text-sm sm:text-base">
            Create an account or log in to start managing your board game collection today.
          </p>
          <div className="flex flex-col gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 font-medium py-2 px-6 rounded-md shadow-xs transition text-center"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto bg-ludavault-gold hover:bg-ludavault-blue text-white font-medium py-2 px-6 rounded-md transition text-center"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
