<?php

	//======================================================================
	// Send Mail config
	//======================================================================

	// Recipient email address.
	$to = "info@climateexperts.uz";

	// Templates for response.
	$templates = array(
		'success' => '<div class="alert alert-success col-md-10 col-md-offset-1" role="alert">Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.</div>',
		'error'   => '<div class="alert alert-danger col-md-10 col-md-offset-1" role="alert">Извините! Не удалось оформить заявку.</div>'
	);

	//-----------------------------------------------------
	// Send Mail body
	//-----------------------------------------------------

	$name = $subject = $message = "";
    $email = "order@climateexperts.uz";
    $subject = "Новый заказ";

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$name = test_input($_POST["name"]);
		$email = test_input($_POST["email"]);
		$phone = test_input($_POST["phone"]);
		$message = test_input($_POST["message"]);
	}

	if(!empty($name) && !empty($phone)) {
		$headers = 'To: ' . $to . "\r\n";
		$headers .= "From: " . $name . '<' . $email . '>';

        $body = "Имя: " . $name . "\r\n" .
                "E-mail: " . $email . "\r\n" .
                "Телефон: " . $phone . "\r\n" .
                "==============================" . "\r\n" . $message;

		$mailStatus = mail($to,$subject,$body,$headers);

		generateResponse($mailStatus, $templates);
	} else {
		generateResponse(0, $templates);
	}

	function test_input($data) {
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);

		return $data;
	}

	function generateResponse($_mailStatus, $_templates) {
		if($_mailStatus == 1) {
			$response = $_templates['success'];
		} else {
			$response = $_templates['error'];
		}

		echo $response;
	}