import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export default function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="BookOpen" className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">Рабочие Тетради</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('home')}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Главная
          </button>
          <button
            onClick={() => scrollToSection('catalog')}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Каталог
          </button>
          <button
            onClick={() => scrollToSection('contacts')}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Контакты
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
            <Icon name="ShoppingCart" className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cartItemsCount}
              </Badge>
            )}
          </Button>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Icon name="Menu" className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-left text-lg font-medium hover:text-primary transition-colors"
                >
                  Главная
                </button>
                <button
                  onClick={() => scrollToSection('catalog')}
                  className="text-left text-lg font-medium hover:text-primary transition-colors"
                >
                  Каталог
                </button>
                <button
                  onClick={() => scrollToSection('contacts')}
                  className="text-left text-lg font-medium hover:text-primary transition-colors"
                >
                  Контакты
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
