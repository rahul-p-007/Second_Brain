export function random(len: number) {
  let options = "qweajfmnfmnojvoafjoff24456";
  let lenth = options.length;
  let ans = "";
  for (let i = 0; i < len; i++) {
    ans += options[Math.floor(Math.random() * lenth)];
  }
  return ans;
}
