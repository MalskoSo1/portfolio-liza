export interface PokemonList {
  count: number;
  next: string;
  // "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Abilities[];
  sprites: {
    front_default: string;
  };
}

interface Abilities {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
  };
}
