import PokemonFilter from "@/components/Pokemons/PokemonFilter/PokemonFilter";
import PokemonList from "@/components/Pokemons/PokemonList/PokemonList";
import { fetchPokemons, fetchTypesOfPokemons } from "@/lib/api/pokeApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface PokemonFilterProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: { page?: string };
}

export default async function PokemonsFilter({
  params,
  searchParams,
}: PokemonFilterProps) {
  const { slug } = await params;

  const decodedSlug = slug?.map((s) => decodeURIComponent(s));
  const activeTypes = decodedSlug ?? [];

  const actualSearchParams = await searchParams;
  const page = Number(actualSearchParams.page ?? 1);
  const queryClient = new QueryClient();
  const limit = 15;
  const offset = (page - 1) * limit;

  await queryClient.prefetchQuery({
    queryKey: ["getPokemons", page, limit],
    queryFn: () => fetchPokemons({ limit, offset }),
  });

  await queryClient.prefetchQuery({
    queryKey: ["getTypesOfPokemons"],
    queryFn: () => fetchTypesOfPokemons(),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PokemonFilter
          initialTypes={activeTypes[0] === "all" ? undefined : activeTypes[0]}
        />
        <PokemonList />
      </HydrationBoundary>
    </>
  );
}
