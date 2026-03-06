import PokemonList from "@/components/PokemonList/PokemonList";
import { fetchPokemons } from "@/lib/api/pokeApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Pokemons({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page ?? 1);
  const queryClient = new QueryClient();
  const limit = 15;
  const offset = (page - 1) * limit;

  await queryClient.prefetchQuery({
    queryKey: ["getPokemons", page, limit],
    queryFn: () => fetchPokemons({ limit, offset }),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <p>Pokemons page</p>
        <PokemonList />
      </HydrationBoundary>
    </>
  );
}
