<?php

	$inData = getRequestInfo();

header("Content-Type: application/json");
    	header("Access-Control-Allow-Origin: *");
	
	$searchResults = "";
	$searchCount = 0;
	$userId = $inData['userId'];

	$conn = new mysqli("localhost", "DBuser", "newpassword", "contactmanage");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = "SELECT CONTACTS_ID, FirstName, LastName, EmailAddress, PhoneNumber from ContactTable WHERE USER_ID ='{$userId}'";
		
                
                
		
		$result = mysqli_query($conn, $stmt);
		
		
		
		if (mysqli_num_rows($result) > 0)
    		{
        		$output = mysqli_fetch_all($result, MYSQLI_ASSOC);
        		
			echo json_encode($output);
    		}
    		else
    		{
        		echo json_encode(array("message"=> "No Records Found", "status"=> FALSE));
    		}
		
		
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	
	
	
	
?>