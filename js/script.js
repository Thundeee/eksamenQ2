let postsUrl =
  "https://www.lini.dev/wp-json/wp/v2/posts?per_page=50";
let singlePost =
  "https://www.lini.dev/wp-json/wp/v2/posts/?slug="


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
 * home page instant function
 */
  async function startProcessHome() {
    posts = await fetchApi(postsUrl);
    console.log(posts);
    displayContentHomePage(posts);
    
  }

/**
 * makes content for home page
 */
function displayContentHomePage() {
    let siteTest = document.querySelector("body");
    for (let i = 0; i < posts.length; i++) {
        siteTest.innerHTML += `<h1>${posts[i].title.rendered}</h1>` + posts[i].excerpt.rendered + `<a class ="hyperlink" href="post.html?${posts[i].slug}" >Read more</a>`;
    }

    
}


/**
 * post page function
 */
 async function postPage() {
  let query = location.search;
  if (!query) return location.href = "index.html";
  document.title = `My blog |${query.replace(/[?-]/g, " ")}`;


 fullPost = await fetchApi(singlePost + query)
 console.log(fullPost);
 displayPost(fullPost);
 };


 function displayPost() {
  let PostBody = document.querySelector(".content");

  PostBody.innerHTML = `<h1>${fullPost[0].title.rendered}</h1>` + fullPost[0].content.rendered;


   
 }