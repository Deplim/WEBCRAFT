// 프로그램내 document.addEventListener 함수 관리

// onOff.js 안에 state 변수 값에 따라 이벤트 설정 / 미설정
function update() {
    if(state) {
        //클릭과 버튼에 반응하기. bookmark
        document.addEventListener("keydown", bookmark_reaction, false);

        //클릭과 버튼에 반응하기. caret
        document.addEventListener("click", caret_update, false);
        document.addEventListener("keydown", caret_update, false);

        // 키보드 입력, 마우스 이동, 클릭 시 시간 업데이트 해주는 함수
        document.addEventListener("mousemove", time_update, false);
        document.addEventListener("keydown", time_update, false);
        document.addEventListener("click", time_update, false);
    }
    else{
        //클릭과 버튼에 반응하기. bookmark
        document.removeEventListener("keydown", bookmark_reaction, false);

        //클릭과 버튼에 반응하기. caret
        document.removeEventListener("click", caret_update, false);
        document.removeEventListener("keydown", caret_update, false);

        document.removeEventListener("mousemove", time_update, false);
        document.removeEventListener("keydown", time_update, false);
        document.removeEventListener("click", time_update, false);
    }
}
