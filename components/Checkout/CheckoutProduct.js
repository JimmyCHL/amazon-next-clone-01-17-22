import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React, { forwardRef } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../../slices/basketSlice";

const CheckoutProduct = forwardRef(
  (
    { id, title, description, category, image, price, hasPrime, rating },
    ref
  ) => {
    const dispatch = useDispatch();
    const addItemToBasket = () => {
      const product = {
        id,
        title,
        description,
        category,
        image,
        price,
        hasPrime,
        rating,
      };
      //push another one to basket
      dispatch(addToBasket(product));
    };

    const removeItemFromBasket = () => {
      //Remove item from redux
      dispatch(removeFromBasket({ id }));
    };

    return (
      <div ref={ref} className="grid grid-cols-5">
        <Image src={image} height={200} width={200} objectFit="contain" />

        {/* Middle */}
        <div className="col-span-4 mx-5 sm:col-span-3 ">
          <p>{title}</p>
          <div className="flex">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <StarIcon key={i} className="h-5 text-yellow-500" />
              ))}
          </div>
          <p className="text-xs my-3 line-clamp-3 hover:line-clamp-none">
            {description}
          </p>
          <div className="font-extrabold">
            <Currency quantity={price} currency="USD" />
          </div>
          {hasPrime && (
            <div className="flex items-center space-x-2">
              <img
                loading="lazy"
                className="w-12 object-contain"
                src="https://links.papareact.com/fdw"
                alt=""
              />
              <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
            </div>
          )}
        </div>
        {/* Right add/remove buttons */}
        <div className="flex sm:flex-col sm:items-stretch space-x-2 sm:space-x-0 sm:space-y-2 my-auto justify-self-end col-span-5 sm:col-span-1 ">
          <button onClick={addItemToBasket} className="button mt-auto">
            Add to Basket{" "}
          </button>
          <button
            onClick={removeItemFromBasket}
            className="button mt-auto whitespace-nowrap"
          >
            Remove from Basket
          </button>
        </div>
      </div>
    );
  }
);

CheckoutProduct.displayName = "CheckoutProduct";

export default CheckoutProduct;
