<?php
	class Dimension{
		public $id;
		public $idJugador;
		public $idBase;
		public $nombre;
		
		public $zonas;
		
		public function nuevoContenido($id, $idGamer, $zonasDesbloqueadas){
			$data = file_get_contents("../json/dimensiones.json");
			
			str_replace("/n","",$data);
			
			$data = json_decode($data);
			
			foreach($data->dimensiones as $dimension){

				if($dimension->id == $id){
					$this->nombre=$dimension->nombre;
					$this->idBase=$dimension->idBase;
					$this->idJugador=$idGamer;
					
					foreach($zonasDesbloqueadas as $unlock){
						foreach($dimension->zonas as $zona){
							if($zona->id == $unlock->id ){
								$this->zonas[] = new Zona();
								$this->zonas[count($this->zonas) - 1]->nuevoContenido($zona,$this->idBase,$unlock,$idGamer);
							}
						}
					}
						
					break;
				}
			}
		}
		
		public function loadContenido($id, $idJugador){
			
			$this->idBase=$id;
			$this->idJugador=$idJugador;
			
			$data = file_get_contents("../json/dimensiones.json");
			
			str_replace("/n","",$data);
			
			$data = json_decode($data);
			
			foreach($data->dimensiones as $dimension){
				if($dimension->idBase == $this->idBase){
					
					$this->nombre=$dimension->nombre;
					$this->idBase=$dimension->idBase;
					$this->idJugador=$idJugador;
					
					$sql = "select `id`, `id-zona` from `zonas-desbloqueadas` where `id-jugador` = ".$this->idJugador." and `id-dimension` = ".$this->idBase.";";
					$info = select($sql);
					
					
					
					foreach($info as $unlock){
						foreach($dimension->zonas as $zona){
							if($unlock["id-zona"] == $zona->idBase){
								$this->zonas[] = new Zona();
								$this->zonas[count($this->zonas) - 1]->loadContenidoParaDimension($unlock["id"],$zona->nombre);
							}
						}
					}
				
					break;
				}
			}
		}
	}
?>