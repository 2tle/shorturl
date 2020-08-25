function createURL() {
    if(!document.getElementById('rawurl').value || !checkUrlForm(document.getElementById('rawurl').value)) {
        alert("url형식을 맞춰 주세요.");
    } else {
        var xhr = new XMLHttpRequest();
        var data = {
            "raw": document.getElementById('rawurl').value
        };
        xhr.open('POST','/createURL/l',true);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.onload = function() {
            if(xhr.status != 200) alert("서버오류. 다시 시도해주세요.");
            else {
                var responseText = JSON.parse(xhr.responseText);
                alert("ShortURL이 생성되었습니다.\n"+document.location.href+responseText.shortURL);
            }
        }
    }
}

function checkUrlForm(strUrl) {
    var expUrl = /^http[s]?\:\/\//i;
    return expUrl.test(strUrl);
}