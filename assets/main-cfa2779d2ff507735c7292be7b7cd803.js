const homeContainer = document.querySelector(".home-container");
const bagContainer = document.querySelector(".bag");
const bagIcon = document.querySelector("#bag-icon");
const bagClose = document.querySelector("#bag-close");
const bagItems = document.querySelector("#bag-items");
const bag = {}


if (bagContainer) {
  bagIcon.addEventListener("click", function(){
    bagContainer.style.display = "block";
  });

  bagClose.addEventListener("click", function(){
    bagContainer.style.display = "none";
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
    duration: 3000
  }).showToast();
  e.target.parentElement.querySelector(".closeBtn").click();
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
