import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

const Modal = ({ isOpen, onClose, children }) => {
  const [styles, api] = useSpring(() => ({
    opacity: 0,
    transform: "scale(0.95) translateY(20px)",
    config: { tension: 200, friction: 20 },
  }));

  useEffect(() => {
    if (isOpen) {
      api.start({
        opacity: 1,
        transform: "scale(1) translateY(0)",
      });
    } else {
      api.start({
        opacity: 0,
        transform: "scale(0.95) translateY(20px)",
        onRest: () => {
          if (!isOpen) {
            api.stop(); // Stop animations if modal is closed
          }
        },
      });
    }
  }, [isOpen, api]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Ensure modal is completely removed when closed
  if (!isOpen && styles.opacity.get() === 0) return null;

  return (
    <>
      {/* Overlay */}
      <animated.div
        style={{
          opacity: styles.opacity,
          pointerEvents: isOpen ? "auto" : "none", // Prevent interaction when hidden
        }}
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      {/* Modal */}
      <div
        className="fixed inset-0 z-[5000000000000] flex items-center justify-center pointer-events-none"
        style={{
          pointerEvents: isOpen ? "auto" : "none", // Prevent interaction with modal when closed
        }}
      >
        <animated.div
          style={styles}
          className="relative transform rounded-lg bg-gray-900 text-white shadow-xl w-full max-w-lg p-6"
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
        >
          {children}
        </animated.div>
      </div>
    </>
  );
};

export default Modal;
