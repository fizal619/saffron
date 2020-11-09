const homeContainer = document.querySelector(".home-container");
const bagContainer = document.querySelector(".bag");
const bagIcon = document.querySelector("#bag-icon");
const total = document.querySelector("#total");
const totalContainer = document.querySelector("#total-container");
const bagClose = document.querySelector("#bag-close");
const bagItems = document.querySelector(".rendered-bag-items");
const ordersContainer = document.querySelector(".order-container");
const bag = {}

function commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

if (bagContainer) {
  bagIcon.addEventListener("click", function(){
    bagContainer.style.display = "block";
    ordersContainer.classList.add("bag-open");
  });

  bagClose.addEventListener("click", function(){
    bagContainer.style.display = "none";
    ordersContainer.classList.remove("bag-open");
  });

  bagContainer.addEventListener("click", function(e){
    if (e.target.classList.contains("bag")) {
      bagContainer.style.display = "none";
      ordersContainer.classList.remove("bag-open");
    }
  })

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
    qty: parseInt(e.target.qty.value),
    price: parseInt(e.target.price.value.replace(",","")),
    instructions: e.target.instructions.value
  };
  console.log(itemObj);
  bag[Date.now()] = itemObj;
  Toastify({
    text: "Item added to bag",
    duration: 2000,
    stopOnFocus: false,
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

function removeFromBag(e) {
  delete bag[e.target.dataset.id];
  renderBag();
}

function renderBag() {
  const bagKeys = Object.keys(bag);
  let runningTotal = 0;
  bagItems.innerHTML = "";
  if (bagKeys.length === 0) {
    total.textContent = `$${commas(runningTotal)}`;
    totalContainer.style.display = "none";
    return;
  } else {
    totalContainer.style.display = "block";
  }
  for (key in bag) {
    console.log(key)
    const item = bag[key];
    const el = document.createElement("div");
    el.classList.add("bag-item");
    el.innerHTML = `
      <p class="bag-item-price">
        $${commas(item.qty * item.price)}
      </p>
      <p> <strong>${item.qty}</strong> x ${item.name}${item.option ? ", " + item.option : ""}  </p>
      <button
        class="btn btn-outline-primary btn-sm delete" data-id="${key}"
      >
        Delete
      </button>
      <p class="bag-item-instruction">
        <em>${item.instructions} &nbsp</em>
      </p>
    `;
    runningTotal += item.qty * item.price;
    bagItems.appendChild(el);
    bagItems.querySelector(".delete")
      .addEventListener("click", removeFromBag);
    bagItems.appendChild(document.createElement("br"));
  }
  total.textContent = `$${commas(runningTotal)}`;
}
