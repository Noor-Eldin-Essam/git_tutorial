var nameInput=document.getElementById("productName");
var companyInput=document.getElementById("productCompany");
var priceInput=document.getElementById("productPrice");
var descInput=document.getElementById("productDesc");
var addBtn = document.getElementById("addBtn");
var editBtn = document.getElementById("editBtn");
var inputs=document.getElementsByClassName("form-control");
var trs = document.getElementById("tr");
var searchInput=document.getElementsByClassName("search").value;
var productsContainer = [];


if(localStorage.getItem("productList") == null){
  var productsContainer = [];
}else{
  productsContainer = JSON.parse(localStorage.getItem("productList"));
  displayData();
}


addBtn.onclick = function(){
    addProducts();
    displayData();
    clearForm();
  }


function addProducts(){
  if(nameInput.value!=""&&companyInput.value!=""&&priceInput.value!=""&&descInput.value!=""){
    var product={
      productName:nameInput.value,
      productCompany:companyInput.value,
      productPrice:priceInput.value,
      productDesc:descInput.value,
    }

    productsContainer.push(product);
    localStorage.setItem("productList",JSON.stringify(productsContainer));

  }else{
    alert("all fields are empty");
  }
}

function displayData(){
  var data ="";
  for(var i=0;i<productsContainer.length;i++){
    data += "<tr id='tr'><td>"+productsContainer[i].productName+"</td><td>"+productsContainer[i].productCompany+"</td><td>"+productsContainer[i].productPrice+"</td><td>"+productsContainer[i].productDesc+"</td><td><button onclick='deleteProduct("+i+")' class='btn btn-danger'>delete</button></td><td><button onclick='updateProduct("+i+")' class='btn btn-success'>Update</button></td></tr>";
  }
  document.getElementById("tableBody").innerHTML = data;
}

function clearForm(){
  for(var i=0;i<inputs.length;i++){
    inputs[i].value="";
  }
}


function search(name){
  for(var i =0;i<productsContainer.length;i++){
    if(productsContainer[i].productName.toLowerCase().includes(name.toLowerCase() > -1)){
      
    }else{
      
    }
  }
}


function deleteProduct(i){
  productsContainer.splice(i,1);
  localStorage.setItem("productList",JSON.stringify(productsContainer));
  displayData();
}

function updateProduct(rowIndex){
  addBtn.textContent = "edit product";
    var updateData = [];
    updateData = JSON.parse(localStorage.getItem("productList"));
    nameInput.value = updateData[rowIndex].productName;
    companyInput.value = updateData[rowIndex].productCompany;
    priceInput.value = updateData[rowIndex].productPrice;
    descInput.value = updateData[rowIndex].productDesc;
  
      addBtn.addEventListener("click",function(){
        if(addBtn.textContent == "edit product"){
          editData(rowIndex);
          console.log("edit");
          addBtn.textContent = "add product";
        }else{
          addProducts();
          console.log("add");
        }
      });
  }
    
function editData(editIndex){
    if(nameInput.value != productsContainer[editIndex].productName || companyInput.value != productsContainer[editIndex].productCompany || priceInput.value != productsContainer[editIndex].productPrice || descInput.value != productsContainer[editIndex].productDesc){
      productsContainer[editIndex].productName = nameInput.value;
      productsContainer[editIndex].productCompany = companyInput.value;
      productsContainer[editIndex].productPrice = priceInput.value;
      productsContainer[editIndex].productDesc = descInput.value;
    }
    addBtn.textContent = "add product";
    localStorage.setItem("productList",JSON.stringify(productsContainer));
    displayData();

  }


function ValiditeName(name){
  var nameRex = /^[A-Z][a-z]{2,8}$/;
  if(nameRex.test(name)){
    addBtn.removeAttribute("disabled");
  }else{
    addBtn.setAttribute("disabled","disabled");
  }
}

function ValiditeCompany(company){
  var companyRex = /^[A-Z][a-z]{2,8}$/;
  if(companyRex.test(company)){
    addBtn.removeAttribute("disabled");
  }else{
    addBtn.setAttribute("disabled","disabled");
  }
}

function ValiditePrice(price){
  var priceRex = /^([0]?(,\d{1,2})?|([1-9]{1,3})?((\.\d{3})*|([1-9])*)?(,\d{1,2})?)?$/;
  if(priceRex.test(price)){
    addBtn.removeAttribute("disabled");
  }else{
    addBtn.setAttribute("disabled","disabled");
  }
}