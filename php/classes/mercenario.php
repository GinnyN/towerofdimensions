<?php
	
	Class Mercenario{
		
		public $id;
		public $idJugador;
		public $idBase;
		public $hpActual;
		public $hpMax;
		public $nombre;
		public $exp;
		public $nivel;
		public $misionActual;
		
		public $agilidad;
		public $destreza;
		public $constitucion;
		public $fuerza;
		public $inteligencia;
		public $sabiduria;
		public $carisma;
		public $poder;
		
		public $marcial;
		public $stealth;
		public $magia;
		public $tecnologia;
		
		public $item1;
		public $item2;
		public $item3;
		public $item4;
		public $item5;
		public $item6;
		
		public $crecimientoAgilidad;
		public $crecimientoDestreza;
		public $crecimientoConstitucion;
		public $crecimientoFuerza;
		public $crecimientoInteligencia;
		public $crecimientoSabiduria;
		public $crecimientoCarisma;
		public $crecimientoPoder;
		
		public $crecimientoMarcial;
		public $crecimientoStealth;
		public $crecimientoMagia;
		public $crecimientoTecnologia;
		
		public $hpCalculo;
		
		/*public $agilidadVerdadero;
		public $destrezaVerdadero;
		public $constitucionVerdadero;
		public $fuerzaVerdadero;
		public $inteligenciaVerdadero;
		public $sabiduriaVerdadero;
		public $carismaVerdadero;
		public $poderVerdadero;
		
		public $marcialVerdadero;
		public $stealthVerdadero;
		public $magiaVerdadero;
		public $tecnologiaVerdadero;*/
		
		public $HPMaxVerdadero;
		
		public function __construct() {
        
    	}
		
		public function nuevoContenido($id, $idGamer){
			$data = file_get_contents("../json/personajes.json");
			
			str_replace("/n","",$data);
			
			$data = json_decode($data);
			
			foreach($data->character as $character){

				if($character->idBase == $id){
				
					$this->nombre=$character->nombre;
					$this->exp=$character->exp;
					$this->nivel=$character->nivel;
					
					$this->idJugador=$idGamer;
					$this->idBase=$character->idBase;
					$this->misionActual=-1;
					
					$this->agilidad=$character->agilidad;
					$this->destreza=$character->destreza;
					$this->constitucion=$character->constitucion;
					$this->fuerza=$character->fuerza;
					$this->inteligencia=$character->inteligencia;
					$this->sabiduria=$character->sabiduria;
					$this->carisma=$character->carisma;
					$this->poder=$character->poder;
					
					$this->marcial=$character->marcial;
					$this->stealth=$character->stealth;
					$this->magia=$character->magia;
					$this->tecnologia=$character->tecnologia;
					
					$this->item1=$character->item1;
					$this->item2=$character->item2;
					$this->item3=$character->item3;
					$this->item4=$character->item4;
					$this->item5=$character->item5;
					$this->item6=$character->item6;
					
					$this->crecimientoAgilidad=$character->crecimientoAgilidad;
					$this->crecimientoDestreza=$character->crecimientoDestreza;
					$this->crecimientoConstitucion=$character->crecimientoConstitucion;
					$this->crecimientoFuerza=$character->crecimientoFuerza;
					$this->crecimientoInteligencia=$character->crecimientoInteligencia;
					$this->crecimientoSabiduria=$character->crecimientoSabiduria;
					$this->crecimientoCarisma=$character->crecimientoCarisma;
					$this->crecimientoPoder=$character->crecimientoPoder;
					
					$this->crecimientoMarcial=$character->crecimientoMarcial;
					$this->crecimientoStealth=$character->crecimientoStealth;
					$this->crecimientoMagia=$character->crecimientoMagia;
					$this->crecimientoTecnologia=$character->crecimientoTecnologia;
					
					$this->hpCalculo=$character->hpCalculo;
					
					/*$this->agilidadVerdadero=$character->caracteristicas->Agilidad;
					$this->destrezaVerdadero=$character->caracteristicas->Destreza;
					$this->constitucionVerdadero=$character->caracteristicas->Constitucion;
					$this->fuerzaVerdadero=$character->caracteristicas->Fuerza;
					$this->inteligenciaVerdadero=$character->caracteristicas->Inteligencia;
					$this->sabiduriaVerdadero=$character->caracteristicas->Sabiduria;
					$this->carismaVerdadero=$character->caracteristicas->Carisma;
					$this->poderVerdadero=$character->caracteristicas->Poder;
					
					$this->marcialVerdadero=$character->caracteristicas->Marcial;
					$this->stealthVerdadero=$character->caracteristicas->Stealth;
					$this->magiaVerdadero=$character->caracteristicas->Magia;
					$this->tecnologiaVerdadero=$character->caracteristicas->Tecnologia;*/
					
					switch($this->hpCalculo){
						case "Constitucion":
							$calculo = $character->constitucion;
							break;
					}
					//$this->HPMaxVerdadero=$calculo*3;
					$this->hpActual=$calculo*3;
					$this->hpMax=$calculo*3;
					break;
				}
			}

			$sql = "insert into `mercenarios` (`id-jugador`,`id-mercenario-base`,`hp-actual`,`hp-max`,`nombre`,`agilidad`,`destreza`,`constitucion`,`fuerza`,`inteligencia`,`sabiduria`,`carisma`,`poder`,`marcial`,`stealth`,`magia`,`tecnologia`,`item-1`,`item-2`,`item-3`,`item-4`,`item-5`,`item-6`,`experiencia`,`nivel`,`mision-actual`) values (";
			$sql = $sql.$this->idJugador.",";
			$sql = $sql.$this->idBase.",";
			$sql = $sql.$this->hpActual.",";
			$sql = $sql.$this->hpMax.",";
			$sql = $sql."'".$this->nombre."',";
			
			$sql = $sql.$this->agilidad.",";
			$sql = $sql.$this->destreza.",";
			$sql = $sql.$this->constitucion.",";
			$sql = $sql.$this->fuerza.",";
			$sql = $sql.$this->inteligencia.",";
			$sql = $sql.$this->sabiduria.",";
			$sql = $sql.$this->carisma.",";
			$sql = $sql.$this->poder.",";
			
			$sql = $sql.$this->marcial.",";
			$sql = $sql.$this->stealth.",";
			$sql = $sql.$this->magia.",";
			$sql = $sql.$this->tecnologia.",";
			
			$sql = $sql.$this->item1.",";
			$sql = $sql.$this->item2.",";
			$sql = $sql.$this->item3.",";
			$sql = $sql.$this->item4.",";
			$sql = $sql.$this->item5.",";
			$sql = $sql.$this->item6.",";
			
			$sql = $sql.$this->exp.",";
			$sql = $sql.$this->nivel.",";
			$sql = $sql."-1";
			
			$sql = $sql.");";
			
			$conexion = conection();
			
			if(!($conexion))
				return false;
				
			if (!mysqli_query($conexion,"BEGIN")){ 
				return false;
			}
			
			if (!mysqli_query($conexion,$sql)) 
				return false;
			
			$this->id = mysqli_insert_id($conexion);
			
			if (!mysqli_query($conexion,"COMMIT")) 
				return false;
			
			/*$sql = "insert into `mercenarios-verdaderos` (`id-mercenario`,`hp-max`,`agilidad`,`destreza`,`constitucion`,`fuerza`,`inteligencia`,`sabiduria`,`carisma`,`poder`,`marcial`,`stealth`,`magia`,`tecnologia`) values (";
			$sql = $sql.$this->id.",";
			$sql = $sql.$this->hpMax.",";
			
			$sql = $sql.$this->agilidadVerdadero.",";
			$sql = $sql.$this->destrezaVerdadero.",";
			$sql = $sql.$this->constitucionVerdadero.",";
			$sql = $sql.$this->fuerzaVerdadero.",";
			$sql = $sql.$this->inteligenciaVerdadero.",";
			$sql = $sql.$this->sabiduriaVerdadero.",";
			$sql = $sql.$this->carismaVerdadero.",";
			$sql = $sql.$this->poderVerdadero.",";
			
			$sql = $sql.$this->marcialVerdadero.",";
			$sql = $sql.$this->stealthVerdadero.",";
			$sql = $sql.$this->magiaVerdadero.",";
			$sql = $sql.$this->tecnologiaVerdadero;
			
			$sql = $sql.");";
			
			if (!mysqli_query($conexion,$sql)) 
				return false;*/
			
			$sql = "insert into `mercenarios-crecimiento` (`id-mercenario`,`agilidad`,`destreza`,`constitucion`,`fuerza`,`inteligencia`,`sabiduria`,`carisma`,`poder`,`marcial`,`stealth`,`magia`,`tecnologia`,`hp-calculo`) values (";
			$sql = $sql.$this->id.",";
			
			$sql = $sql.$this->crecimientoAgilidad.",";
			$sql = $sql.$this->crecimientoDestreza.",";
			$sql = $sql.$this->crecimientoConstitucion.",";
			$sql = $sql.$this->crecimientoFuerza.",";
			$sql = $sql.$this->crecimientoInteligencia.",";
			$sql = $sql.$this->crecimientoSabiduria.",";
			$sql = $sql.$this->crecimientoCarisma.",";
			$sql = $sql.$this->crecimientoPoder.",";
			
			$sql = $sql.$this->crecimientoMarcial.",";
			$sql = $sql.$this->crecimientoStealth.",";
			$sql = $sql.$this->crecimientoMagia.",";
			$sql = $sql.$this->crecimientoTecnologia.",'";
			
			$sql = $sql.$this->hpCalculo."'";
			
			$sql = $sql.");";
			
			if (!mysqli_query($conexion,$sql)) 
				return false;
				
			mysqli_close($conexion);
			
			$flag = 0;

			if($this->item1>0){
				$temp = $this->item1;
				$this->item1= new Item();
				$this->item1->nuevoContenido($temp, $this->idJugador,  $this->id);
				if($this->item1->category == "Equipable")
					$this->applyItem($this->item1);
				$flag = 1;
			}else
				$this->item1 = null;
				
			if($this->item2>0){
				$temp = $this->item2;
				$this->item2= new Item;
				$this->item2->nuevoContenido($temp,$this->idJugador,  $this->id);
				if($this->item2->category == "Equipable")
					$this->applyItem($this->item2);
				$flag = 1;
			}else
				$this->item2 = null;
				
			if($this->item3>0){
				$temp = $this->item3;
				$this->item3= new Item;
				$this->item3->nuevoContenido($temp,$this->idJugador,  $this->id);
				if($this->item3->category == "Equipable")
					$this->applyItem($this->item3);
				$flag = 1;
			}else
				$this->item3 = null;
				
			if($this->item4>0){
				$temp = $this->item4;
				$this->item4= new Item;
				$this->item4->nuevoContenido($temp,$this->idJugador, $this->id);
				if($this->item4->category == "Equipable")
					$this->applyItem($this->item4);
				$flag = 1;
			}else
				$this->item4 = null;
				
			if($this->item5>0){
				$temp = $this->item5;
				$this->item5= new Item;
				$this->item5->nuevoContenido($temp,$this->idJugador, $this->id);
				if($this->item5->category == "Equipable")
					$this->applyItem($this->item5);
				$flag = 1;
			}else
				$this->item5 = null;
				
			if($this->item6>0){
				$temp = $this->item6;
				$this->item6= new Item;
				$this->item6->nuevoContenido($temp,$this->idJugador, $this->id);
				if($this->item6->category == "Equipable")
					$this->applyItem($this->item6);
				$flag = 1;
			}else
				$this->item6 = null;
			
			if($flag == 1)
				$this->saveEverything();
		}
		
		public function loadContenido($id){
			
			$sql = "select * from `mercenarios` where `id` =".$id.";";
			
			$info = select($sql);
			
			$this->id=$info[0]["id"];
			$this->idJugador=$info[0]["id-jugador"];
			$this->idBase=$info[0]["id-mercenario-base"];
			$this->hpActual=$info[0]["hp-actual"];
			$this->hpMax=$info[0]["hp-max"];
			$this->nombre=$info[0]["nombre"];
			$this->exp=$info[0]["experiencia"];
			$this->nivel=$info[0]["nivel"];
			$this->misionActual=$info[0]["mision-actual"];
			
			$this->agilidad=$info[0]["agilidad"];
			$this->destreza=$info[0]["destreza"];
			$this->constitucion=$info[0]["constitucion"];
			$this->fuerza=$info[0]["fuerza"];
			$this->inteligencia=$info[0]["inteligencia"];
			$this->sabiduria=$info[0]["sabiduria"];
			$this->carisma=$info[0]["carisma"];
			$this->poder=$info[0]["poder"];
			
			$this->marcial=$info[0]["marcial"];
			$this->stealth=$info[0]["stealth"];
			$this->magia=$info[0]["magia"];
			$this->tecnologia=$info[0]["tecnologia"];
			
			if($info[0]["item-1"] > 0){
				$this->item1 = new Item;
				$this->item1->loadContenido($info[0]["item-1"]);
			}else{
				$this->item1 = null;
			}
			
			if($info[0]["item-2"] > 0){
				$this->item2 = new Item;
				$this->item2->loadContenido($info[0]["item-2"]);
			}else{
				$this->item2 = null;
			}
			
			if($info[0]["item-3"] > 0){
				$this->item3 = new Item;
				$this->item3->loadContenido($info[0]["item-3"]);
			}else{
				$this->item3 = null;
			}
			
			if($info[0]["item-4"] > 0){
				$this->item4 = new Item;
				$this->item4->loadContenido($info[0]["item-4"]);
			}else{
				$this->item4 = null;
			}
			
			if($info[0]["item-5"] > 0){
				$this->item5 = new Item;
				$this->item5->loadContenido($info[0]["item-5"]);
			}else{
				$this->item5 = null;
			}
			
			if($info[0]["item-6"] > 0){
				$this->item6 = new Item;
				$this->item6->loadContenido($info[0]["item-6"]);
			}else{
				$this->item6 = null;
			}
			
			
			$sql = "select * from `mercenarios-crecimiento` where `id-mercenario` =".$id.";";
			
			$info = select($sql);
			
			$this->crecimientoAgilidad=$info[0]["agilidad"];
			$this->crecimientoDestreza=$info[0]["destreza"];
			$this->crecimientoConstitucion=$info[0]["constitucion"];
			$this->crecimientoFuerza=$info[0]["fuerza"];
			$this->crecimientoInteligencia=$info[0]["inteligencia"];
			$this->crecimientoSabiduria=$info[0]["sabiduria"];
			$this->crecimientoCarisma=$info[0]["carisma"];
			$this->crecimientoPoder=$info[0]["poder"];
			
			$this->crecimientoMarcial=$info[0]["marcial"];
			$this->crecimientoStealth=$info[0]["stealth"];
			$this->crecimientoMagia=$info[0]["magia"];
			$this->crecimientoTecnologia=$info[0]["tecnologia"];
				
		}
		
		private function applyItem($item){
			$temp=$this->agilidad;
			$this->agilidad=$temp+$item->bonusAgilidad;
			
			$temp=$this->destreza;
			$this->destreza=$temp+$item->bonusDestreza;
			
			$temp=$this->constitucion;
			$this->constitucion=$temp+$item->bonusConstitucion;
			
			$temp=$this->fuerza;
			$this->fuerza=$temp+$item->bonusFuerza;
			
			$temp=$this->inteligencia;
			$this->inteligencia=$temp+$item->bonusInteligencia;
			
			$temp=$this->sabiduria;
			$this->sabiduria=$temp+$item->bonusSabiduria;
			
			$temp=$this->carisma;
			$this->carisma=$temp+$item->bonusCarisma;
			
			$temp=$this->poder;
			$this->poder=$temp+$item->bonusPoder;
			
			$temp=$this->marcial;
			$this->marcial=$temp+$item->bonusMarcial;
			
			$temp=$this->stealth;
			$this->stealth=$temp+$item->bonusStealth;
			
			$temp=$this->magia;
			$this->magia=$temp+$item->bonusMagia;
			
			$temp=$this->tecnologia;
			$this->tecnologia=$temp+$item->bonusTecnologia;
			
			$temp=$this->hpActual;
			$this->tecnologia=$temp+$item->bonusHp;
			
			$temp=$this->hpMax;
			$this->tecnologia=$temp+$item->bonusHpMax;
		}
		
		public function saveEverything(){
			$sql="update `mercenarios` set";
			$sql=$sql."`hp-actual` = ".$this->hpActual.",";
			$sql=$sql."`hp-max` = ".$this->hpMax.",";
			$sql=$sql."`agilidad` = ".$this->agilidad.",";
			$sql=$sql."`destreza` = ".$this->destreza.",";
			$sql=$sql."`constitucion` = ".$this->constitucion.",";
			$sql=$sql."`fuerza` = ".$this->fuerza.",";
			$sql=$sql."`inteligencia` = ".$this->inteligencia.",";
			$sql=$sql."`sabiduria` = ".$this->sabiduria.",";
			$sql=$sql."`carisma` = ".$this->carisma.",";
			$sql=$sql."`poder` = ".$this->poder.",";
			$sql=$sql."`marcial` = ".$this->marcial.",";
			$sql=$sql."`stealth` = ".$this->stealth.",";
			$sql=$sql."`tecnologia` = ".$this->tecnologia.",";
			$sql=$sql."`item-1` = ".$this->item1->id.",";
			$sql=$sql."`item-2` = ".$this->item2->id.",";
			$sql=$sql."`item-3` = ".$this->item3->id.",";
			$sql=$sql."`item-4` = ".$this->item4->id.",";
			$sql=$sql."`item-5` = ".$this->item5->id.",";
			$sql=$sql."`item-6` = ".$this->item6->id.",";
			
			
			$sql=$sql."`experiencia` = ".$this->exp.",";
			$sql=$sql."`nivel` = ".$this->nivel;
				
			$sql=$sql." where `id` = ".$this->id.";";
			
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
			
			if (!mysqli_query($conexion,"COMMIT")) 
				return false;
			
			mysqli_close($conexion);
		}
	}
?>