import { removeChildNodes } from "../utils";

const activityStates = {
  active: "active",
  inactive: "inactive",
  moderate: "moderate",
  low: "low",
};

/**
 * Function which generates a single Card node based on a dataset
 *
 * @param {object} data data containing attributes of a card
 * @return {Node} generated markup for a card
 */
const generateCardNode = (data) => {
  const { name, href, image, activity, favorite } = data;
  const templateId = "profile-group-results-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const titleNode = clone.querySelector("p.page-paragraph");
  const referenceNode = clone.querySelector("a.profile-group-results-card");
  const groupImageNode = clone.querySelector("a.profile-group-results-card img");
  const favoriteNode = clone.querySelector(".favorite-group");

  titleNode.innerHTML = `${name}`;
  referenceNode.href = href;
  groupImageNode.src = image;

  // check activity status of group json object
  if (`${activity}` == activityStates.active) {
    referenceNode.style.backgroundColor = "var(--secondary)";
  } 
  else if (`${activity}` == activityStates.moderate) {
    referenceNode.style.backgroundColor = "var(--primary)";
  }
  else if (`${activity}` == activityStates.low) {
    referenceNode.style.backgroundColor = "var(--warning)";
  } 
  else {
    referenceNode.style.backgroundColor = "var(--grayscale_2)";
  }

  // check if favorite is false
  // remove element if so
  if (favorite == false) {
    favoriteNode.remove();
  } 

  return clone;
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generateProfileGroupItemsFromTemplate = (resultsData) => {
  const profileGroupsList = document.querySelector(
    "#profile-groups .profile-group-results"
  );

  removeChildNodes(profileGroupsList);

  if (resultsData.groups && resultsData.groups.length > 0) {
    for (let i = 0; i < resultsData.groups.length; i++) {
      const groupNode = generateCardNode(resultsData.groups[i]);
      profileGroupsList.appendChild(groupNode);
    }
  }
};
