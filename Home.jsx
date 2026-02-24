import React from "react";
import useToast from "./hooks/useToast";

export const Home = () => {
  const { addToast } = useToast();

  const handleClick = () => {
    addToast({
      message: "This is a toast message!",
      variant: "info",
      duration: 5000,
    });
  };

  const handleErrorClick = () => {
    addToast({
      message: "This is an error toast message!",
      variant: "error",
      duration: 2000,
    });
  };

  return (
    <div>
      Home
      <button onClick={handleClick}>Show Info Toast</button>
      <button onClick={handleErrorClick}>Show Error Toast</button>
    </div>
  );
};
