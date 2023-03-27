<?php

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    $inData = getRequestInfo();
    $fname = $inData['firstName'];
    $lname = $inData['lastName'];
    $uname = $inData['userLogin'];
    $pass = $inData['userPassword'];
	$result = "";
	$result2 = "";
	$output = "";

    $conn = new mysqli("localhost", "DBuser", "newpassword", "contactmanage");
    if ($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else 
    {
        $stmt = $conn->prepare("SELECT * FROM Users WHERE Login=?");
    	$stmt->bind_param("s", $uname);
        $stmt->execute();
        $result = $stmt->get_result();

    if($row = $result->fetch_assoc())
    {
        echo json_encode(array("message" => "Username already exsits", "status"=>FALSE));
    }
    else
    {
        $sql="INSERT INTO Users(FirstName,LastName,Login,Password) 		
	VALUES('{$fname}','{$lname}','{$uname}','{$pass}')";
        if(mysqli_query($conn,$sql)){

	    $stm = $conn->prepare("SELECT USER_ID, FirstName, LastName FROM Users WHERE Login=?");
    	    $stm->bind_param("s", $uname);
            $stm->execute();
            $result2 = $stm->get_result();
            $output = mysqli_fetch_all($result2, MYSQLI_ASSOC);
            echo json_encode(array("status"=>TRUE, "response"=>$output));
        }else{
            echo json_encode(array("message"=> "Error, no account created","status"=> FALSE));
        }
	$stm->close();
    }


        $stmt->close();
	
	
        
    }//end else

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

   

    
?>