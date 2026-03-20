interface LayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const LayoutPokemonsFilter = ({ children }: LayoutProps) => {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
};

export default LayoutPokemonsFilter;
