var watts_per_mine = 750;

var game = {
  coins: 0,
  coinsToMoney: 0.5,
  money: 20,
  watts: 0,
  totalWaste: 0,
  update: function () {
    const randomChange = Math.random() * 2 - 1;
    this.coinsToMoney += randomChange / 10;
    this.coinsToMoney = Math.round(this.coinsToMoney * 100) / 100;
    display.updateMoney();
  },
  convert: function () {
    this.money += this.coinsToMoney * this.coins;
    game.watts += watts_per_mine;
    this.coins = 0;
    display.updateMoney();
  },
};

var shop = {
  tag: [
    ["ASICCost", "ASIC"],
    ["BasicComputerCost", "Basic Computer"],
    ["CalculatorCost", "Calculator"],
    ["Upgrade1"], ["Upgrade2"], ["Upgrade3"],
  ],
  amount: [0, 0, 0],
  cost: [1500, 700, 20, 20, 200, 500],
  coinsEarned: [1000, 50, 1.5],
  eWaste: [5, 20, 0.5, 0.5, 2, 2],
  electricity: [300, 100, 0],
};

var display = {
  updateMoney: function () {
    game.coins = Math.round(game.coins * 100) / 100;
    document.getElementById("coins").innerHTML = game.coins;
    game.coinsToMoney = Math.round(game.coinsToMoney * 100) / 100;
    document.getElementById("coinsToMoney").innerHTML = game.coinsToMoney;
    game.money = Math.round(game.money * 100) / 100;
    document.getElementById("money").innerHTML = game.money;
    game.watts = Math.round(game.watts * 100) / 100;
    document.getElementById("watts").innerHTML = game.watts;
  },
};

function buy(index) {
  if (game.money >= shop.cost[index]) {
    game.money -= shop.cost[index];
    shop.amount[index] = shop.amount[index] + 1;

    document.getElementById("money").innerHTML = game.money;
    //document.getElementById(shop.tag[index][0]).innerHTML = shop.cost[index];
    document.getElementById(shop.tag[index][1]).innerHTML = shop.amount[index];
    display.updateMoney();
  }
}

function sell(index) {
  if (shop.amount[index] > 0) {
    game.money += shop.cost[index] * 0.75;
    shop.amount[index]--;
    game.totalWaste = game.totalWaste + shop.eWaste[index];
    document.getElementById("totalWaste").innerHTML = game.totalWaste;
    document.getElementById("money").innerHTML = game.money;
    document.getElementById(shop.tag[index][1]).innerHTML = shop.amount[index];
    display.updateMoney();
  }
}

function mine(){
  game.coins += 1;
  game.watts += watts_per_mine;
  display.updateMoney();

}

setInterval(function () {
  for (let i = 0; i < shop.amount.length; i++) {
    game.coins += shop.amount[i] * shop.coinsEarned[i];
    game.watts += (shop.amount[i] * shop.coinsEarned[i])*watts_per_mine;
  }
  display.updateMoney();
}, 1000);

setInterval(function () {
  game.update();
  display.updateMoney();
}, 500);
