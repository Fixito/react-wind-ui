import { useEffect, useRef } from 'react';

import { classNames } from '@/lib/utils.ts';

import type { NavigationItem } from '../data.ts';

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
    <div id="mobile-menu" ref={menuRef} className="mobile-menu-animate block sm:hidden">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {navigation.map((item, i) => (
          <NavbarMobileMenuItem key={item.name} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

function NavbarMobileMenuItem({ item, index }: { item: NavigationItem; index: number }) {
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
        'mobile-menu-item-animate',
      )}
      style={{
        transitionDelay: `${index * 40}ms`,
      }}
    >
      {item.name}
    </a>
  );
}
