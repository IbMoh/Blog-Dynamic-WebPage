const postsURL = 'https://dummyjson.com/posts?limit=150'
const usersURL = 'https://dummyjson.com/users?limit=150'
const commentsURL = 'https://dummyjson.com/comments?limit=150'

async function fetchData(url) {
    
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("The API you are trying to connect to did not respond")
        }
        return await response.json()
    } catch (error) {
        return console.error(`Error: ${error}`)
    }
}

async function fetchPosts(){
 
    try {
        const data = await fetchData(postsURL)
        return data.posts
    } catch (error) {
        return console.error(`Error: ${error}`)
    }
    
}

async function fetchComments(){

    try{
        const data = await fetchData(commentsURL)
        return data.comments
    }catch(error){
        return console.error(`Error: ${error}`)
    }
}

async function fetchUsers(){

    try{
        const data = await fetchData(usersURL)
        return data.users
    }catch(error){
        return console.error(`Error: ${error}`)
    }
}

async function display(startIndex, numberOfPosts){
    
    const post = await fetchPosts()
    const comment = await fetchComments()
    const user = await fetchUsers()

    const containerForPosts = document.querySelector(".post-container")

    post.slice(startIndex, startIndex + numberOfPosts).forEach(userPost => {

        const articleElement = document.createElement("article")
        articleElement.className = "user-post"
        
        const postHeader = document.createElement("header")
        postHeader.id = "user-post-header"

        const title = document.createElement("h2")
        title.id = "post-title"
        title.textContent = userPost.title

        const bodyConatainer = document.createElement("section")
        bodyConatainer.id = "post-body"

        const bodyText = document.createElement("p")
        bodyText.id = "post"
        bodyText.textContent = userPost.body

        const reactions = document.createElement("span")
        reactions.id = "likes"
        reactions.textContent = `Reactions: ${userPost.reactions}`

        const tags = document.createElement("p")
        tags.id = "tags"
        tags.textContent = `Tags: ${userPost.tags}`

        bodyConatainer.appendChild(bodyText)
        bodyConatainer.appendChild(reactions)
        bodyConatainer.appendChild(tags)

        postHeader.appendChild(title)
        articleElement.appendChild(postHeader)

        const postUser = user.find(users => users.id === userPost.userId)

        if (postUser) {

            const userDiv = document.createElement("div")

            const profilePic = document.createElement("img")
            profilePic.src = postUser.image
            profilePic.alt = "Profile Picture"

            const userName = document.createElement("h3")
            userName.className = "poster-username"
            userName.textContent = postUser.username

            userDiv.appendChild(profilePic)
            userDiv.appendChild(userName)

            postHeader.appendChild(userDiv)

            userName.addEventListener('click', () => {
                const userData = user.find(u => u.id === postUser.id)
                showModal(userData)
            })
            
        } else {

            const userDiv = document.createElement("div")
            const userName = document.createElement("h3")

            userName.className = "poster-username"
            userName.textContent = 'Author'

            userDiv.appendChild(userName)
            postHeader.appendChild(userDiv)

        }
        

        articleElement.appendChild(bodyConatainer)
        containerForPosts.appendChild(articleElement)

        const postComments = comment.filter(comment => comment.postId === userPost.id)

        postComments.forEach(pc => {

            const commentArticle = document.createElement("article")
            commentArticle.className = "user-comment"

            const commentHeader = document.createElement("header")
            commentHeader.id = "commenter-header"

            const commentSection = document.createElement("section")
            commentSection.className = "comment-body"

            const commented = document.createElement("p")
            commented.id = "comment"
            commented.textContent = "Commented:"

            const commentText = document.createElement("p")
            commentText.id = "commtext"
            commentText.textContent = pc.body

            commentSection.appendChild(commented)
            commentSection.appendChild(commentText)
            commentArticle.appendChild(commentHeader)
            commentArticle.appendChild(commentSection)
            articleElement.appendChild(commentArticle)

            const commentUser = user.find(user => user.id === pc.user.id)

            if(commentUser){
                const userDiv = document.createElement("div")

                const profilePic = document.createElement("img")
                profilePic.src = commentUser.image
                profilePic.alt = "Profile Picture"

                const userName = document.createElement("h3")
                userName.className = "commentor-username"
                userName.textContent = commentUser.username

                userDiv.appendChild(profilePic)
                userDiv.appendChild(userName)

                commentHeader.appendChild(userDiv)

                userName.addEventListener('click', () => {
                    const userData = user.find(u => u.id === commentUser.id)
                    showModal(userData)
                })
            } else {
                const userDiv = document.createElement("div")
                const userName = document.createElement("h3")

                userName.className = "commentor-username"
                userName.textContent = 'Unknown Commenter'

                userDiv.appendChild(userName)
                commentHeader.appendChild(userDiv)
            }
        })
    })

}

function showModal(userData) {

    const modal = document.querySelector('.modal')
    const firstNameElement = document.getElementById('first-name')
    const lastNameElement = document.getElementById('last-name')
    const emailElement = document.getElementById('email')
    const phoneNumberElement = document.getElementById('phone-number')

    firstNameElement.textContent = `First Name: ${userData.firstName}`
    lastNameElement.textContent = `Last Name: ${userData.lastName}`
    emailElement.textContent = `Email: ${userData.email}`
    phoneNumberElement.textContent = `Phone Number: ${userData.phone}`

    modal.style.display = 'block'

    const closeButton = document.querySelector('.modal .btn')
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none'
    })

}

let firstLoad = 0
let posts = 5

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.documentElement.offsetHeight){
        display(firstLoad += 5, posts)
    }
})

display(firstLoad,posts)