import "../Assets/CSS/Reaction.css";
import { useEffect, useState } from "react";
import {
  createReaction,
  getUser,
  deleteReaction,
  doesReactionExist,
  getReactions,
} from "../data/repository";

const Reaction = (props) => {
  const happy = "😁";
  const sad = "😞";
  const angry = "😠";
  const like = "👍";
  const dislike = "👎";

  const reactionIds = [
    "like" + props.postId,
    "dislike" + props.postId,
    "happy" + props.postId,
    "sad" + props.postId,
    "angry" + props.postId,
  ];
  const [userReaction, setUserReaction] = useState({
    userEmail: getUser().email,
    postId: props.postId,
    reaction: "",
  });

  useEffect(() => {
    const changeReaction = async () => {
      if (userReaction.reaction !== "") {
        const deleteOldReaction = await deleteReaction(userReaction);

        const result = await createReaction(userReaction);
      }
    };
    changeReaction();
  }, [userReaction]);

  useEffect(() => {
    const getOldReaction = async () => {
      const reaction = await doesReactionExist(props.postId, getUser().email);
      try {
        setUserReaction({ ...userReaction, reaction: reaction[0].reaction });
      } catch {}
      displayUserReaction(reaction[0].reaction);
    };
    getOldReaction();
  }, []);

  const handleReaction = (reaction) => {
    setUserReaction({ ...userReaction, reaction: reaction });
    displayUserReaction(reaction);
  };

  //updates the background colour of the clicked reaction button
  const displayUserReaction = (reaction) => {
    for (const id of reactionIds) {
      const icon = document.getElementById(id);
      icon.style.backgroundColor = "white";
    }
    const icon = document.getElementById(reaction + props.postId);
    icon.style.backgroundColor = "blue";
  };

  return (
    <div>
      <table>
        <tr>
          <th onClick={() => handleReaction("like")}>
            <button id={reactionIds[0]} className="reaction">
              {like}
            </button>
          </th>{" "}
          <th onClick={() => handleReaction("dislike")}>
            <button id={reactionIds[1]} className="reaction">
              {dislike}
            </button>
          </th>
          <th onClick={() => handleReaction("happy")}>
            <button id={reactionIds[2]} className="reaction">
              {happy}
            </button>
          </th>
          <th onClick={() => handleReaction("sad")}>
            <button id={reactionIds[3]} className="reaction">
              {sad}
            </button>
          </th>{" "}
          <th onClick={() => handleReaction("angry")}>
            <button id={reactionIds[4]} className="reaction">
              {angry}
            </button>
          </th>{" "}
        </tr>
      </table>
    </div>
  );
};

export default Reaction;
