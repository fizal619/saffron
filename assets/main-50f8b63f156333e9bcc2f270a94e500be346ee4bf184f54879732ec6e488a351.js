const homeContainer = document.querySelector(".home-container");
const bagContainer = document.querySelector(".bag");
const bagIcon = document.querySelector("#bag-icon");
const bagClose = document.querySelector("#bag-close");
const bagItems = document.querySelector("#bag-items");
const ordersContainer = document.querySelector(".order-container");
const bag = {}


if (bagContainer) {
  bagIcon.addEventListener("click", function(){
    bagContainer.style.display = "block";
    ordersContainer.classList.add("bag-open");
  });

  bagClose.addEventListener("click", function(){
    bagContainer.style.display = "none";
    ordersContainer.classList.remove("bag-open");
  });

}

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

// #9A7DCA

function addToBagHandler(e) {
  e.preventDefault();
  const itemObj = {
    name: e.target.name.value,
    option: e.target.option ? e.target.option.value : "",
    qty: e.target.qty.value,
    price: e.target.price.value,
    instructions: e.target.instructions.value
  };
  console.log(itemObj);
  bag[Date.now()] = itemObj;
  Toastify({
    text: "Item added to bag",
    duration: 2000,
    stopOnFocus: true,
    backgroundColor: "linear-gradient(to right, #b095db, #9A7DCA)"
  }).showToast();
  e.target.parentElement.querySelector(".closeBtn").click();

  bagIcon.style.animation = "";
  setTimeout(function(){
    bagIcon.style.animation = "wiggle 0.3s ease-in-out forwards";
    setTimeout(function(){
      bagIcon.style.animation = "";

    }, 1000);
  }, 2000);

  e.target.reset();
  renderBag();
}

function renderBag() {
  const bagKeys = Object.keys(bag);
  if (bagKeys.length === 0) {
    return;
  }

  bagItems.innerHTML = "";

  for (key in bag) {
    console.log(key)
    const item = bag[key];
    const el = document.createElement("div");
    el.innerHTML = `
      <p>${item.qty} ${item.name} ${item.option}</p>
      <p>${parseInt(item.price.replace(",","")) * parseInt(item.qty)}</p>
    `;
    bagItems.appendChild(el);
  }

}
;
