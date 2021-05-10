function Scroll() {
  var button = document.getElementById("projects");
  button.scrollIntoView();
}

// Navigation bar referenced https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_responsive_navbar_dropdown for responsiveness

function burgerIcon() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}