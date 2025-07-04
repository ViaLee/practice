const img = new Image();
img.src = "./asset/castle.svg";
const size = { width: 597, height: 527 };

const ctx = document.getElementById("canvas").getContext("2d");
img.onload = function () {
  ctx.drawImage(img, 0, 0);
};
const $canvas = document.getElementById("canvas");
const $castle_light = document.getElementById("castle_light");

// 把canvas的内容转换成dataUrl，并设置给castle_light的背景图片
console.log("index");

function updateImg(img, ctx, top, bottom) {
  // 遮蔽不同的部分
  ctx.clearRect(0, 0, size.width, size.height);
  ctx.drawImage(img, 0, 0);
  clipRect(ctx, top, bottom);
  exportImg();
}

function clipRect(ctx, top, bottom) {
  ctx.clearRect(0, 0, size.width, top);
  ctx.clearRect(0, bottom, size.width, size.height);
}

function exportImg() {
  const dataUrl = canvas.toDataURL("image/webp", 0.1);
  $castle_light.style.backgroundImage = `url(${dataUrl})`;
}
