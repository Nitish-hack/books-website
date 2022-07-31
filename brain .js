
// let ele=document.getElementsByClassName("trending-books")[0];
// let element=document.getElementById("tbody");
// console.log(element.innerHTML);
localStorage.setItem("totalbill",JSON.stringify(0));
var audio = new Audio("recording.ogg");
showcarts();

DisplayCart();
settotalprice();
countdown();

// DisplayCart();
let booknames = ["", "PSALMS", "CEREAL", "FLUID COLORS", "DESIGNING", "GREAT NITISH", "LOOSER ANKIT"];
for (let i = 1; i <= 6; i++) {
  let ele = document.getElementsByClassName("trending-books")[0];
  if (ele) {
    let code = ele.innerHTML;
    code += `
  <div class="col-lg-4" style=" padding-right:0px ;">
  <div class="trending-books-card">
    <img src="images/book-${i}.png" class="trending-image" alt="...">
    <div class="trending-content">
      <h3>$5</h3>
        <h5>${booknames[i]}</h5>
        <button class="btn btn-outline-secondary cart-btn" onclick="increase_carts()" id="item${i}" >ADD TO CART</button>
        <hr>
    </div>
  </div>
</div>
  
  `;
    ele.innerHTML = code;
  }
}

let carts=document.querySelectorAll(".cart-btn");
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", (e) => {
    let itemId = e.target.id;
    let itemBox = document.getElementById(itemId).parentElement;
    audio.play();
    dotask(itemBox);
  });
}

function dotask(itemBox) {
  let obj = {
    book: itemBox.querySelector("h5").innerHTML,
    price: itemBox.querySelector("h3").innerHTML,
    quantity: 1
  };
  let items = localStorage.getItem("items");
  if (items == null) {
    itemobj = [];
  }
  else {
    itemobj = JSON.parse(items);
  }
  let flag = 0;
  for (let i = 0; i < itemobj.length; i++) {
    if (itemobj[i].book == obj.book) {
      itemobj[i].quantity += 1;
      flag = 1;
      break;
    }
  }
  if (flag == 0) {
    itemobj.push(obj);
  }
  localStorage.setItem("items", JSON.stringify(itemobj));
  DisplayCart();
}

function DisplayCart() {
  items = localStorage.getItem("items");
  if (items != null) {
    let itemobj = JSON.parse(items);
    let total=0;

    for (let i = 0; i < itemobj.length; i++) {

      if(itemobj[i].quantity>0){
      let elem = document.querySelector(".tbod");
      // console.log(elem.innerHTML);
      if (elem) {
        let html = elem.innerHTML;

        let itemprice = parseInt(itemobj[i].price.substring(1));
        itemprice = itemprice * (itemobj[i].quantity);
       total+=itemprice;
        html += `
              <tr>
              
                <td>${itemobj[i].book}</td>
                <td>
                <button class="sub-btn btn btn-outline-success"> - </button>${itemobj[i].quantity}<button class="add-btn btn btn-outline-success">+</button>
                </td>
                <td>$${itemprice}</td>
              </tr>
      
      
             `
        elem.innerHTML = html;
      }
    }
    }
localStorage.setItem("totalbill",JSON.stringify(total));

  }
}



function increase_carts() {
  let totalItems = localStorage.getItem("totalItems");
    if (totalItems == null) {
      NumberOfCarts = 0;
    }
    else {
      NumberOfCarts = parseInt( JSON.parse(totalItems));
    }
    localStorage.setItem("totalItems", JSON.stringify(NumberOfCarts + 1));
  showcarts();
}

function showcarts(){
  let totalItems=localStorage.getItem("totalItems");
  if(totalItems!=null){
  let totalItems1 = parseInt(totalItems);
  if(totalItems>0){
  document.getElementById("cart-page").innerHTML = `🛒cart:${totalItems}`;
  }
  else document.getElementById("cart-page").innerHTML = `🛒cart:${0}`;
}
else document.getElementById("cart-page").innerHTML = `🛒cart:${0}`;
}



function settotalprice() {
  let totalbill=localStorage.getItem("totalbill");
  let priceSection=document.querySelector(".totalprice");
  if(totalbill=="0"){
    if(priceSection){
     priceSection.innerHTML="<h4 style='text-align:center; margin-top:20px'>YOUR CART IS EMPTY!SHOP FOR SOME BOOKS<a href='index.html'>click here</a></h2> ";
    }
  }
  else {
    if(priceSection){
      priceSection.innerHTML=
                              `
                              <tr class="table-primary">
                              <th scope="col"></th>
                                  <th scope="col">TOTAL PRICE:</th>
                                  <th scope="col" class="sum">$${totalbill}</th>
                              </tr>   
                              `;
     }
  }
  
}


// timer logic
function countdown(){
var countDownDate = new Date("July 15, 2022 10:00:00").getTime();
let dd=document.querySelector("#d");
let hh=document.querySelector("#h");
let mm=document.querySelector("#m");
let ss=document.querySelector("#s");
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  if(dd) dd.innerHTML=`<h1>${days}days</h1>`;
  if(hh) hh.innerHTML=`<h1>${hours}hr</h1>`;
  if(mm) mm.innerHTML=`<h1>${minutes}min</h1>`;
  if(ss) ss.innerHTML=`<h1>${seconds}sec</h1>`;
  
  if (distance < 0) {
    clearInterval(x);
    let salesbox= document.getElementsByClassName("salebox")[0];
    if(salesbox){
   salesbox.innerHTML = "EXPIRED";
    }
  }
}, 1000);
}




let additems=document.querySelectorAll(".add-btn");

for(let i=0;i<additems.length;i++){
  additems[i].addEventListener("click",function(e){

    let sibling=additems[i].parentElement.previousElementSibling.innerHTML;
    let items = localStorage.getItem("items");
    
    let  itemobj1 = JSON.parse(items);
   let curr;
    for (let i = 0; i < itemobj1.length; i++) {
      if (itemobj1[i].book == sibling) {
        itemobj1[i].quantity += 1;
        curr=itemobj1[i];
        break;
      }
    }
  
    localStorage.setItem("items", JSON.stringify(itemobj1));
    increase_carts();
   location.reload();
  });
}
  
let subitems=document.querySelectorAll(".sub-btn");

for(let i=0;i<subitems.length;i++){
  subitems[i].addEventListener("click",function(e){

    let sibling=subitems[i].parentElement.previousElementSibling.innerHTML;
    let items = localStorage.getItem("items");
    
    let  itemobj1 = JSON.parse(items);
   let curr;
    for (let i = 0; i < itemobj1.length; i++) {
      if (itemobj1[i].book == sibling) {
        itemobj1[i].quantity -= 1;
        curr=itemobj1[i];
        break;
      }
    }
   
    localStorage.setItem("items", JSON.stringify(itemobj1));
    let totalItems = localStorage.getItem("totalItems");
    if (totalItems == null) {
      NumberOfCarts = 0;
    }
    else {
      NumberOfCarts = JSON.parse(totalItems);
      NumberOfCarts = parseInt(NumberOfCarts);
    }
    localStorage.setItem("totalItems", JSON.stringify(NumberOfCarts - 1));
  showcarts();
   location.reload();
  });
}
  
