// CSS
import '../css/style.css';
// JSON
fetch('./json/verb.json').then(res => {
    return res.json();
}).then(obj => {
  console.log(obj);  
})

const root: HTMLElement | null = document.getElementById('root');

function HeaderFnc(): void {
  let template = `
    <div class="contents">
      <h1 class="title">
        <a href="#">ㄷㅇㅈ</a>
      </h1>
      <div class="content-wrap">
        <div class="type"></div>
        <div class="content"></div>
      <div>
    </div>
  `

  if (root) {
    root.innerHTML = template;
  } else {
    console.error('최상위 컨테이너가 없어 UI를 진행하지 못합니다.');
  }
}

HeaderFnc();