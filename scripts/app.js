"use strict";

const avatarName = document.querySelector("#avatar-name");
const avatarDesg = document.querySelector("#avatar-designation");
const avatarAbout = document.querySelector("#avatar-about");
const linksSection = document.querySelector("#links");

const fetchJSON = async function () {
  const response = await fetch("./assets/data.json");
  return response.json();
};

const loadData = async function () {
  const data = await fetchJSON();

  avatarName.textContent = data.name;
  avatarDesg.textContent = data.designation;
  avatarAbout.textContent = data.about;

  for (let i = 0; i < data.linksContainer.length; i++) {
    await loadLinkSection(data.linksContainer[i], i);
  }

//   data.linksContainer.forEach(function (linkObject, index) {
//     loadLinkSection(linkObject, index);
//   });
};

async function loadLinkSection(linkObject, count) {
  const subHTML = `
      <div class="links-sub-section">
          <div class="link-head">
          <h2>${linkObject.type}</h2>
          </div>
          <ul class="links-container">
          </ul>
      </div>
      `;

  linksSection.insertAdjacentHTML("beforeend", subHTML);

  for (let i = 0; i < linkObject.links.length; i++) {
    let link = await getLink(linkObject.links[i]);

    document
      .querySelectorAll(".links-container")
      [count].insertAdjacentHTML("beforeend", link);
  }
}

async function getLink(link) {
  const linkEle = `
    <li class="link">
    <a href="${link.url}" target="_blank" rel="noreferrer noopener">${link.heading}</a>
    </li>
  `;

  return linkEle;
}

loadData();

/* <li class="link">
<a href="https://twitter.com/greeshmamedam">twitter</a>
</li> 

<div class="links-sub-section">
    <div class="link-head socials">
    <h2>Socials</h2>
    </div>
    <ul class="links-container">
    <li class="link">
        <a href="https://twitter.com/greeshmamedam">twitter</a>
    </li>
    <li class="link">
        <a href="https://twitter.com/greeshmamedam">twitter</a>
    </li>
    <li class="link">
        <a href="https://twitter.com/greeshmamedam">twitter</a>
    </li>
    </ul>
</div>
*/
