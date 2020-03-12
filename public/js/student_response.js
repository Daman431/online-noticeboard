const username = document.getElementById('username').textContent;

const getStudentRecord = ()=>{
    var xhr = new XMLHttpRequest;
    xhr.open("GET","/studentRecord?username="+username);
    xhr.send();
    xhr.onreadystatechange  = function(){
        if(this.readyState == 4 && this.status == 200){
            const record = JSON.parse(xhr.responseText);
            console.log(record); 
            for(i=0;i<record.message.length;i++){
                console.log(record.message[i]);
                var messageContainer = document.getElementById('messageContainer');
                var message = document.createElement('p');

                message.innerHTML = record.message[i];
                messageContainer.appendChild(message);
            }
        }
    }
}
getStudentRecord();