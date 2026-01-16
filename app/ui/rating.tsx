'use client'

import { useState } from "react";
import Image from "next/image";
const DEFAULT_COUNT = 5;
const DEFAULT_ICON = "★";
const DEFAULT_UNSELECTED_COLOR = "grey";
const DEFAULT_COLOR = "text-amber-500";

interface RatingProps {
  count: number;
  value?: number;
  icon?: string;
  color?: string;
  iconSize?: number;
  readOnly?: boolean;
  onChange?: (rating: number) => void;
  name?: string;
  id?: string;
}

export default function Rating({
  count,
  value = 0,
  icon,
  color,
  iconSize,
  readOnly = false,
  onChange,
  name,
  id,
}: RatingProps) {
  const [rating, setRating] = useState(value);
  const [temporaryRating, setTemporaryRating] = useState(0);

  let stars = Array(count || DEFAULT_COUNT).fill(icon || DEFAULT_ICON);

  const handleClick = (newRating: number) => {
    if (!readOnly) {
      setRating(newRating);
      onChange?.(newRating);
    }
  }

  const handleMouse = (rating: number) => {
    if (!readOnly)
      setTemporaryRating(rating);
  };

  return (
    <>
      {/* {name && <input type="hidden" name={name} value={rating} />} */}
      <div className="flex">
        <input type="hidden" name={name} value={rating} />
        {stars.map((item, index) => {
          const isActiveColor =
            (rating || temporaryRating) &&
            (index < rating || index < temporaryRating);

          let elementColor = "";

          if (isActiveColor) {
            elementColor = color || DEFAULT_COLOR;
          } else {
            elementColor = DEFAULT_UNSELECTED_COLOR;
          }

          return (
            <Image
              key={index}
              src={isActiveColor ? '/star-full.svg' : '/star-empty.svg'}
              alt={DEFAULT_ICON}
              width={iconSize}
              height={iconSize}
              className={!readOnly ? 'cursor-pointer' : ''}
              onMouseEnter={() => handleMouse(index + 1)}
              onMouseLeave={() => handleMouse(0)}
              onClick={() => handleClick(index + 1)}
            />
          );
        })}
      </div>
    </>
  );
}

/*
   // <div
                    //     className={`cursor-pointer transition-all ${elementColor}`}
                    //     key={index}
                    //     style={{
                    //         fontSize: iconSize ? `${iconSize}px` : "14px",
                    //         // color: elementColor,
                    //         filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`,
                    //     }}
                    //     onMouseEnter={() => setTemporaryRating(index + 1)}
                    //     onMouseLeave={() => setTemporaryRating(0)}
                    //     onClick={() => handleClick(index + 1)}
                    // >
                    //     {icon ? icon : DEFAULT_ICON}
                    // </div>
                    */