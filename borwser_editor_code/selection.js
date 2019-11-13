

temp_f()
console.log("start");

//필요 전역 변수들. 
let range = document.createRange();
var x=0, y=0, old_x=0, old_offset;
var absoluteTop=0;
var highlight_mode_on=0;
var current_highlight=0;
var current_target=0;
var highlight_array=new Array()


// << Element 삽입 영역 시작. >>

// 캐럿이 될 img 태그 생성.
var caret = document.createElement('img');

// 캐럿에 src 속성 삽입.
caret.src= "https://github.com/Deplim/CWeb_browser_editor/blob/master/source/img/123.PNG?raw=true";

// 캐럿에 style 속성 삽입.
caret.style="opacity:0.5; position: absolute; top: 0px; left: 0px; z-index: 900; width: 10px; height: 20px";

//캐럿 태그를 실제 dom tree 에 달기.
document.body.appendChild(caret);


// 캐럿 상태표시기 태그 생성
var caret_state = document.createElement('div');
// 캐럿 상태표시기 id 속성 삽입. 
caret_state.id="caret_state";
// 캐럿 상태표시기 style 속성 삽입. 
caret_state.style="position:fixed; top: 5px; left: 530px; z-index: 999; background-color : green;";
// 캐럿 상태표시기 dom 트리에 달기 
document.body.appendChild(caret_state);

// << Element 삽입 영역 끝. >>

//클릭과 버튼에 반응하기. 
document.addEventListener("click", caret_update, false)
document.addEventListener("keydown", caret_update, false)

//키보드 스크롤 막기
jQuery(document).keydown(function(e)
{
  if(e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA"){
    if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){ // 키보드 방향키
        return false;
    }
  }
});

// 창크기 변화 감지
let Height = window.innerHeight; // 현재 브라우저 y 화면 크기
$(window).resize(function(){
    Height = window.innerHeight; // 변화된 브라우저 크기
});


// << 함수 영역 시작 >>

// caret 함수 2 : 신호에 반응하여 캐럿 위치를 바꾸고 스크롤을 이동한다. 
function caret_update(event) {
	// 신호에 따라 selection 변경 
    changeSelectionLocation(event);
    
    // selection 좌표 뽑고 반올림 해서 변수에 저장하기
    let coords = getSelectionCoords();
    x = Math.round(coords.x); // 캐럿 x 상대좌표
    y = Math.round(coords.y); // 캐럿 y 상대좌표

    //현제 스크롤 
    const scrolledTopLength = window.pageYOffset; 

    // y 절대 좌표
    absoluteTop = scrolledTopLength + y; 

    // 사용자가 볼 수 있도록 커널창과 화면에 캐럿 상태 표시.
    document.getElementById("caret_state").innerHTML = ("Coordinates :"+ x + ", " + absoluteTop
    	+"<br>"
        + "relative:" + x + ", " + y + "<br>"
        + "browserHegith: " + Height);
    console.log(x + "," + absoluteTop)

    // 필요에 따라 스크롤 이동.
    if(Height-30 < y){ // 아래로
        window.scrollTo(0, scrolledTopLength+100);
    }
    else if(y < 0){ // 위로
        window.scrollTo(0, scrolledTopLength-100);
    }

    // selection 자표로 캐럿 좌표 변환.
    caret.style.top = String(absoluteTop) + "px";
    caret.style.left = String(x) + "px";

    // 하이라이트 업데이트.
    if(highlight_mode_on==1){
    	current_highlight.style.width=String(10+x-old_x)+"px";
    }
}

// caret 함수 3 : 신호에 따라 selection 위치를 바꾼다. caret update 함수에서 사용됨.
function changeSelectionLocation(event){
    let sel = window.getSelection();
    let key = event.keyCode;
  	// 받은 입력이 무엇인가.
    try{
        if (key === 39) { // 오른쪽 방향키 
            range.setStart(sel.anchorNode, sel.anchorOffset + 1);
            range.collapse(true);
        } else if (key == 37){ // 왼쪽 방향키 
            range.setStart(sel.anchorNode, sel.anchorOffset - 1);
            range.collapse(true);
        } else if (key == 38){ // 위 방향키 
        	sel.modify('move', 'backward', "line");
        	return 0;
        } else if (key == 40){ // 아래 방향키 
            sel.modify('move', 'forward', "line");
            return 0;
        } else if (key == null){ // 마우스 입력
            return 0;
        } else if (key == 83){ // s 키 입력 
            highlight_mode(sel);     
        } else if(key == 46) { // delete 키 입려
        	delete_highlight();
        } else if(key == 84){
        	translator();
        } else {           
            console.log("Nothing command"); }
        sel.removeAllRanges();
        sel.addRange(range);
    }
    catch(error){
        console.log(error.message);
    }

}

// caret 함수 4 : 현제 seleciton 의 상대위치를 반환해 준다.
function getSelectionCoords(win) {
    win = win || window;
    let doc = win.document;
    let sel = doc.selection, range, rects, rect;
    let x = 0, y = 0;
    if (sel) {
        if (sel.type != "Control") {
            range = sel.createRange();
            range.collapse(true);
            x = range.boundingLeft;
            y = range.boundingTop;
        }
    } else if (win.getSelection) {
        sel = win.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                rects = range.getClientRects();
                if (rects.length > 0) {
                    rect = rects[0];
                    x = rect.left;
                    y = rect.top;
                }
            }
            // Fall back to inserting a temporary element
            if (x == 0 && y == 0) {
                let span = doc.createElement("span");
                if (span.getClientRects) {
                    // Ensure span has dimensions and position by
                    // adding a zero-width space character
                    span.appendChild(doc.createTextNode("\u200b"));
                    range.insertNode(span);
                    rect = span.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                    let spanParent = span.parentNode;
                    spanParent.removeChild(span);
                    // Glue any broken text nodes back together
                    spanParent.normalize();
                }
            }
        }
    }
    return {x: x, y: y};
}

// highlight 함수 1 : 
function highlight_mode(sel){

	if (highlight_mode_on==0) 
    	highlight_mode_on=1;
    else
    	highlight_mode_on=0;

    if(highlight_mode_on==1){
		var highlight = document.createElement('img');
		highlight.src= "https://github.com/Deplim/CWeb_browser_editor/blob/master/source/img/123.PNG?raw=true";
		highlight.style="opacity:0.5; position: absolute; top: "+absoluteTop+"px; left:"+x+"px; z-index: 901; width: 10px; height: 20px";
		
		var highlight_onclick = document.createAttribute("onclick");
        highlight_onclick.value ="current_target=this;";
        highlight.setAttributeNode(highlight_onclick);
		
		document.body.appendChild(highlight);
		
		old_x=x;
		old_offset=sel.anchorOffset
		current_highlight=highlight;

		range.setStart(sel.anchorNode, sel.anchorOffset);
        range.setEnd(sel.focusNode , sel.focusOffset); 
        range.collapse(true);
    }
    else{
    	temp_offset=sel.anchorOffset;
    	range.setStart(sel.anchorNode, old_offset);
        range.setEnd(sel.focusNode , sel.focusOffset+1); 
        sel.removeAllRanges();
        sel.addRange(range);
        highlight_array.push([current_highlight,sel.toString()])
        range.setStart(sel.anchorNode, temp_offset);
        range.collapse(true);
    }
}; 

// highlight 함수 2 : 
function delete_highlight(){
	console.log("current target : ")
	console.log(current_target);
	document.body.removeChild(current_target);
	for(var i=0 in highlight_array){
		if(highlight_array[i][0]==current_target){
			highlight_array.splice(i,i+1)
		}
	}
}

// hightlight 함수 3 :
function translator(){
	for(var i=0 in highlight_array){
		if(highlight_array[i][0]==current_target){
			//하이라이트 좌표 구하기
			var target = current_target; // 요소의 id 값이 target이라 가정
			var clientRect = target.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
			var relativeTop = clientRect.top; // Viewport의 시작지점을 기준으로한 상대좌표 Y 값.		​
			var relativeLeft= clientRect.Left;
			var scrolledTopLength = window.pageYOffset; // 스크롤된 길이
			var absoluteTop = scrolledTopLength + relativeTop; // 절대좌표


			//번역기에 넘기기
			console.log("content :")
			console.log(highlight_array[i][1])
			var test = {
				"original_str" : highlight_array[i][1],
				"original_language" : "en",
				"change_language" : "ko"
			};
			jsonSend(test, relativeLeft, absoluteTop+8);
		}
	}
}

// backend translactor 연결 함수
function jsonSend(test,left,top) {
	$.ajax({
		type : "POST",
		url : "http://34.84.8.215:8080/nmt/NMTTestServlet",
		//url : "http://localhost:8080/nmt/NMTTestServlet",
		data : test, //json을 보내는 방법
		success : function(data) { //서블렛을 통한 결과 값을 받을 수 있습니다.
			//string의 값을 object 형식으로 변환합니다.
			var resulut_obj = JSON.parse(data);
			//결과값을 textarea에 넣기 위해서
			console.log("translactor result : ");
			console.log(resulut_obj.message.result.translatedText)
			var caret = document.createElement('img');

			// 번역 결과 삽입.
			var tran_result = document.createElement('p');
			tran_result.style="font-size:9px; font-weight:700; opacity:0.5; position: absolute; top: "+top+"px; left: "+left+"px; z-index: 899; height: 15px";
			tran_result.innerHTML=resulut_obj.message.result.translatedText
			document.body.appendChild(tran_result);
		},
		error : function(e) {
			console.log(e);
			alert('실패했습니다.');
		}
	});
}

