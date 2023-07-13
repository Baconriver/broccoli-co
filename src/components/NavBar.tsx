import { Navbar, Typography } from "@material-tailwind/react";

const NavBar = () => {
  return (
    <Navbar className="mx-auto py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-stone-500">
        <Typography className="mr-4 cursor-pointer py-1.5 font-bold text-base md:text-xl">
          BROCCOLI & CO.
        </Typography>
      </div>
    </Navbar>
  );
};

export default NavBar;
