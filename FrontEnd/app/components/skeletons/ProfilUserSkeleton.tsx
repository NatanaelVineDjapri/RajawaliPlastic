import React from "react";

const ProfileUserSkeleton: React.FC = () => {
  const dummyChats = [1, 2, 3, 4, 5,6,7,8,];

  const shimmerStyle: React.CSSProperties = {
    background: "#f6f7f8",
    backgroundImage: "linear-gradient(90deg, #f0f0f0 0px, #e8e8e8 40px, #f0f0f0 80px)",
    backgroundSize: "200px 100%",
    backgroundRepeat: "no-repeat",
    animation: "skeleton-shimmer 1.5s infinite linear",
    width: "100%",
    height: "100%",
    borderRadius: "inherit", 
  };

  return (
    <>
      <style>
        {`
          @keyframes skeleton-shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
        `}
      </style>

      <div className="chat-box" style={{ height: "100%", pointerEvents: "none" }}>
        <div className="chat-inner">
          <div className="chat-input" style={{ opacity: 0.6, paddingTop:"20px"}}>
            <div style={{ width: "24px", height: "24px", margin: "0 10px" }}>
              <div style={{ ...shimmerStyle, borderRadius: "50%" }} />
            </div>

            <div
              style={{
                flex: 1,
                height: "40px",
                margin: "0 10px",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div style={{ ...shimmerStyle }} />
            </div>

            <div style={{ width: "30px", height: "30px", marginLeft: "10px" }}>
              <div style={{ ...shimmerStyle, borderRadius: "50%" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUserSkeleton;