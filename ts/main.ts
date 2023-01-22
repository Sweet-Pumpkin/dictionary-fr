// CSS
import '../css/style.css';
// JSON
fetch('./json/verb.json').then(res => {
    return res.json();
}).then(obj => {
  console.log(obj);  
})

const root = document.getElementById('root');

let template = `
  <div class="header">
    <h1>
      <a href="#">ㄷㅇㅈ</a>
    </h1>
  </div>
`