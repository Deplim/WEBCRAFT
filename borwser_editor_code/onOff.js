// 버튼 클릭시 확장프로그램의 기능을 on / off 함

var state = true;
var characterState = true;

function changeState() {
    state = !state;
    if(state){ // 관련 버튼, 작업물 보이게 함
        on_button.innerHTML="on"; // 버튼 글자 변경
        st_button.style.visibility="visible";
        ch_button.style.visibility="visible";
        ta_button.style.visibility="visible";
        cp_button.style.visibility="visible";
        document.getElementById("caret_id").style.visibility="visible";
        // 클래스 읽어 와서 보이게 만듬
        var div_area_List=document.getElementsByClassName("div_area_class");
        for(var i = 0; i<div_area_List.length; i++){
            div_area_List[i].style.visibility="visible";
        }
        var highlight_List = document.getElementsByClassName("highlight_class");
        for(var i = 0; i<highlight_List.length; i++){
            highlight_List[i].style.visibility="visible";
        }
        var jbBook_List = document.getElementsByClassName("jbBook_class");
        for(var i = 0; i<jbBook_List.length; i++) {
            jbBook_List[i].style.visibility = "visible";
        }
        document.getElementById("character_img1_id").style.visibility = "visible";
        // 캐릭터 시간 시작
        StartClock();
    }
    else{ // 관련 버튼, 작업물 안보이게함
        on_button.innerHTML="off";
        st_button.style.visibility="hidden";
        ch_button.style.visibility="hidden";
        ta_button.style.visibility="hidden";
        cp_button.style.visibility="hidden";
        document.getElementById("caret_id").style.visibility="hidden";
        var div_area_List=document.getElementsByClassName("div_area_class");
        for(var i = 0; i<div_area_List.length; i++){
            div_area_List[i].style.visibility="hidden";
        }
        var highlight_List = document.getElementsByClassName("highlight_class");
        for(var i = 0; i<highlight_List.length; i++){
            highlight_List[i].style.visibility="hidden";
        }
        var jbBook_List = document.getElementsByClassName("jbBook_class");
        for(var i = 0; i<jbBook_List.length; i++) {
            jbBook_List[i].style.visibility = "hidden";
        }
        document.getElementById("character_img1_id").style.visibility = "hidden";
        // 캐릭터 중지
        StopClock();
    }
    update(); // In documentListener.js 업데이트
}

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

function characterUpdate() {
    characterState = !characterState;
    if(characterState){
        document.getElementById("character_img1_id").style.visibility = "visible";
    }
    else{
        document.getElementById("character_img1_id").style.visibility = "hidden";
    }

}