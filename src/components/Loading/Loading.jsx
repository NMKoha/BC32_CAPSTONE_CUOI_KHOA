import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        backgroundColor: "#000",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <img
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        src="     https://media.giphy.com/media/WiIuC6fAOoXD2/giphy.gif"
        alt=""
      />
    </div>
  );
};

export default Loading;
