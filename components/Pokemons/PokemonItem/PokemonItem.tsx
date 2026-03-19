"use client";

import { PokemonSmallInfo } from "@/type/pokemon";
import capitalize from "@/utils/capitalize";
import Image from "next/image";

interface PokemonItemProps {
  pokemon: PokemonSmallInfo;
  id: string;
}

export default function PokemonItem({ pokemon, id }: PokemonItemProps) {
  const { name } = pokemon;

  const urlImage =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  return (
    <li>
      {capitalize(name)}
      <Image
        src={`${urlImage}${id}.png`}
        alt={name}
        width={200}
        height={200}
        loading="eager"
      />
    </li>
  );
}
