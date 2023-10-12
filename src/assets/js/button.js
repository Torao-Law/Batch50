let isOpen = false // true
function openhumberger() {
  let humbergerNav = document.getElementById("humberger-nav-container")
  if(!isOpen) {
    humbergerNav.style.display= "block";
    isOpen = true
  } else {
    humbergerNav.style.display= "none";
    isOpen = false
  }
}