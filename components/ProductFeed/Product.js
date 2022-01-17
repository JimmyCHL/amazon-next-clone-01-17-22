import Image from "next/image";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({ id, title, description, category, image, price }) => {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  return (
    <div className="relative flex flex-col m-5 bg-white z-40 p-10 rounded-sm">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3">{title}</h4>
      <div className="flex" suppressHydrationWarning={true}>
        {
          // to prevent severSide and clientSide tree conflicts
          Array(rating ? rating : 5)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))
        }
      </div>

      <p className="text-xs my-2 line-clamp-2 hover:line-clamp-none ">
        {description}
      </p>

      <div className="mb-5">
        <Currency quantity={price} currency="USD" />
      </div>

      <div
        className="flex items-center space-x-2 -mt-5 "
        suppressHydrationWarning={true}
      >
        {hasPrime && (
          <>
            <img
              className="w-12 object-contain"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs">FREE Next-day Delivery</p>
          </>
        )}
      </div>

      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
};

export default Product;
