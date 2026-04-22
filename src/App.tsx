import Footer from './components/footer.tsx';
import Navbar from './components/navbars/simple-navbar';

export default function App() {
  return (
    <div className="page">
      <Navbar />

      <main className="container my-12">
        <h1 className="text-center text-3xl font-bold">React Wind UI</h1>
      </main>

      <Footer />
    </div>
  );
}
