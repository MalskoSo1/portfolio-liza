"use client";

import { fetchPokemons } from "@/lib/api/pokeApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function PokemonList() {
  const { data: pokemons } = useQuery({
    queryKey: ["getPokemons"],
    queryFn: () => fetchPokemons(),
  });

  const urlImage =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  return (
    <>
      <ul>
        {pokemons?.results.map((pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();
          return (
            <li key={id}>
              {pokemon.name}
              <Image
                src={`${urlImage}${id}.png`}
                alt={pokemon.name}
                width={200}
                height={200}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
