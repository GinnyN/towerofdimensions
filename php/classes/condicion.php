<?php
	class Condicion{
		public $car1;
		public $car2;
		
		public $total;
		
		public $description;
		
		public function __construct($condicion){
			$this->car1 = $condicion->car1;
			$this->car2 = $condicion->car2;
			$this->total = $condicion->total;
			$this->description = $condicion->description;
		}
	}
?>