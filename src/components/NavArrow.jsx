import { useState, useEffect } from "react";

function NavArrow() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  });

  return (
    <img
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      src="/arrow-up.svg"
      alt=""
      className={`fixed z-10 bottom-4 right-4 w-[2em] hover:cursor-pointer hover:translate-y-[-4px] transition-transform duration-300 ${
        isVisible ? "visible" : "invisible"
      }`}
    />
  );
}

export default NavArrow;
