import { Menu, User, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useTheme } from '../app/providers/ThemeProvider';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-sm border-[#d4af37]/20 bg-gradient-to-r dark:from-black dark:via-zinc-900 dark:to-black cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f0d976] flex items-center justify-center">
              <span className="dark:text-black cream:text-white">✂</span>
            </div>
            <span className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] bg-clip-text text-transparent">
              LuxeSalon
            </span>
          </Link>
        </div>

        {/*<nav className="hidden md:flex items-center gap-6">
          <Link to="/salons" className="dark:text-white/80 cream:text-foreground/80 hover:text-[#d4af37] transition-colors">
            Find Salons
          </Link>
          <Link to="/services" className="dark:text-white/80 cream:text-foreground/80 hover:text-[#d4af37] transition-colors">
            Services
          </Link>
          <a href="#" className="dark:text-white/80 cream:text-foreground/80 hover:text-[#d4af37] transition-colors">
            About
          </a>
        </nav>*/}

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="dark:text-white cream:text-foreground hover:text-[#d4af37] dark:hover:bg-white/5 cream:hover:bg-black/5"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Link to="/auth">
            <Button variant="ghost" size="icon" className="dark:text-white cream:text-foreground hover:text-[#d4af37] dark:hover:bg-white/5 cream:hover:bg-black/5">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/salons">
            <Button className="hidden md:flex bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]">
              Book Now
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden dark:text-white cream:text-foreground">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
