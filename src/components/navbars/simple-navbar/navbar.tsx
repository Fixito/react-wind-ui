import { useRef, useState } from 'react';

import { NavbarActions } from './actions';
import { NavbarBrand } from './brand';
import { NavbarLinks } from './links';
import { NavbarMobileMenu } from './mobile-menu';
import { NavbarToggle } from './toggle';

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggleMenu = () => {
    setIsOpen((open) => !open);
  };

  return (
    <nav className="bg-navbar after:bg-border relative after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px">
      <div className="relative container flex h-16 items-center justify-between">
        <NavbarToggle isOpen={isOpen} onClick={handleToggleMenu} ref={buttonRef} />

        <div className="flex flex-1 items-center justify-center gap-6 sm:items-stretch sm:justify-start">
          <NavbarBrand />

          <div className="hidden sm:block">
            <NavbarLinks navigation={navigation} />
          </div>
        </div>

        <NavbarActions />
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
