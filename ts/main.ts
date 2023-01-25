// IMPORT
// css
import '../css/style.css';

// 선언
const root: HTMLElement | null = document.getElementById('root');

// template
let template = `
<div class="contents">
  <h1 class="title">
    <a href="#">ㄷㅇㅈ</a>
  </h1>
  <div class="content-wrap">
    <p class=type>verb</p>
    <div class="content">
      <div class="slider-wrap">
        <ul id="slider">
          {{__li__}}
        </ul>
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

// JSON
fetch('./json/verb.json')
  .then(res => {
    return res.json();
  })
  .then(obj => {
    ContentFnc(obj);
    sliderFnc(obj);
  });

function getData(v: string | number): string | number {
  let res = JSON.stringify(v);
  return res.replace(/\"/gi, "");
}

function ContentFnc(obj: any): void {

  let liEls = [];

  for (let i = 0; i < obj.verbs.length; i++) {
    liEls.push(`
      <li>
        <div class="stars">
          ${obj.verbs[i].verb_num == 3 ? 
            '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i>' :
            obj.verbs[i].verb_num == 2 ? 
            '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i>' :
            '<i class="fa fa-star" aria-hidden="true"></i>'
          }   
        </div>
        <h1>${getData(obj.verbs[i].verb)}<h1>
      </li>
    `);
  }

  template = template.replace('{{__li__}}', liEls.join(''));

  // 출력
  if (root) {
    root.innerHTML = template;
  } else {
    console.error('최상위 컨테이너가 없어 UI를 진행하지 못합니다.');
  }

}

function sliderFnc(obj: any): void {
  // 선언
  const WIDTH: number = obj.verbs.length;
  const ulEl: HTMLElement | null = document.getElementById('slider');
  const prevBtn: HTMLElement | null = document.querySelector('.prev');
  const nextBtn: HTMLElement | null = document.querySelector('.next');

  let counter: number = 1;

  if (ulEl) {
    ulEl.style.width = `${WIDTH * 500}px`
    prevBtn?.addEventListener('click', () => {prevSlider()});
    nextBtn?.addEventListener('click', () => {nextSlider()});
  }

  function nextSlider(): void {
    if (counter < WIDTH) {
      counter += 1;
      if (ulEl) {
        ulEl.style.transform = `translateX(${-500 * (counter - 1)}px)`;
      }
    }
  }

  function prevSlider(): void {
    if (counter > 1) {
      counter -= 1;
      if (ulEl) {
        ulEl.style.transform = `translateX(${-500 * (counter - 1)}px)`;
      }
    }
  }
}