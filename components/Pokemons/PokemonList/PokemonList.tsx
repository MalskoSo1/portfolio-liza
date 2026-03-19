"use client";

import { fetchPokemons } from "@/lib/api/pokeApi";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PokemonItem from "../PokemonItem/PokemonItem";
import { startTransition, useEffect, useState } from "react";
import { PokemonSmallInfo } from "@/type/pokemon";
import { useRouter } from "next/navigation";

export default function PokemonList() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));
  const limit = 15;
  const [allPokemons, setAllPokemons] = useState<PokemonSmallInfo[]>([]);
  const router = useRouter();

  const params = {
    limit,
    offset: (page - 1) * limit,
  };

  const { data: pokemons, isFetching } = useQuery({
    queryKey: ["getPokemons", page, limit],
    queryFn: () => fetchPokemons(params),
  });

  useEffect(() => {
    startTransition(() => {
      setPage(Number(searchParams.get("page") ?? 1));
      setAllPokemons([]);
    });
  }, [searchParams]);

  useEffect(() => {
    if (pokemons?.results) {
      startTransition(() => {
        setAllPokemons((prev) => [...prev, ...pokemons.results]);
      });
    }
  }, [pokemons]);

  const handleClickLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {pokemons?.results?.length === 0 ? (
        <span>EMPTY PAGE</span>
      ) : (
        <>
          <ul>
            {allPokemons.map((pokemon) => {
              const id = pokemon.url.split("/").filter(Boolean).pop();
              if (!id) return null;
              return <PokemonItem key={id} pokemon={pokemon} id={id} />;
            })}
          </ul>
          {isFetching && <div>Loading...</div>}
          <ul>
            <li>
              {page === 1 ? (
                <span>Prev</span>
              ) : (
                <button
                  onClick={() => {
                    setAllPokemons([]);
                    router.push(`/pokemons?page=${page - 1}`);
                  }}
                >
                  Prev
                </button>
              )}
            </li>
            <li>
              {!pokemons?.next ? (
                <span></span>
              ) : (
                <button onClick={handleClickLoadMore}>Load More</button>
              )}
            </li>
            <li>
              {!pokemons?.next ? (
                <span>Next</span>
              ) : (
                <button
                  onClick={() => {
                    setAllPokemons([]);
                    router.push(`/pokemons?page=${page + 1}`);
                  }}
                >
                  Next
                </button>
              )}
            </li>
          </ul>
        </>
      )}
    </>
  );
}
