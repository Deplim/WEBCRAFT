
// In storage.js -> st_button = sava, rc_button = character ? 삭제 예정
// In text_area.js ->  ta_button = insert textarea
// In capture.js -> cp_button 의 경우 리스너 내부에 함수가 구현되어 있어 그대로 capture.js에 두었음

// element
var st_button = document.createElement('button');
st_button.innerHTML=("storage");
st_button.id="saveButton";

var ch_button = document.createElement('button');
ch_button.innerHTML=("character");
ch_button.id="characterButton";

var ta_button = document.createElement('button');
ta_button.id="textButton";
ta_button.innerHTML=("textarea_mode(off)");

var on_button = document.createElement('button');
on_button.id="stateButton";
on_button.innerHTML=("on");

// style
st_button.style="position: fixed; bottom: 40px; right: 10px; z-index: 900";
ch_button.style="position: fixed; bottom: 10px; right: 10px; z-index: 900";
ta_button.style="position: fixed; bottom: 10px; right: 170px; z-index: 900";
on_button.style="position: fixed; bottom: 40px; right: 95px; z-index: 900";

// body.appendChild
document.body.appendChild(st_button);
document.body.appendChild(ch_button);
document.body.appendChild(ta_button);
document.body.appendChild(on_button);


// addEventListener
st_button.addEventListener('click', createURL);
ch_button.addEventListener('click', characterUpdate);
ta_button.addEventListener('click', text_area_mode);
on_button.addEventListener('click', changeState);
