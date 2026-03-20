interface PokemonDetailsProps {
  params: Promise<{ name: string }>;
}

export default async function PokemonDetails({ params }: PokemonDetailsProps) {
  const { name } = await params;
  return <>Pokemon {name}</>;
}
