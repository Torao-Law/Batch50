let isOpen = false // true
function openhumberger() {
  let humbergerNav = document.getElementById("humberger-nav-container")
  let testing = document.getElementsByClassName("humberger-nav-container")
  console.log(testing);
  if(!isOpen) {
    humbergerNav.style.display= "block";
    isOpen = true
  } else {
    humbergerNav.style.display= "none";
    isOpen = false
  }
}