import { removeFromCart, selectSubtotal } from "@/app/store/cartSlice";
import Image from "next/image";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { TbCurrencyTaka } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const CartSideBar = ({ isCartOpen, setIsCartOpen }) => {
  const cartItems = useSelector((state) => state.cart.items) || [];

  console.log(cartItems);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const subtotal = useSelector(selectSubtotal);
  const dispatch = useDispatch();

  const makePayment = async () => {
    try {
      // Load Stripe.js
      const stripe = await loadStripe(
        "pk_test_51QcN6EI7mCrPGtsyXFnTjS3AYoz27fW4k4fvFd3yGD56AMFqQXvK8DrvDmYY6LhJX7S6ui7WCPztx7WGUtkDXNzX00DLA9YslL"
      );

      if (!stripe) {
        console.error("Stripe failed to load.");
        return;
      }

      const cleanProducts = cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        img: item.img,
        coursefee: Number(item.coursefee),
      }));

      // Prepare request body
      const body = { products: cleanProducts, userId: user.userId };
      console.log(body);
      const headers = { "Content-Type": "application/json" };

      // Make the API call to create a checkout session
      const response = await axios.post(
        "http://localhost:5000/api/payment/create-checkout-session",
        JSON.stringify(body),
        { headers }
      );

      // Handle server response
      if (response.status === 200) {
        const session = response.data; // Assuming the session ID is in response.data

        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        // Handle any potential errors during checkout
        if (result.error) {
          console.error(
            "Error during redirect to checkout:",
            result.error.message
          );
        }
      } else {
        console.error("Failed to create checkout session", response.data);
      }
    } catch (error) {
      console.error("Error in makePayment:", error.message);
    }
  };

  return (
    <>
      <div
        className={`fixed z-50 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 transform right-0 top-0 bg-white h-full min-h-screen ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500`}
      >
        <div className="flex justify-between p-5 w-full">
          <h2 className="text-black text-2xl font-semibold">Your cart</h2>
          <button
            className="text-black text-2xl font-semibold"
            onClick={() => setIsCartOpen((prev) => !prev)}
          >
            <IoMdClose />
          </button>
        </div>
        {cartItems.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            No courses in cart
          </div>
        ) : (
          <div className="w-full flex flex-col items-start justify-between h-[92%]">
            <div className="flex flex-col border-black border-t items-center justify-center gap-5  p-5">
              {cartItems.map((course) => (
                <div
                  key={course.id}
                  className="w-full  flex items-start justify-start gap-5"
                >
                  <Image
                    src={course.img}
                    alt={course.title}
                    width={50}
                    height={14}
                  />
                  <div className="flex flex-col items-start justify-center gap-2">
                    <p className="text-black text-lg font-medium">
                      {course.title}
                    </p>
                    <p className="text-gray-400 text-sm font-medium">
                      {course.coursefee}
                    </p>
                    <button
                      className="text-gray-400 text-sm font-medium underline"
                      onClick={() => dispatch(removeFromCart(course.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full border-t border-black p-5 flex flex-col items-center justify-between">
              <div className="flex justify-between w-full">
                <h4 className="text-base text-gray-400">subtotal</h4>
                <span className="text-black text-xl font-semibold flex items-center">
                  <TbCurrencyTaka className="text-lg" />
                  {subtotal}
                </span>
              </div>

              <button
                className="w-full px-10 py-3 mt-5 rounded bg-yellow-500 text-black font-medium hover:scale-95 transition-all duration-300"
                onClick={makePayment}
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40"
          onClick={() => setIsCartOpen((prev) => !prev)}
        ></div>
      )}
    </>
  );
};

export default CartSideBar;
