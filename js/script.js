let alrPosted = 0;
let postList = `https://www.lini.dev/wp-json/wp/v2/posts?per_page=10&offset=${alrPosted}`;
const postsUrl = "https://www.lini.dev/wp-json/wp/v2/posts?per_page=50";
let singlePost = "https://www.lini.dev/wp-json/wp/v2/posts/?slug=";



const form = document.querySelector("form#contactInfo");

/**
 * universal function to fetch
 */
async function fetchApi(api) {
  try {
    let response = await fetch(api);
    if (response.ok) {
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
  console.log(posts);
  displayMultiplePosts(posts);
}

/**
 * function that displays more than 1 post at a time
 */
function displayMultiplePosts() {
  let siteTest = document.querySelector(".container");
  for (let i = 0; i < posts.length; i++) {
    let title = posts[i].title.rendered;
    let iconImg = posts[i].better_featured_image.source_url;
    siteTest.innerHTML +=
      `<div id = ${title.replace(/[ ]/g, "_")}_container><h1>${title}</h1>` +
      posts[i].excerpt.rendered +
      "<img src=" +
      iconImg +
      "/> <br>" +
      `<a class ="hyperlink" href="post.html?${posts[i].slug}" >Read more</a>` + "</div";
  }
}

/**
 * post page function
 */
async function postPage() {
  let query = location.search;
  if (!query) return (location.href = "index.html");
  document.title = `My blog |${query.replace(/[?-]/g, " ")}`;

  fullPost = await fetchApi(singlePost + query);
  console.log(fullPost);
  displayPost(fullPost);
}

function displayPost() {
  let PostBody = document.querySelector(".content");
  let iconImg = fullPost[0].better_featured_image.source_url;

  PostBody.innerHTML =
    `<h1>${fullPost[0].title.rendered}</h1>` +
    fullPost[0].content.rendered +
    "<img src=" +
    iconImg +
    "/>";
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

  let nameInp = document.querySelector("input#name");
  let subjectInp = document.querySelector("input#subject");
  let emailInp = document.querySelector("input#email");
  let msgContentInp = document.querySelector("input#msgContent");

  let nameMsg = document.querySelector("span#nameMsg");
  let subjectMsg = document.querySelector("span#subjectMsg");
  let emailMsg = document.querySelector("span#emailMsg");
  let msgContentMsg = document.querySelector("span#msgContentMsg");

  let contactHeader = document.getElementById("contactHeader");

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

    let reButton = document.createElement("button");
    reButton.innerHTML = "Continue";
    reButton.id = "return";
    form.appendChild(reButton);

    document.getElementById("return").onclick = function () {
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
 * list
 */

 async function fetchList() {
  posts = await fetchApi(postList);
  console.log(posts);
  displayMultiplePosts(posts);



}


function testTrykk() {
  alrPosted += 10;
  postList = `https://www.lini.dev/wp-json/wp/v2/posts?per_page=10&offset=${alrPosted}`;
    fetchList();
    console.log(alrPosted)
    console.log(postList)
  }

