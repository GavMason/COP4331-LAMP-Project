 <?php
	header("Content-Type: application/json"); 
    	header("Access-Control-Allow-Origin: *"); 

	$inData = getRequestInfo();
	
	$Id = $inData['CONTACTS_ID'];

	$conn =  mysqli_connect("localhost", "DBuser", "newpassword", "contactmanage");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = "DELETE FROM ContactTable WHERE CONTACTS_ID = '{$Id}'";
		
		if(mysqli_query($conn, $stmt)){
    			echo json_encode(array("message"=> "Contact deleted","status"=> TRUE));
		} 
		else {
    			echo json_encode(array("message"=> "No Contact deleted","status"=> FALSE));
		}
		
		
	}//end else

	function getRequestInfo()
    	{
        	return json_decode(file_get_contents('php://input'), true);
    	}

   $conn->close();
	
?>