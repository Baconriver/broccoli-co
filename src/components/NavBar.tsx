// NavBar Component
const NavBar = () => {
  return (
    <nav className="h-18 py-2 px-4 lg:px-8 lg:py-4 lg:h-24 border-b-2">
      <div className="container mx-auto flex items-center justify-between">
        <span className="mr-4 cursor-pointer py-1.5 font-bold text-base md:text-xl text-stone-500">
          BROCCOLI & CO.
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
