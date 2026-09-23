import GameForm from "@/app/ui/games/GameForm";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2x font-bold text-ludavault-gold md:-ml-[34px]">
            New Game
          </h1>
        </div>
      </div>
      <div className="mt-2 mb-2">
        <GameForm />
      </div>
    </div>
  );
}
