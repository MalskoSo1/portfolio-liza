"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./PokemonFilter.module.css";
import { fetchTypesOfPokemons } from "@/lib/api/pokeApi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePokemonsStore } from "@/store/usePokemonsStore";

interface PokemonFilterProps {
  initialTypes: string | undefined;
}

export default function PokemonFilter({ initialTypes }: PokemonFilterProps) {
  const [activeTypes, setActiveTypes] = useState<string[]>(
    initialTypes === undefined ? [] : initialTypes.split(",")
  );
  const setTypes = usePokemonsStore((s) => s.setTypes);
  const clearTypes = usePokemonsStore((s) => s.clearTypes);
  const router = useRouter();

  const toggleType = (typeName: string) => {
    const newTypes = activeTypes.includes(typeName)
      ? activeTypes.filter((t) => t !== typeName)
      : [...activeTypes, typeName];

    setActiveTypes(newTypes);
    setTypes(newTypes);

    if (newTypes.length === 0) {
      router.push("/pokemons/filter/all?page=1");
    } else {
      router.push(`/pokemons/filter/${newTypes.join(",")}?page=1`);
    }
  };

  const { data: types } = useQuery({
    queryKey: ["getTypesOfPokemons"],
    queryFn: () => fetchTypesOfPokemons(),
  });
  return (
    <div className={css.filter}>
      <p>filter</p>
      <ul className={css.list}>
        <li>
          <button
            onClick={() => {
              setActiveTypes([]);
              clearTypes();
              router.push("/pokemons/filter/all?page=1");
            }}
          >
            reset
          </button>
        </li>
        {types?.map((type) => {
          return (
            <li key={type.name}>
              <button
                onClick={() => toggleType(type.name)}
                style={{
                  background: activeTypes.includes(type.name)
                    ? "green"
                    : "white",
                  color: activeTypes.includes(type.name) ? "white" : "black",
                }}
              >
                {type.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
