let user = { friends: 5, postsToday: 0 }; // Mock user data

function canPost() {
    if (user.friends === 0) return false;
    if (user.friends >= 10) return true;
    return user.postsToday < user.friends;
}

function updateUI() {
    const postButton = document.getElementById("postButton");
    const postContent = document.getElementById("postContent");
    const mediaUpload = document.getElementById("mediaUpload");
    const status = document.getElementById("status");

    if (canPost()) {
        postButton.disabled = false;
        postButton.classList.remove("disabled");
        postContent.disabled = false;
        mediaUpload.disabled = false;
        status.innerText = "You can post today!";
    } else {
        postButton.disabled = true;
        postButton.classList.add("disabled");
        postContent.disabled = true;
        mediaUpload.disabled = true;
        status.innerText = "You have reached your daily limit or have no friends.";
    }
}

document.getElementById("postButton").addEventListener("click", function() {
    if (!canPost()) return;

    const content = document.getElementById("postContent").value;
    const file = document.getElementById("mediaUpload").files[0];
    
    let postHTML = `<div class="post">
        <p>${content}</p>`;
    
    if (file) {
        const fileURL = URL.createObjectURL(file);
        if (file.type.startsWith("image")) {
            postHTML += `<img src="${fileURL}" alt="Uploaded Image">`;
        } else if (file.type.startsWith("video")) {
            postHTML += `<video controls><source src="${fileURL}" type="${file.type}"></video>`;
        }
    }
    
    postHTML += `
        <p><span class="like" onclick="likePost(this)">👍 Like</span> | 
        <span class="comment" onclick="commentPost(this)">💬 Comment</span></p>
    </div>`;
    
    document.getElementById("posts").innerHTML += postHTML;
    
    user.postsToday++;
    updateUI();
});

function likePost(element) {
    element.innerHTML = "👍 Liked!";
}

function commentPost(element) {
    let comment = prompt("Enter your comment:");
    if (comment) {
        let commentHTML = `<p><b>Comment:</b> ${comment}</p>`;
        element.parentNode.insertAdjacentHTML("beforeend", commentHTML);
    }
}

updateUI();