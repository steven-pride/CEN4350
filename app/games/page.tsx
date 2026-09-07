"use client"

const games = [
  { name: 'Game 1', type: 'Base Game', rating: 1.2 },
  { name: 'Game 2', type: 'Expansion', rating: 2.5 },
  { name: 'Game 3', type: 'Expansion', rating: 3.0 },
  { name: 'Game 4', type: 'Base Game', rating: 4.1 },
  { name: 'Game 5', type: 'Expansion', rating: 4.8 },
  { name: 'Game 6', type: 'Base Game', rating: 5.0 },
];

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <p className="text-sm font-medium">
        Games Collection Page
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4">
      {games.map((game) => {
              return (
                <div key={game.name} className="w-50 h-40 m-3 p-1 border rounded hover:bg-blue-100">
                  <p className="font-bold text-lg text-center">{game.name}</p>
                  <p className="text-left text-sm">{game.type}</p>
                  <p className="text-left text-sm">Rating: {game.rating}</p>
                </div>
              );
            })}
      </div>
    </div>
    
  );
}
