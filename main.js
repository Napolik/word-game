class WordGame extends HTMLElement {
  constructor() {
    super()
    this.word = "word";
    this.currentIndex = 0;
    this.variantsCount = 3;
    this.variantsGenerated = 0;
    this.wordWrapper = this.querySelector('.word');

    this.initGame();
    this.generateVariants();
  }

  getRandomLetter(index) {
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    return alphabet[index];
  }

  generateVariants() {
    let variants = [];

    while (variants.length <= this.variantsCount - 1) {
      const randomLetterIndex = Math.floor(Math.random() * 25) + 1;
      const randomLetter = this.getRandomLetter(randomLetterIndex);
      let arrayContainsLetter = (variants.indexOf(randomLetter) > -1);
      if (!arrayContainsLetter) {
        variants.push(this.getRandomLetter(randomLetterIndex));
      }
    }

    variants.forEach((letter) => {
      const variantsItem = document.createElement('div');
      variantsItem.classList.add('variants__item');
      variantsItem.innerText = letter;

      console.log(document);
      document.querySelector('.variants').innerHTML += variantsItem;
    });


  }

  initGame() {

  }
}

customElements.define('word-game', WordGame);
