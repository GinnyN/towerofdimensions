<?php
	class Mision{
		public $id;
		public $idJugador;
		public $idBase;
		
		public $ganada;
		public $mercenario1;
		public $mercenario2;
		public $activa;
		public $horaComienzo;
		public $horaTermino;
		
		public $dinero;
		public $exp;
		public $tiempo;
		
		public $condiciones;
		public $totalPtos = 0;
		
		public $nombre;
		public $descripcion;
		public $zona;
		public $dimension;
		
		public $unlockMisiones;
		public $unlockMercenarios;
		public $unlockItems;
		public $unlockZona;
		
		public $first;
		public $hpLoss;
		
		public function nuevoContenido($id, $idGamer){
			$data = file_get_contents("../json/misiones.json");
			
			str_replace("/n","",$data);
			
			$data = json_decode($data);
			
			foreach($data->misiones as $mision){

				if($mision->idBase == $id){
				
					$this->idJugador = $idGamer;
					$this->idBase = $id;
					
					$this->dinero = $mision->dinero;
					$this->exp = $mision->exp;
					$this->tiempo = $mision->tiempo;
					
					$this->nombre = $mision->nombre;
					$this->descripcion = $mision->descripcion;
					$this->zona = $mision->zona;
					$this->dimension = $mision->dimension;
					
					foreach($mision->condiciones as $condicion){
						$this->condiciones[] = new Condicion($condicion);
						$this->totalPtos = $this->totalPtos + $condicion->total;
					}
					
					$this->unlockMisiones=$mision->unlockMisiones;
					$this->unlockMercenarios=$mision->unlockMercenarios;
					$this->unlockItems=$mision->unlockItems;
					$this->unlockZona=$mision->unlockZona;
					
					$this->activa=0;
					$this->first=1;
					$this->hpLoss=$mision->hpLoss;
					
					break;
				}
			}
			
			$sql="insert into `misiones-desbloqueadas` (`id-jugador`, `id-zona`,`id-mision`) values (";
			$sql=$sql.$this->idJugador.",";
			$sql=$sql.$this->zona.",";
			$sql=$sql.$this->idBase.");";
			
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
		
		public function loadContenidoParaZona($idBase, $idJugador){
		
			$this->idJugador=$idJugador;
			$this->idBase=$idBase;
		
			$sql = "select * from `misiones` where `id-jugador` = ".$this->idJugador." and `id-mision` = ".$this->idBase.";";
			$info = select($sql);
			
			if(count($info)!=0){
				
				$this->id=$info[0]["id"];
				$this->ganada=$info[0]["ganada-fallada"];
				$this->mercenario1=$info[0]["mercenario1"];
				$this->mercenario2=$info[0]["mercenario2"];
				
				$this->horaComienzo=$info[0]["horaComienzo"];
				$this->horaTermino=$info[0]["horaTermino"];
				
				$this->first=$info[0]["first"];
				
				if(strtotime($this->horaTermino)<time())
					$this->activa=false;
				else
					$this->activa=true;
			}else{
				$this->activa=false;
			}
		
			$data = file_get_contents("../json/misiones.json");
			
			str_replace("/n","",$data);
			
			$data = json_decode($data);
			
			foreach($data->misiones as $mision){
				if($mision->idBase == $this->idBase){
					
					$this->dinero = $mision->dinero;
					$this->exp = $mision->exp;
					$this->tiempo = $mision->tiempo;
					
					$this->nombre = $mision->nombre;
					$this->descripcion = $mision->descripcion;
					$this->zona = $mision->zona;
					$this->dimension = $mision->dimension;
					
					foreach($mision->condiciones as $condicion){
						$this->condiciones[] = new Condicion($condicion);
						$this->totalPtos = $this->totalPtos + $condicion->total;
					}
				
					$this->unlockMisiones=$mision->unlockMisiones;
					$this->unlockMercenarios=$mision->unlockMercenarios;
					$this->unlockItems=$mision->unlockItems;
					$this->unlockZona=$mision->unlockZona;
					$this->hpLoss=$mision->hpLoss;
					
					break;
				
				}	
			}
			
		}
	}
?>