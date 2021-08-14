const commentFormHandler = async (event) => {
    event.preventDefault();
    const body = document.querySelector('#comment-text').value;
    const post_id = document.querySelector('#postID').textContent.trim();
    const user_id = document.querySelector('#userID').textContent.trim();

    if (body && post_id && user_id) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ body, post_id, user_id }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok){
            document.location.replace(`/api/posts/${post_id}`)
        } else {
            alert('Could not post comment!')
        }
    }
}

document.querySelector('.commentForm').addEventListener('submit', commentFormHandler);

Handlebars.registerHelper('isUser', (user_id) => {
    const posterID = document.querySelector('#userID').textContent.trim();

    if ([posterID == user_id])
    return true;
});