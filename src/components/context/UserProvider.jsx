import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

const UserContext = createContext();

const normalizeWishlistItems = (wishlistEntries = []) => {
  return wishlistEntries
    .map((entry) => {
      const product = entry?.product || entry;

      if (!product?._id && !product?.id) {
        return null;
      }

      return {
        ...product,
        wishlistId: entry?._id || product?._id || product?.id,
      };
    })
    .filter(Boolean);
};

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [wishlists, setWishlists] = useState([]);
  const [carts, setCarts] = useState([]);
  const [checkout, setCheckout] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const hasHandledSessionExpiry = useRef(false);

  const handleSessionExpiry = useCallback(async () => {
    if (hasHandledSessionExpiry.current) {
      return;
    }

    hasHandledSessionExpiry.current = true;

    setWishlists([]);
    setCarts([]);
    setCheckout([]);

    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/logout`, {
        method: "DELETE",
        credentials: "include",
      });
    } catch {
      // Ignore logout request errors during forced session expiry handling.
    }

    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, []);

  const fetchWithRefresh = useCallback(
    async (url, options = {}) => {
      let res = await fetch(url, { ...options, credentials: "include" });

      if (res.status === 401) {
        const refreshRes = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/user/refresh-token`,
          { credentials: "include" },
        );

        if (refreshRes.ok) {
          res = await fetch(url, { ...options, credentials: "include" });
        } else {
          await handleSessionExpiry();
        }
      }

      return res;
    },
    [handleSessionExpiry],
  );

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
    fetchCart();
    fetchCheckout();
  }, []);

  const fetchCheckout = async () => {
    try {
      setIsFetching(true);
      const res = await fetchWithRefresh(
        `${import.meta.env.VITE_API_BASE_URL}/user/checkout`,
        { credentials: "include" },
      );
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error fetching checkouts");
      }
      setCheckout(data.checkouts || []);
      return {
        success: true,
        message: data.message,
        checkouts: data.checkouts || [],
      };
    } catch (err) {
      setCheckout([]);
      return {
        success: false,
        message: err.message,
      };
    } finally {
      setIsFetching(false);
    }
  };

  const deleteCheckoutById = async (id) => {
    if (!id) {
      return {
        success: false,
        message: "Checkout id is required.",
      };
    }
    try {
      setIsFetching(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/checkout/${id}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();
      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message,
        };
      }
      const refreshCheckout = await fetchCheckout();
      return {
        success: true,
        message: data.message || "Checkout deleted successfully",
        checkout: refreshCheckout.checkout || [],
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Error deleting checkout.",
      };
    } finally {
      setIsFetching(false);
    }
  };

  const addToCheckout = async ({
    cartId,
    billing,
    paymentMethod,
    couponCode,
  }) => {
    if (!cartId) {
      return {
        success: false,
        message: "cart id is required.",
      };
    }

    try {
      const res = await fetchWithRefresh(
        `${import.meta.env.VITE_API_BASE_URL}/user/checkout`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            cartId,
            billing,
            paymentMethod,
            couponCode,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(
          data.message ||
            "An unexpected error occured while checking out, please go back to cart.",
        );
      }

      await fetchCart();
      await fetchCheckout();

      return {
        success: true,
        message: data.message,
        checkout: data.checkout,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || "An error occured while checking out",
      };
    }
  };

  const deleteCartById = async (cartId) => {
    if (!cartId) {
      return {
        success: false,
        message: "Cart Id is required",
      };
    }

    try {
      setIsFetching(true);

      const res = await fetchWithRefresh(
        `${import.meta.env.VITE_API_BASE_URL}/cart/${cartId}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error deleting cart.");
      }

      const refreshedCart = await fetchCart();

      return {
        success: true,
        message: data.message,
        carts: refreshedCart.carts || [],
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Error deleting cart.",
      };
    } finally {
      setIsFetching(false);
    }
  };

  const deleteCartItem = async (cartId, itemId) => {
    if (!cartId || !itemId) {
      return {
        success: false,
        message: "Cart Id and Item Id are required",
      };
    }

    try {
      setIsFetching(true);

      const res = await fetchWithRefresh(
        `${import.meta.env.VITE_API_BASE_URL}/cart/${cartId}/item/${itemId}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error deleting cart item.");
      }

      const refreshedCart = await fetchCart();

      return {
        success: true,
        message: data.message,
        carts: refreshedCart.carts || [],
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Error deleting cart item.",
      };
    } finally {
      setIsFetching(false);
    }
  };

  const fetchProductById = useCallback(async (productId) => {
    if (!productId) {
      return {
        success: false,
        product: {},
        message: "Product id is required.",
      };
    }

    try {
      setIsFetching(true);

      const res = await fetchWithRefresh(
        `${import.meta.env.VITE_API_BASE_URL}/product/${productId}`,
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "An error occurred while fetching product.",
        );
      }

      setProduct(data.product || {});

      return {
        success: true,
        product: data.product || {},
      };
    } catch (err) {
      setProduct({});

      return {
        success: false,
        product: {},
        message: err.message || "An error occurred while fetching product.",
      };
    } finally {
      setIsFetching(false);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setIsFetching(true);

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);
      const data = await res.json();

      if (!data.success || !res.ok) {
        throw new Error("Error fetching products");
      }
      setProducts(data.products || []);

      return {
        success: true,
        products: data.products,
      };
    } catch (err) {
      return {
        success: false,
        products: [],
      };
    } finally {
      setIsFetching(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      setIsFetching(true);

      const res = await fetchWithRefresh(
        `${import.meta.env.VITE_API_BASE_URL}/wishlists`,
      );
      const data = await res.json();

      if (!data.success || !res.ok) {
        throw new Error("Error fetching wishlisted products");
      }

      const nextWishlists = normalizeWishlistItems(data.wishlists || []);

      setWishlists(nextWishlists);

      return {
        success: true,
        wishlists: nextWishlists,
      };
    } catch (err) {
      setWishlists([]);

      return {
        success: false,
        wishlists: [],
      };
    } finally {
      setIsFetching(false);
    }
  };

  const addWishlist = async (product) => {
    const productId = product?._id || product?.id;

    if (!productId) {
      return {
        success: false,
        message: "Invalid product payload for wishlist.",
      };
    }

    try {
      const res = await fetchWithRefresh(
        `${import.meta.env.VITE_API_BASE_URL}/add-wishlist`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ productId }),
        },
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error adding product to wishlist.");
      }

      const refreshedWishlist = await fetchWishlist();

      return {
        success: true,
        message: data.message,
        wishlists: refreshedWishlist.wishlists || [],
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Error adding product to wishlist.",
      };
    }
  };

  const deleteWishlist = async (productId) => {
    if (!productId) {
      return {
        success: false,
        message: "Product id is required.",
      };
    }

    try {
      const res = await fetchWithRefresh(
        `${import.meta.env.VITE_API_BASE_URL}/delete-wishlist`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ productId }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error deleting wishlist product.");
      }

      const refreshedWishlist = await fetchWishlist();

      return {
        success: true,
        message: data.message,
        wishlists: refreshedWishlist.wishlists || [],
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Error deleting wishlist product.",
      };
    }
  };

  const fetchCart = async () => {
    try {
      setIsFetching(true);

      const res = await fetchWithRefresh(
        `${import.meta.env.VITE_API_BASE_URL}/carts`,
      );
      const data = await res.json();

      if (!data.success || !res.ok) {
        throw new Error(data.message || "Error fetching data.");
      }

      setCarts(data.carts || []);

      return {
        success: true,
        carts: data.carts,
      };
    } catch (err) {
      setCarts([]);

      return {
        success: false,
        carts: [],
        message: err.message || "Error fetching cart.",
      };
    } finally {
      setIsFetching(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!productId) {
      return {
        success: false,
        message: "Product data not provided",
      };
    }
    const res = await fetchWithRefresh(
      `${import.meta.env.VITE_API_BASE_URL}/delete/${productId}`,
      {
        method: "DELETE",
      },
    );

    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, message: "An error has" };
    }
  };

  const addToCart = async (product, quantity = 1) => {
    const productId = product?._id || product?.id;

    if (!productId) {
      return {
        success: false,
        message: "Invalid product payload for cart.",
      };
    }

    try {
      setIsFetching(true);

      const res = await fetchWithRefresh(
        `${import.meta.env.VITE_API_BASE_URL}/cart`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            items: [
              {
                product: productId,
                quantity,
              },
            ],
          }),
        },
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error adding product to cart.");
      }

      const refreshedCart = await fetchCart();

      return {
        success: true,
        message: data.message,
        carts: refreshedCart.carts || [],
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Error adding product to cart.",
      };
    } finally {
      setIsFetching(false);
    }
  };

  const updateCart = async (cartId, productId, quantity) => {
    if (!cartId || !productId) {
      return {
        success: false,
        message: "Cart or producy is required.",
      };
    }

    try {
      setIsFetching(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/cart/${cartId}/product/${productId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ quantity }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error updating cart.");
      }

      const refreshedCart = await fetchCart();

      if (res.ok || data.success) {
        return {
          success: true,
          message: "Cart updated successfully.",
          cart: refreshedCart.carts || [],
        };
      }
    } catch (err) {
      return {
        success: false,
        message: "An internal server has occured, please try again.",
      };
    }
  };

  const initializePayment = async (checkoutId) => {
    if (!checkoutId) {
      return {
        success: false,
        message: "Checkout ID is required.",
      };
    }

    try {
      const res = await fetchWithRefresh(
        `${import.meta.env.VITE_API_BASE_URL}/payment/initialize`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            checkoutId,
          }),
        },
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to initialize payment");
      }

      return {
        success: true,
        message: data.message,
        authorization_url: data.authorization_url,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Error initializing payment",
      };
    }
  };

  const verifyPayment = async (reference) => {
    if (!reference) {
      return {
        success: false,
        message: "Payment reference is required.",
      };
    }

    try {
      const res = await fetchWithRefresh(
        `${import.meta.env.VITE_API_BASE_URL}/payment/verify?reference=${reference}`,
        {
          credentials: "include",
        },
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to verify payment");
      }

      // Refresh checkout after payment verification
      await fetchCheckout();

      return {
        success: true,
        message: data.message,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Error verifying payment",
      };
    }
  };

  const logout = async () => {
    try {
      const res = await fetchWithRefresh(
        `${import.meta.env.VITE_API_BASE_URL}/user/logout`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Logout failed.");
      }

      setWishlists([]);
      setCarts([]);

      return {
        success: true,
        message: data.message,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Logout failed.",
      };
    }
  };

  return (
    <UserContext.Provider
      value={{
        products,
        product,
        isFetching,
        wishlists,
        carts,
        checkout,
        fetchCheckout,
        deleteCheckoutById,
        addToCheckout,
        fetchProductById,
        fetchWishlist,
        fetchCart,
        addWishlist,
        deleteWishlist,
        addToCart,
        updateCart,
        deleteCartItem,
        deleteCartById,
        initializePayment,
        verifyPayment,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
