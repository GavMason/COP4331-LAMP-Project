<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "DBuser", "newpassword", "contactmanage");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT * from ContactTable WHERE CONTACTS_ID = ?");
                
		$stmt->bind_param("s", $inData["CONTACTS_ID"] );
		$stmt->execute();
		$result = $stmt->get_result();
		
		
    	if (mysqli_num_rows($result) > 0)
    	{
        	$output = mysqli_fetch_all($result, MYSQLI_ASSOC);
        	echo json_encode(array("status"=>TRUE, "response"=>$output));
    	}
    	else
    	{
        	echo json_encode(array("message"=> "No Records Found", "status"=> FALSE));
    	}
		
		
		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	
	
?>