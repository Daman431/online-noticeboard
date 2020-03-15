

//Get Student Details from the Database//
const getStudentDetails = ()=>{
    var xhr = new XMLHttpRequest();
	xhr.open("GET","/studentList");
	xhr.send();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
            var studentList = JSON.parse(xhr.responseText);
            for(i=0;i<studentList.length;i++){

                var studentListDiv = document.getElementById("studentListContainer");

                //Student Selection Box
                var studentCheckBox = document.createElement('input');
                    studentCheckBox.type = 'checkbox';
                    studentCheckBox.name = 'student';
                    studentCheckBox.value = studentList[i].username;
                    studentCheckBox.className = 'markStudents';

                //Student Name
                var studentLabel = document.createElement('label');
                var studentName = document.createTextNode(studentList[i].username);

                //Appending childs
                    studentLabel.appendChild(studentCheckBox);
                    studentLabel.appendChild(studentName);
                    studentListDiv.appendChild(studentLabel);
            }
		}
	}
}
getStudentDetails();

//Getting Selected Students

//Selected Student Array 
var selectedStudentsArray = [];

const getSelectedStudents = ()=>{
    var markedStudents = document.getElementsByClassName('markStudents');
    for(i=0;i<markedStudents.length;i++){
        
        if(markedStudents[i].checked){
            selectedStudentsArray.push(markedStudents[i].value)
        }
    }
    console.log(selectedStudentsArray);
}


//Hide Modals Call Selected Students//
const hideStudentList = ()=>{
    $("#studentList").modal('hide');
    getSelectedStudents();
}


//Sending Message and Student list

const sendMessage = ()=>{


    //Getting Messasge from the Front End
    var message = document.getElementById('messageContainer').value;

    //Sending The Request
    var xhr = new XMLHttpRequest;
    xhr.open("POST",'/message');
    xhr.setRequestHeader("Content-type", "application/JSON");
    let  messageObject = {
        studentList: selectedStudentsArray,
        message:message
    }
    xhr.send(JSON.stringify(messageObject));
    var publicMessageCheck = document.getElementById('publicMessage');
    if(publicMessageCheck.checked){
        postPublicMessage(message)
    }
}
const postPublicMessage = (message)=>{
    var xhr = new XMLHttpRequest;
    xhr.open("POST","/publicMessage");
    xhr.setRequestHeader("Content-type","application/JSON")
    let messageObject = {
        message:message
    }
    xhr.send(JSON.stringify(messageObject));
}
