import { create } from "zustand";

interface PokemonsState {
  types: string[] | null;
  setTypes: (types: string[] | null) => void;
  clearTypes: () => void;
}

export const usePokemonsStore = create<PokemonsState>((set) => ({
  types: null,
  setTypes: (types) =>
    set(() => ({
      types,
    })),
  clearTypes: () =>
    set({
      types: null,
    }),
}));

// const data = {
//   damage_relations: {
//     double_damage_from: [
//       { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
//     ],
//   },
//   game_indices: [
//     {
//       game_index: 21,
//       generation: {
//         name: "generation-i",
//         url: "https://pokeapi.co/api/v2/generation/1/",
//       },
//     },
//     {
//       game_index: 21,
//       generation: {
//         name: "generation-ii",
//         url: "https://pokeapi.co/api/v2/generation/2/",
//       },
//     },
//   ],
//   generation: {
//     name: "generation-i",
//     url: "https://pokeapi.co/api/v2/generation/1/",
//   },
//   id: 11,
//   move_damage_class: {
//     name: "special",
//     url: "https://pokeapi.co/api/v2/move-damage-class/3/",
//   },
//   moves: [
//     { name: "water-gun", url: "https://pokeapi.co/api/v2/move/55/" },
//     { name: "hydro-pump", url: "https://pokeapi.co/api/v2/move/56/" },
//   ],
//   past_damage_relations: [],
//   pokemon: [
//     {
//       pokemon: {
//         name: "squirtle",
//         url: "https://pokeapi.co/api/v2/pokemon/7/",
//       },
//       slot: 1,
//     },
//     {
//       pokemon: {
//         name: "wartortle",
//         url: "https://pokeapi.co/api/v2/pokemon/8/",
//       },
//       slot: 1,
//     },
//   ],
// };
