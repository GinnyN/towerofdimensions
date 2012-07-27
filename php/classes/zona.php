<?php
	class Zona{
		public $id;
		public $idBase;
		public $idDimension;
		public $nombre;
		
		public $misiones;
		
		public function nuevoContenido($proto,$idDimension,$unlock,$idGamer){
			
			$this->idBase = $proto->idBase;
			$this->idDimension = $idDimension;
			$this->nombre = $proto->nombre;
			$this->idJugador = $idGamer;
			
			foreach($unlock as $unlockMision){
				foreach($proto->misiones as $protoMision){
					if($protoMision == $unlockMision){
						$this->misiones[] = new Mision;
						$this->misiones[count($this->misiones) - 1]->nuevoContenido($protoMision,$idGamer);
					}
				}
			}
			
			$sql="insert into `zonas-desbloqueadas` (`id-jugador`, `id-zona`, `id-dimension`) values (";
			$sql=$sql.$this->idJugador.",";
			$sql=$sql.$this->idBase.",";
			$sql=$sql.$this->idDimension.");";
			
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
			
			mysqli_close($conexion);
			
		}
		
		public function loadContenidoParaDimension($id, $nombre){
			
			$sql = "select * from `zonas-desbloqueadas` where `id` = ".$id.";";
			$info = select($sql);
			
			$this->idBase = $info[0]["id-zona"];
			$this->idDimension = $info[0]["id-dimension"];
			$this->nombre = $nombre;
			$this->idJugador = $info[0]["id-jugador"];
			
			
			$sql = "select * from `misiones-desbloqueadas` where `id-jugador` = ".$this->idJugador." and `id-zona` = ".$this->idBase.";";
			$misiones = select($sql);
			
			foreach($misiones as $mision){
				$this->misiones[] = new Mision;
				$this->misiones[count($this->misiones) - 1]->loadContenidoParaZona($mision["id-mision"],$mision["id-jugador"]);
			}
			
		}
	}
?>