import underlineSrc from "../assets/underline.svg";

export const updateProfileInformation = (data) => {
  const { firstName, lastName, avatarSrc, jobTitle, companyName, } = data;
  const headerNode = document.querySelector("#profile-header .profile-header");
  const profileAvatarNode = headerNode.querySelector("img");
  const nameNode = headerNode.querySelector(".profile-info .profile-info-name");
  const underlineNode = headerNode.querySelector(".profile-underline");
  const jobDesc = headerNode.querySelector(".profile-info .profile-job");

  underlineNode.setAttribute("src", underlineSrc);

  nameNode.classList.remove(
    "loading",
    "skeleton-block",
    "skeleton-block--half",
  );

  jobDesc.classList.remove(
    "loading",
    "skeleton-block",
    "skeleton-block--quarter",
  );

  nameNode.innerHTML = `${firstName} ${lastName}`;
  nameNode.appendChild(underlineNode);
  profileAvatarNode.src = avatarSrc;
  profileAvatarNode.setAttribute("aria-label", `${firstName} ${lastName}`);
  jobDesc.innerHTML = `${jobTitle} @ ${companyName}`;

  if (!avatarSrc) {
    profileAvatarNode.remove();
  }
};
