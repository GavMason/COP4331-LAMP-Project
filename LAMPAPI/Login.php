<?php

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    $inData = getRequestInfo();
    $id = 0;
    $firstName = "";
    $lastName = "";

    $conn = new mysqli("localhost", "DBuser", "newpassword", "contactmanage");
    if ($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else 
    {
        $stmt = $conn->prepare("SELECT USER_ID, FirstName, LastName FROM Users WHERE Login=? AND Password=?");
        $stmt->bind_param("ss", $inData["Login"], $inData["Password"]);
        $stmt->execute();
        $result = $stmt->get_result();
	/*
        if($row = $result->fetch_assoc())
        {
            $output = mysqli_fetch_all($result, MYSQLI_ASSOC);
        	echo json_encode(array("status"=>TRUE, "response"=>$output));
        }
        else
        {
            returnWithError("No Records Found");
        }
	*/

	

    	if(mysqli_num_rows($result) > 0) 
    	{
        	$output = mysqli_fetch_all($result, MYSQLI_ASSOC);
        	echo json_encode(array("status"=>TRUE, "response"=>$output));
    	}
    	else 
    	{
        	echo json_encode(array("status"=> FALSE));
    	}


        $stmt->close();
        $conn->close();
    }

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function returnWithInfo($firstName, $lastName, $id)
    {
        //$retValue = '{"FirstName":' . $firstName . ', "LastName":' . $lastName . ', "USER_ID":' . $id . '}';
	//$retValue = '{'.$firstName. ', '.$lastName. ', '.$id.'}';
	$retValue = ($firstName);
        sendResultInfoAsJson($retValue);
	//echo json_encode(array("message"=> "Login Successful", "status"=>TRUE));
    }

    function returnWithError($err)
    {
        $retValue = '{"userId":0, "firstName":"", "lastName":"", "error":"'. $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }
?>