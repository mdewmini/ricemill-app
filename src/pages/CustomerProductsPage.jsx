/*import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../styles/CustomerProductsPage.css';
import logo from '../assets/logo.png';

const productImages = {
  keeriSamba: 'src/assets/Supiri Keeri Samba.jpg',
  sambaRice: 'src/assets/Supiri Samba Rice.jpg',
  redNadu: 'src/assets/Supiri Red Nadu Rice.jpg',
  whiteNadu: 'src/assets/Supiri White Raw Rice.jpg',
  redRaw: 'src/assets/Supiri Red Raw Rice.jpg',
  sambaRaw: 'src/assets/Supiri Samba Raw Rice.jpg',
  whiteRaw: 'src/assets/Supiri White Raw Rice.jpg',
};

const CustomerProductsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]); 


  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

 
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const boiledRiceProducts = [
    { name: 'Supiri Keeri Samba', image: productImages.keeriSamba, price: 'LKR 1500', reviews: 0, inStock: true, category: 'Rice' },
    { name: 'Samba Rice', image: productImages.sambaRice, price: 'LKR 1400', reviews: 0, inStock: true, category: 'Rice' },
    { name: 'Red Nadu', image: productImages.redNadu, price: 'LKR 1300', reviews: 0, inStock: true, category: 'Rice' },
    { name: 'White Nadu', image: productImages.whiteNadu, price: 'LKR 1350', reviews: 0, inStock: true, category: 'Rice' },
  ];

  const rawRiceProducts = [
    { name: 'Red Raw', image: productImages.redRaw, price: 'LKR 1200', reviews: 0, inStock: true, category: 'Rice' },
    { name: 'Samba Raw', image: productImages.sambaRaw, price: 'LKR 1250', reviews: 0, inStock: true, category: 'Rice' },
    { name: 'White Raw', image: productImages.whiteRaw, price: 'LKR 1150', reviews: 0, inStock: true, category: 'Rice' },
  ];

  const handleCartClick = () => {
    navigate('/cart', { state: { cartItems } });
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);
      if (existingItem) {
        return prevItems.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const filteredBoiledRice = boiledRiceProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRawRice = rawRiceProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="cust-products-page">
      <header className="cust-products-header">
        <div className="cust-products-logo">
        <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="cust-products-nav-links">
          <a href="/customer-home">Home</a>
          <a href="/products">Products</a>
          <a href="/customer-orders">Orders</a>
          <a href="/profile">Profile</a>
        </nav>
        <div className="cust-products-header-icons">
          <button className="cust-products-cart-btn" onClick={handleCartClick}>
            <span className="cust-products-cart-icon">🛒</span>
            <span className="cust-products-cart-label">Cart</span>
            {cartItems.length > 0 && (
              <span className="cust-products-cart-count">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
            )}
          </button>
        </div>
      </header>

      <section className="cust-products-search">
        <div className="cust-products-search-container">
          <span className="cust-products-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cust-products-search-bar"
          />
        </div>
      </section>

      <section className="cust-products-main">
        <h1>Our Products</h1>
        <p>
          While there are many types of rice categorised according to size and flavours of the seed, following are our Products that bring the variety of rice flavours and goodness, in its total eminence.
        </p>

        <div className="cust-products-category cust-products-boiled">
          <h2>BOILED RICE</h2>
          <div className="cust-products-grid">
            {filteredBoiledRice.length > 0 ? (
              filteredBoiledRice.map((product, index) => (
                <div className="cust-products-card" key={index}>
                  <div className="cust-products-card-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <h3>{product.name}</h3>
                  <div className="cust-products-rating">
                    <span className="cust-products-stars">★★★★★</span>
                  </div>
                  <div className="cust-products-status">
                    <span className="cust-products-reviews">{product.reviews} reviews</span>
                    <span className="cust-products-stock">
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <p className="cust-products-price">{product.price}</p>
                  <button
                    className="cust-products-add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p>No boiled rice products found.</p>
            )}
          </div>
        </div>

        <div className="cust-products-category cust-products-raw">
          <h2>RAW RICE</h2>
          <div className="cust-products-grid">
            {filteredRawRice.length > 0 ? (
              filteredRawRice.map((product, index) => (
                <div className="cust-products-card" key={index}>
                  <div className="cust-products-card-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <h3>{product.name}</h3>
                  <div className="cust-products-rating">
                    <span className="cust-products-stars">★★★★★</span>
                  </div>
                  <div className="cust-products-status">
                    <span className="cust-products-reviews">{product.reviews} reviews</span>
                    <span className="cust-products-stock">
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <p className="cust-products-price">{product.price}</p>
                  <button
                    className="cust-products-add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p>No raw rice products found.</p>
            )}
          </div>
        </div>
      </section>

      <footer className="cust-products-footer">
        <div className="cust-products-footer-columns">
          <div className="cust-products-footer-column">
            <h5>About Us</h5>
            <p>Premium quality rice for your culinary needs.</p>
          </div>
          <div className="cust-products-footer-column">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/customer-home">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/customer-orders">Orders</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </div>
          <div className="cust-products-footer-column">
            <h5>Contact</h5>
            <p>Email: info@ricemill.lk</p>
            <p>Phone: +94 112 345 678</p>
          </div>
          <div className="cust-products-footer-column">
            <h5>Follow Us</h5>
            <div className="cust-products-social-icons">
              <img src="src/assets/facebook.png" alt="Facebook" />
              <img src="src/assets/twitter.png" alt="Twitter" />
              <img src="src/assets/instagram.png" alt="Instagram" />
              <img src="src/assets/linkedin.png" alt="Linkedin" />
            </div>
          </div>
        </div>
        <p className="cust-products-copyright">
          © 2025 RiceMill Management System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default CustomerProductsPage;*/

import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../styles/CustomerProductsPage.css';
import logo from '../assets/logo.png';

// Import images
import supiriKeeriSamba from '../assets/Supiri Keeri Samba.jpg';
import supiriSambaRice from '../assets/Supiri Samba Rice.jpg';
import supiriRedNadu from '../assets/Supiri Red Nadu Rice.jpg';
import supiriWhiteRaw from '../assets/Supiri White Raw Rice.jpg';
import supiriRedRaw from '../assets/Supiri Red Raw Rice.jpg';
import supiriSambaRaw from '../assets/Supiri Samba Raw Rice.jpg';
import whiteNadu from '../assets/white Nadu Rice.jpg';

const CustomerProductsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/api/products?_=' + new Date().getTime());
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log('Fetched products on client:', data); // Debug log
      const productsWithImages = data.map(product => ({
        ...product,
        image: getProductImage(product.name) || whiteNadu,
      }));
      setProducts(productsWithImages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [location]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const getProductImage = (name) => {
    const imageMap = {
      'Supiri Keeri Samba': supiriKeeriSamba,
      'Supiri Samba Rice': supiriSambaRice,
      'Supiri Red Nadu Rice': supiriRedNadu,
      'Supiri White Raw Rice': supiriWhiteRaw,
      'Supiri Red Raw Rice': supiriRedRaw,
      'Supiri Samba Raw Rice': supiriSambaRaw,
      'Keeri Samba': whiteNadu,
      'Nadu Rice': whiteNadu,
      'Red Nadu Rice': whiteNadu,
      'White Raw Rice': whiteNadu,
      'Samba Raw Rice': whiteNadu,
      'Red Raw Rice': whiteNadu,
      'Pokuru Samba': whiteNadu,
      'Rathu Kekulu': whiteNadu,
      'Suduru Samba': whiteNadu,
      'Kalu Heenati': whiteNadu,
      'Madathawalu': whiteNadu,
      'Pachchaperumal': whiteNadu,
      'Suwandel': whiteNadu,
      'Kahawanu': whiteNadu,
      'At 308': whiteNadu,
      'Bg 352': whiteNadu,
      'Kuruluthuda': whiteNadu,
      'Dahanala': whiteNadu,
    };
    return imageMap[name] || whiteNadu;
  };

  const handleCartClick = () => {
    navigate('/cart', { state: { cartItems } });
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);
      if (existingItem) {
        return prevItems.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Updated filtering logic
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (product.category === 'Boiled' || product.category === 'Raw' || !product.category) // Include products without category
  );

  const filteredBoiledRice = filteredProducts.filter((product) =>
    product.category === 'Boiled'
  );

  const filteredRawRice = filteredProducts.filter((product) =>
    product.category === 'Raw'
  );

  return (
    <div className="cust-products-page">
      <header className="cust-products-header">
        <div className="cust-products-logo">
          <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="cust-products-nav-links">
          <Link to="/customer-home">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/customer-orders">Orders</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <div className="cust-products-header-icons">
          <button className="cust-products-cart-btn" onClick={handleCartClick}>
            <span className="cust-products-cart-icon">🛒</span>
            <span className="cust-products-cart-label">Cart</span>
            {cartItems.length > 0 && (
              <span className="cust-products-cart-count">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
            )}
          </button>
        </div>
      </header>

      <section className="cust-products-search">
        <div className="cust-products-search-container">
          <span className="cust-products-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cust-products-search-bar"
          />
        </div>
      </section>

      <section className="cust-products-main">
        <h1>Our Products</h1>
        <p>
          While there are many types of rice categorised according to size and flavours of the seed, following are our Products that bring the variety of rice flavours and goodness, in its total eminence.
        </p>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <>
            <div className="cust-products-category cust-products-boiled">
              <h2>BOILED RICE</h2>
              <div className="cust-products-grid">
                {filteredBoiledRice.length > 0 ? (
                  filteredBoiledRice.map((product, index) => (
                    <div className="cust-products-card" key={product._id || index}>
                      <div className="cust-products-card-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <h3>{product.name}</h3>
                      <div className="cust-products-rating">
                        <span className="cust-products-stars">★★★★★</span>
                      </div>
                      <div className="cust-products-status">
                        <span className="cust-products-reviews">{product.reviews || 0} reviews</span>
                        <span className="cust-products-stock">
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <p className="cust-products-price">{product.price || 'N/A'}</p>
                      <button
                        className="cust-products-add-to-cart-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No boiled rice products found.</p>
                )}
              </div>
            </div>

            <div className="cust-products-category cust-products-raw">
              <h2>RAW RICE</h2>
              <div className="cust-products-grid">
                {filteredRawRice.length > 0 ? (
                  filteredRawRice.map((product, index) => (
                    <div className="cust-products-card" key={product._id || index}>
                      <div className="cust-products-card-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <h3>{product.name}</h3>
                      <div className="cust-products-rating">
                        <span className="cust-products-stars">★★★★★</span>
                      </div>
                      <div className="cust-products-status">
                        <span className="cust-products-reviews">{product.reviews || 0} reviews</span>
                        <span className="cust-products-stock">
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <p className="cust-products-price">{product.price || 'N/A'}</p>
                      <button
                        className="cust-products-add-to-cart-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No raw rice products found.</p>
                )}
              </div>
            </div>
          </>
        )}
      </section>

      <footer className="cust-products-footer">
        <div className="cust-products-footer-columns">
          <div className="cust-products-footer-column">
            <h5>About Us</h5>
            <p>Premium quality rice for your culinary needs.</p>
          </div>
          <div className="cust-products-footer-column">
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="/customer-home">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/customer-orders">Orders</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </div>
          <div className="cust-products-footer-column">
            <h5>Contact</h5>
            <p>Email: info@ricemill.lk</p>
            <p>Phone: +94 112 345 678</p>
          </div>
          <div className="cust-products-footer-column">
            <h5>Follow Us</h5>
            <div className="cust-products-social-icons">
              <img src="src/assets/facebook.png" alt="Facebook" />
              <img src="src/assets/twitter.png" alt="Twitter" />
              <img src="src/assets/instagram.png" alt="Instagram" />
              <img src="src/assets/linkedin.png" alt="Linkedin" />
            </div>
          </div>
        </div>
        <p className="cust-products-copyright">
          © 2025 RiceMill Management System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default CustomerProductsPage;