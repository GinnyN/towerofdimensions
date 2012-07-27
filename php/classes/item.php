<?php
	class item{
		public $id = 0;
		public $idJugador = 0;
		public $idBase = 0;
		public $idMercenario = 0;
		
		public $nombre = 0;
		public $descripcion = 0;
		public $valor = 0;
		
		public $bonusAgilidad = 0;
		public $bonusDestreza = 0;
		public $bonusConstitucion = 0;
		public $bonusFuerza = 0;
		public $bonusInteligencia = 0;
		public $bonusSabiduria = 0;
		public $bonusCarisma = 0;
		public $bonusPoder = 0;
		public $bonusMarcial = 0;
		public $bonusStealth = 0;
		public $bonusMagia = 0;
		public $bonusTecnologia = 0;
		
		public $bonusHp = 0;
		public $bonusHpMax = 0;
		public $category = "Equipable";
		public $disponible = 0;
		
		public function nuevoContenido($idItem,$idJugador,$idMercenario){
			
			if($idItem == 0)
				return null;
			
			$data = file_get_contents("../json/items.json");
			
			str_replace("/n","",$data);
			
			$data = json_decode($data);
			
			foreach($data->item as $item){
				if($item->idBase == $idItem){
					$this->idJugador = $idJugador;
					$this->idBase = $idItem;
					$this->idMercenario=$idMercenario;
					
					$this->nombre=$item->nombre;
					$this->descripcion=$item->descripcion;
					$this->valor=$item->valor;
					
					$this->bonusAgilidad=$item->bonusAgilidad;
					$this->bonusDestreza=$item->bonusDestreza;
					$this->bonusConstitucion=$item->bonusConstitucion;
					$this->bonusFuerza=$item->bonusFuerza;
					$this->bonusInteligencia=$item->bonusInteligencia;
					$this->bonusSabiduria=$item->bonusSabiduria;
					$this->bonusCarisma=$item->bonusCarisma;
					$this->bonusPoder=$item->bonusPoder;
					$this->bonusMarcial=$item->bonusMarcial;
					$this->bonusStealth=$item->bonusStealth;
					$this->bonusMagia=$item->bonusMagia;
					$this->bonusTecnologia=$item->bonusTecnologia;
					
					$this->bonusHp=$item->bonusHp;
					$this->bonusHpMax=$item->bonusHpMax;
					$this->category = $item->category;
					$this->disponible=$item->disponible;
					
					$this->bonusHp=$item->bonusHp;
					$this->bonusHpMax=$item->bonusHpMax;
					$this->category = $item->category;
					$this->disponible=$item->disponible;
					
					$sql="insert into `items` (`id-jugador`, `id-item`, `id-mercenario`) values (";
					$sql=$sql.$this->idJugador.",";
					$sql=$sql.$this->idBase.",";
					$sql=$sql.$this->idMercenario.");";
					
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
					
					break;
				}
			}
		}
		
		public function loadContenido($id){
			
			$sql = "select * from `items` where `id`=".$id.";";
			
			$info = select($sql);
			
			$this->id=$info[0]["id"];
			$this->idJugador=$info[0]["id-jugador"];
			$this->idBase=$info[0]["id-item"];
			$this->idMercenario=$info[0]["id-mercenario"];
			
			$data = file_get_contents("../json/items.json");
			
			str_replace("/n","",$data);
			
			$data = json_decode($data);
			
			foreach($data->item as $item){
				if($item->idBase == $this->idBase){
					$this->nombre=$item->nombre;
					$this->descripcion=$item->descripcion;
					$this->valor=$item->valor;
					
					$this->bonusAgilidad=$item->bonusAgilidad;
					$this->bonusDestreza=$item->bonusDestreza;
					$this->bonusConstitucion=$item->bonusConstitucion;
					$this->bonusFuerza=$item->bonusFuerza;
					$this->bonusInteligencia=$item->bonusInteligencia;
					$this->bonusSabiduria=$item->bonusSabiduria;
					$this->bonusCarisma=$item->bonusCarisma;
					$this->bonusPoder=$item->bonusPoder;
					$this->bonusMarcial=$item->bonusMarcial;
					$this->bonusStealth=$item->bonusStealth;
					$this->bonusMagia=$item->bonusMagia;
					$this->bonusTecnologia=$item->bonusTecnologia;
					
					$this->bonusHp=$item->bonusHp;
					$this->bonusHpMax=$item->bonusHpMax;
					$this->category = $item->category;
					$this->disponible=$item->disponible;
					
					break;
				}
			}
			
		}
	}
?>