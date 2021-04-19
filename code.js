$(document).ready(function () {
    $("#tabs a").on("click", showTab);
    $("form").on("submit", thanks);
});

var pizzaSize = "";
var pizzaCrust = "";
var pizzaToppings = [];
let subtotal = 0;

//Display all of the pizza details and customer information from steps 1 and 2
function orderSummary(event) {
    pizzaToppings = [];

    //get pizza size, only 1
    let sizeElem = $("fieldset#size input:checked");
    pizzaSize = sizeElem.val();
    subtotal = parseFloat(sizeElem.data("price"));

    //get crust, only 1
    let crustElem = $("fieldset#crust input:checked");
    pizzaCrust = $(`fieldset#crust label[for='${crustElem.attr("id")}']`).text();
    subtotal += parseFloat(crustElem.data("price"));

    //may be more than 1
    let toppingElems = $("input[name='topping']:checked");
    toppingElems.each(function () {
        pizzaToppings.push($(`label[for='${$(this).attr("id")}']`).text());
        subtotal += parseFloat($(this).data("price"));
    });

    //pizza summary
    $("#summarySize").text(pizzaSize);
    $("#summaryCrust").text(pizzaCrust);

    let toppingsList = "";
    pizzaToppings.forEach(function (elem) {
        toppingsList += `<li>${elem}</li>`;
    });
    $("ul#summaryToppings").html(toppingsList);

    //customer summary
    $("#custName").text($('input#name').val());
    let address = "";
    address += $('input#street').val() + " ";
    address += $('input#city').val() + ", ";
    address += $('input#state').val() + " ";
    address += $('input#zip').val() + " ";
    $("#custAddress").text(address);
    $("#custPhone").text($('input#phone').val());

    let fee = 2;
    let tax = subtotal * .051;
    $("#subtotal").text(subtotal.toFixed(2));
    $("#tax").text(tax.toFixed(2));
    $("#fee").text(fee.toFixed(2));
    $("#total").text((subtotal + tax + fee).toFixed(2));


    console.log(pizzaSize);
    console.log(pizzaCrust);
    console.log(pizzaToppings);
    console.log(toppingsList);
    console.log(subtotal);
}

// This function is required by Bootstrap to show/hide the selected tab
function showTab(event) {
    event.preventDefault();
    $(this).tab("show");

    orderSummary();
}

function thanks(event) {
    event.preventDefault();

    $("#thanks").text("Thank you for your order!");
}