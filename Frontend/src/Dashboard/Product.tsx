import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ProductItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  tag?: string;
  comingSoon?: boolean;
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

const CART_KEY = "cartItems";

const products: ProductItem[] = [
  {
    id: 1,
    name: "Balcony Matcha – 100g",
    description:
      "Single-serve 100g latte-grade matcha with a relaxing, citrus-forward profile for slow mornings.",
    price: "₱280",
    image: "/Image/Product/balc.jpg",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Kiyoto Matcha Set",
    description:
      "New Kiyoto blends and gift-ready sets are brewing. Stay tuned for our next 100g creations.",
    price: "Coming soon",
    image: "/Image/Product/bg.jpg",
    comingSoon: true,
  },
];

const getInitialItems = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
};

export default function Product() {
  const [items, setItems] = useState<CartItem[]>(() => getInitialItems());
  const [justAddedId, setJustAddedId] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [reference, setReference] = useState("");
  const [receiptItems, setReceiptItems] = useState<CartItem[]>([]);
  const [receiptTotal, setReceiptTotal] = useState(0);
  const [receiptDate, setReceiptDate] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const handleAddClick = (product: ProductItem) => {
    if (product.comingSoon) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      const numericPrice = Number(product.price.replace(/[^\d.]/g, ""));
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.name,
          price: numericPrice,
          image: product.image,
          quantity: 1,
        },
      ];
    });
    setJustAddedId(product.id);
    setTimeout(
      () => setJustAddedId((prev) => (prev === product.id ? null : prev)),
      900
    );
  };

  const handleIncrease = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    const orderItems = items.map((item) => ({ ...item }));
    const orderTotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const ref =
      "KMT-" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");

    setReceiptItems(orderItems);
    setReceiptTotal(orderTotal);
    setReference(ref);
    setReceiptDate(
      new Date().toLocaleString("en-PH", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    setShowReceipt(true);
    setIsCartOpen(false);
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="p-6 sm:p-8 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(5,46,22,0.9),_#020617)] border border-emerald-500/20 backdrop-blur-2xl text-emerald-50">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-[1px] w-7 bg-emerald-400/80" />
              <span className="text-[0.7rem] uppercase tracking-[0.2em] text-emerald-300/70">
                Kiyoto Matcha
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Products
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/70 mt-2 max-w-xl">
              Explore our curated Kiyoto Matcha collection featuring our
              signature 100g Balcony Matcha and upcoming specialty sets.
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase shadow-[0_18px_40px_rgba(16,185,129,0.5)] transition"
          >
            View Cart
          </button>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {products.map((item) => {
            const isComingSoon = !!item.comingSoon;
            const isJustAdded = justAddedId === item.id;

            return (
              <div
                key={item.id}
                className={`group relative rounded-3xl overflow-hidden flex flex-col ${
                  isComingSoon
                    ? "border border-emerald-500/10 bg-gradient-to-b from-slate-900 via-black to-black shadow-[0_18px_40px_rgba(0,0,0,0.85)]"
                    : "border border-emerald-500/40 bg-gradient-to-b from-emerald-900/60 via-black to-black/95 shadow-[0_26px_60px_rgba(0,0,0,0.95)] transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_rgba(16,185,129,0.55)]"
                }`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`object-cover w-full ${
                      isComingSoon
                        ? "opacity-35 grayscale h-56 sm:h-64"
                        : "transition-transform duration-700 group-hover:scale-105 h-56 sm:h-64"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/45 to-transparent" />

                  <div className="absolute inset-x-4 top-4 flex justify-center pointer-events-none">
                    {item.tag && !isComingSoon && (
                      <span className="inline-flex px-7 py-1.5 rounded-full text-[0.7rem] font-semibold tracking-[0.18em] uppercase bg-emerald-400 text-emerald-950 shadow-lg">
                        {item.tag}
                      </span>
                    )}
                    {isComingSoon && (
                      <span className="inline-flex px-7 py-1.5 rounded-full text-[0.7rem] font-semibold tracking-[0.18em] uppercase bg-red-950 text-white shadow-lg">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-x-5 bottom-6 flex flex-col gap-1.5">
                    <h2 className="text-xl sm:text-2xl font-semibold leading-tight">
                      {item.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-emerald-100/80 max-w-md">
                      {item.description}
                    </p>
                  </div>

                  <AnimatePresence>
                    {isJustAdded && (
                      <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.96 }}
                        transition={{ duration: 0.25 }}
                        className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-emerald-500 text-emerald-950 text-[0.7rem] font-semibold shadow-lg"
                      >
                        Added to cart
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex-1 flex items-center justify-between px-5 py-4 bg-black/70 border-t border-emerald-500/20 backdrop-blur">
                  {isComingSoon ? (
                    <span className="flex items-center gap-2 text-xs sm:text-sm text-emerald-400/70">
                      <span className="h-[2px] w-7 rounded-full bg-emerald-400/70" />
                      Coming soon
                    </span>
                  ) : (
                    <div className="flex flex-col">
                      <span className="text-[0.7rem] uppercase tracking-[0.2em] text-emerald-400/70">
                        100g package
                      </span>
                      <span className="text-lg sm:text-xl font-semibold text-emerald-300">
                        {item.price}
                      </span>
                    </div>
                  )}

                  {!isComingSoon ? (
                    <motion.button
                      onClick={() => handleAddClick(item)}
                      whileTap={{ scale: 0.9 }}
                      animate={isJustAdded ? { scale: 1.06 } : { scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 340,
                        damping: 18,
                      }}
                      className="px-6 py-2 rounded-full text-[0.7rem] sm:text-xs font-semibold tracking-[0.18em] uppercase border border-emerald-300/75 text-emerald-50 bg-emerald-500/10 hover:bg-emerald-400/25 hover:border-emerald-200 transition shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                    >
                      {isJustAdded ? "Added" : "Add to cart"}
                    </motion.button>
                  ) : (
                    <span className="px-4 py-1 rounded-full sm:text-xs font-semibold tracking-[0.18em] uppercase bg-red-900 text-white">
                      Coming Soon...
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="w-full h-[80vh] md:h-auto md:max-w-5xl mx-auto bg-gradient-to-b from-[#6b7b69] to-black rounded-t-3xl md:rounded-3xl py-6 md:py-8 px-4 md:px-6 text-emerald-50 shadow-2xl border border-emerald-900/80 relative overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute left-1/2 md:left-auto transform -translate-x-1/2 md:translate-x-0 top-2 md:top-4 md:right-4 flex items-center gap-2">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-3 py-1 rounded-full text-xs bg-black/40 hover:bg-black/70 border border-emerald-900/60"
                >
                  Close
                </button>
              </div>

              <div className="w-full px-2 md:px-6 pt-4 md:pt-2">
                <div className="flex flex-col gap-2 mb-6 text-center md:text-left">
                  <p className="text-sm tracking-[0.3em] uppercase text-emerald-200/70">
                    Matcha Cart
                  </p>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold">
                    Your Cart
                  </h2>
                  <p className="text-emerald-100/80 text-xs md:text-sm max-w-2xl mx-auto md:mx-0">
                    Review your selection of matcha products before checking
                    out.
                  </p>
                </div>

                {items.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 md:py-16 rounded-3xl bg-black/40 border border-emerald-900/50 shadow-xl">
                    <img
                      src="/Image/Header/logoo.png"
                      alt="Logo"
                      className="w-16 h-16 md:w-20 md:h-20 object-contain mb-3 opacity-80"
                    />
                    <p className="text-lg text-emerald-100 mb-2">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-emerald-200/80 mb-2">
                      Explore our products and add your favorite matcha blends.
                    </p>
                  </div>
                )}

                {items.length > 0 && (
                  <div className="grid gap-6 md:gap-8 md:grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start">
                    <div className="space-y-4">
                      {items.map((item) => (
                        <motion.article
                          key={item.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          whileHover={{ y: -3, scale: 1.01 }}
                          className="rounded-3xl bg-black/50 border border-emerald-900/60 shadow-xl backdrop-blur-md px-4 py-4 sm:px-5 sm:py-5"
                        >
                          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
                            <div className="w-full sm:w-28 h-28 rounded-2xl overflow-hidden border border-emerald-900/70 bg-black/70 shrink-0">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1 flex flex-col gap-2">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <h3 className="text-base sm:text-lg font-serif">
                                  {item.title}
                                </h3>
                                <p className="text-emerald-300 text-sm sm:text-base font-medium">
                                  ₱{item.price.toFixed(2)}
                                </p>
                              </div>
                              <p className="text-xs text-emerald-200/80">
                                Premium ceremonial matcha blend selected for
                                aroma and depth.
                              </p>

                              <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="inline-flex items-center rounded-full bg-emerald-900/40 border border-emerald-700/70 px-2 py-1">
                                  <button
                                    onClick={() => handleDecrease(item.id)}
                                    className="px-3 py-1 text-lg leading-none select-none hover:bg-emerald-800/60 rounded-full"
                                  >
                                    −
                                  </button>
                                  <span className="px-4 text-sm sm:text-base">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => handleIncrease(item.id)}
                                    className="px-3 py-1 text-lg leading-none select-none hover:bg-emerald-800/60 rounded-full"
                                  >
                                    +
                                  </button>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                                  <span className="text-sm text-emerald-200/80">
                                    Line total:
                                    <span className="ml-2 text-emerald-300 font-medium">
                                      ₱
                                      {(
                                        item.price * item.quantity
                                      ).toFixed(2)}
                                    </span>
                                  </span>
                                  <button
                                    onClick={() => handleRemove(item.id)}
                                    className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-red-800/80 hover:bg-red-700 text-red-50 border border-red-900/60"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </div>

                    <motion.aside
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="rounded-3xl bg-black/60 border border-emerald-900/70 shadow-2xl backdrop-blur-md p-4 md:p-6 lg:sticky lg:top-8"
                    >
                      <h3 className="text-xl md:text-2xl font-serif mb-3">
                        Order Summary
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-emerald-100/80">Items</span>
                          <span className="text-emerald-50">
                            {items.reduce(
                              (sum, item) => sum + item.quantity,
                              0
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-emerald-100/80">Subtotal</span>
                          <span className="text-emerald-50">
                            ₱{total.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-emerald-100/80">Shipping</span>
                          <span className="text-emerald-200/70">
                            Calculated at checkout
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 border-t border-emerald-900/70 pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-emerald-100/90">
                            Total
                          </span>
                          <span className="text-2xl font-serif text-emerald-300">
                            ₱{total.toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={handleCheckout}
                          className="w-full py-3 rounded-2xl text-base font-medium bg-emerald-700 hover:bg-emerald-600 shadow-lg shadow-emerald-900/70"
                        >
                          Proceed to Checkout
                        </button>

                        <p className="mt-3 text-[11px] text-emerald-200/70 text-center">
                          By continuing, you agree to our terms and privacy
                          policy.
                        </p>
                      </div>
                    </motion.aside>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReceipt && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReceipt(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md bg-gradient-to-b from-emerald-900 to-black rounded-3xl p-6 text-emerald-50 shadow-2xl border border-emerald-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-600/90 flex items-center justify-center shadow-lg">
                    <span className="text-lg">✓</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-semibold">
                      Order Confirmed
                    </h2>
                    <p className="text-xs text-emerald-200/80">
                      Thank you for choosing Kiyoto Matcha.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReceipt(false)}
                  className="px-2.5 py-1 rounded-full text-xs bg-black/40 hover:bg-black/70 border border-emerald-700"
                >
                  Close
                </button>
              </div>

              <div className="rounded-2xl border border-emerald-800/70 bg-black/40 p-4 mb-4 text-xs sm:text-sm space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-emerald-200/80">Reference</span>
                  <span className="font-mono text-emerald-300">
                    {reference}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-200/80">Date</span>
                  <span className="text-emerald-100/90">{receiptDate}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-800/70 bg-black/40 mb-4 max-h-56 overflow-y-auto">
                <div className="px-4 py-3 border-b border-emerald-800/60 flex justify-between text-xs text-emerald-200/80">
                  <span>Item</span>
                  <div className="flex gap-6">
                    <span>Qty</span>
                    <span className="text-right">Total</span>
                  </div>
                </div>
                {receiptItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2.5 flex justify-between items-center text-xs sm:text-sm"
                  >
                    <div className="flex flex-col">
                      <span className="text-emerald-50">{item.title}</span>
                      <span className="text-[11px] text-emerald-300/80">
                        ₱{item.price.toFixed(2)} each
                      </span>
                    </div>
                    <div className="flex gap-6 items-center">
                      <span className="text-emerald-100/90">
                        {item.quantity}
                      </span>
                      <span className="text-emerald-300 font-medium text-right">
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-emerald-800/80 bg-gradient-to-r from-emerald-950/90 to-black px-4 py-3 mb-3">
                <div className="flex justify-between text-xs text-emerald-200/80 mb-1.5">
                  <span>Subtotal</span>
                  <span>₱{receiptTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-200/80 mb-1.5">
                  <span>Shipping</span>
                  <span>Calculated separately</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-emerald-800/70 mt-1">
                  <span className="text-sm font-medium text-emerald-100/90">
                    Total Paid
                  </span>
                  <span className="text-lg font-serif text-emerald-300">
                    ₱{receiptTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-emerald-200/80 mb-3 text-center">
                You&apos;ll receive a confirmation message with shipping
                details soon.
              </p>

              <button
                onClick={() => setShowReceipt(false)}
                className="mt-1 w-full py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-600 font-semibold text-sm shadow-md shadow-emerald-900/70"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
