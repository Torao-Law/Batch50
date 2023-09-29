// datanya dari mana ?
// kita save kemana ?
const data = []

function submitData(event) {
  event.preventDefault()

  let title = document.getElementById("input-blog-title").value
  let content = document.getElementById("input-blog-content").value
  let image = document.getElementById("input-blog-image").files

  image = URL.createObjectURL(image[0])

  const obj = {
    title,
    content,
    image,
    postedAt: new Date(),
    author: "Dandi Saputra"
  }

  data.push(obj)
  renderBlog()
}

function renderBlog() {
  document.getElementById("contents").innerHTML = ""

  for(let i = 0; i < data.length; i++) {
    document.getElementById("contents").innerHTML += `<div class="blog-list-item">
    <div class="blog-image">
      <img src="${data[i].image}" alt="" />
    </div>
    <div class="blog-content">
      <div class="btn-group">
        <button class="btn-edit">Edit Post</button>
        <button class="btn-post">Post Blog</button>
      </div>
      <h1>
        <a href="blog-detail.html" target="_blank"
          >${data[i].title}</a
        >
      </h1>
      <div class="detail-blog-content">
        ${data[i].postedAt} | ${data[i].author}
      </div>
      <p>
        ${data[i].content}
      </p>

      <div style="float:right; margin: 10px">
        <p style="font-size: 15px; color:grey">1 minutes ago</p>
      </div>
    </div>
  </div>`
  }
}




