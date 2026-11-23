import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const filterKeys = ["title", "gameType", "playerCount", "maxPlayTime", "maxWeight", "minRating"];

export default function Search({ onClearFilters }: { onClearFilters?: () => void } = {}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams.toString());

        if(term) {
            params.set('title', term);
        } else {
            params.delete('title');
        }
        const queryString = params.toString();
        replace(queryString ? `${pathname}?${queryString}` : pathname);
    }, 300);

    const handleClearFilters = (event: React.MouseEvent<HTMLButtonElement>) => {
        handleSearch.cancel();
        const container = event.currentTarget.parentElement;
        const titleInput = (event.currentTarget.form?.elements.namedItem("search-title") ||
            container?.querySelector("#search-title")) as HTMLInputElement | null;
        if (titleInput) titleInput.value = "";

        const params = new URLSearchParams(searchParams.toString());
        filterKeys.forEach((key) => params.delete(key));
        const queryString = params.toString();
        replace(queryString ? `${pathname}?${queryString}` : pathname);
        onClearFilters?.();
    };

    return(
        <div className="w-full">
            <label htmlFor="search-title" className="font-medium text-sm mb-1 block">
                Search by Title
            </label>
            <div className="flex flex-col md:flex-row gap-2">
                <input
                    id="search-title"
                    type="text"
                    placeholder="Title"
                    onChange={ (e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get('title')?.toString() || ""}
                    className="w-full md:w-auto md:flex-1 filter"
                />
                <button
                    type="button"
                    onClick={handleClearFilters}
                    className="self-end md:self-auto shrink-0 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-300"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
}