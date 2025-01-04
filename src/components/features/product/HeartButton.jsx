/* eslint-disable react/prop-types */
import "../../styles/design.css";
import { useState } from "react";
import Heart from '../../../assets/heart.png'
import Like from '../../../assets/like.png'

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
          <img className="sm:w-6 w-5" src={Heart} />
        </i>
      ) : (
        <i aria-hidden="true">
          <img className="sm:w-6 w-5" src={Like} />
        </i>
      )}
    </div>
  );
};

export default HeartButton;
