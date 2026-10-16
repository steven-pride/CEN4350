import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
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

  return(
    <div className="w-full">
      <label htmlFor="search-title" className="font-medium text-sm mb-1 block">
        Search by Title
      </label>
      <input
          id="search-title"
          type="text"
          placeholder="Title"
          onChange={ (e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('title')?.toString() || ""}
          className="w-full filter"
      />
    </div>
  );
}