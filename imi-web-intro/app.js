// API address
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Get HTML elements
const postsContainer = document.getElementById("postsContainer");
const statusElement = document.getElementById("status");
const reloadButton = document.getElementById("reloadButton");


// Function to display posts
function displayPosts(posts) {

    postsContainer.innerHTML = "";

    posts.forEach(function(post) {

        const postCard = document.createElement("article");

        postCard.classList.add("post-card");

        const title = document.createElement("h3");
        title.textContent = post.title;

        const body = document.createElement("p");
        body.textContent = post.body;

        const postId = document.createElement("div");
        postId.classList.add("post-id");
        postId.textContent = "Post ID: " + post.id;

        postCard.appendChild(title);
        postCard.appendChild(body);
        postCard.appendChild(postId);

        postsContainer.appendChild(postCard);

    });

}


// Function to get posts from API
async function fetchPosts() {

    // Clear previous posts
    postsContainer.innerHTML = "";

    // Show loading message
    statusElement.textContent = "Загрузка…";
    statusElement.classList.remove("error");

    try {

        // Send GET request
        const response = await fetch(API_URL);

        // Check HTTP response
        if (!response.ok) {
            throw new Error(
                "HTTP error! Status: " + response.status
            );
        }

        // Convert response into JSON
        const posts = await response.json();

        // Display posts
        displayPosts(posts);

        // Remove loading message
        statusElement.textContent = "";

    } catch (error) {

        // Display error message
        console.error("Error:", error);

        statusElement.textContent =
            "Не удалось загрузить данные. Проверьте подключение к интернету и попробуйте ещё раз.";

        statusElement.classList.add("error");

    }

}


// Load posts when page opens
fetchPosts();


// Reload posts when button is clicked
reloadButton.addEventListener("click", fetchPosts);


