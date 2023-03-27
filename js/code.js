const urlBase = "https://contactmanager.tech/LAMPAPI";
const extension = "php";

function addContact() {
    readUserCookie();
    contactFirstName = document.getElementById("firstName").value;
    contactLastName = document.getElementById("lastName").value;
    phoneNumber = document.getElementById("phonenumber").value;
    emailAddress = document.getElementById("Email").value;

    let tmp = {
        firstName: contactFirstName,
        lastName: contactLastName,
        phoneNumber: phoneNumber,
        Email: emailAddress,
        userId: userId,
    };
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + "/addContact." + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                if (jsonObject.status == true) {
                   document.getElementById("formCorrection").innerHTML = jsonObject.message;
        		document.getElementById("formCorrection").style.color = 'green';
                } else {
                     document.getElementById("formCorrection").innerHTML = jsonObject.message;
        		document.getElementById("formCorrection").style.color = 'red';
                }
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        
    }
}

function login() {
    let login = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let tmp = { Login: login, Password: password };
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + "/Login." + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
 
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                if (jsonObject.status == true) {
                    userId = jsonObject.response[0].USER_ID;
                    firstName = jsonObject.response[0].FirstName;
                    lastName = jsonObject.response[0].LastName;
			saveUserCookie();
                    window.location.href = "modal.html";
                    
                } else {
                   	document.getElementById("missingInfo").innerHTML = "Invalid username or password.";
	        	document.getElementById("missingInfo").style.color = 'red';
                }
            }
        };

        xhr.send(jsonPayload);
    } catch (err) {
        // ADD ERROR MESSAGE
    }
}



function register() {

  let fName = document.getElementById("firstName").value;
  let lName = document.getElementById("lastName").value;		
  let userLogin = document.getElementById("username").value;
  let userPassword = document.getElementById("password").value;
	
  let tmp = {
    firstName: fName,
    lastName: lName,
    userLogin: userLogin,
    userPassword: userPassword,
	
  };
  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + "/Register." + extension;

 let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);

        if (jsonObject.status == true) {
          	userId = jsonObject.response[0].USER_ID;
                firstName = jsonObject.response[0].FirstName;
                lastName = jsonObject.response[0].LastName;
		saveUserCookie();
	  window.location.href = "modal.html";
        } else {        
            document.getElementById("formCorrection").innerHTML = jsonObject.message;
            document.getElementById("formCorrection").style.color = 'red';
        }
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    
  }
}

function welcome() {
	readUserCookie();
    title = document.getElementById("welcomeCustom");
    title.innerText = "Welcome " + firstName + " " + lastName + "!";
}

function info(){
	readConCookie();
	document.getElementById("firstName").value = FirstName;
	document.getElementById("lastName").value = LastName;
	document.getElementById("phonenumber").value = PhoneNumber;
	document.getElementById("Email").value = EmailAddress;
}

function get(s) {
    title = document.getElementById("s");
    return title;
}

function getContacts() {
        readUserCookie();
	let contactList="";
    
    let tmp = { userId: userId };
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + "/SearchContacts." + extension;
	let url2 = urlBase + "/SearchContacts2." + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            
            if (this.readyState == 4 && this.status == 200) {
                
                let jsonObject = JSON.parse(xhr.responseText);

                if (jsonObject.status == true) {
			fetch(url2,{
			method: 'POST',
			headers:{
				'Content-Type':'application/json'
				},
			body: JSON.stringify(tmp)
			})
			.then(function(response){
				return response.json();
			})

			.then(function(products){
				let placeholder = document.querySelector("#body");
				let out ="";
				for(let product of products){
					out += `
					<tr>
						<td class="" style="padding-top: 1rem;
                      				padding-bottom: 1rem; 
                      				padding-right: 0.75rem; 
                      				padding-left: 1rem; 
                      				padding-left: 1.5rem; 
                      				color: #111827; 
                      				font-size: 0.875rem;
                      				line-height: 1.25rem; 
                      				font-weight: 500; 
                      				white-space: nowrap; 
                      				"> ${product.FirstName}</td>
						<td class="" style="padding-top: 1rem;
                      				padding-bottom: 1rem; 
                      				padding-right: 0.75rem; 
                      				padding-left: 1rem; 
                      				padding-left: 1.5rem; 
                      				color: #111827; 
                      				font-size: 0.875rem;
                      				line-height: 1.25rem; 
                      				font-weight: 500; 
                      				white-space: nowrap; 
                      				"> ${product.LastName}</td>
						<td class="" style="padding-top: 1rem;
                      				padding-bottom: 1rem; 
                      				padding-right: 0.75rem; 
                      				padding-left: 1rem; 
                      				padding-left: 1.5rem; 
                      				color: #111827; 
                      				font-size: 0.875rem;
                      				line-height: 1.25rem; 
                      				font-weight: 500; 
                      				white-space: nowrap; 
                      				"> ${product.PhoneNumber}</td>
						<td class="" style="padding-top: 1rem;
                      				padding-bottom: 1rem; 
                      				padding-right: 0.75rem; 
                      				padding-left: 1rem; 
                      				padding-left: 1.5rem; 
                      				color: #111827; 
                      				font-size: 0.875rem;
                      				line-height: 1.25rem; 
                      				font-weight: 500; 
                      				white-space: nowrap; 
                      				"> ${product.EmailAddress}</td>
						  <td class="" style="
                      position: relative; 
                      display: flex-end;
                      flex-direction: row;
                      padding-top: 1rem;
                      padding-bottom: 1rem; 
                      padding-left: 0.75rem; 
                      padding-right: 1rem; 
                      padding-right: 1.5rem; 
                      font-size: 0.875rem;
                      line-height: 1.25rem; 
                      font-weight: 500; 
                      text-align: right; 
                      white-space: nowrap; ">
                        <button id="${product.CONTACTS_ID}" type="button"
                          class="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" style="
                            width: auto;
                            display: inline-flex;
                            padding-top: 0.5rem;
                            padding-bottom: 0.5rem;
                            padding-left: 0.75rem;
                            padding-right: 0.75rem;
                            margin-right: 1rem;
                            background-color: #8acade;
                            color: #ffffff;
                            font-size: 0.875rem;
                            line-height: 1.25rem;
                            font-weight: 500;
                            justify-content: center;
                            align-items: center;
                            border-radius: 0.375rem;
                            border-width: 1px;
                            border-color: transparent;
                            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                          " onMouseOver="this.style.backgroundColor='#4338CA'"
                          onMouseOut="this.style.backgroundColor='#8acade'"
                          onclick=getContact(this.id)>
                          Edit
                        </button>
                        <button id="${product.CONTACTS_ID}" type="button"
                          class="hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          style="
                            width: auto;
                            display: inline-flex;
                            padding-top: 0.5rem;
                            padding-bottom: 0.5rem;
                            padding-left: 0.75rem;
                            padding-right: 0.75rem;
                            background-color: red;
                            color: #ffffff;
                            font-size: 0.875rem;
                            line-height: 1.25rem;
                            font-weight: 500;
                            justify-content: center;
                            align-items: center;
                            border-radius: 0.375rem;
                            border-width: 1px;
                            border-color: transparent;
                            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                          " "
                          onMouseOver="this.style.backgroundColor='#b91c1c'"
                          onMouseOut="this.style.backgroundColor='#ef4444'"
				onclick=choose(this.id)>
                          Delete
                        </button>
                      </td>
					</tr>
					`;
				}
				placeholder.innerHTML = out;
			})//end fetch
		} else {
		return;
		}
		
            }//end if (this.readyState == 4 && this.status == 200) 
        };

        xhr.send(jsonPayload);
    } catch (err) {
        // ADD ERROR MESSAGE
    }
}



function saveUserCookie() {
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    document.cookie = 
	"bug2=" +
        firstName +
	",firstName=" +
        firstName +
        ",lastName=" +
        lastName +
        ",userId=" +
        userId +
        ";expires=" +
        date.toGMTString();
}
function readUserCookie() {
    userId = -1;
    let data = document.cookie;

    if (data == null) {
        window.location.href = "index.html";
    }

    let splits = data.split(",");
    for (var i = 0; i < splits.length; i++) {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if (tokens[0] == "firstName") {
            firstName = tokens[1];
        } else if (tokens[0] == "lastName") {
            lastName = tokens[1];
        } else if (tokens[0] == "userId") {
            userId = parseInt(tokens[1].trim());
        }
    }

    if (userId < 0) {
        window.location.href = "index.html";
    } else {
        
    }
}

function editContact(){
    
    contactFirstName = document.getElementById("firstName").value;
    contactLastName = document.getElementById("lastName").value;
    phoneNumber = document.getElementById("phonenumber").value;
    emailAddress = document.getElementById("Email").value;
    contactId = CONTACTS_ID;

    let tmp = {
        firstName: contactFirstName,
        lastName: contactLastName,
        phoneNumber: phoneNumber,
        Email: emailAddress,
        contactId: contactId,
    };
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + "/updateContact." + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                if (jsonObject.status == true) {
                    document.getElementById("formCorrection").innerHTML = "Contact Updated!!";
        		document.getElementById("formCorrection").style.color = 'green';
                } else {
                    
                }
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        
    }

}

function getContact(id) {

    let tmp = { CONTACTS_ID: id };
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + "/getContact." + extension;
   
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                if (jsonObject.status == true) {
                    	CONTACTS_ID = jsonObject.response[0].CONTACTS_ID;
			EmailAddress = jsonObject.response[0].EmailAddress;
			FirstName = jsonObject.response[0].FirstName;
			LastName = jsonObject.response[0].LastName;
			PhoneNumber = jsonObject.response[0].PhoneNumber;
			saveConCookie();
                    window.location.href = "editContact.html";
                } else {
                    return;
                }
            }
        };
        xhr.send(jsonPayload);
    
}//end getContact

function saveConCookie() {
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    document.cookie = 
	"bug=" +
        EmailAddress +
	",EmailAddress=" +
        EmailAddress +
        ",FirstName=" +
        FirstName +
	",CONTACTS_ID=" +
        CONTACTS_ID +
	",PhoneNumber=" +
        PhoneNumber +
        ",LastName=" +
        LastName +
        ";expires=" +
        date.toGMTString();
}
function readConCookie() {
    
    let data2 = document.cookie;

    if (data2 == null) {
        window.location.href = "index.html";
    }

    let splits = data2.split(",");
    for (var i = 0; i < splits.length; i++) {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if (tokens[0] == "EmailAddress") {
            EmailAddress = tokens[1];
        } else if (tokens[0] == "FirstName") {
            FirstName = tokens[1];
        } else if (tokens[0] == "CONTACTS_ID") {
            CONTACTS_ID = parseInt(tokens[1].trim());
        }else if (tokens[0] == "PhoneNumber") {
            PhoneNumber = tokens[1];
        }else if (tokens[0] == "LastName") {
            LastName = tokens[1];
        }
    }

    
}

function deleteContact(id) {

    let tmp = { CONTACTS_ID: id };
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + "/DeleteContact." + extension;
   
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                if (jsonObject.status == true) {
                    	window.location.href = "modal.html";
                } else {
                    
                }
            }
        };
        xhr.send(jsonPayload);
    
}//end getContact

function searchContact() {
	readUserCookie();
	let lookFor = document.getElementById("searchText").value;

    let tmp = { userId: userId, lookFor: lookFor};
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + "/SearchContactsAll." + extension;
    let url2 = urlBase + "/SearchContactsAll2." + extension;    

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    try {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

		if (jsonObject.status == true) {
			fetch(url2,{
			method: 'POST',
			headers:{
				'Content-Type':'application/json'
				},
			body: JSON.stringify(tmp)
			})
			.then(function(response){
				return response.json();
			})

			.then(function(products){
				let placeholder = document.querySelector("#body");
				let out ="";
				for(let product of products){
					out += `
					<tr>
						<td class="" style="padding-top: 1rem;
                      				padding-bottom: 1rem; 
                      				padding-right: 0.75rem; 
                      				padding-left: 1rem; 
                      				padding-left: 1.5rem; 
                      				color: #111827; 
                      				font-size: 0.875rem;
                      				line-height: 1.25rem; 
                      				font-weight: 500; 
                      				white-space: nowrap; 
                      				"> ${product.FirstName}</td>
						<td class="" style="padding-top: 1rem;
                      				padding-bottom: 1rem; 
                      				padding-right: 0.75rem; 
                      				padding-left: 1rem; 
                      				padding-left: 1.5rem; 
                      				color: #111827; 
                      				font-size: 0.875rem;
                      				line-height: 1.25rem; 
                      				font-weight: 500; 
                      				white-space: nowrap; 
                      				"> ${product.LastName}</td>
						<td class="" style="padding-top: 1rem;
                      				padding-bottom: 1rem; 
                      				padding-right: 0.75rem; 
                      				padding-left: 1rem; 
                      				padding-left: 1.5rem; 
                      				color: #111827; 
                      				font-size: 0.875rem;
                      				line-height: 1.25rem; 
                      				font-weight: 500; 
                      				white-space: nowrap; 
                      				"> ${product.PhoneNumber}</td>
						<td class="" style="padding-top: 1rem;
                      				padding-bottom: 1rem; 
                      				padding-right: 0.75rem; 
                      				padding-left: 1rem; 
                      				padding-left: 1.5rem; 
                      				color: #111827; 
                      				font-size: 0.875rem;
                      				line-height: 1.25rem; 
                      				font-weight: 500; 
                      				white-space: nowrap; 
                      				"> ${product.EmailAddress}</td>
						  <td class="" style="
                      position: relative; 
                      display: flex-end;
                      flex-direction: row;
                      padding-top: 1rem;
                      padding-bottom: 1rem; 
                      padding-left: 0.75rem; 
                      padding-right: 1rem; 
                      padding-right: 1.5rem; 
                      font-size: 0.875rem;
                      line-height: 1.25rem; 
                      font-weight: 500; 
                      text-align: right; 
                      white-space: nowrap; ">
                        <button id="${product.CONTACTS_ID}" type="button"
                          class="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" style="
                            width: auto;
                            display: inline-flex;
                            padding-top: 0.5rem;
                            padding-bottom: 0.5rem;
                            padding-left: 0.75rem;
                            padding-right: 0.75rem;
                            margin-right: 1rem;
                            background-color: #8acade;
                            color: #ffffff;
                            font-size: 0.875rem;
                            line-height: 1.25rem;
                            font-weight: 500;
                            justify-content: center;
                            align-items: center;
                            border-radius: 0.375rem;
                            border-width: 1px;
                            border-color: transparent;
                            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                          " onMouseOver="this.style.backgroundColor='#7cb5c7'"
                          onMouseOut="this.style.backgroundColor='#8acade'"
                          onclick=getContact(this.id)>
                          Edit
                        </button>
                        <button id="${product.CONTACTS_ID}" type="button"
                          class="hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          style="
                            width: auto;
                            display: inline-flex;
                            padding-top: 0.5rem;
                            padding-bottom: 0.5rem;
                            padding-left: 0.75rem;
                            padding-right: 0.75rem;
                            background-color: red;
                            color: #ffffff;
                            font-size: 0.875rem;
                            line-height: 1.25rem;
                            font-weight: 500;
                            justify-content: center;
                            align-items: center;
                            border-radius: 0.375rem;
                            border-width: 1px;
                            border-color: transparent;
                            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                          " "
                          onMouseOver="this.style.backgroundColor='#b91c1c'"
                          onMouseOut="this.style.backgroundColor='#ef4444'"
				onclick=choose(this.id)>
                          Delete
                        </button>
                      </td>
					</tr>
					`;
				}
				placeholder.innerHTML = out;
			})//end fetch
		} else {

			let placeholder = document.querySelector("#body");
				let out = `
			<tr>
                            <td class=" " style="padding-top: 1rem; padding-bottom: 1rem; padding-right: 0.75rem; padding-left:1rem; padding-left: 1.5rem; color: #111827; font-size: 0.875rem; line-height: 1.25rem; font-weight: 500; white-space: nowrap; ">
                                No Records Found.
                            </td>
                        </tr>
			`;
			placeholder.innerHTML = out;
		}                

            }// end if (this.readyState == 4 && this.status == 200) 
        };

        xhr.send(jsonPayload);
    } catch (err) {
        // ADD ERROR MESSAGE
    }
}//searchContact()
