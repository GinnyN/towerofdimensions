function setDashboard(){
	$["#dashboard"].click(
		function(){
			$["#principal"].load("html/dashboard.html");
		}
	);
}