"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { NavigationBar } from "@/components/navigation-bar"
import { addToShoppingList } from "@/app/actions"
import { ShoppingBag, Plus, Minus, Trash2, MapPin, TrendingDown, Star } from "lucide-react"

interface ShoppingItem {
  id: string
  name: string
  quantity: number
  unit: string
  category: string
  estimated_price: number
  found: boolean
  notes?: string
}

const mockShoppingList: ShoppingItem[] = [
  {
    id: "1",
    name: "Red Apples",
    quantity: 6,
    unit: "pieces",
    category: "fruits",
    estimated_price: 4.5,
    found: false,
  },
  {
    id: "2",
    name: "Bananas",
    quantity: 1,
    unit: "bunch",
    category: "fruits",
    estimated_price: 2.99,
    found: true,
  },
  {
    id: "3",
    name: "Carrots",
    quantity: 2,
    unit: "lbs",
    category: "vegetables",
    estimated_price: 1.98,
    found: false,
  },
  {
    id: "4",
    name: "Spinach",
    quantity: 1,
    unit: "bag",
    category: "vegetables",
    estimated_price: 3.49,
    found: false,
  },
]

const nearbyStores = [
  {
    id: "1",
    name: "Fresh Market",
    distance: "0.3 miles",
    rating: 4.5,
    priceLevel: "$",
    specialties: ["Organic", "Local"],
  },
  {
    id: "2",
    name: "Green Grocers",
    distance: "0.7 miles",
    rating: 4.2,
    priceLevel: "$$",
    specialties: ["Fresh", "Variety"],
  },
  {
    id: "3",
    name: "City Supermarket",
    distance: "1.2 miles",
    rating: 4.0,
    priceLevel: "$",
    specialties: ["Budget", "Bulk"],
  },
]

const weeklyDeals = [
  {
    id: "1",
    item: "Strawberries",
    original_price: 4.99,
    sale_price: 2.99,
    discount: 40,
    store: "Fresh Market",
  },
  {
    id: "2",
    item: "Avocados",
    original_price: 1.99,
    sale_price: 1.49,
    discount: 25,
    store: "Green Grocers",
  },
  {
    id: "3",
    item: "Bell Peppers",
    original_price: 3.49,
    sale_price: 2.49,
    discount: 29,
    store: "City Supermarket",
  },
]

export default function MarketPage() {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(mockShoppingList)
  const [newItemName, setNewItemName] = useState("")
  const [isAddingItem, setIsAddingItem] = useState(false)

  const updateQuantity = (id: string, change: number) => {
    setShoppingList((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const toggleFound = (id: string) => {
    setShoppingList((prev) => prev.map((item) => (item.id === id ? { ...item, found: !item.found } : item)))
  }

  const removeItem = (id: string) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id))
  }

  const addNewItem = async () => {
    if (!newItemName.trim()) return

    setIsAddingItem(true)

    const formData = new FormData()
    formData.append("itemName", newItemName)
    formData.append("quantity", "1")

    await addToShoppingList(formData)

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName,
      quantity: 1,
      unit: "pieces",
      category: "other",
      estimated_price: 0,
      found: false,
    }

    setShoppingList((prev) => [...prev, newItem])
    setNewItemName("")
    setIsAddingItem(false)
  }

  const totalEstimated = shoppingList.reduce((sum, item) => sum + item.estimated_price, 0)
  const foundItems = shoppingList.filter((item) => item.found).length
  const totalItems = shoppingList.length

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Market</h1>
              <p className="text-gray-600">Your shopping companion</p>
            </div>
            <Button variant="ghost" size="icon">
              <ShoppingBag className="w-6 h-6" />
            </Button>
          </div>

          {/* Shopping Progress */}
          <Card className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Shopping Progress</p>
                  <p className="text-2xl font-bold">
                    {foundItems}/{totalItems}
                  </p>
                  <p className="text-white/80 text-xs">Items Found</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">${totalEstimated.toFixed(2)}</div>
                  <div className="text-white/80 text-xs">Estimated Total</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Add New Item */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add to Shopping List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter item name..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && addNewItem()}
              />
              <Button
                onClick={addNewItem}
                disabled={!newItemName.trim() || isAddingItem}
                className="bg-primary hover:bg-primary-600"
              >
                {isAddingItem ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shopping List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Shopping List</CardTitle>
            <Badge variant="secondary">{totalItems} items</Badge>
          </CardHeader>
          <CardContent>
            {shoppingList.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Your shopping list is empty</p>
                <p className="text-sm text-gray-500">Add items above to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {shoppingList.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border ${
                      item.found ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                    }`}
                  >
                    <Checkbox
                      checked={item.found}
                      onCheckedChange={() => toggleFound(item.id)}
                      className="data-[state=checked]:bg-green-600"
                    />

                    <div className="flex-1">
                      <div className={`font-medium ${item.found ? "line-through text-gray-500" : "text-gray-900"}`}>
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.quantity} {item.unit} • ${item.estimated_price.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weekly Deals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <TrendingDown className="w-5 h-5 mr-2 text-green-500" />
              Weekly Deals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <div>
                    <div className="font-medium text-gray-900">{deal.item}</div>
                    <div className="text-sm text-gray-600">{deal.store}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 line-through">${deal.original_price}</span>
                      <span className="font-bold text-green-600">${deal.sale_price}</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      {deal.discount}% off
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nearby Stores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-500" />
              Nearby Stores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nearbyStores.map((store) => (
                <div key={store.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{store.name}</div>
                    <div className="text-sm text-gray-600">{store.distance}</div>
                    <div className="flex items-center space-x-1 mt-1">
                      {store.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      <span className="text-sm">{store.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">{store.priceLevel}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <NavigationBar />
    </div>
  )
}
