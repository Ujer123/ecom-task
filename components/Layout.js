// components/Layout.js
import Link from 'next/link';
import { useAuth} from '../contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors">
      <nav className="p-4 bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">E-Shop</Link>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/cart" className="flex items-center gap-2">
              🛒 Cart ({cart.length})
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/profile">Profile</Link>
                <button onClick={logout}>Logout</button>
              </div>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}