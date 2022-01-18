import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/Checkout/CheckoutProduct";
import FlipMove from "react-flip-move";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";

const Checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main
        className={`${
          items.length > 0 ? "lg:flex" : "lg:block"
        } max-w-screen-2xl mx-auto`}
      >
        {/* Left */}
        <div className="flex-1 m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}
            </h1>
            <FlipMove>
              {items.map((item, i) => (
                <CheckoutProduct
                  key={i}
                  id={item.id}
                  title={item.title}
                  rating={item.rating}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                  image={item.image}
                  hasPrime={item.hasPrime}
                />
              ))}
            </FlipMove>
          </div>
        </div>
        {/* Right */}
        {items.length > 0 && (
          <div className="flex flex-col bg-white shadow-md p-10 m-5 lg:w-[300px] ">
            <h2>
              Subtotal ({items.length} items):
              <span className="font-extrabold">
                {" "}
                <Currency quantity={total} currency="USD" />
              </span>
            </h2>

            <button
              disabled={!session}
              className={`button mt-2 ${
                !session &&
                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 focus:ring-0 cursor-not-allowed"
              }`}
            >
              {!session ? "Sign in to checkout" : "Proceed to checkout"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
