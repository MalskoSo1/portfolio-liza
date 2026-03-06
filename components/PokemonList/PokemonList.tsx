"use client";

import { fetchPokemons } from "@/lib/api/pokeApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PokemonList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = 15;

  const params = {
    limit,
    offset: (page - 1) * limit,
  };

  const { data: pokemons } = useQuery({
    queryKey: ["getPokemons", page, limit],
    queryFn: () => fetchPokemons(params),
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
      <ul>
        <li>
          {page === 1 ? (
            <span>Prev</span>
          ) : (
            <Link href={`/pokemons?page=${page - 1}`}>Prev</Link>
          )}
        </li>
        <li>
          <button>Load More</button>
        </li>
        <li>
          <Link href={`/pokemons?page=${page + 1}`}>Next</Link>
        </li>
      </ul>
    </>
  );
}
