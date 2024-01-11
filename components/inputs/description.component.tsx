import React, { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";

export default function DescriptionComponent({
  label,
  description,
}: {
  label?: string;
  description: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="text-xs font-normal relative"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <FaCircleInfo className="text-blue cursor-pointer" />{" "}
      {isHovered && (
        <div className="bg-white px-4 py-3 text-blue absolute top-0 left-5 font-medium border rounded-md flex flex-col gap-1 min-w-56">
         <span className="text-black">{label}</span>  <hr /> {description}
        </div>
      )}
    </div>
  );
}
