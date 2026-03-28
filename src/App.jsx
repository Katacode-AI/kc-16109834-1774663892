import { useState } from 'react'

const menuItems = [
  {
    id: 1,
    name: 'Nasi Gudeg',
    price: 25000,
    image: '🍛',
    category: 'Makanan Utama',
    description: 'Nasi gudeg khas Yogyakarta dengan ayam dan telur'
  },
  {
    id: 2,
    name: 'Sate Ayam',
    price: 20000,
    image: '🍢',
    category: 'Makanan Utama',
    description: 'Sate ayam bakar dengan bumbu kacang'
  },
  {
    id: 3,
    name: 'Gado-gado',
    price: 18000,
    image: '🥗',
    category: 'Makanan Utama',
    description: 'Sayuran segar dengan bumbu kacang'
  },
  {
    id: 4,
    name: 'Es Teh Manis',
    price: 5000,
    image: '🧊',
    category: 'Minuman',
    description: 'Es teh manis segar'
  },
  {
    id: 5,
    name: 'Es Jeruk',
    price: 8000,
    image: '🍊',
    category: 'Minuman',
    description: 'Es jeruk peras segar'
  },
  {
    id: 6,
    name: 'Kopi Hitam',
    price: 10000,
    image: '☕',
    category: 'Minuman',
    description: 'Kopi hitam robusta pilihan'
  }
]

export default function App() {
  const [cart, setCart] = useState([])
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [showCart, setShowCart] = useState(false)

  const categories = ['Semua', 'Makanan Utama', 'Minuman']

  const filteredItems = activeCategory === 'Semua' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl">🍽️</span>
              <h1 className="ml-2 text-xl font-bold text-gray-900">FoodOrder</h1>
            </div>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Keranjang
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? 'bg-orange-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-3xl mr-3">{item.image}</span>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                            <span className="text-sm text-gray-500">{item.category}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        <p className="text-xl font-bold text-orange-600">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Tambah ke Keranjang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className={`lg:block ${showCart ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-sm sticky top-24">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Keranjang Belanja</h2>
                
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Keranjang masih kosong</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center flex-1">
                            <span className="text-xl mr-2">{item.image}</span>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 ml-2"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-xl font-bold text-orange-600">
                          {formatPrice(getTotalPrice())}
                        </span>
                      </div>
                      <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium">
                        Pesan Sekarang
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Overlay */}
      {showCart && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCart(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Keranjang Belanja</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-500">×</button>
            </div>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Keranjang masih kosong</p>
            ) : (
              <>
                <div className="max-h-60 overflow-y-auto space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <span className="text-xl mr-2">{item.image}</span>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-orange-600">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                  <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium">
                    Pesan Sekarang
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
