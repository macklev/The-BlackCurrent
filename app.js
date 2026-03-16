const STORAGE_KEY = "blackcurrent-posts";

function getPosts() {
    const rawPosts = localStorage.getItem(STORAGE_KEY);
    if (!rawPosts) {
        return [];
    }

    try {
        return JSON.parse(rawPosts);
    } catch {
        return [];
    }
}

function savePosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString();
}

function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function createPostMarkup(post) {
    const text = post.text ? `<p>${escapeHtml(post.text)}</p>` : "";
    const image = post.image
        ? `<img src="${post.image}" alt="Post image" class="post-image">`
        : "";

    return `
        <article class="post-card">
            ${text}
            ${image}
            <small>${formatDate(post.createdAt)}</small>
        </article>
    `;
}

function renderPosts(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        return;
    }

    const posts = getPosts();
    if (!posts.length) {
        container.innerHTML = '<p class="empty-feed">No posts yet. Create one from the Post page.</p>';
        return;
    }

    container.innerHTML = posts
        .slice()
        .reverse()
        .map((post) => createPostMarkup(post))
        .join("");
}

function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Could not read image file."));
        reader.readAsDataURL(file);
    });
}

async function setupPostForm() {
    const form = document.querySelector(".make-post");
    if (!form) {
        return;
    }

    const textInput = document.getElementById("post-text");
    const imageInput = document.getElementById("post-image");
    const message = document.getElementById("post-message");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const text = textInput.value.trim();
        const file = imageInput.files[0];

        if (!text && !file) {
            message.textContent = "Add text, an image, or both before posting.";
            return;
        }

        let imageDataUrl = "";
        if (file) {
            try {
                imageDataUrl = await fileToDataUrl(file);
            } catch (error) {
                message.textContent = error.message;
                return;
            }
        }

        const posts = getPosts();
        posts.push({
            id: crypto.randomUUID(),
            text,
            image: imageDataUrl,
            createdAt: new Date().toISOString()
        });
        savePosts(posts);

        form.reset();
        message.textContent = "Post created.";
        renderPosts(".post-feed");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupPostForm();
    renderPosts(".feed-posts");
    renderPosts(".post-feed");
});