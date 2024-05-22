"use client";
import React from "react";
import Image from "next/image";

interface AvatarProps {
  src: string;
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      src={src}
      alt=""
      width={30}
      height={30}
      className="rounded-full"
    />
  );
};

export default Avatar;
