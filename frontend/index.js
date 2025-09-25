const input = document.getElementById("item-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("list");
const totalCountEl = document.getElementById("total-count");

let totalCount = 0;
let items = []; // store items as objects [{name, qty}]

function updateTotal() {
  totalCount = items.reduce((sum, item) => sum + item.qty, 0);
  totalCountEl.textContent = totalCount;
}

// Save to localStorage
function saveToLocalStorage() {
  localStorage.setItem("groceryList", JSON.stringify(items));
}

// Load from localStorage
function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("groceryList"));
  if (data) {
    items = data;
    items.forEach(item => {
      list.insertAdjacentHTML("beforeend", createItem(item.name, item.qty));
    });
    updateTotal();
    attachEvents();
  }
}

// Template-based item creation
function createItem(name, qty = 1) {
  return `
    <div class="item" data-name="${name}">
      <button class="icon-btn minus"><span class="material-icons">remove</span></button>
      <div class="item-details">
        <div class="item-name">${name}</div>
        <div class="item-qty">Qty: ${qty}</div>
      </div>
      <div class="btn-group">
        <button class="icon-btn plus"><span class="material-icons">add</span></button>
        <button class="icon-btn delete"><span class="material-icons">delete</span></button>
      </div>
    </div>
  `;
}

// Insert item
addBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (value) {
    // Check if item already exists
    const existing = items.find(item => item.name.toLowerCase() === value.toLowerCase());
    if (existing) {
      existing.qty++;
      refreshList();
    } else {
      items.push({ name: value, qty: 1 });
      list.insertAdjacentHTML("beforeend", createItem(value, 1));
      attachEvents();
    }

    input.value = "";
    updateTotal();
    saveToLocalStorage();
  }
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

// Attach event handlers
function attachEvents() {
  list.querySelectorAll(".item").forEach((item) => {
    const name = item.dataset.name;
    const qtyEl = item.querySelector(".item-qty");
    let itemObj = items.find(i => i.name === name);

    const plusBtn = item.querySelector(".plus");
    const minusBtn = item.querySelector(".minus");
    const deleteBtn = item.querySelector(".delete");

    plusBtn.onclick = () => {
      itemObj.qty++;
      qtyEl.textContent = "Qty: " + itemObj.qty;
      updateTotal();
      saveToLocalStorage();
    };

    minusBtn.onclick = () => {
      if (itemObj.qty > 1) {
        itemObj.qty--;
        qtyEl.textContent = "Qty: " + itemObj.qty;
        updateTotal();
        saveToLocalStorage();
      }
    };

    

    deleteBtn.onclick = () => {
      items = items.filter(i => i.name !== name);
      item.remove();
      updateTotal();
      saveToLocalStorage();
    };
  });
}

// Refresh entire list (useful when reloading or merging duplicate items)
function refreshList() {
  list.innerHTML = "";
  items.forEach(item => {
    list.insertAdjacentHTML("beforeend", createItem(item.name, item.qty));
  });
  updateTotal();
  saveToLocalStorage();
  attachEvents();
}

// Load items on page load
window.addEventListener("DOMContentLoaded", loadFromLocalStorage);
