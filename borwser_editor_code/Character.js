var default_img_src = "https://raw.githubusercontent.com/Deplim/CWeb_browser_editor/master/source/%EC%BA%90%EB%A6%AD%ED%84%B0/%EB%84%A4%EB%A1%9C/watch.webp";
var wait_img_src = "https://raw.githubusercontent.com/Deplim/CWeb_browser_editor/master/source/%EC%BA%90%EB%A6%AD%ED%84%B0/%EB%84%A4%EB%A1%9C/wait.webp";
var text_img_src = "https://raw.githubusercontent.com/Deplim/CWeb_browser_editor/master/source/%EC%BA%90%EB%A6%AD%ED%84%B0/%EB%84%A4%EB%A1%9C/text.webp";
var drag_img_src = "https://raw.githubusercontent.com/Deplim/CWeb_browser_editor/master/source/%EC%BA%90%EB%A6%AD%ED%84%B0/%EB%84%A4%EB%A1%9C/drag.webp";


// 항상 떠 있을 이미지
var current_img = document.createElement('img');
// 이미지 변수에 src 속성 삽입.(이미지 주소)
current_img.src = default_img_src;
current_img.id = "current_img_id";
// 이미지 변수에 style 속성 삽입.
current_img.style="opacity:1; position: fixed; top: 0px; left: 200px; z-index: 900; width: 100px; height: 100px; visibility=hidden";
current_img.setAttribute('draggable', true);


// 캐릭터 드래그로 위치 이동
current_img.onmousedown = function(event) {
    current_img.src = drag_img_src;
    captureMouseDown(event, current_img);
};
current_img.ondragstart = function() {
    return false;
};
current_img.onmouseleave = function(){
    current_img.src = default_img_src;
}


document.body.appendChild(current_img);

// 얼만큼 미입력 상태일때 반응을 줄건지
const time = 5;

// 마지막으로 입력이 있었던 시간 (초기화는 페이지 시작시 시간)
var old = new Date();

// 현재 캐릭터 떠있는 상태인지 판단하는 변수
var appear = false;

// 중지를 위해 ID 보관
var timerld = null;

// 시간 갱신, 캐릭터 안떠있는 상태라 설정해줌
function time_update() {
    old = new Date();
    if(appear) {
        // 반응시 캐릭터 안보이게
        document.getElementById("current_img_id").src = default_img_src;
        appear = false;
    }
}

//현재 시간 출력
function PrintCharacter() {
    var today = new Date();
    var gap = today.getTime() - old.getTime(); // 시간 차이
    var sec_gap = gap / 1000; // 시간 차이 (sec)

    // time 초간 키보드, 마우스 클릭 없을시
    if(sec_gap > time && !appear){
        // 캐릭터 보이게 만들어줌
        document.getElementById("current_img_id").src = wait_img_src;
        appear = true; // 캐릭터 떠있는 상태라 설정해줌
    }
}

// 캐릭터 위치 이동 (텍스트 박스 생성시)
function moveCharacterTextArea(absoluteLeft, absoluteTop) {
    absoluteTop = absoluteTop + 20;
    absoluteLeft = absoluteLeft - 100;
    current_img.src = text_img_src;
    current_img.style = "opacity:1; position: absolute; top: "+absoluteTop+"px; left: "+absoluteLeft+"px; z-index: 900; width: 100px; height: 100px; visibility=visible";
    
}

// 시계 시작
function StartClock() {
    PrintCharacter();
    // 1초마다 PrintCharacter 실행해서 현재 시간과 마지막 움직인 시간 비교해 캐릭터 출력
    timerld = setInterval(PrintCharacter,1000); 
}

// 시계 정지
function StopClock() {
    if(timerld != null) {
        clearInterval(timerld);
    }
}