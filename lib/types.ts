// Shared types across the application
export interface Review {
  id: string
  name: string
  role: string
  content: string
  rating: number
  date: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  purchaseType: "one-time"
}

export interface CartState {
  items: CartItem[]
  total: number
}

export type CartAction = 
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: { productId: string; purchaseType: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; purchaseType: string; quantity: number } }
  | { type: "CLEAR_CART" }

export interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  address2: string
  city: string
  state: string
  zipCode: string
  country: string
  specialInstructions: string
  paymentMethod: string
}
