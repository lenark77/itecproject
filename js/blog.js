/* Load news posts from data/posts.json */
document.addEventListener("DOMContentLoaded", function () {
  const blogList = document.getElementById("blog-list");
  if (!blogList) return;

  fetch("data/posts.json")
    .then(function (response) {
      if (!response.ok) throw new Error("Could not load posts");
      return response.json();
    })
    .then(function (posts) {
      posts.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      posts.forEach(function (post, index) {
        const article = document.createElement("article");
        article.className = "post-card";
        article.dataset.title = post.title;
        article.dataset.category = post.category;
        article.dataset.description = post.summary + " " + post.content;

        const date = new Date(post.date + "T00:00:00");
        const formattedDate = date.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });

        article.innerHTML = `
          <div>
            <span class="post-category">${post.category}</span>
            ${index === 0 ? '<span class="latest-badge">Latest Post</span>' : ""}
          </div>
          <h2>${post.title}</h2>
          <p class="post-meta">${formattedDate}</p>
          <p>${post.summary}</p>
          <p class="post-content">${post.content}</p>
          <button class="read-more" type="button">Read More</button>
        `;

        article.querySelector(".read-more").addEventListener("click", function () {
          const content = article.querySelector(".post-content");
          content.classList.toggle("show");
          this.textContent = content.classList.contains("show") ? "Show Less" : "Read More";
        });

        blogList.appendChild(article);
      });

      document.getElementById("blog-loading").style.display = "none";
      setupFilter("blog-filter", ".post-card", "blog-no-results");
    })
    .catch(function (error) {
      console.error(error);
      document.getElementById("blog-loading").textContent = "The news posts could not be loaded.";
    });
});
