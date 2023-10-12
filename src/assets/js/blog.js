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
        ${getTime(data[i].postedAt)} | ${data[i].author}
      </div>
      <p>
        ${data[i].content}
      </p>

      <div style="float:right; margin: 10px">
        <p style="font-size: 15px; color:grey">${getDuration(data[i].postedAt)}</p>
      </div>
    </div>
  </div>`
  }
}

function getTime(time) {
  let year = time.getFullYear()
  let month = time.getMonth() // 0 sd 11
  let date = time.getDate()
  let hour = time.getHours()
  let minute = time.getMinutes()
  const nameMonth = ["January", "Februari", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  
  return `${date} ${nameMonth[month]} ${year} ${hour} : ${minute} WIB`
}

function getDuration(time) {
  const timeNow = new Date()
  const timePost = new Date(time)
  const distance = timeNow - timePost

  const dayDistance = Math.floor(distance / (24 * 60 * 60 * 1000))
  if(dayDistance > 0) {
    return dayDistance + " Day Ago" // 2 Days ago
  } else {
    const hourDistance = Math.floor(distance / (60 * 60 * 1000))
    if(hourDistance > 0) {
      return hourDistance + " Hour Ago"
    } else {
      const minuteDistance = Math.floor(distance / (60 * 1000))
      if(minuteDistance > 0) {
        return minuteDistance + " Minute Ago"
      } else {
        const secondDistance = Math.floor(distance / 1000)
        if(secondDistance > 0) {
          return secondDistance + " Second Ago"
        }
      }
    }
  }
}

// setInterval(renderBlog, 1000)

// 1 tahun = 12 bln
// 1 bln = 31 hari
// 1 minggu = 7 hari
// 1 hari = 24 jam
// 1 jam = 60 menit
// 1 menit = 60 detik
// 1 detik = 1000 milidetik