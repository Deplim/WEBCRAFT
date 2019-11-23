// 버튼 클릭시 확장프로그램의 기능을 on / off 함

var state = true;

function changeState() {
    state = !state;
    if(state){ // 관련 버튼, 작업물 보이게 함
        on_button.innerHTML="on"; // 버튼 글자 변경
        st_button.style.visibility="visible";
        rc_button.style.visibility="visible";
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
        // 캐릭터 시간 시작
        StartClock();
    }
    else{ // 관련 버튼, 작업물 안보이게함
        on_button.innerHTML="off";
        st_button.style.visibility="hidden";
        rc_button.style.visibility="hidden";
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