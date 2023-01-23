// IMPORT
// css
import '../css/style.css';

// 선언
const root: HTMLElement | null = document.getElementById('root');

// JSON
fetch('./json/verb.json')
  .then(res => {
    return res.json();
  })
  .then(obj => {
    ContentFnc(obj);
  });

function getData(v: string | number) {
  let res = JSON.stringify(v);
  return res.replace(/\"/gi, "");
}

function ContentFnc(obj: any): void {
  let template = `
    <div class="contents">
      <h1 class="title">
        <a href="#">ㄷㅇㅈ</a>
      </h1>
      <div class="content-wrap">
        <p class=type>verb</p>
        <div class="content">
          <div class="slider-wrap">
            
          </div>
          <div class="prev">
            <i class="fa fa-chevron-left fa-4x" aria-hidden="true"></i>
          </div>
          <div class="next">
            <i class="fa fa-chevron-right fa-4x" aria-hidden="true"></i>
          </div>
        </div>
      <div>
    </div>
  `

  if (root) {
    root.innerHTML = template;
  } else {
    console.error('최상위 컨테이너가 없어 UI를 진행하지 못합니다.');
  }
}