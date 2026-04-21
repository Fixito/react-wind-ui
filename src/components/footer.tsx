const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-background py-12">
      <div className="container">
        <p className="text-secondary-foreground text-center text-sm">
          © {currentYear} React Wind UI. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
