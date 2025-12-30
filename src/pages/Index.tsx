import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Cart, { CartItem } from '@/components/Cart';
import CheckoutForm from '@/components/CheckoutForm';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Рабочая тетрадь по математике',
    description: 'Для учащихся 5-6 классов. Содержит задачи разного уровня сложности.',
    price: 350,
    image: 'https://cdn.poehali.dev/projects/961d7480-c848-4e4e-a051-e66267102eef/files/86f65c7c-03ba-46e4-9e7a-607ee7eec6f3.jpg',
  },
  {
    id: 2,
    title: 'Рабочая тетрадь по русскому языку',
    description: 'Упражнения для развития грамотности и понимания языка.',
    price: 320,
    image: 'https://cdn.poehali.dev/projects/961d7480-c848-4e4e-a051-e66267102eef/files/7210794b-0fd7-4322-8f3d-36dbcde1826f.jpg',
  },
  {
    id: 3,
    title: 'Рабочая тетрадь по английскому',
    description: 'Практические задания для изучения английского языка.',
    price: 380,
    image: 'https://cdn.poehali.dev/projects/961d7480-c848-4e4e-a051-e66267102eef/files/86f65c7c-03ba-46e4-9e7a-607ee7eec6f3.jpg',
  },
  {
    id: 4,
    title: 'Рабочая тетрадь по физике',
    description: 'Задачи и эксперименты для практического понимания физики.',
    price: 400,
    image: 'https://cdn.poehali.dev/projects/961d7480-c848-4e4e-a051-e66267102eef/files/7210794b-0fd7-4322-8f3d-36dbcde1826f.jpg',
  },
  {
    id: 5,
    title: 'Рабочая тетрадь по химии',
    description: 'Практические работы и задачи по основам химии.',
    price: 390,
    image: 'https://cdn.poehali.dev/projects/961d7480-c848-4e4e-a051-e66267102eef/files/86f65c7c-03ba-46e4-9e7a-607ee7eec6f3.jpg',
  },
  {
    id: 6,
    title: 'Рабочая тетрадь по биологии',
    description: 'Интересные задания для изучения живой природы.',
    price: 360,
    image: 'https://cdn.poehali.dev/projects/961d7480-c848-4e4e-a051-e66267102eef/files/7210794b-0fd7-4322-8f3d-36dbcde1826f.jpg',
  },
];

export default function Index() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (existingItem) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={totalItems} onCartClick={() => setIsCartOpen(true)} />

      <section id="home" className="py-20 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Рабочие тетради для успешного обучения
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Качественные учебные материалы для школьников. Развивайте знания с нашими
            рабочими тетрадями по всем предметам.
          </p>
          <button
            onClick={() =>
              document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Перейти к каталогу
            <Icon name="ArrowRight" className="h-5 w-5" />
          </button>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Каталог товаров</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Контакты</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Phone" className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Телефон</h3>
                <p className="text-muted-foreground">+7 (999) 123-45-67</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Mail" className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">info@workbooks.ru</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="MapPin" className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Адрес</h3>
                <p className="text-muted-foreground">Москва, ул. Примерная, д. 123</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Рабочие Тетради. Все права защищены.</p>
        </div>
      </footer>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalAmount={totalAmount}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}
