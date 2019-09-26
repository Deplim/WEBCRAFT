document.addEventListener("keydown", button1_click, false)

// 캐럿이 될 img 태그와 속성 생성.
var jbBtn = document.createElement('img');
var jbBtnAt = document.createAttribute("src");
var jbBtnAt2 = document.createAttribute("style");

// 만든 속성 변수에 값 대입.
jbBtnAt.value = "https://github.com/Deplim/CWeb_browser_editor/blob/master/source/img/123.PNG?raw=true";
jbBtnAt2.value = "opacity:0.5; position: absolute; top: 0px; left: 0px; z-index: 999; width: 10px; height: 20px";

//실제 img 태그에 만들어 둔 속성 삽입.
jbBtn.setAttributeNode(jbBtnAt);
jbBtn.setAttributeNode(jbBtnAt2);

//완성된 img 태그를 실제 tree 에 적용.
document.body.appendChild(jbBtn);

function button1_click(event) {

    changeSelectionLocation(event);
    // 1. selection 좌표 뽑고 반올림 해서 변수에 저장하기
    let coords = getSelectionCoords();
    let x = Math.round(coords.x);
    let y = Math.round(coords.y);
    console.log(x + "," + y)

    // 2. selection 자표로 캐럿 좌표 변환.
    jbBtn.style.top = String(y) + "px";
    jbBtn.style.left = String(x) + "px";
}

function changeSelectionLocation(event){
    let range = document.createRange();
    let sel = window.getSelection();
    let key = event.keyCode;
    // 방향키 입력
    try{
        if (key === 39) {
            range.setStart(sel.anchorNode, sel.anchorOffset + 1);
        } else if (key == 37)
            range.setStart(sel.anchorNode, sel.anchorOffset - 1);
        else if (key == 38) //위 추가구현 필요
            range.setStart(sel.anchorNode.previousSibling.previousSibling, sel.anchorOffset)
        else if (key == 40) //아래 추가구현 필요
            range.setStart(sel.anchorNode.nextSibling.nextSibling, sel.anchorOffset);
    }
    catch(error){
        console.log("The caret can no longer move.")
    }
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}

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