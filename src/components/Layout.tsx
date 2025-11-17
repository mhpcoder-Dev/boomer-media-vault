import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Film, Tv, Radio, Music, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Ad Placeholder: Leaderboard */}
      <div className="ad-leaderboard bg-muted border-b border-border">
        <div className="container mx-auto px-4 py-2 text-center text-xs text-muted-foreground">
          Ad: Leaderboard (728x90)
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Film className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">BoomerPlus</h1>
                <p className="text-xs text-muted-foreground">Classic Public Domain Media</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Button variant="ghost" asChild>
                <Link to="/movies" className="gap-2">
                  <Film className="w-4 h-4" />
                  Movies
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/tv" className="gap-2">
                  <Tv className="w-4 h-4" />
                  TV Shows
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/radio" className="gap-2">
                  <Radio className="w-4 h-4" />
                  Radio
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/concerts" className="gap-2">
                  <Music className="w-4 h-4" />
                  Concerts
                </Link>
              </Button>
            </nav>

            <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-md">
              <Input
                type="search"
                placeholder="Search titles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" variant="secondary">
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Mobile Nav */}
          <nav className="flex md:hidden items-center gap-1 mt-4 overflow-x-auto pb-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/movies" className="gap-1 whitespace-nowrap">
                <Film className="w-4 h-4" />
                Movies
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/tv" className="gap-1 whitespace-nowrap">
                <Tv className="w-4 h-4" />
                TV
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/radio" className="gap-1 whitespace-nowrap">
                <Radio className="w-4 h-4" />
                Radio
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/concerts" className="gap-1 whitespace-nowrap">
                <Music className="w-4 h-4" />
                Concerts
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        {/* Ad Placeholder: Footer */}
        <div className="ad-footer bg-muted border-b border-border">
          <div className="container mx-auto px-4 py-4 text-center text-xs text-muted-foreground">
            Ad: Footer (728x90)
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-2">About BoomerPlus</h3>
              <p className="text-sm text-muted-foreground">
                Your destination for classic public domain media from the golden era of entertainment.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Categories</h3>
              <ul className="text-sm space-y-1">
                <li><Link to="/movies" className="text-muted-foreground hover:text-primary">Movies</Link></li>
                <li><Link to="/tv" className="text-muted-foreground hover:text-primary">TV Shows</Link></li>
                <li><Link to="/radio" className="text-muted-foreground hover:text-primary">Radio Shows</Link></li>
                <li><Link to="/concerts" className="text-muted-foreground hover:text-primary">Concerts</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Legal</h3>
              <p className="text-sm text-muted-foreground">
                All content is in the public domain. Data sourced from Internet Archive and verified for PD status.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} BoomerPlus. Celebrating classic media.
          </div>
        </div>
      </footer>
    </div>
  );
}
