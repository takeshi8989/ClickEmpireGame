class Item{
    constructor(name, type, maxPurchase, effect, price, picUrl, quantity){
        this.name = name;
        this.type = type;
        this.maxPurchase = maxPurchase;
        this.price = price;
        this.effect = effect;
        this.picUrl = picUrl;
        this.quantity = quantity;
    }
}

class User{
    constructor(name, days, money, click, perClick, perSec, perSecTimes, itemList){
        this.name = name;
        this.days = days;
        this.money = money;
        this.click = click;
        this.perClick = perClick;
        this.perSec = perSec;
        this.perSecTimes = perSecTimes;
        this.age = Math.floor(20 + this.days / 365);
        this.itemList = itemList;
    }

}

const items = [
    new Item("Flip machine", "ability", 500, 25, 15000, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png", 0),
    new Item("ETF Stock", "investment", Infinity, 0.1, 300000, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", 0),
    new Item("ETF Bonds", "investment", Infinity, 0.07, 300000, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", 0),
    new Item("Lemonade Stand", "realEstate", 1000, 30, 30000, "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png", 0),
    new Item("Ice Cream Truck", "realEstate", 500, 120, 100000, "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png", 0),
    new Item("House", "realEstate", 100, 32000, 20000000, "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png", 0),
    new Item("TownHouse", "realEstate", 100, 64000, 40000000, "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png", 0),
    new Item("Mansion", "realEstate", 20, 500000, 250000000, "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png", 0),
    new Item("Industrial Space", "realEstate", 10, 2200000, 1000000000, "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png", 0),
    new Item("Hotel Skyscraper", "realEstate", 5, 25000000, 10000000000, "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png", 0),
    new Item("Bullet-Speed Sky Railway", "realEstate", 1, 30000000000, 10000000000000, "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png", 0)
]


let loginPage = document.getElementById("login-page");
let gamePage = document.getElementById("game-page");


let newGameBtn = document.getElementById("new-game-btn");
let loginBtn = document.getElementById("login-btn");
let playGame = false;


newGameBtn.addEventListener("click", function(){
    let userName = document.getElementById("user-name").value;
    if(userName == ""){
        alert("put your name");
    }
    else{
        let newUser = new User(userName, 0, 50000, 0, 25, 0, 1, items);
        startGame(newUser);
    }
})

loginBtn.addEventListener("click", function(){
    let userName = document.getElementById("user-name").value;
    if(localStorage.getItem(userName) === null){
        alert("there is no data.");
    }
    else{
        let user = JSON.parse(localStorage.getItem(userName));
        console.log(user.age);
        startGame(user);
    }
})


function startGame(user){
    playGame = true;
    gamePage.innerHTML = "";
    goToGamePage()
    gamePage.append(createGamePage(user));
    let itemArea = gamePage.querySelectorAll(".items")[0];
    itemArea.append(createItemListPage(user));
    document.getElementById("parent").classList.remove("vh-100");
}


function goToGamePage(){
    document.getElementById("user-name").value = "";
    loginPage.classList.add("d-none");
    loginPage.classList.remove("d-block");
}


function createGamePage(user){
    console.log(user);
    let parent = document.createElement("div");
    parent.innerHTML=
    `
        <div class="bg-blue text-white d-flex p-2 col-12 col-md-10 game vh-100">
            <div class="col-4 bg-dark p-2">
                <div class="bg-blue burgers text-white text-center h-20">
                    <p style="font-size:20px" class="pt-3" id="burger">${user.click} burgers</p>
                    <p style="font-size:15px" id="user-perClick">one click ￥${user.perClick}</p>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" class="col-10 mt-5" id="click-burger">
                </div>
            </div>
            <div class="col-8 p-2">
                <div class="d-flex flex-wrap justify-content-around">
                    <div class="bg-blue col-11 col-md-6 border-black">
                        <p class="text-white text-center">${user.name}</p>
                    </div>
                    <div class="bg-blue col-11 col-md-6 border-black">
                        <p class="text-white text-center" id="user-age">${user.age} years old</p>
                    </div>
                    <div class="bg-blue col-11 col-md-6 border-black">
                        <p class="text-white text-center" id="user-days">${user.days} days</p>
                    </div>
                    <div class="bg-blue col-11 col-md-6 border-black">
                        <p class="text-white text-center" id="user-money">￥${user.money}</p>
                    </div>
                </div>

                <div class="items bg-dark p-2 h-75 mt-3">
                </div>


                <div class="d-flex justify-content-end">
                    <button class="btn btn-dark m-2" id="home-btn"><i class="fa-solid fa-rotate-left"></i></button>
                    <button class="btn btn-dark m-2" id="save-btn"><i class="fa-solid fa-floppy-disk"></i></button>
                </div>
            </div>
        </div>
    `

    let clickBurger = parent.querySelectorAll("#click-burger")[0];
    clickBurger.addEventListener("click", function(){
        click(user);
    })

    let timer = setInterval(function(){
        passDay(user);

    },1000)

    let homeBtn = parent.querySelectorAll("#home-btn")[0];
    homeBtn.addEventListener("click", function(){
        if(confirm("Reset All Data?")){
            localStorage.removeItem(user.name);
            clearInterval(timer);
            backToLoginPage();
        }
    })

    let saveBtn = parent.querySelectorAll("#save-btn")[0];
    saveBtn.addEventListener("click", function(){
        alert("Saved your data. Please put the same name when you login.");
        saveData(user);
        clearInterval(timer);
        backToLoginPage();
    })
    return parent
}

function click(user){
    user.click += 1;
    user.money += user.perClick;
    refreshUserInfo(user);
}

function passDay(user){
    user.days += 1;
    user.money = user.money * user.perSecTimes + user.perSec;
    user.age = Math.floor(20 + user.days / 365);
    refreshUserInfo(user);
}

function refreshUserInfo(user){
    gamePage.querySelectorAll("#burger")[0].innerHTML = `${user.click} Burgers`;
    gamePage.querySelectorAll("#user-age")[0].innerHTML = `${user.age} years old`;
    gamePage.querySelectorAll("#user-days")[0].innerHTML = `${user.days} days`;
    gamePage.querySelectorAll("#user-money")[0].innerHTML = `￥${user.money}`
    gamePage.querySelectorAll("#user-perClick")[0].innerHTML = `one click ￥${user.perClick}`;
}

function createItemListPage(user){
    let itemList = user.itemList;
    let parent = document.createElement("div");
    for(let i = 0; i < itemList.length; i++){
        let itemObj = itemList[i];
        let itemType = "sec";
        if(itemObj.type == "ability") itemType = "click";
        parent.innerHTML +=
        `
            <div class="col-12 bg-blue d-flex align-items-center m-1 item" id="item-${i}">
                <div class="col-3 d-flex justify-content-around align-items-center">
                    <img src="${itemObj.picUrl}" class="item-img">
                </div>
                <div class="col-9 d-flex justify-content-between align-items-center">
                    <div class="col-9">
                        <p style="font-size:25px">${itemObj.name}</p>
                        <p>￥${itemObj.price}</p>
                    </div>
                    <div class="col-3 text-right">
                        <p class="mt-3" style="font-size:25px" id="index">${itemObj.quantity}</p>
                        <p class="mt-0" style="color:rgb(60, 179, 113)">￥${itemObj.effect}/${itemType}</p>
                    </div>
                </div>
            </div>
        `
    }

    let itemDivList = parent.querySelectorAll(".item");
    for(let i = 0; i < itemDivList.length; i++){
        let itemDiv = itemDivList[i];
        itemDiv.addEventListener("click", function(){
            createItemDetailPage(user, i);
        })
    }
    return parent;
}


function createItemDetailPage(user, itemIndex){
    let itemArea = gamePage.querySelectorAll(".items")[0];
    itemArea.innerHTML = "";
    let itemObj = user.itemList[itemIndex];
    let type = "sec";
    if(itemObj.type == "ability") type = "click";
    let parent = document.createElement("div");
    parent.innerHTML =
    `
        <div class="bg-blue pb-3">
            <div class="col-12 d-flex align-items-center pt-2">
                <div class="col-6">
                    <p>${itemObj.name}</p>
                    <p>Max purchase: ${itemObj.maxPurchase}</p>
                    <p>Price: ￥${itemObj.price}</p>
                    <p>Get ￥${itemObj.effect} /${type}</p>
                </div>
                <div class="col-6">
                    <img src="${itemObj.picUrl}" class="item-img">
                </div>
            </div>
            <div class="m-2">
                <p>How many would you like to buy?</p>
            </div>
            <div class="col-12">
                <input type="number" placeholder="0" class="col-12" id="quantity-input" value="0">
            </div>
            <div class="text-right m-2">
                <p id="total">total: ￥0</p>
            </div>
            <div class="d-flex justify-content-around mb-3">
                <button class="btn btn-outline-primary btn-light col-4" id="back-to-itemList">Go back</button>
                <button class="btn btn-primary col-4" id="purchase-btn">Purchase</button>
            </div>
        </div>
    `

    let total = parent.querySelectorAll("#total")[0];
    let quantityInput = parent.querySelectorAll("#quantity-input")[0];
    quantityInput.addEventListener("change", function(){
        let quantity = parseInt(quantityInput.value);
        if(itemObj.name == "ETF Stock"){
            let price = calculateETFPrice(itemObj, quantity);
            total.innerHTML = `total: ￥${price}`;
        }
        else{
            total.innerHTML = `total: ￥${itemObj.price * quantity}`;
        }
    })

    let backToItemListBtn = parent.querySelectorAll("#back-to-itemList")[0];
    backToItemListBtn.addEventListener("click", function(){
        itemArea.innerHTML = "";
        itemArea.append(createItemListPage(user));
    })

    let purchaseBtn = parent.querySelectorAll("#purchase-btn")[0];
    purchaseBtn.addEventListener("click", function(){
        let quantity = parseInt(quantityInput.value);
        let totalPrice = itemObj.price * quantity;
        if(quantity <= 0){
            alert("Invalid Number");
        }
        else if(user.money < totalPrice){
            alert("You don't have enough money.");
        }
        else if(itemObj.maxPurchase < itemObj.quantity + quantity){
            alert("You can't buy anymore.")
        }
        else{
            purchase(user, itemIndex, quantity);
            itemArea.innerHTML = "";
            itemArea.append(createItemListPage(user));
        }
    })


    itemArea.append(parent);
}

function purchase(user, itemIndex, quantity){
    quantity = parseInt(quantity);
    let itemObj = user.itemList[itemIndex];
    let totalPrice = itemObj.price * quantity;
    itemObj.quantity = itemObj.quantity + quantity;
    if(itemObj.name == "ETF Stock"){
        totalPrice = calculateETFPrice(itemObj, quantity);
        itemObj.price = 300000 * Math.pow(1.1, itemObj.quantity);
    }

    user.money -= totalPrice;
    if(itemObj.type == "ability"){
        user.perClick += itemObj.effect * quantity;
    }
    else if(itemObj.type == "investment"){
        user.perSecTimes *= Math.pow(1 + itemObj.effect, quantity);
    }
    else{
        user.perSec += itemObj.effect * quantity;
    }
    refreshUserInfo(user);

}


function calculateETFPrice(itemObj, quantity){
    let currentPrice = itemObj.price;
    let total = 0;
    for(let i = 0; i < quantity; i++){
        total += currentPrice * Math.pow(1.1, i);
        currentPrice = currentPrice * Math.pow(1.1, i);
    }
    return Math.floor(total);
}

function backToLoginPage(){
    playGame = false;
    gamePage.innerHTML = "";
    loginPage.classList.add("d-block");
    loginPage.classList.remove("d-none");
    document.getElementById("parent").classList.add("vh-100");
}

function saveData(user){
    let userString = JSON.stringify(user);
    let userName = user.name;
    localStorage.setItem(userName, userString);
}
