<?php
	function object_2_array($result){
		$array = array();
		foreach ($result as $key=>$value)
		{
			if (is_object($value))
			{
				$array[$key]=object_2_array($value);
			}
			elseif (is_array($value))
			{
				$array[$key]=object_2_array($value);
			}
			else
			{
				$array[$key]=$value;
			}
		}
		return $array;
	}  
	
	function object_to_json($data){
		return (string)json_encode(object_2_array($data));
	}
?>