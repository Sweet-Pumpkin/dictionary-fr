// IMPORT
// css
import '../css/style.css';

/**  
 * 선언
*/
const root: HTMLElement | null = document.getElementById('root');
// 가로 값
let WIDTH: number = 0;
// 슬라이드 카운트
let counter: number = 1;
// 슬라이드 이동 값
let TRANSLATE_X: number = 0;

// JSON
fetch('./json/verb.json')
  .then(res => {
    return res.json();
  })
  .then(obj => {
    WIDTH = obj.verbs.length;
    ContentFnc(obj);
  });

function getData(v: string | number): string | number {
  let res = JSON.stringify(v);
  return res.replace(/\"/gi, "");
}


function ContentFnc(obj: any): void {
  // template
  let template = `
  <div class="contents">
    <div class="title">
      <a href="#">ㄷㅇㅈ</a>
    </div>
    <div class="content-wrap">
      <p class=type>verbs</p>
      <div class="content">
        <div class="slider-wrap">
          <ul id="slider" style="width: ${500 * WIDTH}px; transform: translateX(${TRANSLATE_X}px)">
            {{__li__}}
          </ul>
        </div>
        <button class="prev" onclick="${() => prevSlider()}">
          <i class="fa fa-chevron-left fa-4x" aria-hidden="true"></i>
        </button>
        <button class="next" onclick="${() => nextSlider()}">
          <i class="fa fa-chevron-right fa-4x" aria-hidden="true"></i>
        </button>
      </div>
    <div>
  </div>
  `

  let liEls: string[] = [];

  for (let i = 0; i < obj.verbs.length; i++) {
    liEls.push(`
      <li>
        <div class="stars">
          ${obj.verbs[i].verb_num == 3 ? 
            '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>' :
            obj.verbs[i].verb_num == 2 ? 
            '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>' :
            '<i class="fa fa-star fa-2x" aria-hidden="true"></i>'
          }   
        </div>
        <h1 class="verb">${getData(obj.verbs[i].verb)}<h1>
        <div class="meaning">
          ${obj.verbs[i].meaning.map((v: string, idx: number) => `<h4>${idx + 1}. ${v}</h4>`).join(' ')}
        </div>
        <h3 class="conjugasion">conjugasion</h3>
        <div class="transform">
          ${obj.verbs[i].transform.map((v: string) => `<h4>${v},</h4>`).join(' ')}
        </div>
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

function nextSlider(): void {
  if (counter < WIDTH) {
    counter += 1;
    TRANSLATE_X = -500 * (counter - 1);
  }
}

function prevSlider(): void {
  if (counter > 1) {
    counter -= 1;
    TRANSLATE_X = -500 * (counter - 1);
  }
}