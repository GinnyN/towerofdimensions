function Mision(mision){



this.displayMissionResults = function (mision, merc1, merc2){
		
		actualTime = mision.horaTermino.getTime() - (new Date()).getTime();
		
		setTimeout(function()
		{
		if(merc2 != "" && merc1 != ""){
			stats ={
				"Agilidad": Math.max(parseInt(mision.mercenario1.agilidad),parseInt(mision.mercenario2.agilidad)),
				"Destreza": Math.max(parseInt(mision.mercenario1.destreza),parseInt(mision.mercenario2.destreza)),
				"Constitucion": Math.max(parseInt(mision.mercenario1.constitucion),parseInt(mision.mercenario2.constitucion)),
				"Fuerza": Math.max(parseInt(mision.mercenario1.fuerza),parseInt(mision.mercenario2.fuerza)),
				"Inteligencia": Math.max(parseInt(mision.mercenario1.inteligencia),parseInt(mision.mercenario2.inteligencia)),
				"Sabiduria": Math.max(parseInt(mision.mercenario1.sabiduria),parseInt(mision.mercenario2.sabiduria)),
				"Carisma": Math.max(parseInt(mision.mercenario1.carisma),parseInt(mision.mercenario2.carisma)),
				"Poder": Math.max(parseInt(mision.mercenario1.poder),parseInt(mision.mercenario2.poder))
			};
		}else if(merc2 != ""){
			stats ={
				"Agilidad": parseInt(mision.mercenario2.agilidad),
				"Destreza": parseInt(mision.mercenario2.destreza),
				"Constitucion": parseInt(mision.mercenario2.constitucion),
				"Fuerza": parseInt(mision.mercenario2.fuerza),
				"Inteligencia": parseInt(mision.mercenario2.inteligencia),
				"Sabiduria": parseInt(mision.mercenario2.sabiduria),
				"Carisma": parseInt(mision.mercenario2.carisma),
				"Poder": parseInt(mision.mercenario2.poder)
			};
		}else{
			stats ={
				"Agilidad": parseInt(mision.mercenario1.agilidad),
				"Destreza": parseInt(mision.mercenario1.destreza),
				"Constitucion": parseInt(mision.mercenario1.constitucion),
				"Fuerza": parseInt(mision.mercenario1.fuerza),
				"Inteligencia": parseInt(mision.mercenario1.inteligencia),
				"Sabiduria": parseInt(mision.mercenario1.sabiduria),
				"Carisma": parseInt(mision.mercenario1.carisma),
				"Poder": parseInt(mision.mercenario1.poder)
			};
		}
		
		porcentaje = 100 / mision.totalPtos;
		fallo = 99;
		array = [];
		
		$.each(mision.condiciones,
			function(i,condicion){
				resultado = condicion.total - (stats[condicion.car1] + stats[condicion.car2]);
				if(resultado>0){
					fallo = fallo - (resultado*porcentaje);
					array.push(0);
				}else{
					array.push(1);
				}
			}
		);
		
		if(fallo<1)
			fallo = 1;
		
		mision.horaComienzo = new Date();
		mision.horaTermino = new Date(mision.horaComienzo + mision.tiempo);			
			
		if(fallo > Math.floor(Math.random()*101))
			mision.ganada = true;
		else{
			mision.ganada = false;
		}
		
		$("#principal").prepend("<div class='missionReport missionReport"+mision.idBase+"'></div>");
		
		if(mision.ganada){
			
			usuario.dinero = parseInt(usuario.dinero) + parseInt(mision.dinero);
			$("#datos").html("Nombre: "+usuario.name+" Dinero: "+usuario.dinero);
			
			html = "<ul>";
				html = html + "<li> Cumpliste la Mision";
					html = html + "<li>Dinero: "+mision.dinero+" </li>";
					html = html + "<li>"
						html = html + "Experiencia:";
							html = html + "<ul>";
								if(mision.mercenario1 == null){
									html = html + "<li>"+mision.mercenario2.nombre+": "+mision.mercenario2.exp+" +"+(2*parseInt(mision.exp))+"</li>";
								}
								if(mision.mercenario2 == null){
									html = html + "<li>"+mision.mercenario1.nombre+": "+mision.mercenario1.exp+" +"+(2*parseInt(mision.exp))+"</li>";
								}
								if(mision.mercenario1 != null && mision.mercenario2 != null){
									html = html + "<li>"+mision.mercenario2.nombre+": "+mision.mercenario2.exp+" +"+mision.exp+"</li>";
									html = html + "<li>"+mision.mercenario1.nombre+": "+mision.mercenario1.exp+" +"+mision.exp+"</li>";
								}
							html = html + "</ul>";
					html = html + "</li>";
				html = html + "</li>";
				html = html + "<li>Items:";
					html = html + "<ul>";
				
				var jsonItems;
				
				$.ajax({
					url: "json/items.json",
					success: function(itemJson){
						$.each(mision.unlockItems,
							function(k, unlock){
								var item;
								jsonItems = itemJson;
								$.each(itemJson.item,
									function(j,i){
										if(i.idBase == unlock){
											item = i;
											return false;
										}
									}
								);
								
								if(Math.floor(Math.random()*2) == 1){
									var rand = Math.floor(Math.random()*6);
									
									for(var i = 0; i < rand;i++){
										var temp = new Item(item);
										usuario.items.push(temp);
									}
									if(rand > 0)
										html = html + "<li>"+item.nombre+" x"+rand+"</li>";
								}
							}
						);
						html = html + "</ul>";
						html = html + "</li>";
						if(mision.first == false){
									html = html + "</ul>";
									if(mision.mercenario1 == null)
										mision.mercenario2.exp = parseInt(mision.mercenario2.exp) + (2*parseInt(mision.exp));
									if(mision.mercenario2 == null)
										mision.mercenario1.exp = parseInt(mision.mercenario1.exp) + (2*parseInt(mision.exp));
									if(mision.mercenario1 != null && mision.mercenario2 != null){
										mision.mercenario2.exp = parseInt(mision.mercenario2.exp) + parseInt(mision.exp);
										mision.mercenario1.exp = parseInt(mision.mercenario1.exp) + parseInt(mision.exp);
									}
									$(".missionReport"+mision.idBase).show();
									$(".missionReport"+mision.idBase).html(html);
									
									var merce1 = false, merce2 = false;
									if(mision.mercenario1 != null)
										merce1 = checkLevelUp(mision.mercenario1);
									if(mision.mercenario2 != null)
										merce2 = checkLevelUp(mision.mercenario2);
												
									$(".missionReport"+mision.idBase).click(
										function(e){			
											$(this).remove();
											e.stopPropagation;
											$(".levelUp").show();
										}
									);
									
									if(mision.mercenario1 != null){
										mision.mercenario1.misionActual = "-1";
										mision.mercenario1 = null;
									}
									if(mision.mercenario2 != null){
										mision.mercenario2.misionActual = "-1";
										mision.mercenario2 = null;
									}
								}
					},
					error: function(){alert("Fail!")}	
					}).done(
						function(){
						if(mision.first == true || mision.first == null){
							mision.first = false;
						$.ajax({
							url: "json/dimensiones.json",
							success: function(object){
								//object = $.parseJSON(object);
								html = html + "<li>Zonas:";
								html = html + "<ul>";
								
								var unlockDimension = null, unlockZona = null;
								
								$.each(mision.unlockZona,
									function(a,unlock){
										$.each(object.dimensiones,
											function(b,unlockD){
												if(unlockD.idBase==unlock[0]){
													unlockDimension = unlockD;
													$.each(unlockDimension.zonas,
														function(b,unlockD){
															if(unlockD.idBase==unlock[1]){
																unlockZona = unlockD;
																return false;
															}
														}
													);
													return false;
												}
											}
										);
										
										if(unlockDimension != null){
											var flag = true;
											$.each(usuario.dimensiones,
												function(b,unlockD){
													if(unlockD.idBase == unlock[0]){
														flag = false;
														unlockDimension = unlockD;
														return false;
													}
												}
											);
											
											if(flag){
												usuario.dimensiones.push(unlockDimension);
												unlockDimension.zonas = [];
												unlockDimension.zonas.push(unlockZona);
												html = html + "<li>"+unlockDimension.nombre+" - "+unlockZona.nombre+"</li>";
											}else{
												flag = true;
												$.each(unlockDimension.zonas,
													function(b, unlockZ){
														if(unlockZ.id == unlock[1]){
															flag = false;
															unlockZona = unlockZ;
															return false;
														}
													}
												);
												if(flag){
													unlockDimension.zonas.push(unlockZona);
													html = html + "<li>"+unlockDimension.nombre+" - "+unlockZona.nombre+"</li>";
												}
											}
										}
									}
								)
							},
							error: function(){alert("Fail!")},
						}).done(
							function(){
								html = html + "</ul>";
								html = html + "</li>";
								html = html + "<li> Misiones";
								html = html + "<ul>";
								$.ajax({
									url: "json/misiones.json",
									success: function(object){
										//object = $.parseJSON(object);
										var unlockMission;
										
										if(mision.unlockMision != []){
											$.each(mision.unlockMisiones,
												function(i,unlock){
													$.each(object.misiones,
														function(a,m){
															if(m.idBase == unlock){
																unlockMission = m;
																return false;
															}
														}
													);
													
													$.each(usuario.dimensiones,
														function(a,dimension){
															if(dimension.idBase == unlockMission.dimension){
																$.each(dimension.zonas,
																	function(b,zona){
																		if(zona.idBase == unlockMission.zona){
																			flag = true;
																			$.each(zona.misiones,
																				function(c,m){
																					if(m.idBase == unlockMission.idBase)
																						flag = false
																				}
																			);
																			
																			if(flag){
																				zona.misiones.push(unlockMission);
																				html = html + "<li>"+unlockMission.nombre+"</li>";
																			}
																		}
																	}
																);
															}
														}
													);
													
												}
											);
										}
									},
									error: function(){alert("Fail!")}
								}).done(
									function(){	
											html = html + "</ul>";
										html = html + "</li>";
										html = html + "<li> Mercenarios";
											html = html + "<ul>";
										$.ajax({
											url: "json/personajes.json",
											success: function(object){
												$.each(mision.unlockMercenarios,
													function(i, unlock){
														$.each(object.character,
															function(j, m){
																if(m.idBase == unlock){
																	merc = m;
																	return false;
																}
															}
														);
														
														flag = true;
														$.each(usuario.mercenarios,
															function(c,m){
																if(m.idBase == merc.idBase){
																	flag = false
																	return false;
																}
															}
														);
														
														if(flag){
															usuario.mercenarios.push(merc);
															html = html + "<li>"+merc.nombre+"</li>";
															
															for(var i=1; i<7; i++){
																if(merc["item"+i] != 0){
																	$.each(jsonItems.item,
																		function(j,item){
																			if(item.idBase == merc["item"+i]){
																				var temp = new Item(item);
											
																				merc["item"+i] = temp;
																				
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
																				
																			}
																		}
																	);
																}else{
																	merc["item"+i] = null;
																}
															}
														}
													}	
												);
											},
											error: function(){alert("Fail!")}
										}).done(
											function(){
													html = html + "</ul>";
												html = html + "</li>"
												
												html = html + "</ul>";
						
												if(mision.mercenario1 == null)
													mision.mercenario2.exp = parseInt(mision.mercenario2.exp) + (2*parseInt(mision.exp));
												if(mision.mercenario2 == null)
													mision.mercenario1.exp = parseInt(mision.mercenario1.exp) + (2*parseInt(mision.exp));
												if(mision.mercenario1 != null && mision.mercenario2 != null){
													mision.mercenario2.exp = parseInt(mision.mercenario2.exp) + parseInt(mision.exp);
													mision.mercenario1.exp = parseInt(mision.mercenario1.exp) + parseInt(mision.exp);
												}
												
												$(".missionReport"+mision.idBase).show();
												$(".missionReport"+mision.idBase).html(html);
												
												var merce1 = false, merce2 = false;
												if(mision.mercenario1 != null)
													merce1 = checkLevelUp(mision.mercenario1);
												if(mision.mercenario2 != null)
													merce2 = checkLevelUp(mision.mercenario2);
															
												$(".missionReport"+mision.idBase).click(
													function(e){			
														$(this).remove();
														e.stopPropagation;
														$(".levelUp").show();
													}
												);
												if(mision.mercenario1 != null){
													mision.mercenario1.misionActual = "-1";
													mision.mercenario1 = null;
												}
												if(mision.mercenario2 != null){
													mision.mercenario2.misionActual = "-1";
													mision.mercenario2 = null;
												}
											}
										)
									}
								);	
							}
						);
					}
				}
			);
		}else{
			html = "<ul>";
			html = html + "<li>Fallaste la Mision";
			html = html + "<ul>";
			
			if((merc2 != null && merc2 != "") && (merc1 == null || merc1 == "")){
				html = html + "<li>"+mision.mercenario2.nombre+": "+mision.mercenario2.hpActual+" -"+Math.floor((((100 - fallo)*mision.hpLoss/100)*2))+"</li>";
				mision.mercenario2.hpActual = mision.mercenario2.hpActual - Math.floor(((100 - fallo)*mision.hpLoss/100)*2);
			}
			
			if((merc1 != null && merc1 != "") && (merc2 == null || merc2 == "")){
				html = html + "<li>"+mision.mercenario1.nombre+": "+mision.mercenario1.hpActual+" -"+Math.floor((((100 - fallo)*mision.hpLoss/100)*2))+"</li>";
				mision.mercenario1.hpActual = mision.mercenario1.hpActual - Math.floor(((100 - fallo)*mision.hpLoss/100)*2);
			}
			
			if(merc2 != null && merc2 != "" && merc1 != null && merc1 != ""){
				html = html + "<li>"+mision.mercenario2.nombre+": "+mision.mercenario2.hpActual+" -"+Math.floor(((100 - fallo)*mision.hpLoss/100))+"</li>";
				mision.mercenario2.hpActual = mision.mercenario2.hpActual - Math.floor((100 - fallo)*mision.hpLoss/100);
				html = html + "<li>"+mision.mercenario1.nombre+": "+mision.mercenario1.hpActual+" -"+Math.floor(((100 - fallo)*mision.hpLoss/100))+"</li>";
				mision.mercenario1.hpActual = mision.mercenario1.hpActual - Math.floor((100 - fallo)*mision.hpLoss/100);
			}
			
			html = html + "</ul>";
			html = html + "</li>";
			html = html + "<li>";
			html = html + "<ul>";
			
			$.each(mision.condiciones,
				function(i,condicion){
					html = html + "<li>"+condicion.description+" / ";
					if(array[i]==1)
						html = html +"OK </li>";
					else
						html = html +"Fail </li>";
				}
			);
			html = html + "</ul>";
			html = html + "</li>";
			html = html + "</ul>";
			$(".missionReport"+mision.idBase).show();
			$(".missionReport"+mision.idBase).html(html);
			
						
			$(".missionReport"+mision.idBase).click(
				function(){			
					$(this).remove();
				}
			);
			
			if(mision.mercenario1 != null){
				mision.mercenario1.misionActual = "-1";
				mision.mercenario1 = null;
			}
			if(mision.mercenario2 != null){
				mision.mercenario2.misionActual = "-1";
				mision.mercenario2 = null;
			}
		}
	}, actualTime);
	
};

function checkLevelUp (merc){
	$.ajax({
		url: "json/level.json",
		success: function(object){
			if(merc.exp > object[(parseInt(merc.nivel) + 1)+""]){
				
				$("#principal").prepend("<div class='levelUp levelUp"+merc.idBase+"'></div>");
				div = $(".levelUp"+merc.idBase);
				
				html = "<h1>"+merc.nombre+" ha subido de Nivel!</h1>";
				html = html + "<ul>";
				html = html + "<li>Nivel: "+merc.nivel+" +1</li>";
				html = html + "<li> Stats";
				
				html = html + "<ul>"
				
				merc.nivel = parseInt(merc.nivel) + 1;
				
				up = (merc.crecimientoAgilidad * Math.floor(Math.random()*2) * (1 + (Math.floor(Math.random()*1) * Math.floor(Math.random()*1) * Math.floor(Math.random()*1)) ))
				if(up < 0) 
					up = 0;
				html = html + "<li>Agilidad: "+merc.agilidad+" +"+up+"</li>"
				merc.agilidad = parseInt(merc.agilidad) + up;
				
				up = (merc.crecimientoDestreza * Math.floor(Math.random()*2) * (1 + (Math.floor(Math.random()*1) * Math.floor(Math.random()*1) * Math.floor(Math.random()*1)) ))
				if(up < 0) 
					up = 0;
				html = html + "<li>Destreza: "+merc.destreza+" +"+up+"</li>"
				merc.destreza = parseInt(merc.destreza) + up;
				
				up = (merc.crecimientoConstitucion * Math.floor(Math.random()*2) * (1 + (Math.floor(Math.random()*1) * Math.floor(Math.random()*1) * Math.floor(Math.random()*1)) ))
				if(up < 0) 
					up = 0;
				html = html + "<li>Constitucion: "+merc.constitucion+" +"+up+"</li>"
				merc.constitucion = parseInt(merc.constitucion) + up;
				merc.hpMax = parseInt(merc.hpMax) + (up * 3);
				
				up = (merc.crecimientoFuerza * Math.floor(Math.random()*2) * (1 + (Math.floor(Math.random()*1) * Math.floor(Math.random()*1) * Math.floor(Math.random()*1)) ))
				if(up < 0) 
					up = 0;
				html = html + "<li>Fuerza: "+merc.fuerza+" +"+up+"</li>"
				merc.fuerza = parseInt(merc.fuerza) + up;
				
				up = (merc.crecimientoInteligencia * Math.floor(Math.random()*2) * (1 + (Math.floor(Math.random()*1) * Math.floor(Math.random()*1) * Math.floor(Math.random()*1)) ))
				if(up < 0) 
					up = 0;
				html = html + "<li>Inteligencia: "+merc.inteligencia+" +"+up+"</li>"
				merc.inteligencia = parseInt(merc.inteligencia) + up;
				
				up = (merc.crecimientoSabiduria * Math.floor(Math.random()*2) * (1 + (Math.floor(Math.random()*1) * Math.floor(Math.random()*1) * Math.floor(Math.random()*1)) ))
				if(up < 0) 
					up = 0;
				html = html + "<li>Sabiduria: "+merc.sabiduria+" +"+up+"</li>"
				merc.sabiduria = parseInt(merc.sabiduria) + up;
				
				up = (merc.crecimientoCarisma * Math.floor(Math.random()*2) * (1 + (Math.floor(Math.random()*1) * Math.floor(Math.random()*1) * Math.floor(Math.random()*1)) ))
				if(up < 0) 
					up = 0;
				html = html + "<li>Carisma: "+merc.carisma+" +"+up+"</li>"
				merc.carisma = parseInt(merc.carisma) + up;
				
				up = (merc.crecimientoPoder * Math.floor(Math.random()*2) * (1 + (Math.floor(Math.random()*1) * Math.floor(Math.random()*1) * Math.floor(Math.random()*1)) ))
				if(up < 0) 
					up = 0;
				html = html + "<li>Poder: "+merc.poder+" +"+up+"</li>"
				merc.poder = parseInt(merc.poder) + up;
				
				html = html + "</ul>";
				html = html + "</li>";
				
				html = html + "<li> Batalla";
				
				html = html + "<ul>"
				
				up = (merc.crecimientoMarcial * Math.floor(Math.random()*2) * (1 + (Math.floor(Math.random()*1) * Math.floor(Math.random()*1) * Math.floor(Math.random()*1)) ))
				if(up < 0) 
					up = 0;
				html = html + "<li>Marcial: "+merc.marcial+" +"+up+"</li>"
				merc.marcial = parseInt(merc.marcial) + up;
				
				up = (merc.crecimientoStealth * Math.floor(Math.random()*2) * (1 + (Math.floor(Math.random()*1) * Math.floor(Math.random()*1) * Math.floor(Math.random()*1)) ))
				if(up < 0) 
					up = 0;
				html = html + "<li>Stealth: "+merc.stealth+" +"+up+"</li>"
				merc.stealth = parseInt(merc.stealth) + up;
				
				up = (merc.crecimientoMagia * Math.floor(Math.random()*2) * (1 + (Math.floor(Math.random()*1) * Math.floor(Math.random()*1) * Math.floor(Math.random()*1)) ))
				if(up < 0) 
					up = 0;
				html = html + "<li>Magia: "+merc.magia+" +"+up+"</li>"
				merc.magia = parseInt(merc.magia) + up;
				
				up = (merc.crecimientoTecnologia * Math.floor(Math.random()*2) * (1 + (Math.floor(Math.random()*1) * Math.floor(Math.random()*1) * Math.floor(Math.random()*1)) ))
				if(up < 0) 
					up = 0;
				html = html + "<li>Tecnologia: "+merc.tecnologia+" +"+up+"</li>"
				merc.tecnologia = parseInt(merc.tecnologia) + up;
				
				html = html + "</ul>";	
				html = html + "</li>";
				html = html + "</ul>";
				
				div.html(html);
				
				div.click(
					function(e){
						e.stopPropagation();
						$(this).remove();
						checkLevelUp(merc);
					}
				);
				
				return true;
			
			}else{
				return false
			}
		},
		error: function(){alert("Fail!")}
	});
}


}