'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, ShoppingCart, Minus, Plus, X } from 'lucide-react'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export function ProductPageComponent() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const product = {
    id: 1,
    name: "Eco-Friendly Water Bottle",
    description: "Stay hydrated in style with our sleek, sustainable water bottle. Made from recycled materials, this 20oz bottle keeps your drinks cold for 24 hours or hot for 12 hours.",
    price: 24.99,
    rating: 4.5,
  }

  const relatedProducts = [
    { id: 2, name: "Reusable Coffee Cup", price: 19.99 },
    { id: 3, name: "Bamboo Utensil Set", price: 14.99 },
    { id: 4, name: "Organic Cotton Tote Bag", price: 9.99 },
  ]

  const addToCart = () => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    setIsCartOpen(true)
  }

  const updateQuantity = (id: number, change: number) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ).filter(item => item.quantity > 0))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Eco Store</h1>
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription>
                  {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="destructive" onClick={() => updateQuantity(item.id, -item.quantity)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t">
                        <p className="font-semibold text-lg">Total: ${totalPrice.toFixed(2)}</p>
                      </div>
                      <Button className="w-full">Proceed to Checkout</Button>
                    </div>
                  )}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <div className="lg:flex lg:items-start lg:space-x-8">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt={product.name}
              width={600}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              ))}
              <span className="ml-2 text-gray-600">{product.rating} out of 5</span>
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <p className="text-3xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
            <Button size="lg" onClick={addToCart}>Add to Cart</Button>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link href={`/product/${relatedProduct.id}`} key={relatedProduct.id}>
                <Card className="p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt={relatedProduct.name}
                    width={200}
                    height={200}
                    className="rounded-lg mb-4 mx-auto"
                  />
                  <h4 className="font-semibold mb-2">{relatedProduct.name}</h4>
                  <p className="text-gray-600">${relatedProduct.price.toFixed(2)}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}