"use client"

import { useCart } from "./cart-context"
import { AddToCartPopup } from "./add-to-cart-popup"

export function CartPopupWrapper() {
  const { isPopupOpen, popupItem, hidePopup } = useCart()

  return (
    <AddToCartPopup
      isOpen={isPopupOpen}
      onClose={hidePopup}
      item={popupItem}
    />
  )
}


