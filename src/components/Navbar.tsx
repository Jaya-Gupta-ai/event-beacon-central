
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-bold text-2xl text-primary flex items-center">
          <span className="mr-2">📡</span>
          Event Beacon
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost">About</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
