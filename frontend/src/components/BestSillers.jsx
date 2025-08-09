import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSillers = () => {
  const { products } = useContext(ShopContext);
  const [bestSillers, setBestSillers] = useState([]);

  useEffect(() => {
    let bestProducts = products.filter((item) => item.bestSeller);
    setBestSillers(bestProducts.slice(0,5));
  }, [products]);

  console.l
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="m-auto w-3/4 text-xs sm:text-sm md:text-[18px] text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {bestSillers.map((product, i) => (
          <ProductItem
            key={i}
            id={product._id}
            name={product.name}
            image={product.images}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSillers;
