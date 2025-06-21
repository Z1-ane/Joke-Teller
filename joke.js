let clickBtn = document.querySelector(".click");
let captionElm = document.querySelector(".caption");

clickBtn.addEventListener("click", fetchJoke);

function fetchJoke() {
  fetch("https://official-joke-api.appspot.com/jokes/programming/random")
    .then((response) => response.json())
    .then((data) => {
      const joke = data[0];

      const fullJoke = `${joke.setup} : ${joke.punchline}`;

      const utterance = new SpeechSynthesisUtterance(fullJoke);
      utterance.rate = 1;
      utterance.pitch = 1;

      let spokenText = "";

      // This event fires when speech reaches word boundaries
      utterance.onboundary = (event) => {
        if (event.name === "word") {
          // Extract the word currently being spoken
          const word = fullJoke.substring(
            event.charIndex,
            event.charIndex + event.charLength
          );
          spokenText += word + " ";
          captionElm.textContent = spokenText;
        }
      };

      // utterance.onend = () => {
      //   captionElm.textContent += "\n🎉 Joke finished!";
      // };
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    });
}
