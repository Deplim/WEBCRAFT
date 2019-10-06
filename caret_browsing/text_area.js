// 필요 전역 변수
var count=0;

// text area mode 를 실행할 버튼 태그 생성.
var ta_button = document.createElement('button');

//버튼 이름. 
var ta_button_Text = document.createTextNode( 'textarea_mode(off)' );
ta_button.appendChild( ta_button_Text );

// 버튼에 id 속성 삽입 
var ta_button_att = document.createAttribute("id");
ta_button_att.value="link";
ta_button.setAttributeNode(ta_button_att);

// 버튼에 style 속성 삽입. 
var ta_button_att2 = document.createAttribute("style");
ta_button_att2.value="position: absolute; top: 5px; left: 200px;";
ta_button.setAttributeNode(ta_button_att2);

// 버튼 태그 dom 트리에 달기 
document.body.appendChild(ta_button);


//text area mode 버튼이 눌리는 것에 반응하기
var link = document.getElementById('link');
    // onClick's logic below:
link.addEventListener('click', text_area_mode);


//text_area 함수 1 : text_area_mode 버튼이 눌렸을 때 어떤 행동을 할지 결정한다.
function text_area_mode(){
    check=0; // check 0 이면 버튼이 방금 눌린것 

    // text area 모드를 사작, 종료 change
	if (count==0) 
    	count=1;
    else
    	count=0;

    if(count==1){
    	ta_button.innerHTML=("textarea_mode(on)");
	    // 텍스트 박스 모드 중에는 caret_update 용 click 과 keydown 이벤트를 해제한다.
	    document.removeEventListener("click", caret_update, false); 
	    document.removeEventListener("keydown", caret_update, false);

	    // 클릭 eventlistener 를 텍스트 박스 함수를 위해 사용.
	    document.addEventListener("click", insert_text_area, false);
	}
	else{
		ta_button.innerHTML=("textarea_mode(off)");

		document.removeEventListener("click", insert_text_area, false);

		document.addEventListener("click", caret_update, false); 
	    document.addEventListener("keydown", caret_update, false);
	}


}

//text_area 함수 2 : 실제로 브라우저 화면상에 textbox 를 붙인다. 
function insert_text_area(){
	// 헌제 마우스 클릭한 곳의 테그가 무엇인지 확인.
	if (event.target) {
        targ=event.target;
    } else if (event.srcElement) {
        targ=event.srcElement;
    }
    var tname;
    tname = targ.tagName;
    console.log(tname)

    // 텍스트 박스 삽입.
    if((check!=0)&&(tname!='TEXTAREA')){ // 버튼이 방금 눌렸거나 누른 부분에 이미 textarea 있으면 실행하지 않는다. 
        // 마우스 클릭한 좌표 뽑기
        var x = event.clientX;
        var y = event.clientY;
        console.log("click_point : "+x+" , "+y);

        // 텍스트 박스 테그 생성. 
        var text_area = document.createElement('textarea');
   		// 텍스트 박스 안에 디폴트로 들어가 문자.
        var ta_Text = document.createTextNode( 'input text here :)' );
        text_area.appendChild( ta_Text );
        // 텍스트 박스에 style 속성 삽입.
        var text_area_att = document.createAttribute("style");
        text_area_att.value="opacity:0.75; font-weight:600; position: absolute; left: "+x+"px; top: "+y+"px; width: 100px; height: 100px;";
        text_area.setAttributeNode(text_area_att);
        // 텍스트 박스 트리에 달기.
        document.body.appendChild(text_area);
    }
    check=check+1;
}