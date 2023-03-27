 <?php

	$data = getRequestInfo();
	
	header("Content-Type: application/json");
    	header("Access-Control-Allow-Origin: *");

	 $firstName = $data['firstName'];
    	$lastName = $data['lastName'];
    	$phoneNumber = $data['phoneNumber'];
    	$emailAddress = $data['Email'];
    	$userId = $data['userId'];
	

	$conn =  mysqli_connect("localhost", "DBuser", "newpassword", "contactmanage");

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
	
		$sql = "SELECT * FROM ContactTable WHERE PhoneNumber='{$phoneNumber}' AND USER_ID='{$userId}'";
    		$result = mysqli_query($conn, $sql);

    		if (mysqli_num_rows($result) > 0)
    		{
        		echo json_encode(array("message"=>"Contact phone number already exists", "status"=>FALSE));
    		}
    		else 
    		{

        		$sql = "INSERT INTO ContactTable(FirstName, LastName, PhoneNumber, EmailAddress, USER_ID)
            		VALUES ('{$firstName}', '{$lastName}', '{$phoneNumber}','{$emailAddress}','{$userId}')";


        		if(mysqli_query($conn,$sql)){
            			echo json_encode(array("message"=> "Contact Record Added","status"=> TRUE));
        		}else{
            			echo json_encode(array("message"=> "Contact Record could not be added","status"=> FALSE));
        		}
    		}
	}		

	  function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

   
	
?>