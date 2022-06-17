class WordGame extends HTMLElement {
  constructor() {
    super()
    this.word = 'word';
    this.hp = 3;
    this.currentIndex = 0;
    this.variantsCount = 3;

    this.initGame();
    this.eventListener();
  }

  eventListener() {
    this.addEventListener('click', (e)=>{
      const target = e.target;

      if (target.classList.contains('variants__item')) {
        const pickedLetter = target.innerText;

        if (pickedLetter === this.word[this.currentIndex].toUpperCase()) {
          if (this.hp > 0) {
            this.currentIndex++;
            this.setLetter(pickedLetter);
            this.setInfo();
            this.querySelector('.message').innerText = 'Correct letter!';

            if (this.currentIndex !== this.word.length) {
              this.generateVariants(this.currentIndex);
            } else {
              this.querySelector('.message').innerText = 'You win!';
            }
          } else {
            this.querySelector('.message').innerText = 'You die!';
          }
        } else {
          this.hp--;
          this.setInfo();
          this.querySelector('.message').innerText = 'Wrong letter!';
          if (this.hp === 0) {
            this.hp = 3;
            this.initGame();
            this.querySelector('.message').innerText = 'You die!';
          }
        }
      }

    });
  }

  initGame() {
    this.setInfo();
    this.generateVariants(0);
    this.generateEmptyWord(this.word);
  }

  setInfo() {
    this.querySelector('.hp').innerHTML = 'Health points: ' + this.hp;
    this.querySelector('.currentPosition').innerHTML = 'Current position: ' + this.currentIndex;
  }

  setLetter(letter) {
    const letterContainers = this.querySelectorAll('.letter');
    const letterArray = Array.from(letterContainers);

    letterArray[this.currentIndex - 1].innerHTML = letter;
  }

  getRandomLetter(index) {
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    return alphabet[index];
  }

  generateVariants(index) {
    const currentLetter = this.word[index].toUpperCase();
    let variants = [];

    while (variants.length <= this.variantsCount - 1) {
      const randomLetterIndex = Math.floor(Math.random() * 25) + 1;
      const randomLetter = this.getRandomLetter(randomLetterIndex);
      const arrayContainsLetter = (variants.indexOf(randomLetter) > -1);
      if (!arrayContainsLetter && currentLetter !== randomLetter) {
        variants.push(randomLetter);
      }
    }

    this.querySelector('.variants').innerHTML = '';
    variants.forEach((letter) => {
      const variantsItem = document.createElement('div');
      variantsItem.classList.add('variants__item');
      variantsItem.innerText = letter;
      this.querySelector('.variants').append(variantsItem);
    });

    const variantContainers = this.querySelectorAll('.variants__item');
    const randomContainerForLetter = variantContainers[Math.floor(Math.random() * variantContainers.length)];
    randomContainerForLetter.innerHTML = currentLetter;
  }

  generateEmptyWord() {
    const wordWrapper = this.querySelector('.word');

    wordWrapper.innerHTML = '';
    for (let i = 1; i <= this.word.length; i++) {

      const emptyLetter = document.createElement('div');

      emptyLetter.classList.add('letter');
      wordWrapper.append(emptyLetter);
    }
  }


}

customElements.define('word-game', WordGame);
