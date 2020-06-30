let currentList = {};

function createShoppingList() {
        currentList.name = $("#shoppingListName").val();
    currentList.items = new Array();
    
    showShoppingList();
}

function showShoppingList() {
    $("#shoppingListTitle").html(currentList.name);
    $("#shoppingListItems").empty();

    $("#createListDiv").hide();
    $("#shoppingListDiv").show(); 
    
    $("#newItemName").focus();
    $("#newItemName").keyup(function (event) {
        if(event.keyCode == 13) {
            addItem();
        }
    })
}

function addItem() {
    var newItem = {};
    newItem.name = $("#newItemName").val();
    currentList.items.push(newItem);
    console.info(currentList);

    drawItems();
    $("#newItemName").val("");

}

function drawItems() {
    var $list = $("#shoppingListItems").empty();
    for(var i = 0; i < currentList.items.length; i++) {
        var currentItem = currentList.items[i];
        var $li = $("<li>").html(currentItem.name).attr("id", "item_" + i);
        var $deleteBtn = $("<button onclick='deleteItem(" + i + ")'>Delete</button>").appendTo($li);
        var $checkBtn = $("<button onclick='checkItem(" + i + ")'>Check</button>").appendTo($li);

        $li.appendTo($list);
    }
}

function deleteItem(index) {
    currentList.items.splice(index, 1);
    drawItems();
}

function checkItem(index) {
    if($('#item_' + index).hasClass("checked")) {
        $("#item_" + index).removeClass("checked");    
    } else {
       $("#item_" + index).addClass("checked");
      }
}

function getShoppingListbyId(id) {
    console.log(id);

    currentList.name = "Mock Shopping List";
    currentList.items = [
        {name: "Milk"},
        {name: "Bread"},
        {name: "Coffee"}
    ];
    
    showShoppingList();
    drawItems();
}

$(document).ready(function(){
    console.log("ready");
    $("#shoppingListName").focus();
    $("#shoppingListName").keyup(function (event) {
        if(event.keyCode == 13) {
            createShoppingList();
        }
    })

    var pageUrl = window.location.href;
    var idIndex = pageUrl.indexOf("?id=");
    if(idIndex != -1) {
        getShoppingListbyId(pageUrl.substring(idIndex + 4));
    }
});
