import { Application, Container, Texture, Loader, Sprite } from "pixi.js";
import assets from "./assets.json";
const app = new Application({
  width: 1280,
  height: 720,
});

document.body.appendChild(app.view);

const container = new Container();
const textures: Texture[] = [];
const spriteArray: Sprite[] = [];
const loader = Loader.shared;

var isFlipped = false;
var firstCard: Sprite;
var secondCard: Sprite;

loader.add(assets).load((l, r) => {
  for (let i = 0; i < 9; i++) {
    const texture = Texture.from(`${i}`);
    textures.push(texture);
  }

  for (let i = 0; i < textures.length; i++) {
    for (let j = 0; j < 2; j++) {
      const newSprite = new Sprite(textures[i]);
      newSprite.name = `${i}`;
      spriteArray.push(newSprite);
    }
  }

  // for(let k =0; k< textures.length;k++){
  //     const sprite = new Sprite(textures[k]);
  //     sprite.x = (k*40) + 100;
  //     sprite.y = (k*40) + 100;
  //     sprite.width = 150;
  //     sprite.height = 150;
  //     container.addChild(sprite);
  // }

  placeCards();
});

// container.x = 10;
// container.y = 10;
// app.stage.addChild(container);
// const blankTexture = Texture.from("./assets/cardback.png");
// for(let i =0; i<18; i++){
//     const blankSprite = new Sprite(blankTexture);
//     container.addChild(blankSprite);
// }

function placeCards(): void {
  const PADDING = 20;
  const OFFSET = 100;
  let count = 0;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 6; c++) {
      const card = spriteArray[c + count];
      card.width = 150;
      card.height = 150;
      card.x = c * (card.width + PADDING) + OFFSET;
      card.y = r * (card.height + PADDING) + OFFSET;
      console.log("Add");
      card.interactive = true;
      card.buttonMode = true;

      container.addChild(card);
    }
    count += 6;
  }
}

app.stage.addChild(container);

const container2 = new Container();
const textureBack = Texture.from("./assets/cardback.png");

function placeBackCards(): void {
  let count = 0;
  const PADDING = 20;
  const OFFSET = 100;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 6; c++) {
      const card = new Sprite(textureBack);
      card.name = "card" + r + "_" + c;
      card.width = 150;
      card.height = 150;
      card.x = c * (card.width + PADDING) + OFFSET;
      card.y = r * (card.height + PADDING) + OFFSET;
      container2.addChild(card);
      //   console.log(card.name);
    }
  }
}
let cards;

placeBackCards();
app.stage.addChild(container2);

container2.children.forEach((card) => {
  card.interactive = true;
  card.buttonMode = true;
  // container.children.forEach((card2) => {
  //   // if (card.getLocalBounds() === card2.getLocalBounds()) {
  //   //   card.name = card2.name;
  //   // }
  //   // console.log(card2.name);
  //   console.log(card.getLocalBounds(), card2.getLocalBounds());
  // });

  // card.on("click", flip);
});

function flip(e: Event) {
  if (!isFlipped) {
    console.log("flip");

    isFlipped = true;
    this.visible = false;
  } else {
    secondCard = this;
    this.visible = false;
    checkMatch();
  }
}
  
function checkMatch() {
  if (firstCard.name === secondCard.name) {
    console.log("Success");
  } else {
    setTimeout(() => {
      firstCard.visible = true;
      secondCard.visible = true;
      reset();
    }, 1000);
  }
}
function reset() {
  firstCard = null;
  secondCard = null;
  isFlipped = false;
}

// container2.children.filter((e) => {
//   e.getGlobalPosition()===
// })
