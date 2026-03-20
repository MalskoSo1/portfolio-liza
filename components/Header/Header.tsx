"use client";

import { useThemeContext } from "@/hooks/useThemeContext";
import Link from "next/link";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

export default function Header() {
  const { theme } = useThemeContext();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/pokemons/filter/all?page=1">Pokemons</Link>
          </li>
          <p>Theme app: {theme}</p>
          <ThemeSwitcher />
        </ul>
      </nav>
    </header>
  );
}
