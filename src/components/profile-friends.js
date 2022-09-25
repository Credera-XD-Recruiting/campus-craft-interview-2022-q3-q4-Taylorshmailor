import { removeChildNodes } from "../utils";

/**
 * Function which generates a single list-item node based on a dataset
 *
 * @param {object} data data containing attributes of a listItem
 * @return {Node} generated markup for a card
 */

const generateListItemNode = (data) => {
  const { avatarSrc, name, jobTitle, companyName, topFriend } = data;
  const templateId = "friend-list-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const nameNode = clone.querySelector("p.page-paragraph");
  const titleNode = clone.querySelector("p.page-micro");
  const avatarNode = clone.querySelector(".profile-list-item-avatar");
  const topFriendNode = clone.querySelector(".top-friend-flag");

  nameNode.innerHTML = `${name}`;
  titleNode.innerHTML = `${jobTitle} @ ${companyName}`;
  avatarNode.src = avatarSrc;
  avatarNode.setAttribute("aria-label", `${name}`);

  if (avatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = avatarSrc;
    avatarImg.setAttribute("aria-label", `${name}`);
    avatarNode.appendChild(avatarImg);
  } else {
    // splitting name into first and last
    // Grab only first index for both and turn uppercase
    const first = name.split(" ")[0];
    const last = name.split(" ")[1];
    const initials = first[0].toUpperCase() + last[0].toUpperCase();

    const profileInitials = document.createElement('p');
    profileInitials.className = 'profile-initials';
    profileInitials.innerHTML = initials;
    avatarNode.appendChild(profileInitials);
  }

  // check if top friend attribute is true
  // mark with block if so
  if (topFriend) {
    topFriendNode.style.display = "block";
  }

  return clone;
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */

 // sort function here
 // split name --> [first][last]
 // compare by last
const sortFriends = (a, b) => {
  if (a.split(" ")[1] < b.split(" ")[1]) 
    return -1;
  if (a.split(" ")[1] > b.split(" ")[1]) 
    return 1;
  return 0;
};

export const generateFriendsListFromTemplate = (resultsData) => {
  const friendsListSection = document.querySelector(
    "#profile-friends .profile-friends-list"
  );


  // if both are top friend --> sort alphabetically between the top
  // check if a is top friend case
  // check if b is top friend case
  // run sortFriends as default
  resultsData.friends.sort((a,b) => {
    if (a.topFriend && b.topFriend) {
      return sortFriends(a.name, b.name);
    } else {
      if (a.topFriend)
        return -1;
      else if (b.topFriend) 
        return 1;
      else 
        return sortFriends(a.name, b.name);
    }
  });

  if (resultsData.friends && resultsData.friends.length > 0) {
    removeChildNodes(friendsListSection);

    for (let i = 0; i < resultsData.friends.length; i++) {
      const friendsNode = generateListItemNode(resultsData.friends[i]);
      friendsListSection.appendChild(friendsNode);
    }
  }
};
