import { removeChildNodes } from "../utils";

/**
 * Function which generates a single Card node based on a dataset
 *
 * @param {object} data data containing attributes of a card
 * @return {Node} generated markup for a card
 */
const generateCardNode = (data) => {
  const {
    authorFirstName,
    authorLastName,
    authorAvatarSrc,
    jobTitle,
    companyName,
    post,
    publishDate,
    city,
    state,
  } = data;
  const templateId = "profile-post-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const authorName = clone.querySelector(".post-author-info .page-paragraph");
  const jobDesc = clone.querySelector(".post-author-info .page-micro");
  const postNode = clone.querySelector(".post-content");
  const avatarNode = clone.querySelector(".post-author-avatar");
  const postDate = clone.querySelector(".page-date");
  const postLocation = clone.querySelector(".page-location");

  authorName.innerHTML = `${authorFirstName} ${authorLastName}`;
  jobDesc.innerHTML = `${jobTitle} @ ${companyName}`;
  postNode.innerHTML = post;
  // Date & Location
  // Reordering json object and displaying only date
  postDate.innerHTML = `${publishDate.slice(5,7)}${publishDate.slice(7,10)}-${publishDate.slice(0,4)}`;
  postLocation.innerHTML = `Posted: ${city}, ${state}`;

  if (authorAvatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = authorAvatarSrc;
    avatarImg.setAttribute(
      "aria-label",
      `${authorFirstName} ${authorLastName}`
    );
    avatarNode.appendChild(avatarImg);
  }

  return clone;
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generatePinnedPostsFromTemplate = (resultsData) => {
  const pinnedPostsList = document.querySelector(
    "#profile-posts .profile-post-results"
  );

  removeChildNodes(pinnedPostsList);

  if (resultsData.pinnedPost) {
    const postNode = generateCardNode(resultsData.pinnedPost);
    pinnedPostsList.appendChild(postNode);
  }
};
