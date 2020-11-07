const homeContainer = document.querySelector(".home-container");

if (homeContainer) {
  homeContainer.style.backgroundImage = "url('/images/cover1.jpg')";
  let counter = 2;
  setInterval(function(){
    if (counter > 5) {
      counter = 1;
    }
    homeContainer.style.backgroundImage = "url('/images/cover"+counter+".jpg')";
    counter++;
  }, 15000);
}