const appendMessage = (messageArray)=>{
    const publicMessageContainer = document.getElementById("publicMessageContainer");
    for(i=0;i<messageArray.length;i++){

        let paragragh = document.createElement('p');
        paragragh.innerHTML = messageArray[i].message;
        publicMessageContainer.appendChild(paragragh);
    }
}

const getPublicMessage = ()=>{
    var xhr = new XMLHttpRequest;
    xhr.open("GET","/publicMessage");
    xhr.send();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            let messageArray = JSON.parse(xhr.responseText);
            console.log(messageArray);
            appendMessage(messageArray);
        }
    }
}
getPublicMessage();