"use client";

import { fetchPokemons } from "@/lib/api/pokeApi";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import PokemonItem from "../PokemonItem/PokemonItem";
import { startTransition, useEffect, useState } from "react";
import { PokemonSmallInfo } from "@/type/pokemon";
import { useRouter } from "next/navigation";

export default function PokemonList() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const limit = 15;
  const [allPokemons, setAllPokemons] = useState<PokemonSmallInfo[]>([]);
  const router = useRouter();

  const params = {
    limit,
    offset: (page - 1) * limit,
  };

  useEffect(() => {
    const newPage = Number(searchParams.get("page") ?? 1);
    if (newPage !== page) setPage(newPage);
  }, [searchParams]);

  const { data: pokemons, isFetching } = useQuery({
    queryKey: ["getPokemons", page, limit],
    queryFn: () => fetchPokemons(params),
  });

  useEffect(() => {
    if (pokemons?.results) {
      setAllPokemons((prev) => {
        if (page === 1) return [...pokemons.results];
        return [...prev, ...pokemons.results];
      });
    }
  }, [pokemons, page]);

  const handleClickLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleClickNext = () => {
    setAllPokemons([]); // очищаємо тільки при переході на нову сторінку через Next
    router.push(`/pokemons?page=${page + 1}`);
  };

  const handleClickPrev = () => {
    setAllPokemons([]); // очищаємо тільки при переході на нову сторінку через Prev
    router.push(`/pokemons?page=${page - 1}`);
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
                <button onClick={handleClickPrev}>Prev</button>
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
                <button onClick={handleClickNext}>Next</button>
              )}
            </li>
          </ul>
        </>
      )}
    </>
  );
}
