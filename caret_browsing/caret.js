// 클릭과 방향키에 반응하여 함수 실행. 
document.addEventListener("click", caret_update, false)
document.addEventListener("keydown", caret_update, false)

// 기본 사용 변수 
let range = document.createRange();

// 1. 캐럿이 될 img 태그
var jbBtn = document.createElement('img');

// 캐럿 속성 생성.
var jbBtnAt = document.createAttribute("src");
var jbBtnAt2 = document.createAttribute("style");

// 만든 속성 변수에 값 대입.
jbBtnAt.value = "../source/img/123.png";

// 여기에 position 부분을 absolute 로 하면 캐럿이 절대위치로 박히고
// fixed 로 하면 화면 상대위치로 박힌다.
jbBtnAt2.value = "opacity:0.5; position: absolute; top: 0px; left: 0px; z-index: 999; width: 10px; height: 20px";

//실제 img 태그에 만들어 둔 속성 삽입.
jbBtn.setAttributeNode(jbBtnAt);
jbBtn.setAttributeNode(jbBtnAt2);

//완성된 img 태그를 실제 tree 에 적용.
document.body.appendChild(jbBtn);


// 2. text area mode 실행 버튼. 
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


// 함수1 : 입력이 있을 때 캐럿 위치를 바꾼다.
function caret_update(event) {

    changeSelectionLocation(event);
    // 1. selection 좌표 뽑고 반올림 해서 변수에 저장하기
    let coords = getSelectionCoords();
    let x = Math.round(coords.x);
    let y = Math.round(coords.y);
    document.getElementById("coords").innerHTML = x + ", " + y;
    console.log(x + "," + y)

    // 2. selection 자표로 캐럿 좌표 변환.
    jbBtn.style.top = String(y) + "px";
    jbBtn.style.left = String(x) + "px";
}

// 함수2 : 캐럿 출력 전에 selection 의 위치를 바꾼다.
function changeSelectionLocation(event){
    let sel = window.getSelection();
    let key = event.keyCode;
    // 방향키 입력
    try{
        if (key === 39) {
            range.setStart(sel.anchorNode, sel.anchorOffset + 1);
            range.collapse(true);
        } else if (key == 37){
            range.setStart(sel.anchorNode, sel.anchorOffset - 1);
            range.collapse(true);
        }
        else if (key == 38){ //위 추가구현 필요
            range.setStart(sel.anchorNode.previousSibling.previousSibling, sel.anchorOffset);
            range.collapse(true);
        }
        else if (key == 40){ //아래 추가구현 필요
            range.setStart(sel.anchorNode.nextSibling.nextSibling, sel.anchorOffset);
            range.collapse(true);
        }
        else if (key == null){// 마우스 입력
            range.setStart(sel.anchorNode, sel.anchorOffset);
            range.collapse(true);
        }
        else if (key == 32){// 마우스 입력
            range.setStart(sel.anchorNode, sel.anchorOffset);
            range.setEnd(sel.focusNode , sel.focusOffset+1);
            console.log('space')
        }
        else{
            console.log("Nothing command");
        }
        
        sel.removeAllRanges();
        sel.addRange(range);
    }
    catch(error){
        console.log("The caret can no longer move.")
    }

}

// 함수3 : seleciton 의 정확한 위치좌표를 뽑아준다.
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

//함수4 : text_area_mode 버튼이 눌렸을 때 어떤 행동을 할지 결정한다.
function text_area_mode(){
    check=0;
    document.addEventListener("click", insert_text_area, false)
}

//함수5 : 실제로 브라우저 화면상에 textbox 를 붙인다. 
function insert_text_area(){

    if((check!=0)){
        var x = event.clientX;
        var y = event.clientY;
        console.log("click_point : "+x+" , "+y);

        var text_area = document.createElement('textarea');

        var ta_Text = document.createTextNode( 'input text here :)' );
        text_area.appendChild( ta_Text );

        
        var text_area_att = document.createAttribute("style");
        text_area_att.value="position: absolute; left: "+x+"px; top: "+y+"px;";
        text_area.setAttributeNode(text_area_att);
        
        document.body.appendChild(text_area);
    }
    check=check+1;
}