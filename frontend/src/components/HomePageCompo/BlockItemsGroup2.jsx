import React, { useEffect } from "react";
import { useProductStore } from "../../stores/product.store";
import { Link } from "react-router-dom";

export default function BlockItemsGroup2({ techProducts }) {
  const getShortTitle = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words.length > 1 ? words.slice(0, 2).join(" ") : words[0];
  };


  return (
    <div className="w-full max-w-[1180px] h-auto md:max-h-[257px] p-0 gap-0 border border-gray-300 rounded mt-4 bg-base-100 flex flex-col md:flex-row">
      <div className="relative max-w-[280px] md:min-h-[254px] overflow-hidden flex">
        <img
          className="hidden md:block w-full h-auto object-[right_bottom]"
          src="/Image/Esection.png"
          alt=""
        />
        <div
          style={{ background: "rgba(255, 255, 255, 0.3)" }}
          className="hidden md:block w-full h-full absolute z-10 p-5 space-y-2.5"
        ></div>
        <div className="w-full md:absolute z-10 md:p-5 space-y-5 mt-3 md:mt-0">
          <h1 className="w-full md:w-[154px] md:text-[20px] font-medium text-black leading-tight">
            Consumer electronics and gadgets
          </h1>
          <button className="hidden md:block btn bg-white">Source now</button>
        </div>
      </div>

      <div className="w-full max-w-[895px] flex md:grid md:grid-cols-4 md:grid-rows-2 overflow-x-auto">
        {techProducts.map((itm, i) => (
          <Link
            to={`/product/${itm._id}`}
            key={itm._id}
            className="min-w-[180px] md:min-w-0 h-[127px] p-4 leading-tight relative cursor-pointer border-l border-b border-gray-200 last:border-r md:border-r-0 md:[&:nth-child(4n)]:border-r-0 md:border-r"
          >
            <h1 className="text-black text-sm mb-1">{getShortTitle(itm.name)}</h1>
            <div className="leading-tight text-gray-400">
              <p className="text-[12px]">From</p>
              <p className="text-[12px]">USD {itm.price}</p>
            </div>
            <div className="w-[82px] h-[82px]  absolute bottom-0 right-0">
              <img src={itm.images?.[0]} alt={itm.name} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
