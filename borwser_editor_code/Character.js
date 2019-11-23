// 잠수시 뜰 이미지 변수
var character_img1 = document.createElement('img');
// 이미지 변수에 src 속성 삽입.(이미지 주소)
character_img1.src= "http://www.city.kr/files/attach/images/161/161/027/020/ad5d169730425190f67cd90fd661889e.gif";
// 이미지 변수에 style 속성 삽입.
character_img1.style="opacity:0.5; position: absolute; top: 0px; left: 0px; z-index: 900; width: 200px; height: 200px";


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
    // 반응시 캐릭터 삭제
    document.body.removeChild(character_img1);
    appear = false;
}

//현재 시간 출력
function PrintTime() {
    var today = new Date();
    var gap = today.getTime() - old.getTime(); // 시간 차이
    var sec_gap = gap / 1000; // 시간 차이 (sec)

    // time 초간 키보드, 마우스 클릭 없을시
    if(sec_gap > time && !appear){
        //이미지 태그를 실제 dom tree 에 달기.
        document.body.appendChild(character_img1);
        appear = true; // 캐릭터 떠있는 상태라 설정해줌
    }
}

// 시계 시작
function StartClock() {
    PrintTime();
    timerld = setInterval(PrintTime,1000);
}

// 시계 정지
function StopClock() {
    if(timerld != null) {
        clearInterval(timerld);
    }
}