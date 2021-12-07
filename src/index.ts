import {
  Application,
  Container,
  Texture,
  Loader,
  Sprite,
  InteractionEvent,
} from "pixi.js";
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
    for (let j = 0; j < 2; j++) {
      const texture = Texture.from(`${i}`);
      textures.push(texture);
    }
  }

  for (let i = 0; i < textures.length; i++) {
    for (let j = 0; j < 2; j++) {
      const newSprite = new Sprite(textures[i]);
      newSprite.name = `${i}`;
      spriteArray.push(newSprite);
    }
  }

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
        card.interactive = true;
        card.buttonMode = true;
        card.texture = Texture.from("./assets/cardback.png");

        container.addChild(card);
      }
      count += 6;
    }
  }
  placeCards();
  app.stage.addChild(container);

  // Now build logic!!!!!!!!!!!-----------------------------------------------------------

  let firstCard: any;
  let secondCard: any;
  let isFlipped = false;
  function flip(e: any) {
    if (!isFlipped) {
      firstCard = e.target;
      isFlipped = true;
      firstCard.texture = textures[Math.floor(Math.random() * 18)];
    } else {
      secondCard = e.target;
      secondCard.texture = textures[Math.floor(Math.random() * 18)];
      checkMatch();
    }
  }
  console.log(container.children.length);
  function checkMatch() {
    if (firstCard.texture === secondCard.texture) {
      setTimeout(() => {
        firstCard.visible = false;
        secondCard.visible = false;

        alert("WIN");
      }, 500);
    } else {
      setTimeout(() => {
        firstCard.texture = Texture.from("./assets/cardback.png");
        secondCard.texture = Texture.from("./assets/cardback.png");
        isFlipped = false;
      }, 500);
    }
  }
  container.children.forEach((card) => {
    card.on("click", flip);
  });
});
