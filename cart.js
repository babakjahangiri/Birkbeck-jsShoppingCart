 // Author : Babak Jahangiri

  const shoppingCart = [];
  const stock = [];

  //item defination
  const item = function(id, name, price, qty) {
      this.id = id;
      this.name = name;
      this.qty = qty;
      this.price = price;
    };

  const stockItem = function(id,name,price,imagefile){
    
    this.id = id;
    this.name = name;
    this.price = price;
    this.imagefile = imagefile;

  }

//init function which must load in the body
function init()
{
  loadStock();

}

  function loadStock()
  {
    stock.push(new stockItem(101,"Eloquent Javascript, 3rd Edition",20.32,"eloquentjs.jpg"));
    stock.push(new stockItem(102,"JavaScript and JQuery",18.75,"js_jq.jpg"));
    stock.push(new stockItem(103,"Learn ECMAScript, 2nd Edition",29.99,"learn-ecmas.jpg"));
    stock.push(new stockItem(104,"JavaScript & jQuery: The Missing Manual",34.85,"missingm.jpg"));
  }
   
   function findItemInStock(id)
   {
    for (var i in stock)
    {
      if (stock[i].id == id) {
        return new stockItem(id,stock[i].name,stock[i].price,stock[i].imagefile);
      }
    }
   }

  function addToCart(id)
  {
    var myItemInStock = findItemInStock(id);
    var imagefile = "";
    if (myItemInStock != null)
      imagefile = myItemInStock.imagefile;

      if (IsItemAvailableInCart(id) == true) {
        addItem(myItemInStock.id,myItemInStock.name,myItemInStock.price,1);
         updateCartUI(id);
      }
      else
      {
        addItem(myItemInStock.id,myItemInStock.name,myItemInStock.price,1);

        var cart_TR = document.createElement('tr');
        cart_TR.setAttribute('id',id);
        var cart_Tbody =document.getElementsByTagName('tbody')[0];
        var cartRowContents = `<td class="item-td-img"><img src="images/` + imagefile + `" class="img-cart"></td>
                              <td class="item-content">` + myItemInStock.name + `</td>
                              <td class="item-content">` + myItemInStock.price + `</td>
                              <td><button class="btn btn-cart-items btn-qty" onclick='decreaseQty(`+ id +`)'><i class="fa fa-minus-circle"></i></button>&nbsp; <span id='qty-` + id + `' class="item-content">` + 1 + `</span> &nbsp;<button class="btn btn-cart-items btn-qty" onclick='increaseQty(`+ id +`)'><i class="fa fa-plus-circle"></i></button></td>
                              <td class="item-content text-right" id='price-` + id + `'>` + myItemInStock.price + ` £</td>
                              <td class="text-right">
                              <button class="btn btn-cart-items btn-delete" onclick='removeFromCart(`+ id +`)'><i class="fa fa-trash"></i></button>
                              </td>`;
        cart_TR.innerHTML = cartRowContents;
        cart_Tbody.append(cart_TR);

        document.getElementById("total").innerHTML = SubTotal() + " £";
        document.getElementById("itemsno").innerHTML = ItemsInCart();
  
      }

  }

  function increaseQty(id){
    for (var i in shoppingCart)
    {
      if (shoppingCart[i].id == id)
      {
        shoppingCart[i].qty++;
        updateCartUI(id);
      }  
    }
  }

  function decreaseQty(id){
    for (var i in shoppingCart)
    {
      if (shoppingCart[i].id == id)
      {
        if (shoppingCart[i].qty -1 < 1) {
          removeFromCart(id);
        }else
        {
          shoppingCart[i].qty--;
          updateCartUI(id);
        }
      }
    }
  }

  function removeFromCart(id){
    
     //Remove from Array 
     removeItemAll(id);

    //Remove From the UI
    var cartRow = document.getElementById(id).remove();

    //Update the Total in the UI
    document.getElementById("total").innerHTML = SubTotal() + " £";
    document.getElementById("itemsno").innerHTML = ItemsInCart();
        
  }

  function addItem(id, name, price, qty) {
    for (var i in shoppingCart) {
      if (shoppingCart[i].id === id) {
        shoppingCart[i].qty += qty; //Increase Qty per addItem is Calling ..
        return;
      }
    }

    var myItem = new item(id, name, price, qty);
    shoppingCart.push(myItem);
  }

  function removeOneItem(id) {
    for (var i in shoppingCart) {
      if (shoppingCart[i].id === id) {
        shoppingCart[i].qty--; // remove one from the qty
        if (shoppingCart[i].qty === 0) {
          shoppingCart.splice(i, 1);
        }
        break;
      }
    }
  }

  function removeItemAll(id) {
    for (var i in shoppingCart) {
      if (shoppingCart[i].id == id) {
        shoppingCart.splice(i, 1);
        break;
      }
    }
  }

  function clearCart() {
    cart = [];
  }

  function ItemsInCart() {
    var totalItem = 0;
    for (var i in shoppingCart) {
      totalItem += shoppingCart[i].qty;
    }
    return (totalItem > 1) ? totalItem + ' items' : totalItem + ' item';
  }

  function IsItemAvailableInCart(id){
    rslt = false;
    for (var i in shoppingCart)
    {
      if (shoppingCart[i].id == id) 
        return true;
    }

    return rslt;
  }

  function GetItemFromCart(id){
    for (var i in shoppingCart)
    {
      if (shoppingCart[i].id == id) 
         return new item(id,shoppingCart[i].name,shoppingCart[i].price,shoppingCart[i].qty);
    }
  }

  function SubTotal() {
    var totalAmount = 0;

    for (var i in shoppingCart) {
      totalAmount += shoppingCart[i].qty * shoppingCart[i].price;
    }
    return totalAmount.toFixed(2);
  }

  function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }

  function loadCart() { //I've not used 
    shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
  }

  function updateCartUI(id)
  {

    var cartItem = GetItemFromCart(id);
    document.getElementById("qty-" + id).innerHTML = cartItem.qty;
    document.getElementById("price-" + id).innerHTML = (cartItem.qty * cartItem.price).toFixed(2) + ' £'
    document.getElementById("total").innerHTML = SubTotal() + " £";
    document.getElementById("itemsno").innerHTML = ItemsInCart();

  }