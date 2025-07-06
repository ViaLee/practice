const size = { width: 597, height: 527 };
const light_height = 50; // 光线的高度
const duration = 4400; // 动画持续时间，单位毫秒
const speed = size.height / duration; // 每毫秒移动的像素数
let played = false;

function castleAnimation() {
  if (played) return; // 如果动画已经播放过，则不再执行
  played = true; // 标记动画已播放
  const $canvas = document.getElementById("canvas");
  const $castle_light = document.getElementById("castle_light");

  console.log("index");

  function castleShow() {
    if ($canvas.getContext) {
      const ctx = $canvas.getContext("2d");
      const img = new Image();
      img.src = "./asset/castle.svg";

      img.onload = function () {
        let start; // 动画开始的时间戳
        // 展示动画
        function step(timestamp) {
          //当前时间戳
          if (start === undefined) {
            start = timestamp;
          }
          const elapsed = timestamp - start; // 计算从开始到现在经过的时间
          const y = elapsed * speed - light_height; // 计算光线的y坐标
          if (y <= size.height - light_height) {
            // 如果光线还没有到达底部
            updateImg(img, ctx, y, y + light_height);
            updateCastleBG(y);
            requestAnimationFrame(step); // 继续下一帧动画
          } else {
            // 光照消失
            $castle_light.style.animationPlayState = "paused"; // 停止
          }
        }
        requestAnimationFrame(step); // 继续下一帧动画
      };
    }
  }

  castleShow();

  const $castle_bg = document.querySelector(".castle_bg");
  function updateCastleBG() {
    $castle_bg.style.clipPath = `inset(0 0 ${
      size.height - (top + light_height)
    }px 0)`;
  }

  function updateImg(img, ctx, top, bottom) {
    ctx.clearRect(0, 0, size.width, size.height); // 清除整个canvas
    ctx.drawImage(img, 0, 0); // 重新绘制背景图片
    clipRect(ctx, top, bottom);
    exportImg();
  }

  function clipRect(ctx, top, bottom) {
    // 清除canvas的上半部分和下半部分
    // 这里的top和bottom是相对于canvas的高度
    ctx.clearRect(0, 0, size.width, top);
    ctx.clearRect(0, bottom, size.width, size.height);
  }

  function exportImg() {
    // 把canvas的内容转换成dataUrl，并设置给castle_light的背景图片
    const dataUrl = canvas.toDataURL("image/webp", 0.1);
    $castle_light.style.backgroundImage = `url(${dataUrl})`;
  }
}

export default { castleAnimation };
