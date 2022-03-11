import React from "react";
import { storyblokEditable } from "@storyblok/react";
import { useProducts } from "utils/hooks";

const Catalog = ({ blok }) => {
  const products = (useProducts() || []).filter(
    (p) => blok.category === "" || p.content.category === blok.category
  );

  return (
    <div
      {...storyblokEditable(blok)}
      className="container mx-auto px-[25px] mt-20"
    >
      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-10">
        {products.map((product) => (
          <div key={product.uuid} className="flex flex-col">
            <img
              src={`${product.content.image.filename}/m/500x300/smart/`}
              alt={product.name}
              className="h-[250px] w-full object-cover object-top rounded-lg"
            />
            <h3 className="mt-6 text-xl">{product.name}</h3>
            <span>&euro; {product.content.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
