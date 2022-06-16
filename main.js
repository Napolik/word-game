class WordGame extends HTMLElement {
  constructor() {
    super()
    this.word = "word";
    this.currentIndex = 0;
    this.variantsCount = 10;
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
      const arrayContainsLetter = (variants.indexOf(randomLetter) > -1);
      if (!arrayContainsLetter) {
        variants.push(this.getRandomLetter(randomLetterIndex));
      }
    }

    variants.forEach((letter) => {
      const variantsItem = document.createElement('div');
      variantsItem.classList.add('variants__item');
      variantsItem.innerText = letter;
      this.querySelector('.variants').append(variantsItem);
    });

    const variantContainers = this.querySelectorAll('.variants__item');
    const randomContainerForLetter = variantContainers[Math.floor(Math.random() * variantContainers.length)];
    randomContainerForLetter.innerHTML = this.word[0];
  }

  initGame() {

  }
}

customElements.define('word-game', WordGame);
