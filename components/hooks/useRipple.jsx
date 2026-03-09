import React, { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const useRipple = (ref) => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    if (ref.current) {
      const elem = ref.current;

      const clickHandler = (e) => {
        const rect = elem.getBoundingClientRect();
        const left = e.clientX - rect.left;
        const top = e.clientY - rect.top;
        const height = elem.offsetHeight;
        const width = elem.offsetWidth;
        const diameter = Math.max(width, height);
        setRipples([
          ...ripples,
          {
            top: top - diameter / 2,
            left: left - diameter / 2,
            height: diameter,
            width: diameter,
          },
        ]);
      };

      elem.addEventListener("click", clickHandler);

      return () => {
        elem.removeEventListener("click", clickHandler);
      };
    }
  }, [ref, ripples]);

  const _debounced = useDebounce(ripples, 1000);
  useEffect(() => {
    if (_debounced.length) {
      setRipples([]);
    }
  }, [_debounced.length]);

  return ripples.map((styles, i) => (
    <span
      key={i}
      style={{
        ...styles,
        position: "absolute",
        backgroundColor: "#FFFFFF",
        opacity: "25%",
        transform: "scale(0)",
        animation: "ripple 600ms linear",
        borderRadius: "50%",
      }}
    />
  ));
};

export default useRipple;
