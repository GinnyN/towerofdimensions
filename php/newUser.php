<?php

	function check_usuario($nombre){
		$sql = "select * from `jugador` where `nombre` = '".$nombre."';";
	
		$result = select($sql);
		
		if(count($result) == 0)
			return false;
		else
			return true;
	}

	session_start();
	include_once "include.php";
	
	$data = file_get_contents("../json/newUser.json");		
	str_replace("/n","",$data);	
	$data = json_decode($data);
	
	$_SESSION["usuario"] = new Usuario;
	
	if(check_usuario($_POST["login"]))
		$_SESSION["usuario"]->loadContenido($_POST["login"]);
	else
		$_SESSION["usuario"]->nuevoUsuario($_POST["login"],$data->user->dinero, $data->user->mercenarios, $data->user->items, $data->user->dimensiones);
		
	
	echo (string)object_to_json($_SESSION["usuario"]);
?>