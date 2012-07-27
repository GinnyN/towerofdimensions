var mercenario;

function setMercenarios(){
	$("#mercenarios").click(
		function(){
			var html = " ";
			$("#principal").html(" ");
			for(var mercenario in usuario.mercenarios){
				html = html+"<ul class='"+usuario.mercenarios[mercenario].id+"'>";
				html = html+"<li>"+usuario.mercenarios[mercenario].nombre+"</li>";
				html = html+"<li>Experiencia: "+usuario.mercenarios[mercenario].exp+"</li>";
				html = html+"<li>Nivel: "+usuario.mercenarios[mercenario].nivel+"</li>";
				html = html+"<li>HP: "+usuario.mercenarios[mercenario].hpActual+"/"+usuario.mercenarios[mercenario].hpMax+"</li>";
				html = html+"</ul>";
			}
			$("#principal").html(html);

			$.each(usuario.mercenarios, 
				function(i, subject){
					$("."+subject.id).click(
						function(){
							$("#principal").html(" ");
							html = "<div id='subMenu'>";
							html = html+"<ul class='subMenu'>";
							for(var mercenario in usuario.mercenarios){
								html = html+"<li class='submenu"+usuario.mercenarios[mercenario].id+"'>"+usuario.mercenarios[mercenario].nombre+"</li>";
							}
							html = html+"</ul>";
							html = html+"</div>";
							html = html+"<div id='fullView'>";
							html = html+createFullView(subject);
							html = html+"</div>";
							
							$("#principal").html(html);
							var stats = statsBatalla(subject);
							
							$(".stats"+subject.id).html(stats[0]);
							$(".batalla"+subject.id).html(stats[1]);
							
							if(parseInt(subject.misionActual) == -1)
								applyInventory(usuario.items);
							
							$.each(usuario.mercenarios, 
								function(i, subject){
									$(".submenu"+subject.id).click(
										function(){
											$("#fullView").html(" ");
											html = createFullView(subject);
											$("#fullView").html(html);
											var stats = statsBatalla(subject);
							
											$(".stats"+subject.id).html(stats[0]);
											$(".batalla"+subject.id).html(stats[1]);
											
											if(parseInt(subject.misionActual) == -1)
												applyInventory(usuario.items);
										}
									);
								}
							)
						}
					);
				}
			)
		}
	);
}

function createFullView(subject){
	html = "<ul class='"+subject.id+"'>";
	html = html+"<li>"+subject.nombre+"</li>";
	html = html+"<li>Experiencia: "+subject.exp+"</li>";
	html = html+"<li>Nivel: "+subject.nivel+"</li>";
	html = html+"<li>HP: "+subject.hpActual+"/"+subject.hpMax+"</li>";
	html = html+"<li>Stats: ";
		html = html+"<ul class='stats"+subject.id+"'>";
		html = html+"</ul>";
	html=html+"</li>";
	html = html+"<li>Batalla: ";
		html = html+"<ul class='batalla"+subject.id+"'>";
		html = html+"</ul>";
	html=html+"</li>";
	html = html+"<li>Items: ";
		html = html+"<ul class='items"+subject.id+"'>";
			for(var i = 1; i<7;i++){
				if(subject["item"+i] != null){
					if(subject.item1.id != 0)
						html = html+"<li class='"+subject["item"+i].id+" itemSlot itemSlot"+i+"'>"+subject["item"+i].nombre+"</li>";
					else
						html = html+"<li class='itemSlot itemSlot"+i+"'></li>";
				}else
					html = html+"<li class='itemSlot itemSlot"+i+"'></li>";
			}
		html = html+"</ul>";
	html=html+"</li>";
	html = html+"</ul>";
	
	mercenario = subject;
	
	return html;
}

function applyInventory(items){
	$(".itemSlot").wrapInner("<span class='itemMercenario' />");
	$(".itemSlot").append("<div class='inventoryMercenario'></div>");
	
	$(".itemSlot").click(
		function(e){
			e.stopPropagation();
			
			var inventory = $(this).find(".inventoryMercenario");
			var html = "<ul> ";
			if (items[0] != undefined && items != null){
				$.each(items, 
					function(i,item){
						if(item.id != 0)
							html=html+"<li class='item"+item.idBase+" itemInventario'>"+item.nombre+"</li>";	
					}
				)
			}
			html=html+"</ul>";
			
			inventory.show();
			inventory.html(" ");
			inventory.html(html);
			
			$(".itemInventario").click(
				function(e){
					e.stopPropagation();
					
					itemSlot = inventory.parent().find(".itemMercenario");
					
					temp = itemSlot.html();
					itemSlot.html($(this).html());
					$(this).html(temp);

					for(var i=1;i<7;i++){					
						if(itemSlot.parent().hasClass("itemSlot"+i)){
							itemInventario = $(this).attr("class").split(" ")[0].split("item")[1];
							$(this).removeClass("item"+itemInventario);
							break;
						}
					}
					
					itemMercenario = mercenario["item"+i];
					
					
					$.each(usuario.items, 
						function(i,item){
							if(item.idBase == itemInventario){
								itemInventario = item;
							}
						}
				  	);
				  	
				  	if(itemMercenario != null)
				  		copyItem(itemInventario,itemMercenario);
				  	else{
				  		itemMercenario = itemInventario;
				  		itemMercenario.idMercenario = mercenario.idBase;
				  		itemInventario = null;
				  	}
				  	
				  	$(this).addClass("item"+itemMercenario.idBase);
				  	
				  	if(itemInventario != null){
				  		stats = applyItem(mercenario, itemInventario, false);
				  		$(".stats"+mercenario.id).html(stats[0]);
						$(".batalla"+mercenario.id).html(stats[1]);
				  	}else{
				  		$.each(usuario.items,
				  			function(i,item){
				  				if(item.idBase == itemMercenario.idBase){
				  					usuario.items.splice(i,1);
				  					return false;
				  				}
				  			}
				  		);
				  	}
				  	
				  	stats = applyItem(mercenario, itemMercenario, true);
				  	$(".stats"+mercenario.id).html(stats[0]);
					$(".batalla"+mercenario.id).html(stats[1]);
				  	$(".inventoryMercenario").hide();
				}
			);
		}
	);
	$(document).click(
		function(){			
			$(".inventoryMercenario").hide();
		}
	);
}

function applyItem(merc, item, apply){
	
	if(apply){
		merc.agilidad = parseInt(merc.agilidad) + parseInt(item.bonusAgilidad);
		merc.destreza = parseInt(merc.destreza) + parseInt(item.bonusDestreza);
		merc.constitucion = parseInt(merc.constitucion) + parseInt(item.bonusConstitucion);
		merc.fuerza = parseInt(merc.fuerza) + parseInt(item.bonusFuerza);
		merc.inteligencia = parseInt(merc.inteligencia) + parseInt(item.bonusInteligencia);
		merc.sabiduria = parseInt(merc.sabiduria) + parseInt(item.bonusSabiduria);
		merc.carisma = parseInt(merc.carisma) + parseInt(item.bonusCarisma);
		merc.poder = parseInt(merc.poder) + parseInt(item.bonusPoder);
		merc.marcial = parseInt(merc.marcial) + parseInt(item.bonusMarcial);
		merc.stealth = parseInt(merc.stealth) + parseInt(item.bonusStealth);
		merc.magia = parseInt(merc.magia) + parseInt(item.bonusMagia);
		merc.tecnologia = parseInt(merc.tecnologia) + parseInt(item.bonusTecnologia);
	}else{
		merc.agilidad = parseInt(merc.agilidad) - parseInt(item.bonusAgilidad);
		merc.destreza = parseInt(merc.destreza) - parseInt(item.bonusDestreza);
		merc.constitucion = parseInt(merc.constitucion) - parseInt(item.bonusConstitucion);
		merc.fuerza = parseInt(merc.fuerza) - parseInt(item.bonusFuerza);
		merc.inteligencia = parseInt(merc.inteligencia) - parseInt(item.bonusInteligencia);
		merc.sabiduria = parseInt(merc.sabiduria) - parseInt(item.bonusSabiduria);
		merc.carisma = parseInt(merc.carisma) - parseInt(item.bonusCarisma);
		merc.poder = parseInt(merc.poder) - parseInt(item.bonusPoder);
		merc.marcial = parseInt(merc.marcial) - parseInt(item.bonusMarcial);
		merc.stealth = parseInt(merc.stealth) - parseInt(item.bonusStealth);
		merc.magia = parseInt(merc.magia) - parseInt(item.bonusMagia);
		merc.tecnologia = parseInt(merc.tecnologia) - parseInt(item.bonusTecnologia);
	}
	
	var stats = statsBatalla(merc);
	
	return stats;	
}

function statsBatalla(merc){
	html = "<li>Agilidad:"+merc.agilidad+"</li>";
	html = html+"<li>Destreza: "+merc.destreza+"</li>";
	html = html+"<li>Constitucion: "+merc.constitucion+"</li>";
	html = html+"<li>Fuerza:"+merc.fuerza+"</li>";
	html = html+"<li>Inteligencia: "+merc.inteligencia+"</li>";
	html = html+"<li>Sabiduria: "+merc.sabiduria+"</li>";
	html = html+"<li>Carisma:"+merc.carisma+"</li>";
	html = html+"<li>Poder: "+merc.poder+"</li>";
	
	var stats = html;
	
	html = "<li>Marcial:"+merc.marcial+"</li>";
	html = html+"<li>Stealth: "+merc.stealth+"</li>";
	html = html+"<li>Magia: "+merc.magia+"</li>";
	html = html+"<li>Tecnologia:"+merc.tecnologia+"</li>";
	
	var batalla = html;

	return [stats, batalla];
}
function unapplyItem(merc, item){
	return true;
}

function copyItem(item1, item2){
	var temp = new Item(item1);
	
	item1.idJugador = item2.idJugador;
	item1.idBase = item2.idBase;
	item1.nombre = item2.nombre;
	item1.descripcion = item2.descripcion;
	item1.category = item2.category;
	item1.disponible = item2.disponible;
	item1.valor = item2.valor;
	item1.bonusHp = item2.bonusHp;
	item1.bonusHpMax = item2.bonusHpMax;
	item1.bonusAgilidad = item2.bonusAgilidad;
	item1.bonusDestreza = item2.bonusDestreza;
	item1.bonusConstitucion = item2.bonusConstitucion;
	item1.bonusFuerza = item2.bonusFuerza;
	item1.bonusInteligencia = item2.bonusInteligencia;
	item1.bonusSabiduria = item2.bonusSabiduria;
	item1.bonusCarisma = item2.bonusCarisma;
	item1.bonusPoder = item2.bonusPoder;
	item1.bonusMarcial = item2.bonusMarcial;
	item1.bonusStealth = item2.bonusStealth;
	item1.bonusMagia = item2.bonusMagia;
	item1.bonusTecnologia = item2.bonusTecnologia;
	
	item2.idJugador = temp.idJugador;
	item2.idBase = temp.idBase;
	item2.nombre = temp.nombre;
	item2.descripcion = temp.descripcion;
	item2.category = temp.category;
	item2.disponible = temp.disponible;
	item2.valor = temp.valor;
	item2.bonusHp = temp.bonusHp;
	item2.bonusHpMax = temp.bonusHpMax;
	item2.bonusAgilidad = temp.bonusAgilidad;
	item2.bonusDestreza = temp.bonusDestreza;
	item2.bonusConstitucion = temp.bonusConstitucion;
	item2.bonusFuerza = temp.bonusFuerza;
	item2.bonusInteligencia = temp.bonusInteligencia;
	item2.bonusSabiduria = temp.bonusSabiduria;
	item2.bonusCarisma = temp.bonusCarisma;
	item2.bonusPoder = temp.bonusPoder;
	item2.bonusMarcial = temp.bonusMarcial;
	item2.bonusStealth = temp.bonusStealth;
	item2.bonusMagia = temp.bonusMagia;
	item2.bonusTecnologia = temp.bonusTecnologia;

	return true;
}