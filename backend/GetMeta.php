<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST, GET');
	header("Access-Control-Allow-Headers: Content-Type, x-requested-with");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	require_once('OpenGraph.php');


	mysqli_set_charset($Link, 'utf8'); 


	$url = GetGet("url");

	$meta = [];

	$graph = OpenGraph::fetch($url);

	foreach ($graph as $key => $value) {
		$meta[]= ["$key => $value"];
	}

	if($graph)
	{
		header('Content-Type: application/json');
		http_response_code(200);
		$data = [
			"success" => 1,
			"link"=> $url,
			"meta" => $meta
		];

		echo json_encode($data);
		mysqli_close($Link);
		exit();
	} else {
		header('Content-Type: application/json');
		http_response_code(200);
		$data = [
			"success" => 0,
			"link"=> $url
		];

		echo json_encode($data);
		mysqli_close($Link);
		exit();
	}
?>