// api links
const postsUrl = "https://www.lini.dev/wp-json/wp/v2/posts?per_page=50";
let singlePost = "https://www.lini.dev/wp-json/wp/v2/posts/?slug=";
let mediaPost = "https://www.lini.dev/wp-json/wp/v2/media?per_page=50&slug=";

// list of posts stuff
let alrPosted = 0;
let postList = `https://www.lini.dev/wp-json/wp/v2/posts?per_page=10&offset=${alrPosted}`;

// contact page stuff
const form = document.querySelector("form#contactInfo");

let nameInp = document.querySelector("input#name");
let subjectInp = document.querySelector("input#subject");
let emailInp = document.querySelector("input#email");
let msgContentInp = document.querySelector("textarea#msgContent");

let nameMsg = document.querySelector("span#nameMsg");
let subjectMsg = document.querySelector("span#subjectMsg");
let emailMsg = document.querySelector("span#emailMsg");
let msgContentMsg = document.querySelector("span#msgContentMsg");

let container = document.querySelector(".container");

// caroussel stuff
let posts = [];
let carousselPosts = [];
let currentPost = 0;

//loader
let loader = document.querySelector(".loader");

//more posts buttons
let listBttns = document.getElementById("morePosts");

/**
 * universal function to fetch
 */
async function fetchApi(api) {
  try {
    let response = await fetch(api);
    if (response.ok) {
      loader.style.display = "none";
      return await response.json();
    } else {
      alert(
        response.status +
          " failed fetch, please try again or contact site owners"
      );
    }
  } catch (error) {
    alert(error + "  please try again");
  }
}

/**
 * function to get all posts
 */
async function fetchAll() {
  posts = await fetchApi(postsUrl);
  carousselPosts = createCaroussel();
  updatePost();
}

/**
 * function that displays more than 1 post at a time
 */
function displayMultiplePosts(isList = false) {
  let listContainer = document.querySelector(".list-container");
  for (let i = 0; i < posts.length; i++) {
    let title = posts[i].title.rendered;
    let iconImg = posts[i].better_featured_image.source_url;
    listContainer.innerHTML += createContainer(
      title,
      posts[i],
      iconImg,
      isList
    );
  }
}

/**
 * Function that creates all containers for list and home page
 */
function createContainer(title, post, img, isList = false) {
  return isList
    ? `<div class ="listContainer" id = ${title.replace(
        /[ ]/g,
        "_"
      )}_container>` +
        `<div> <h1>${title}</h1><a href="post.html?${post.slug}"><img src=` +
        img +
        ` alt = "${post.title.rendered} Crest" ></a></div>` +
        post.excerpt.rendered +
        `<a class ="aButtons" id ="" href="post.html?${post.slug}" >Read more</a>` +
        "</div>"
    : `<div id = ${title.replace(/[ ]/g, "_")}_container><h1>${title}</h1>` +
        `<a href="post.html?${post.slug}"><img src=` +
        img +
        ` alt = "${post.title.rendered} Crest" ></a><br>` +
        post.excerpt.rendered +
        `<a class ="aButtons" id ="readmore" href="post.html?${post.slug}" >Read more</a>` +
        "</div>";
}

/**
 * post page function
 */
async function postPage() {
  let query = location.search;
  if (!query) return (location.href = "index.html");
  document.title = `${query
    .replace(/[?-]/g, " ")
    .replace(/\b[a-z]/g, (capital) =>
      capital.toUpperCase()
    )} - Explore Runeterra`; // credit for inspiration https://stackoverflow.com/a/16750282
  fullPost = await fetchApi(singlePost + query);
  displayPost(fullPost);
}

/**
 * Displays single post on post page
 */
function displayPost() {
  let PostBody = document.querySelector(".contentPost");
  let iconImg = fullPost[0].better_featured_image.source_url;

  PostBody.innerHTML +=
    `<div id = "titlePost" ><img src=` +
    iconImg +
    ` alt = "${fullPost[0].title.rendered} Crest" >` +
    `<h1>${fullPost[0].title.rendered}</h1></div>` +
    fullPost[0].content.rendered;

  let bigImgModal = document.querySelector(".modalPic");
  let modalOpener = document.querySelector("figure > img");
  let picTester = modalOpener.getAttribute("src");

  bigImgModal.innerHTML = `<img src = "${picTester}">;`;

  modalOpener.onclick = () => modalTest();
}

// MODAL TEST

function modalTest() {
  let modal = document.querySelector(".modalJA");

  modal.style.display = "block";
  console.log(modal);

  let outsideModal = document.querySelector(".close");

  // When the user clicks on <span> (x), close the modal
  outsideModal.onclick = () => {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = () => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

/**
 * contact page
 */

function contactPage() {
  // stops the submit and goes through all info given to see if there are any errors
  form.addEventListener("submit", validate);

  // makes reset button take away error messages + red borders
  form.addEventListener("reset", resetter);
}
/**
 * Validation function for form
 */
function validate(event) {
  event.preventDefault();

  let contactHeader = document.getElementById("contactHeader");
  let infoTextContact = document.getElementById("infoText");

  let submittedName = nameInp.value.trim();
  nameMsg.innerHTML = "";
  nameInp.style.border = "";
  if (/\d/.test(submittedName)) {
    nameMsg.innerHTML += "Your name can not contain any numbers!";
    nameInp.style.border = "1px solid red";
  } else if (submittedName.length < 5) {
    nameMsg.innerHTML += "Your name needs to be more than 5 characters long!";
    nameInp.style.border = "1px solid red";
  }
  let submittedEmail = emailInp.value.trim();
  let result = submittedEmail.toLowerCase();
  emailMsg.innerHTML = "";
  emailInp.style.border = "";
  if (
    !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      result
    )
  ) {
    emailMsg.innerHTML +=
      "Invalid email! Please try again or use a different email.";
    emailInp.style.border = "1px solid red";
  }
  let submittedSubject = subjectInp.value.trim();
  subjectMsg.innerHTML = "";
  subjectInp.style.border = "";
  if (submittedSubject.length < 15) {
    subjectMsg.innerHTML +=
      "The subject needs to be more than 15 characters long.";
    subjectInp.style.border = "1px solid red";
  }

  let submittedmsgContent = msgContentInp.value.trim();
  msgContentMsg.innerHTML = "";
  msgContentInp.style.border = "";

  if (submittedmsgContent.length < 25) {
    msgContentMsg.innerHTML +=
      "Your message needs to be more than 25 characters long!";
    msgContentInp.style.border = "1px solid red";
  }

  // checks that no errors are present
  if (
    nameMsg.innerHTML == "" &&
    subjectMsg.innerHTML == "" &&
    emailMsg.innerHTML == "" &&
    msgContentMsg.innerHTML == ""
  ) {
    contactHeader.innerHTML =
      "<br>Your request was successfully received! Press continue to return to the home page. ";
    form.innerHTML = "";
    infoTextContact.innerHTML = "";
    form.style =
      "background-color: var(--clr--tertiary); border: none; box-shadow: none;";

    let reButton = document.createElement("a");
    reButton.innerHTML = "Continue";
    reButton.id = "return";
    reButton.className = "aButtons";
    form.appendChild(reButton);

    document.getElementById("return").onclick = () => {
      location.href = "index.html";
    };
  } else {
    console.log("Error validatiting info");
  }
}
/**
 * reset function for form
 */
function resetter() {
  nameMsg.innerHTML = "";
  subjectMsg.innerHTML = "";
  emailMsg.innerHTML = "";
  msgContentMsg.innerHTML = "";

  nameInp.style.border = "";
  subjectInp.style.border = "";
  emailInp.style.border = "";
  msgContentInp.style.border = "";
}

/**
 * list page function
 */
async function fetchList() {
  posts = await fetchApi(postList);
  displayMultiplePosts(posts, true);
  listBttns.style = "display: inline-block;";
}

/**
 * Adds more posts to list page
 */
async function testPress() {
  alrPosted += 10;
  postList = `https://www.lini.dev/wp-json/wp/v2/posts?per_page=10&offset=${alrPosted}`;
  await fetchList();
  console.log(posts.length);
  if (posts.length < 10) {
    postBtn = document.getElementById("morePosts");
    postBtn.style = "display: none;";
  }
  console.log(alrPosted);
  console.log(postList);
}

/**
 * Caroussel function for home page
 */
function createCaroussel() {
  let arr = [];
  for (let post of posts) {
    let title = post.title.rendered;
    let iconImg = post.better_featured_image.source_url;
    arr.push(createContainer(title, post, iconImg));
  }
  return arr;
}

async function updatePost(change = 0) {
  changePost(change);
  let postsToDisplay = getPosts();
  container.innerHTML = postsToDisplay.join("");
}

function changePost(change) {
  currentPost += change;
  if (currentPost > carousselPosts.length - 1) currentPost = 0;
  if (currentPost < 0) currentPost = carousselPosts.length - 1;
}
/**
 * Function that sorts and displays the correct posts in the caroussel
 */
function getPosts() {
  let a,
    b,
    c = [
      currentPost - 1 < 0
        ? carousselPosts[carousselPosts.length - 1]
        : carousselPosts[currentPost - 1],
      carousselPosts[currentPost].replace("<div", '<div class="current"'),
      currentPost + 1 > carousselPosts.length - 1
        ? carousselPosts[0]
        : carousselPosts[currentPost + 1],
    ];

  return a ?? "", b ?? "", c ?? "";
}
