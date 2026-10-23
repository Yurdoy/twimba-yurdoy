import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
let tweets = tweetsData;

const savedTweets = localStorage.getItem("tweets");

if (savedTweets) {
  tweets = JSON.parse(savedTweets);
}

document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  } else if (e.target.dataset.replyBtn) {
    handleTweetReplyBtnClick(e.target.dataset.replyBtn);
  } else if (e.target.dataset.delete) {
    handleDeleteBtnClick(e.target.dataset.delete);
  }
});

function handleLikeClick(tweetId) {
  const targetTweetObj = findByUuid(tweets, tweetId);

  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--;
  } else {
    targetTweetObj.likes++;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;
  render();
}

function handleRetweetClick(tweetId) {
  const targetTweetObj = findByUuid(tweets, tweetId);

  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--;
  } else {
    targetTweetObj.retweets++;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  render();
}

function handleReplyClick(replyId) {
  const targetTweetObj = findByUuid(tweets, replyId);
  targetTweetObj.isShown = !targetTweetObj.isShown;
  render();
}

function handleTweetBtnClick() {
  const tweetInput = document.getElementById("tweet-input");

  if (tweetInput.value) {
    tweets.unshift(createPost(tweetInput.value));
    render();
    tweetInput.value = "";
  }
}

function handleTweetReplyBtnClick(tweetId) {
  const tweetReplyInput = document.getElementById(`reply-input-${tweetId}`);

  const targetTweetObj = findByUuid(tweets, tweetId);

  if (tweetReplyInput.value) {
    targetTweetObj.replies.unshift(createPost(tweetReplyInput.value));
    render();
    tweetReplyInput.value = "";
  }
}

function createPost(tweetText) {
  return {
    handle: `@Scrimba`,
    profilePic: `images/scrimbalogo.png`,
    likes: 0,
    retweets: 0,
    tweetText,
    replies: [],
    isLiked: false,
    isRetweeted: false,
    isShown: false,
    uuid: uuidv4(),
  };
}

function handleDeleteBtnClick(tweetId) {
  tweets = tweets.filter(function (tweet) {
    return tweet.uuid !== tweetId;
  });

  render();
}

function findByUuid(array, uuid) {
  let found;

  array.forEach(function (item) {
    if (item.uuid === uuid) {
      found = item;
    }

    const foundInReplies = findByUuid(item.replies, uuid);

    if (foundInReplies) {
      found = foundInReplies;
    }
  });
  return found;
}

function getRepliesHtml(replies) {
  let repliesHtml = "";

  replies.forEach(function (reply) {
    const replyLikeClass = reply.isLiked ? "liked" : "";
    const replyRetweetClass = reply.isRetweeted ? "retweeted" : "";
    const replyHiddenClass = reply.isShown ? "" : "hidden";

    repliesHtml += `
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${reply.handle}</p>
            <p class="tweet-text">${reply.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${reply.uuid}"
                    ></i>
                    ${reply.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${replyLikeClass}"
                    data-like="${reply.uuid}"
                    ></i>
                    ${reply.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${replyRetweetClass}"
                    data-retweet="${reply.uuid}"
                    ></i>
                    ${reply.retweets}
                </span>
            </div>
        </div>
    </div>
    <div class="${replyHiddenClass}" id="replies-${reply.uuid}">
      ${getRepliesHtml(reply.replies)}
        <div>
            <textarea placeholder="Write your reply" id="reply-input-${reply.uuid}" class="tweet-details-details"></textarea>
            <button data-reply-btn="${reply.uuid}" class="tweet-reply-btn">Reply</button>
        </div>
    </div>
</div>
`;
  });
  return repliesHtml;
}

function getFeedHtml() {
  let feedHtml = "";

  tweets.forEach(function (tweet) {
    const likeIconClass = tweet.isLiked ? "liked" : "";
    const retweetIconClass = tweet.isRetweeted ? "retweeted" : "";
    const replyHiddenClass = tweet.isShown ? "" : "hidden";

    feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-trash" data-delete="${tweet.uuid}"></i>
                </span>
            </div>   
        </div>            
    </div>
    <div class="${replyHiddenClass}" id="replies-${tweet.uuid}">
        ${getRepliesHtml(tweet.replies)}
        <div>
            <textarea placeholder="Write your reply" id="reply-input-${tweet.uuid}" class="tweet-details-details"></textarea>
            <button data-reply-btn="${tweet.uuid}" class="tweet-reply-btn">Reply</button>
        </div>
    </div>   
</div>
`;
  });
  return feedHtml;
}

function render() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();
