let categoryUrl =
  "https://www.lini.dev/wp-json/wp/v2/categories?per_page=50";
let postsUrl =
  "https://www.lini.dev/wp-json/wp/v2/posts?per_page=50";
let tagsUrl =
  "https://www.lini.dev/wp-json/wp/v2/tags?per_page=50";




document.querySelector("body").onload = startProcess();


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


  async function startProcess() {
    tag = await fetchApi(tagsUrl);
    posts = await fetchApi(postsUrl);
    category = await fetchApi(categoryUrl);
    console.log(category);
    console.log(tag);
    console.log(posts);
    console.log(posts[0].content)
    displayContent(posts);
    
  }


function displayContent() {
    let siteTest = document.querySelector("body");
    for (let i = 0; i < posts.length; i++) {
        siteTest.innerHTML += `<h1>${posts[i].slug}</h1>` + posts[i].content.rendered;
    }

    
}