/* eslint-disable react/prop-types */
import "../../styles/design.css";
import { useState } from "react";

const HeartButton = ({ onClick }) => {
  const [liked, setLiked] = useState(false);

  const toggleHeart = (event) => {
    event.stopPropagation();
    setLiked(!liked);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div id="heart" onClick={toggleHeart} style={{ cursor: "pointer" }}>
      {liked ? (
        <i aria-hidden="true">
          <img className="sm:w-6 w-5" src="../src/assets/heart.png" />
        </i>
      ) : (
        <i aria-hidden="true">
          <img className="sm:w-6 w-5" src="../src/assets/like.png" />
        </i>
      )}
    </div>
  );
};

export default HeartButton;
