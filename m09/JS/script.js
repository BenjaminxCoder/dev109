var clearButton = document.getElementById("clear");

clearButton.addEventListener("click", function(event) {
  const dots = document.getElementsByClassName("dot");
  while (dots.length > 0) {
    dots[0].parentNode.removeChild(dots[0]);
  }

  event.stopPropagation();
});

addEventListener("click", function(event) {

  if (event.target.tagName === "BUTTON" || event.target.tagName === "INPUT") return;

  const color = document.getElementById("color").value;
  const size = parseInt(document.getElementById("size").value);

  const dot = document.createElement("div");
  dot.className = "dot";
  dot.style.width = size + "px";
  dot.style.height = size + "px";
  dot.style.left = (event.pageX - size / 2) + "px";
  dot.style.top = (event.pageY - size / 2) + "px";
  dot.style.background = color;

  document.body.appendChild(dot);
});