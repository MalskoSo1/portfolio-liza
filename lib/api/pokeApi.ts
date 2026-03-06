import { PokemonList } from "@/type/pokemon";
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
