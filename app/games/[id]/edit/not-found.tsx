// Scaffolding code from https://nextjs.org/learn/dashboard-app/error-handling

import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
 
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-2 p-6 text-center max-w-4xl mx-auto">
        <FaceFrownIcon className="w-10 text-gray-400" />
        <h2 className="text-xl font-semibold">Uh oh! We could not find that game in your collection</h2>
        <Link
            href="/games"
            className="bg-ludavault-gold hover:bg-ludavault-blue text-white font-medium py-2 px-4 rounded-md shadow-xs text-center"
        >
            Back to My Collection
        </Link>
    </div>
  );
}