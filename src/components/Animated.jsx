import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Animated = ({ children, extraStyles }) => {
  const [animated, setAnimated] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-100px 0px",
  });

  useEffect(() => {}, [inView, animated]);

  const handleAnimation = () => {
    if (inView && !animated) {
      setAnimated(true);
    }
  };

  return (
    <div
      ref={ref}
      className={`duration-700 opacity-0 transition ${
        inView && !animated ? "translate-y-[-2em] opacity-100" : ""
      } ${extraStyles}`}
      onAnimationEnd={handleAnimation}
    >
      {children}
    </div>
  );
};

export default Animated;
