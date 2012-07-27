<?php
	Class Usuario{
		public $id;
		public $name;
		public $dinero;
		
		public $mercenarios;
		public $items;
		//public $achivements;
		public $dimensiones;
		
		public function nuevoUsuario($nombreUsuario, $dinero, $arrayMercenarios, $arrayItems, $arrayDimensiones){
			$this->name = $nombreUsuario;
			$this->dinero = $dinero;
			
			$sql="insert into `jugador` (`nombre`, `dinero`) values (";
			$sql=$sql."'".$this->name."',";
			$sql=$sql.$this->dinero.");";
			
			$conexion = conection();
			
			if(!($conexion)){
				return false;
			}
			
			if (!mysqli_query($conexion,"BEGIN")){ 
				return false;
			}
			
			if (!mysqli_query($conexion,$sql)){ 
				return false;
			}
			
			$this->id = mysqli_insert_id($conexion);
			
			if (!mysqli_query($conexion,"COMMIT")) 
				return false;
			
			foreach($arrayMercenarios as $id){
				$this->mercenarios[] = new Mercenario;
				$this->mercenarios[count($this->mercenarios) - 1]->nuevoContenido($id,$this->id);
			}
			
			foreach($arrayItems as $id){
				if($id != 0){
					$this->items[] = new Item;
					$this->items[count($this->items) - 1]->nuevoContenido($id,$this->id,"-1");
				}
			}
			
			foreach($arrayDimensiones as $id){
				$this->dimensiones[] = new Dimension;
				$this->dimensiones[count($this->dimensiones) - 1]->nuevoContenido($id->id,$this->id,$id->zonas);
			}
		}
		
		public function loadContenido($name){
			
			$sql = "select * from `jugador` where `nombre` = '".$name."';";
			
			$info = select($sql);
			
			$this->id=$info[0]["id"];
			$this->name=$info[0]["nombre"];
			$this->dinero=$info[0]["dinero"];
			
			$sql = "select id from `mercenarios` where `id-jugador` = ".$this->id.";";
				
			$info = select($sql);
			
			foreach($info as $id){
				$this->mercenarios[]=new Mercenario;
				$this->mercenarios[count($this->mercenarios) - 1]->loadContenido($id["id"]);
			}
			
			$sql = "select `id` from `items` where `id-jugador` = ".$this->id." and `id-mercenario` = -1;";
			
			error_log($sql);
			
			$info = select($sql);
			
			foreach($info as $id){
				$this->items[]=new Item;
				$this->items[count($this->items) - 1]->loadContenido($id["id"]);
			}
			
			$sql = "select `id-dimension` from `zonas-desbloqueadas` where `id-jugador` = ".$this->id." group by `id-dimension`;";
				
			$info = select($sql);
			
			foreach($info as $id){
				$this->dimensiones[]=new Dimension;
				$this->dimensiones[count($this->dimensiones) - 1]->loadContenido($id["id-dimension"],$this->id);
			}
		}
	}
?>