// 구현 해야 할 것
// 1. text_area 저장 - 구현 O
// 2. highlight 저장 - 구현 O
// 3. text_area 로드 - 구현 O
// 4. highlight 로드 - 구현 O

//필요 element 생성
var st_button = document.createElement('button');
st_button.innerHTML=("storage");
st_button.style="position: fixed; top: 5px; left: 400px;";
document.body.appendChild(st_button);
st_button.addEventListener('click', createURL);

var space=document.createElement('p')
space.id="Element";
document.body.appendChild(space);

// 페이지 로딩 완료시 함수 작동
window.onload = function () {
	recieveURL(); // 로드
}

// 로드
function recieveURL(){
	chrome.storage.sync.get("data", function(items) {
		if (!chrome.runtime.error) {

			// 비어 있다면 Element 태그 내에 아무것도 안넣음
			if(items.data == null){}
			else
				document.getElementById('Element').innerHTML= items.data;


			// 불러온 태그들 다시 저장 할때 사용하는 배열에 집어넣어줌
			// textarea 담긴 태그 찾아줌(div)
			var div_area_List=document.getElementsByClassName("div_area_class");
			for(var i = 0; i<div_area_List.length; i++){
				// textarea_array에 불러온 값 넣어줌
				textarea_array.push(div_area_List[i]);
			}

			// highlight 태그 찾아줌
			var highlight_List = document.getElementsByClassName("highlight_class");
			for(var i = 0; i<highlight_List.length; i++){
				// highlight_array에 불러온 값 넣어줌, 두번째 배열 값에 하이라이트된 부분 문자열 넣어줘야함
				highlight_array.push([highlight_List[i], null]);
			}

			// bookmark 태그 찾아줌
			var jbBook_List = document.getElementsByClassName("jbBook_class");
			for(var i = 0; i<jbBook_List.length; i++){
				// jbBook_array에 불러온 값 넣어줌
				jbBook_array.push((jbBook_List[i]));
			}

			// 불러온 태그에 addEventListener 연결
			// x 버튼 태그들 찾아줌
			var ta_delete_List=document.getElementsByClassName("ta_delete_class");
			for(var i = 0; i<ta_delete_List.length; i++){
				// 삭제 함수 연결
				ta_delete_List[i].addEventListener("click", delete_textarea);
			}

			// jbBook 노드 위치 설정
			for(var i = 0; i<jbBook_List.length; i++){
				arrayLocation++; // 북마크 순서 bookmark.js 참조
				document.body.insertBefore(jbBook_List[i],document.body.childNodes[i]);
			}

		}
	});
}
// 저장
function createURL() {
	// textarea_array 는 text_area.js 에 있는 변수임
	// highlight_array 는 selection.js 에 있는 변수임

	// 저장 할때 쓰는 배열 1. text_area 2. highlight 3. bookmark 정보 저장
	// 저장전 이전 저장 값 초기화, storage_html_array 초기화
	var storage_html_array=new Array();
	
	// text_array 저장
	for(var i=0 in textarea_array){
		var temp=textarea_array[i].getElementsByTagName("TEXTAREA");
		temp[0].innerHTML=temp[0].value;
		storage_html_array.push(textarea_array[i].outerHTML);
	}
	// highlight 저장
	for(var i=0 in highlight_array){
		storage_html_array.push(highlight_array[i][0].outerHTML);
	}
	// bookmark 저장
	for(var i=0 in jbBook_array){
		storage_html_array.push(jbBook_array[i].outerHTML);
	}

    chrome.storage.sync.set({ "data" : storage_html_array }, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    });
}

