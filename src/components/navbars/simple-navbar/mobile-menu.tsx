import { useEffect, useRef } from 'react';

import { classNames } from '@/lib/utils.ts';

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

interface NavbarMobileMenuProps {
  navigation: NavigationItem[];
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export function NavbarMobileMenu({
  navigation,
  isOpen,
  onClose,
  buttonRef,
}: NavbarMobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])',
    );

    if (focusable.length) focusable[0].focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        buttonRef.current?.focus();
      }

      if (e.key === 'Tab' && focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    menu.addEventListener('keydown', handleKeyDown);

    return () => menu.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, buttonRef]);

  if (!isOpen) return null;

  return (
    <div id="mobile-menu" ref={menuRef} className="block sm:hidden">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {navigation.map((item) => (
          <NavbarMobileMenuItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

function NavbarMobileMenuItem({ item }: { item: NavigationItem }) {
  return (
    <a
      key={item.name}
      href={item.href}
      aria-current={item.current ? 'page' : undefined}
      className={classNames(
        item.current
          ? 'bg-navbar-primary text-navbar-primary-foreground'
          : 'text-navbar-foreground hover:bg-navbar-accent hover:text-navbar-accent-foreground',
        'block rounded-md px-3 py-2 text-base font-medium',
      )}
    >
      {item.name}
    </a>
  );
}
