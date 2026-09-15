import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if(term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300);

  return(
    <input
        id="search-title"
        type="text"
        placeholder="Title"
        onChange={ (e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
        className="w-full filter"
    />
  );
}