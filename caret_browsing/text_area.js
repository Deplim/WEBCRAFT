// << text area mode 실행 버튼. >>
var ta_button = document.createElement('button');

//버튼 이름. 
var ta_button_Text = document.createTextNode( 'textarea_mode' );
ta_button.appendChild( ta_button_Text );

//속성 삽입 
var ta_button_att = document.createAttribute("onclick");
ta_button_att.value="text_area_mode()";
ta_button.setAttributeNode(ta_button_att);


var ta_button_att2 = document.createAttribute("style");
ta_button_att2.value="position: absolute; top: 5px; left: 350px;";
ta_button.setAttributeNode(ta_button_att2);

// dom 트리에 달기 
document.body.appendChild(ta_button);

//text_area 함수 1 : text_area_mode 버튼이 눌렸을 때 어떤 행동을 할지 결정한다.
function text_area_mode(){
    check=0;
    document.removeEventListener("click", caret_update, false);
    document.removeEventListener("keydown", caret_update, false);
    document.addEventListener("click", insert_text_area, false);
}

//text_area 함수 2 : 실제로 브라우저 화면상에 textbox 를 붙인다. 
function insert_text_area(){
	if (event.target) {
        targ=event.target;
    } else if (event.srcElement) {
        targ=event.srcElement;
    }
    var tname;
    tname = targ.tagName;
    console.log(tname)

    if((check!=0)&&(tname!='TEXTAREA')){
        var x = event.clientX;
        var y = event.clientY;
        console.log("click_point : "+x+" , "+y);

        var text_area = document.createElement('textarea');

        var ta_Text = document.createTextNode( 'input text here :)' );
        text_area.appendChild( ta_Text );

        
        var text_area_att = document.createAttribute("style");
        text_area_att.value="opacity:0.7; position: absolute; left: "+x+"px; top: "+y+"px;";
        text_area.setAttributeNode(text_area_att);
        
        document.body.appendChild(text_area);
    }
    check=check+1;
}