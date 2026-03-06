import PokemonList from "@/components/PokemonList/PokemonList";
import { fetchPokemons } from "@/lib/api/pokeApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import Image from "next/image";

export default async function Pokemons() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getPokemons"],
    queryFn: () => fetchPokemons(),
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
