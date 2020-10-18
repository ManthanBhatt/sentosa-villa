<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) header("Access-Control-Allow-Headers:{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

date_default_timezone_set("Asia/kolkata");

$data = file_get_contents('php://input');
$request = json_decode($data);

if (!isset($request->type)) {
    echo json_encode(["status" => 500, "message" => "Internal Error"]);
}

$to = "info@thesentosavilla.com";
$subject = $request->type == "booking" ? "Booking Enquiry " . date("Y-m-d H:i:s") . " From " . $request->name : $request->subject;

if ($request->type == "booking") {
    $txt = "Booking Enquiry from " . $request->name . " below are the details \n Name: " . $request->name . " \n Email: " . $request->email . " \n Mobile Number: " . $request->mobileNumber . " \n Guest: " . $request->guest . " \n Accommodation Type: " . $request->accommodation . " \n Message: " . $request->message;
} else {
    $txt = "Enquiry from " . $request->name . " below are the details \n Name: " . $request->name . " \n Email: " . $request->email . " \n Mobile Number: " . " \n Message: " . $request->message;
}

try {
    mail($to, $subject, $txt);
    echo json_encode(["status" => 200, "message" => "Thank you for enquiry, Our executive will call you shortly."]);
} catch (Exception $e) {
    echo json_encode(["status" => 500, "message" => "Internal Error", "exception" => $e]);
}
