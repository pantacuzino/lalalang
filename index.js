function replaceCaption(sentence) {
  var div = document.getElementById('caption');
  div.innerHTML = "";
  words = sentence.split(' ');
  for(word in words) {
    var span = document.createElement('span');
    var space = document.createElement('span');
    span.innerHTML = words[word]
    space.innerHTML = " ";
    span.onclick = function(e) {
      word = translateWord(e.target.innerHTML.toLowerCase());
      updateTranslationBox(word);
    };
    div.appendChild(span);
    div.appendChild(space);
  };
};

function updateTranslationBox(word) {
  var element = document.getElementById("translation");
  element.innerHTML = word;
}

function translateWord(word) {
  if(word in translations) {
    return translations[word];
  };
  return 'unknown';
};

function seekTo(event) {
  clearInterval(window.playExpressionInterval);
  var word = event.target.innerHTML;
  player.seekTo(timings[word][0]);
};

function createInteractiveLyrics() {
  var caption = document.getElementById('caption')
  p = document.createElement('p');
  caption.appendChild(p);
  for(word in timings) {
    var a = document.createElement("a");
    a.href = "#"
    a.setAttribute("starts", timings[word][0])
    a.setAttribute("ends", timings[word][1])
    a.onclick = function(event) {
      seekTo(event);
      translation = translateWord(event.target.innerHTML.toLowerCase());
      updateTranslationBox(translation);
    };
    a.innerHTML = word;
    p.appendChild(a);
  }
};

function playExpression() {
  var selection = window.getSelection();
  start = selection.anchorNode.parentNode.getAttribute("starts");
  end = selection.focusNode.parentNode.getAttribute("ends");
  player.seekTo(start);
  clearInterval(window.playExpressionInterval);
  window.playExpressionInterval = setInterval(function() {
    if(player.getCurrentTime() >= end) {
      player.seekTo(start);
    };
  }, 10);
};
