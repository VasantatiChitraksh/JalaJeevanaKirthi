import React, { useState, useEffect } from "react";
import "./fish.css";

const Fish = () => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;

      // Calculate the cursor position relative to the viewport center
      setEyePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fish">
      <div className="eye" style={calculateEyeStyle(eyePosition, "left")}></div>
      <div className="eye" style={calculateEyeStyle(eyePosition, "right")}></div>
    </div>
  );
};

// Helper function to calculate the eye movement
const calculateEyeStyle = (cursorPosition, side) => {
    const fishBounds = document.querySelector(".fish")?.getBoundingClientRect();
  
    if (!fishBounds) return {};
  
    // Calculate the center of the eye
    const eyeCenterX =
      side === "left" ? fishBounds.left + 40 : fishBounds.right - 40; // Adjust for left and right eyes
    const eyeCenterY = fishBounds.top + fishBounds.height / 2;
  
    // Calculate the angle between the cursor and the eye center
    const angle = Math.atan2(
      cursorPosition.y - eyeCenterY,
      cursorPosition.x - eyeCenterX
    );
  
    // Increase the movement radius for larger motion
    const movementRadius = 20; // Bigger circle
    const offsetX = Math.cos(angle) * movementRadius;
    const offsetY = Math.sin(angle) * movementRadius;
  
    return {
      transform: `translate(${offsetX}px, ${offsetY}px)`,
    };
  };
  
  
  
export default Fish;
