"use client";

import { fetchPokemons, fetchPokemonsByType } from "@/lib/api/pokeApi";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import PokemonItem from "../PokemonItem/PokemonItem";
import { startTransition, useEffect, useState } from "react";
import { PokemonSmallInfo } from "@/type/pokemon";
import { useRouter } from "next/navigation";
import css from "./PokemonList.module.css";

export default function PokemonList() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const limit = 15;
  const [limitForLoadMore, setLimitForLoadMore] = useState(limit);
  const [allPokemons, setAllPokemons] = useState<PokemonSmallInfo[]>([]);
  const router = useRouter();
  const [pokemonsByTypes, setPokemonsByTypes] = useState<PokemonSmallInfo[]>(
    []
  );
  const [start, setStart] = useState((page - 1) * limit);
  const end = start + limitForLoadMore;
  const paginatedPokemons = pokemonsByTypes?.slice(start, end);
  const [lastPokemon, setLastPokemon] = useState<string | null>(null);
  const isLastOnPage = paginatedPokemons?.some((p) => p.name === lastPokemon);

  const params = {
    limit,
    offset: (page - 1) * limit,
  };

  useEffect(() => {
    startTransition(() => {
      const newPage = Number(searchParams.get("page") ?? 1);
      if (newPage !== page) setPage(newPage);
      setStart((newPage - 1) * limit);
    });
  }, [searchParams, limit]);

  // !REQUESTS
  const { data: pokemons, isFetching } = useQuery({
    queryKey: ["getPokemons", page, limit],
    queryFn: () => fetchPokemons(params),
  });

  const { data: pokemonsByType } = useQuery({
    queryKey: ["pokemonsByType"],
    queryFn: () => fetchPokemonsByType("steel"),
  });
  // !REQUESTS END

  useEffect(() => {
    startTransition(() => {
      if (pokemonsByType && pokemonsByType.length > 0) {
        setPokemonsByTypes(pokemonsByType);
        const last = pokemonsByType[pokemonsByType.length - 1];
        if (last) setLastPokemon(last.name);
      } else {
        setPokemonsByTypes([]);
        setLastPokemon(null);
      }
    });
  }, [pokemonsByType]);

  useEffect(() => {
    startTransition(() => {
      if (pokemons?.results) {
        setAllPokemons((prev) => {
          if (page === 1) return [...pokemons.results];
          return [...prev, ...pokemons.results];
        });
      }
    });
  }, [pokemons, page]);

  // ^ BUTTONS
  const handleClickLoadMore = () => {
    if (pokemonsByTypes.length > 0 && !isLastOnPage) {
      setLimitForLoadMore((prev) => prev + limit);
    }
    setPage((prev) => prev + 1);
  };

  const handleClickNext = () => {
    setAllPokemons([]);
    setLimitForLoadMore(limit);
    setStart((prev) => prev + limit);
    router.push(`/pokemons/filter/all?page=${page + 1}`);
  };

  const handleClickPrev = () => {
    if (page <= 1) return;
    setAllPokemons([]);
    setLimitForLoadMore(limit);
    setStart((prev) => prev - limit);
    router.push(`/pokemons/filter/all?page=${page - 1}`);
  };
  // ^ BUTTONS END

  return (
    <div>
      <ul className={css.list}>
        {paginatedPokemons?.map((pokemon) => {
          if (!pokemon?.url) return null;
          const id = pokemon.url.split("/").filter(Boolean).pop();
          if (!id) return null;
          return <PokemonItem key={id} pokemon={pokemon} id={id} />;
        })}
      </ul>
      {pokemons?.results?.length === 0 ? (
        <span>EMPTY PAGE</span>
      ) : (
        <>
          {pokemonsByType?.length === 0 && (
            <ul className={css.list}>
              {allPokemons.map((pokemon) => {
                const id = pokemon.url.split("/").filter(Boolean).pop();
                if (!id) return null;
                return <PokemonItem key={id} pokemon={pokemon} id={id} />;
              })}
            </ul>
          )}

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
              {!pokemons?.next || isLastOnPage ? (
                <span>Load More</span>
              ) : (
                <button onClick={handleClickLoadMore}>Load More</button>
              )}
            </li>
            <li>
              {!pokemons?.next || isLastOnPage ? (
                <span>Next</span>
              ) : (
                <button onClick={handleClickNext}>Next</button>
              )}
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
