 <?php

	$data = getRequestInfo();
	
	header("Content-Type: application/json");
    	header("Access-Control-Allow-Origin: *");

		$firstName = $data['firstName'];
    	$lastName = $data['lastName'];
    	$phoneNumber = $data['phoneNumber'];
    	$emailAddress = $data['Email'];
    	$contactId = $data['contactId'];

	$conn =  mysqli_connect("localhost", "DBuser", "newpassword", "contactmanage");

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{

        		$sql="UPDATE ContactTable SET 
        		FirstName='{$firstName}',
        		LastName='{$lastName}',
				PhoneNumber='{$phoneNumber}',
        		EmailAddress='{$emailAddress}'
        		WHERE CONTACTS_ID='{$contactId}'";

        		if(mysqli_query($conn,$sql)){
            			echo json_encode(array("message"=> "Contact Record updated","status"=> TRUE));
        		}else{
            			echo json_encode(array("message"=> "Contact Record could not be updated","status"=> FALSE));
        		}
    		
	}		

	function getRequestInfo(){
        	return json_decode(file_get_contents('php://input'), true);
    	}

   
	
?>