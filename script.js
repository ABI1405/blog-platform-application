let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function displayPosts() {
    const postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";

    posts.forEach((post, index) => {
        postsDiv.innerHTML += `
            <div class="post">
                <h2>${post.title}</h2>
                <p>${post.content}</p>

                <div class="actions">
                    <button onclick="editPost(${index})">Edit</button>
                    <button onclick="deletePost(${index})">Delete</button>
                </div>

                <div class="comment-box">
                    <input type="text" id="comment${index}" placeholder="Write a comment">
                    <button onclick="addComment(${index})">Comment</button>

                    <div id="comments${index}">
                        ${post.comments.map(c => `<div class="comment">${c}</div>`).join("")}
                    </div>
                </div>
            </div>
        `;
    });
}

function addPost() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (title === "" || content === "") {
        alert("Please fill all fields");
        return;
    }

    posts.push({
        title,
        content,
        comments: []
    });

    savePosts();
    displayPosts();

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}

function deletePost(index) {
    posts.splice(index, 1);
    savePosts();
    displayPosts();
}

function editPost(index) {
    document.getElementById("title").value = posts[index].title;
    document.getElementById("content").value = posts[index].content;

    posts.splice(index, 1);
    savePosts();
    displayPosts();
}

function addComment(index) {
    const input = document.getElementById("comment" + index);

    if (input.value === "") return;

    posts[index].comments.push(input.value);

    savePosts();
    displayPosts();
}

displayPosts()