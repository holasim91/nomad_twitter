import { dbService, storageService } from "myBase";
import React, { useState } from "react";
const Tweet = ({ tweetObj, isOwner }) => {
  const [edting, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are u sure you want to delete this tweet?");
    if (ok) {
      //delete tweet
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.attachmentURL).delete()
    }
  };

  const onToggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };
  const onChange = (e) => {
    setNewTweet(e.target.value);
  };
  return (
    <div>
      {edting ? (
        <>
          {isOwner && (
            <>
              <h4>{tweetObj.text}</h4>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your Tweet"
                  value={newTweet}
                  onChange={onChange}
                  required
                />
                <input type="submit" value="Update" />
              </form>
              <button onClick={onToggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentURL && <img src={tweetObj.attachmentURL} width='100px' height='100px' alt='attachment' />}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>DELETE</button>
              <button onClick={onToggleEditing}>EDIT</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
