// 얼만큼 미입력 상태일때 반응을 줄건지
const time = 10;

// 마지막으로 입력이 있었던 시간 (초기화는 페이지 시작시 시간)
var old = new Date();

// 현재 캐릭터 떠있는 상태인지 판단하는 변수
var appear = false;

// 중지를 위해 ID 보관
var timerld = null;

// 키보드, 마우스 클릭 입력 시간 갱신 함수 실행
document.addEventListener("keydown", update_old, false)
document.addEventListener("click", update_old, false)

// 시간 갱신, 캐릭터 안떠있는 상태라 설정해줌
function update_old() {
    old = new Date();
    appear = false;
}

//현재 시간 출력
function PrintTime() {
    var today = new Date();
    var hh = today.getHours(); // 시간
    var mi = today.getMinutes(); // 분
    var ss = today.getSeconds(); // 초

    var gap = today.getTime() - old.getTime(); // 시간 차이
    var sec_gap = gap / 1000; // 시간 차이 (sec)

    // time 초간 키보드, 마우스 클릭 없을시
    if(sec_gap > time && !appear){
        alert("잠수?");
        appear = true; // 캐릭터 떠있는 상태라 설정해줌
    }

    document.getElementById("result").innerHTML = hh + ":" + mi + ":" + ss;
    document.getElementById("result2").innerHTML = sec_gap+"sec";
}

// 시계 시작
// function StartClock() {
//     PrintTime();
//     timerld = setInterval(PrintTime,1000);
// }
PrintTime();
timerld = setInterval(PrintTime,1000);

// 시계 정지
// function StopClock() {
//     if(timerld != null) {
//         clearInterval(timerld);
//     }
// }