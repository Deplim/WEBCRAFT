// 잠수시 뜰 이미지 변수
var character_img1 = document.createElement('img');
// 이미지 변수에 src 속성 삽입.(이미지 주소)
character_img1.src= "https://raw.githubusercontent.com/Deplim/CWeb_browser_editor/master/source/%EC%BA%90%EB%A6%AD%ED%84%B0/%EB%84%A4%EB%A1%9C/watch.webp";
character_img1.id = "character_img1_id";
// 이미지 변수에 style 속성 삽입.
character_img1.style="opacity:0.5; position: fixed; top: 0px; left: 0px; z-index: 900; width: 170px; height: 170px; visibility=hidden";
character_img1.setAttribute('draggable', true);


character_img1.onmousedown = function(event) {
	character_img1.src="https://raw.githubusercontent.com/Deplim/CWeb_browser_editor/master/source/%EC%BA%90%EB%A6%AD%ED%84%B0/%EB%84%A4%EB%A1%9C/drag.webp"
    let shiftX = event.clientX - character_img1.getBoundingClientRect().left;
    let shiftY = event.clientY - character_img1.getBoundingClientRect().top;

    CharacterMoveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function CharacterMoveAt(pageX, pageY) {
        character_img1.style.left = pageX - shiftX + 'px';
        character_img1.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        CharacterMoveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    character_img1.onmouseup = function() {
    	character_img1.src="https://raw.githubusercontent.com/Deplim/CWeb_browser_editor/master/source/%EC%BA%90%EB%A6%AD%ED%84%B0/%EB%84%A4%EB%A1%9C/watch.webp"
        document.removeEventListener('mousemove', onMouseMove);
        character_img1.onmouseup = null;
    }
};
character_img1.ondragstart = function() {
    return false;
};

document.body.appendChild(character_img1);
document.body.appendChild(character_img1);

// 얼만큼 미입력 상태일때 반응을 줄건지
const time = 5;

// 마지막으로 입력이 있었던 시간 (초기화는 페이지 시작시 시간)
var old = new Date();

// 현재 캐릭터 떠있는 상태인지 판단하는 변수
var appear=false;
var wait =0;

// 중지를 위해 ID 보관
var timerld = null;

// 시간 갱신, 캐릭터 안떠있는 상태라 설정해줌
function time_update() {
    old = new Date();
    // 반응시 캐릭터 안보이게
    if(wait==1){
    	wait=0
    	character_img1.src="https://raw.githubusercontent.com/Deplim/CWeb_browser_editor/master/source/%EC%BA%90%EB%A6%AD%ED%84%B0/%EB%84%A4%EB%A1%9C/watch.webp"
    }
}

//현재 시간 출력
function PrintCharacter() {
    var today = new Date();
    var gap = today.getTime() - old.getTime(); // 시간 차이
    var sec_gap = gap / 1000; // 시간 차이 (sec)

    // time 초간 키보드, 마우스 클릭 없을시
    if(sec_gap > time && !appear){
    	wait=1;
        // 캐릭터 보이게 만들어줌
        character_img1.src="https://raw.githubusercontent.com/Deplim/CWeb_browser_editor/master/source/%EC%BA%90%EB%A6%AD%ED%84%B0/%EB%84%A4%EB%A1%9C/wait.webp"
    }
}

// 캐릭터 위치 이동 (텍스트 박스 생성시)
function moveCharacter(absoluteLeft, absoluteTop) {
    character_img1.src="https://raw.githubusercontent.com/Deplim/CWeb_browser_editor/master/source/%EC%BA%90%EB%A6%AD%ED%84%B0/%EB%84%A4%EB%A1%9C/text.webp"
    absoluteLeft = absoluteLeft -170;
    character_img1.style="opacity:0.5; position: absolute; top: "+absoluteTop+"px; left: "+absoluteLeft+"px; z-index: 900; width: 170px; height: 170px; visibility=visible";
    
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
