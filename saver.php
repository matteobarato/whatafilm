<?php
ini_set("log_errors", 1);
error_reporting(E_ALL);
ini_set("error_log", "php-error.log");
ini_set("display_errors", "On");


if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
  $_POST = json_decode(file_get_contents('php://input'), true);

if (!isset($_GET['token']) || $_GET['token']!='asdfasdf') die('no');
if (!isset($_POST['message']) || $_POST['message']=='') die('no message');

$name = isset($_POST['name'])? $_POST['name'] : '';
$now=time();

file_put_contents("../note/$name_$now.json", $_GET['message']);

die(json_encode(['message'=>'ok']));
?>
