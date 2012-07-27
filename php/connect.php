<?php

	function conection(){
		
		if ($enlace = mysqli_connect("localhost","root","imaginate56", "towerofdimensions")){
				return $enlace;
		}
		else{
				error_log("Problemas conectando Base de Datos");
				return false;
			}
	}
	
	function select($sql){
		$conexion = conection();
		
		if(!($conexion)){
			return false;
		}
		
		$result = mysqli_query($conexion,$sql);
		
		if (!$result){ 
			return false;
		}
			
		mysqli_close($conexion);
		
		return mysqli_fetch_all($result,MYSQLI_ASSOC);
	}
?>