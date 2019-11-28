// 필요 전역 변수
var count=0;
var textarea_array=new Array();

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

    // 텍스트 박스 삽입.
    if((check!=0)&&(tname!='TEXTAREA')&&(tname!='BUTTON')){ 
    	// 버튼이 방금 눌렸거나 누른 부분에 이미 textarea 혹은 버튼이 있으면 실행하지 않는다. 
        
        // 마우스 클릭한 좌표 뽑기
        var x = event.clientX;
        var y = event.clientY;
        console.log("click_point : "+x+" , "+y);

        // 현재 스크롤
        const scrolledLeftLength = window.pageXOffset;
        const scrolledTopLength = window.pageYOffset;

        // x, y 절대 좌표
        const absoluteLeft = scrolledLeftLength + x;
        const absoluteTop = scrolledTopLength + y;


        // x와 텍스트 박스 담을 div 태그 생성
        var div_area = document.createElement('div');
        var div_area_att = document.createAttribute('id');
        div_area_att.value = "div_text";
        div_area.setAttributeNode(div_area_att);

        // div style 속성 삽입.
        var div_area_att2 = document.createAttribute("style");
        div_area_att2.value="z_index:999; position: absolute; left: "+absoluteLeft+"px; top: "+absoluteTop+"px; width: 150px; height: 150px;";
        div_area.setAttributeNode(div_area_att2);

        // div class 속성 삽입.
        var div_area_att3 = document.createAttribute("class");
        div_area_att3.value="div_area_class";
        div_area.setAttributeNode(div_area_att3);


        // div dom 트리에 달기
        document.body.appendChild(div_area);


        // 텍스트 박스 테그 생성. 
        var text_area = document.createElement('textarea');
   		// 텍스트 박스 안에 디폴트로 들어가 문자.
        text_area.placeholder = "input text here :)";
	    // 버튼에 id 속성 삽입 
        text_area.id="textArea";

	    
        // 텍스트 박스에 style 속성 삽입.
        text_area.style="opacity:0.75; font-weight:600; position: absolute; left: 0px; top: 0px; width: 100px; height: 100px;";
        // 텍스트 박스 트리에 달기.
        // document.body.appendChild(text_area);
        div_area.appendChild(text_area);

        // 텍스트 삭제 버튼 삽입. 형식은 위와 같음.
        var ta_delete = document.createElement('button');
        ta_delete.innerHTML=('x');
	    // 버튼에 id 속성 삽입 
        ta_delete.id="textDelete";
        ta_delete.addEventListener('click', delete_textarea);
        ta_delete.style="position: absolute; left: -25px; top: 2px; ";

        // ta_delete class 속성 삽입.
        var ta_delete_att = document.createAttribute("class");
        ta_delete_att.value="ta_delete_class";
        ta_delete.setAttributeNode(ta_delete_att);

        // 버튼 삽입\
        div_area.appendChild(ta_delete);

        textarea_array.push(div_area);
        
        // 캐릭터 텍스트 박스 오른쪽으로 이동
        moveCharacter(absoluteLeft, absoluteTop);
    }
    check=check+1;
}

function delete_textarea(e){
    var node = (e || event).target;
    for(var i=0 in textarea_array){ 
        if(textarea_array[i]==node.parentNode){
            console.log(textarea_array[i]); 
            textarea_array.splice(i,i+1); 
        }
    }
    // node.parentNode = div 태그
    // node.parentNode.parentNode = Element 태그
    node.parentNode.parentNode.removeChild(node.parentNode);
    // document.body.removeChild(node.parentNode);
}
