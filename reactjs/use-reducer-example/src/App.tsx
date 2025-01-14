import { useReducer } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

function cartReducer(cart: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        return cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      return [...cart, action.payload];

    case "REMOVE_ITEM":
      return cart.filter((item) => item.id !== action.payload.id);

    case "UPDATE_QUANTITY":
      return cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case "CLEAR_CART":
      return [];

    default:
      throw new Error(`Unhandled action type: ${(action as CartAction).type}`);
  }
}

function App() {
  const initialCart: CartItem[] = [];
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  const items = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 },
  ];

  const addItemToCart = (
    item: Omit<CartItem, "quantity">,
    quantity: number
  ) => {
    dispatch({ type: "ADD_ITEM", payload: { ...item, quantity } });
  };

  const removeItemFromCart = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const updateItemQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#4CAF50" }}>Shopping Cart</h1>

        <div>
          <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: "5px" }}>
            Products
          </h2>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 0",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              <span>
                {item.name} - ${item.price}
              </span>
              <button
                onClick={() => addItemToCart(item, 1)}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div>
          <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: "5px" }}>
            Cart
          </h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "10px 0",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              >
                <span>
                  {item.name} - ${item.price} x {item.quantity}
                </span>
                <div>
                  <button
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity + 1)
                    }
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      padding: "5px",
                      borderRadius: "50%",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity - 1)
                    }
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      padding: "5px",
                      borderRadius: "50%",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeItemFromCart(item.id)}
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
          <button
            onClick={clearCart}
            style={{
              marginTop: "10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
