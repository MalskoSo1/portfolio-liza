import { PokemonList, PokemonTypeResponse } from "@/type/pokemon";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POKEMON_API_URL,
});

// export async function fetchPokemons() {
//   try {
//     const res = await api.get<Pokemon>("/pokemon/35/");
//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// }

interface FetchPokemonsProps {
  offset: number;
  limit: number;
}

interface TypesResponse {
  results: PokemonType[];
}

interface PokemonType {
  name: string;
  url: string;
}

export async function fetchPokemons({ limit, offset }: FetchPokemonsProps) {
  const params = {
    offset,
    limit,
  };
  try {
    const res = await api.get<PokemonList>("/pokemon", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchTypesOfPokemons() {
  try {
    const res = await api.get<TypesResponse>("/type");
    return res.data.results;
  } catch (error) {
    throw error;
  }
}

// https://pokeapi.co/api/v2/type/{id or name}/

export async function fetchPokemonsByType(currentType: string) {
  try {
    const res = await api.get<PokemonTypeResponse>(`/type/${currentType}`);
    return res.data.pokemon.map((p) => p.pokemon);
  } catch (error) {
    throw error;
  }
}
