import NewHomeContent from '@/components/home/NewHomeContent';
import './home.css';

export const metadata = {
  title: 'Indian Motor Club | India’s Premier Luxury Car Rental Club',
  description: 'A signature collection of luxury and vintage automobiles curated precisely for your journey.',
};

export default function HomePage() {
  return (
    <main className="bg-black text-white selection:bg-[#d4af37] selection:text-black relative">
      <NewHomeContent />
    </main>
  );
}
