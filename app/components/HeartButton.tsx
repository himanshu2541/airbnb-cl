"use client";

import React from "react";
import { User } from "../libs/models";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
interface HeartButtonProps {
  currentUser?: typeof User.prototype | null;
  listingId: string;
}
const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const hasFavorited = false;
  const toggleFavorite = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    console.log("toggleFavorite", listingId);
  };
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        // color={hasFavorited ? "red" : "white"}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />

      <AiFillHeart
        className={`${hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}`}
        size={24}
      />
    </div>
  );
};

export default HeartButton;
