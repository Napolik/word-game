class WordGame extends HTMLElement {
  constructor() {
    super()
    this.words = ["time", "year", "people", "way", "day", "man", "thing", "woman", "life", "child", "world", "school", "state", "family", "student", "group", "country", "problem", "hand", "part", "place", "case", "week", "company", "system", "program", "question", "work", "government", "number", "night", "point", "home", "water", "room", "mother", "area", "money", "story", "fact", "month", "lot", "right", "study", "book", "eye", "job", "word", "business", "issue", "side", "kind", "head", "house", "service", "friend", "father", "power", "hour", "game", "line", "end", "member", "law", "car", "city", "community", "name", "president", "team", "minute", "idea", "kid", "body", "information", "back", "parent", "face", "others", "level", "office", "door", "health", "person", "art", "war", "history", "party", "result", "change", "morning", "reason", "research", "girl", "guy", "moment", "air", "teacher", "force", "education"];
    this.word = 'word';
    this.hp = 4;
    this.currentIndex = 0;
    this.score = 0;
    this.wins = 0;
    this.loses = 0;
    this.level = 0;
    this.levelPoints = [5, 10, 20, 30, 50];
    this.variantsCount = 2;

    this.initGame();
    this.eventListener();
  }

  eventListener() {
    this.addEventListener('click', (e) => {
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
              this.randomBorder();
            } else {
              this.addScorePoints(this.word);
              this.wins++;
              this.restartGame('You win! Correct word is: ' + this.word);
            }
          }
        } else {
          this.hp--;
          this.setInfo();
          this.querySelector('.message').innerText = 'Wrong letter!';
          target.style.borderColor = 'rgb(201 0 0)';
          target.classList.add('error');
          if (this.hp === 0) {
            this.loses++;
            this.restartGame('You die! Correct word is: ' + this.word);
          }
        }
      }

    });
  }

  setRandomWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.word = this.words[randomIndex];
  }

  initGame() {
    this.setRandomWord();
    this.setInfo();
    this.generateVariants(0);
    this.generateEmptyWord(this.word);
    this.randomBorder();
  }

  restartGame(message) {
    this.hp = 4;
    this.currentIndex = 0;
    this.initGame();
    this.querySelector('.message').innerText = message + '. Game restarted.';
  }

  setInfo() {
    this.querySelector('.hp').innerHTML = '<span class="title">Health points:</span><span class="value">' + this.hp + '</span>';
    this.querySelector('.currentPosition').innerHTML = '<span class="title">Current position:</span><span class="value">' + this.currentIndex + '</span>';
    this.querySelector('.wins').innerHTML = '<span class="title">Wins:</span><span class="value"> ' + this.wins + '</span>';
    this.querySelector('.loses').innerHTML = '<span class="title">Loses: </span><span class="value"> ' + this.loses + '</span>';
    this.querySelector('.level').innerHTML = '<span class="title">Level: </span><span class="value"> ' + this.level + '</span>';
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

  addScorePoints(word) {
    this.score += word.length;
    this.querySelector('.score').innerHTML = '<span class="title">Score:</span><span class="value">' + this.score + '</span>';
    this.checkLevel();
  }

  randomBorder() {
    const letterWrappers = this.querySelectorAll('.variants__item');

    letterWrappers.forEach((element) => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      element.style.borderColor = '#' + randomColor;
    });
  }

  checkLevel() {
    this.levelPoints.forEach((needPoints, index) => {
      if (this.score >= needPoints) {
        this.level = index + 1;
          if (this.level >= 2 && this.level <= 7) {
            this.variantsCount = index + 1;
          }
        return false;
      }
    });
  }
}

customElements.define('word-game', WordGame);
