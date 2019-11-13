// 지울거임
var ta_delete_List;

//필요 전역 변수
var textarea_html_array=new Array()

//필요 element 생성
var st_button = document.createElement('button');
st_button.innerHTML=("storage");
st_button.style="position: fixed; top: 5px; left: 400px;";
document.body.appendChild(st_button);
st_button.addEventListener('click', createURL);

var rc_button = document.createElement('button');
rc_button.innerHTML=("recieve");
rc_button.style="position: fixed; top: 30px; left: 400px;";
document.body.appendChild(rc_button);
rc_button.addEventListener('click', recieveURL);

var space=document.createElement('p')
space.id="Element";
document.body.appendChild(space);



function recieveURL(){
	chrome.storage.sync.get("data", function(items) {
		if (!chrome.runtime.error) {
	    	// document.getElementById('Element').innerHTML= items.data;
			document.body.innerHTML = document.body.innerHTML + items.data;

			ta_delete_List=document.getElementsByClassName("ta_delete_class");

			for(var i =0; i<ta_delete_List.length; i++){
				ta_delete_List[i].addEventListener("click", delete_textarea);
			}
		}
	});
}

function createURL() {
	for(var i=0 in textarea_array){
		var temp=textarea_array[i].getElementsByTagName("TEXTAREA")
		temp[0].innerHTML=temp[0].value
		textarea_html_array[i]=textarea_array[i].outerHTML;
	}
	for(var i=0 in highlight_array){
		highlight_html_array[i]=textarea_array[i][0].outerHTML;
	}

    chrome.storage.sync.set({ "data" : textarea_html_array }, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    });
}

