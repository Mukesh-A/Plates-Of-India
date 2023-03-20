import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div style={{ margin: "100px 500px" }}>
      <h5>Redirecting in {count} seconds</h5>
    </div>
  );
};
