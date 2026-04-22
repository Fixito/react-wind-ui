import { Search } from 'lucide-react';
import { useRef, useState } from 'react';

import { navigation } from '../data.ts';
import { NavbarActions } from '../ui/actions';
import { NavbarBrand } from '../ui/brand';
import { NavbarLinks } from '../ui/links';
import { NavbarMobileMenu } from '../ui/mobile-menu.tsx';
import { NavbarToggle } from '../ui/toggle.tsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggleMenu = () => {
    setIsOpen((open) => !open);
  };

  return (
    <nav className="bg-navbar after:bg-navbar-border relative after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px">
      <div className="relative container flex h-16 items-center justify-between gap-x-6">
        <div className="flex items-center gap-6 lg:items-stretch lg:justify-start">
          <NavbarBrand />

          <div className="hidden lg:block">
            <NavbarLinks navigation={navigation} />
          </div>
        </div>

        <div className="flex flex-1 justify-end">
          <div className="me-6 grid w-full max-w-lg lg:max-w-sm">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search"
              className="placeholder:text-muted-foreground text-navbar-primary-foreground focus-visible:outline-ring outline-navbar-border bg-navbar-accent bg p col-start-1 row-start-1 block w-full rounded-md py-1.5 ps-3 pe-10 text-base outline -outline-offset-1 focus-visible:outline-2 focus-visible:-outline-offset-1 sm:text-sm"
            />
            <Search
              className="text-muted-foreground pointer-events-none col-start-1 row-start-1 me-3 aspect-square w-5 self-center justify-self-end"
              aria-hidden="true"
            />
          </div>
          <div className="flex items-center gap-x-2">
            <NavbarActions />
            <NavbarToggle isOpen={isOpen} onClick={handleToggleMenu} ref={buttonRef} />
          </div>
        </div>
      </div>

      <NavbarMobileMenu
        navigation={navigation}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        buttonRef={buttonRef as React.RefObject<HTMLButtonElement>}
      />
    </nav>
  );
}
