/* <div>counter</div>; */

let numberOfCounts = document.getElementById("score").textContent;

function Counter() {
  let n = numberOfCounts;
  if ((collisionStart = true)) {
    n++;
  }
  if (ball.isOffScreen) {
    n = 0;
  }
  return n;
}
