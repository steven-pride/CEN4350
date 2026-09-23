import GameForm from "@/app/ui/games/GameForm";
import { getGameById } from "@/app/types/game";
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = getGameById(id);

  if(!game)
  {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2x font-bold text-ludavault-gold md:-ml-[34px]">
            Edit Game
          </h1>
        </div>
      </div>
      <div className="mt-2 mb-2">
        <GameForm initialData={game} isEdit={true} />
      </div>
    </div>
  );
}
