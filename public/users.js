//var socket = io.connect('http://localhost:3000',{'forceNew':true});
const socket = io();

let sortDirection=false;

var data_right;
var data_left;
var total_time;
var load;

socket.on('session_data_loaded',function(data){

    console.log(data);
    data_right = data.rom_r;
    console.log(data_right);
    data_left = data.rom_l;
    load = data.load;

});


socket.emit('refreshlist');
var n_session;

socket.on('datasessions', function(datasessions) {
    console.log(datasessions);
    var l_rom;
    var r_rom ;
    var load;
    $('#view_session').on('click', function() {
	l_rom = [];
	r_rom = [];
	load = [];
	// creamos 3 nuevas variables con los datos de rom dcha rom izq y peso
	for (i = 0; i < datasessions.length; i++) {
		if (datasessions[i].idSesion == n_session){
		   l_rom.push(datasessions[i].left_hip);
		   r_rom.push(datasessions[i].right_hip);
		   load.push(datasessions[i].weight_gauge);
		   
		};
	};
	
	r_rom = [36.5585, 36.5259, 36.4962, 36.4689, 36.4408, 36.3909, 36.335, 36.271, 36.1943, 36.0842, 35.9539, 35.8015, 35.6229, 35.3996, 35.1472, 34.8671, 34.5588, 34.2085, 33.8337, 33.4375, 33.021, 32.5716, 32.1055, 31.6253, 31.1309, 30.6092, 30.0759, 29.5333, 28.982, 28.4101, 27.8326, 27.2519, 26.6686, 26.0712, 25.4745, 24.881, 24.2907, 23.6928, 23.0991, 22.5103, 21.9251, 21.3314, 20.7416, 20.1566, 19.576, 18.9904, 18.4092, 17.8328, 17.26, 16.6806, 16.1042, 15.5317, 14.9625, 14.3888, 13.8194, 13.2551, 12.6957, 12.1344, 11.5788, 11.0296, 10.4863, 9.943, 9.4059, 8.8751, 8.35, 7.8256, 7.307, 6.7943, 6.2873, 5.782, 5.2825, 4.789, 4.3013, 3.8162, 3.3365, 2.8623, 2.3931, 1.9264, 1.4649, 1.0089, 0.55876, 0.11339, -0.32492, -0.75545, -1.1777, -1.592, -1.9966, -2.3906, -2.7733, -3.1449, -3.503, -3.8462, -4.1732, -4.483, -4.7732, -5.0422, -5.2883, -5.5107, -5.7056, -5.8703, -6.0025, -6.1013, -6.1635, -6.1873, -6.1715, -6.117, -6.0199, -5.8784, -5.691, -5.4588, -5.1776, -4.8459, -4.4624, -4.0296, -3.5434, -3.0028, -2.408, -1.7637, -1.0667, -0.31824, 0.47919, 1.3179, 2.1989, 3.1186, 4.0724, 5.0499, 6.0517, 7.0737, 8.1109, 9.1527, 10.2008, 11.2518, 12.3017, 13.3403, 14.3718, 15.3946, 16.4062, 17.397, 18.3728, 19.3328, 20.2749, 21.189, 22.0824, 22.9548, 23.805, 24.6222, 25.4163, 26.1884, 26.9377, 27.6538, 28.3466, 29.0165, 29.6621, 30.2707, 30.8549, 31.416, 31.9538, 32.4557, 32.9354, 33.3942, 33.8315, 34.2332, 34.613, 34.9714, 35.3072, 35.6047, 35.8803, 36.136, 36.3716, 36.5725, 36.7541, 36.9172, 37.0604, 37.1663, 37.2525, 37.3207, 37.3704, 37.3856, 37.3845, 37.3695, 37.3407, 37.2817, 37.2124, 37.1364, 37.0547, 36.9514, 36.8478, 36.7477, 36.6527, 36.5465, 36.4502, 36.367, 36.2969, 36.2222, 36.1618, 36.1168, 36.085, 36.046, 36.0174, 35.9986, 35.9863, 35.9539, 35.8015, 35.6229, 35.3996, 35.1472, 34.8671, 34.5588, 34.2085, 33.8337, 33.4375, 33.021, 32.5716, 32.1055, 31.6253, 31.1309, 30.6092, 30.0759, 29.5333, 28.982, 28.4101, 27.8326, 27.2519, 26.6686, 26.0712, 25.4745, 24.881, 24.2907, 23.6928, 23.0991, 22.5103, 21.9251, 21.3314, 20.7416, 20.1566, 19.576, 18.9904, 18.4092, 17.8328, 17.26, 16.6806, 16.1042, 15.5317, 14.9625, 14.3888, 13.8194, 13.2551, 12.6957, 12.1344, 11.5788, 11.0296, 10.4863, 9.943, 9.4059, 8.8751, 8.35, 7.8256, 7.307, 6.7943, 6.2873, 5.782, 5.2825, 4.789, 4.3013, 3.8162, 3.3365, 2.8623, 2.3931, 1.9264, 1.4649, 1.0089, 0.55876, 0.11339, -0.32492, -0.75545, -1.1777, -1.592, -1.9966, -2.3906, -2.7733, -3.1449, -3.503, -3.8462, -4.1732, -4.483, -4.7732, -5.0422, -5.2883, -5.5107, -5.7056, -5.8703, -6.0025, -6.1013, -6.1635, -6.1873, -6.1715, -6.117, -6.0199, -5.8784, -5.691, -5.4588, -5.1776, -4.8459, -4.4624, -4.0296, -3.5434, -3.0028, -2.408, -1.7637, -1.0667, -0.31824, 0.47919, 1.3179, 2.1989, 3.1186, 4.0724, 5.0499, 6.0517, 7.0737, 8.1109, 9.1527, 10.2008, 11.2518, 12.3017, 13.3403, 14.3718, 15.3946, 16.4062, 17.397, 18.3728, 19.3328, 20.2749, 21.189, 22.0824, 22.9548, 23.805, 24.6222, 25.4163, 26.1884, 26.9377, 27.6538, 28.3466, 29.0165, 29.6621, 30.2707, 30.8549, 31.416, 31.9538, 32.4557, 32.9354, 33.3942, 33.8315, 34.2332, 34.613, 34.9714, 35.3072, 35.6047, 35.8803, 36.136, 36.3716, 36.5725, 36.7541, 36.9172, 37.0604, 37.1663, 37.2525, 37.3207, 37.3704, 37.3856, 37.3845, 37.3695, 37.3407, 37.2817, 37.2124, 37.1364, 37.0547, 36.9514, 36.8478, 36.7477, 36.6527, 36.5465, 36.4502];
	load = [36.5585, 36.5259, 36.4962, 36.4689, 36.4408, 36.3909, 36.335, 36.271, 36.1943, 36.0842, 35.9539, 35.8015, 35.6229, 35.3996, 35.1472, 34.8671, 34.5588, 34.2085, 33.8337, 33.4375, 33.021, 32.5716, 32.1055, 31.6253, 31.1309, 30.6092, 30.0759, 29.5333, 28.982, 28.4101, 27.8326, 27.2519, 26.6686, 26.0712, 25.4745, 24.881, 24.2907, 23.6928, 23.0991, 22.5103, 21.9251, 21.3314, 20.7416, 20.1566, 19.576, 18.9904, 18.4092, 17.8328, 17.26, 16.6806, 16.1042, 15.5317, 14.9625, 14.3888, 13.8194, 13.2551, 12.6957, 12.1344, 11.5788, 11.0296, 10.4863, 9.943, 9.4059, 8.8751, 8.35, 7.8256, 7.307, 6.7943, 6.2873, 5.782, 5.2825, 4.789, 4.3013, 3.8162, 3.3365, 2.8623, 2.3931, 1.9264, 1.4649, 1.0089, 0.55876, 0.11339, -0.32492, -0.75545, -1.1777, -1.592, -1.9966, -2.3906, -2.7733, -3.1449, -3.503, -3.8462, -4.1732, -4.483, -4.7732, -5.0422, -5.2883, -5.5107, -5.7056, -5.8703, -6.0025, -6.1013, -6.1635, -6.1873, -6.1715, -6.117, -6.0199, -5.8784, -5.691, -5.4588, -5.1776, -4.8459, -4.4624, -4.0296, -3.5434, -3.0028, -2.408, -1.7637, -1.0667, -0.31824, 0.47919, 1.3179, 2.1989, 3.1186, 4.0724, 5.0499, 6.0517, 7.0737, 8.1109, 9.1527, 10.2008, 11.2518, 12.3017, 13.3403, 14.3718, 15.3946, 16.4062, 17.397, 18.3728, 19.3328, 20.2749, 21.189, 22.0824, 22.9548, 23.805, 24.6222, 25.4163, 26.1884, 26.9377, 27.6538, 28.3466, 29.0165, 29.6621, 30.2707, 30.8549, 31.416, 31.9538, 32.4557, 32.9354, 33.3942, 33.8315, 34.2332, 34.613, 34.9714, 35.3072, 35.6047, 35.8803, 36.136, 36.3716, 36.5725, 36.7541, 36.9172, 37.0604, 37.1663, 37.2525, 37.3207, 37.3704, 37.3856, 37.3845, 37.3695, 37.3407, 37.2817, 37.2124, 37.1364, 37.0547, 36.9514, 36.8478, 36.7477, 36.6527, 36.5465, 36.4502, 36.367, 36.2969, 36.2222, 36.1618, 36.1168, 36.085, 36.046, 36.0174, 35.9986, 35.9863, 35.9539, 35.8015, 35.6229, 35.3996, 35.1472, 34.8671, 34.5588, 34.2085, 33.8337, 33.4375, 33.021, 32.5716, 32.1055, 31.6253, 31.1309, 30.6092, 30.0759, 29.5333, 28.982, 28.4101, 27.8326, 27.2519, 26.6686, 26.0712, 25.4745, 24.881, 24.2907, 23.6928, 23.0991, 22.5103, 21.9251, 21.3314, 20.7416, 20.1566, 19.576, 18.9904, 18.4092, 17.8328, 17.26, 16.6806, 16.1042, 15.5317, 14.9625, 14.3888, 13.8194, 13.2551, 12.6957, 12.1344, 11.5788, 11.0296, 10.4863, 9.943, 9.4059, 8.8751, 8.35, 7.8256, 7.307, 6.7943, 6.2873, 5.782, 5.2825, 4.789, 4.3013, 3.8162, 3.3365, 2.8623, 2.3931, 1.9264, 1.4649, 1.0089, 0.55876, 0.11339, -0.32492, -0.75545, -1.1777, -1.592, -1.9966, -2.3906, -2.7733, -3.1449, -3.503, -3.8462, -4.1732, -4.483, -4.7732, -5.0422, -5.2883, -5.5107, -5.7056, -5.8703, -6.0025, -6.1013, -6.1635, -6.1873, -6.1715, -6.117, -6.0199, -5.8784, -5.691, -5.4588, -5.1776, -4.8459, -4.4624, -4.0296, -3.5434, -3.0028, -2.408, -1.7637, -1.0667, -0.31824, 0.47919, 1.3179, 2.1989, 3.1186, 4.0724, 5.0499, 6.0517, 7.0737, 8.1109, 9.1527, 10.2008, 11.2518, 12.3017, 13.3403, 14.3718, 15.3946, 16.4062, 17.397, 18.3728, 19.3328, 20.2749, 21.189, 22.0824, 22.9548, 23.805, 24.6222, 25.4163, 26.1884, 26.9377, 27.6538, 28.3466, 29.0165, 29.6621, 30.2707, 30.8549, 31.416, 31.9538, 32.4557, 32.9354, 33.3942, 33.8315, 34.2332, 34.613, 34.9714, 35.3072, 35.6047, 35.8803, 36.136, 36.3716, 36.5725, 36.7541, 36.9172, 37.0604, 37.1663, 37.2525, 37.3207, 37.3704, 37.3856, 37.3845, 37.3695, 37.3407, 37.2817, 37.2124, 37.1364, 37.0547, 36.9514, 36.8478, 36.7477, 36.6527, 36.5465, 36.4502];
	l_rom = [-6.1715, -6.117, -6.0199, -5.8784, -5.691, -5.4588, -5.1776, -4.8459, -4.4624, -4.0296, -3.5434, -3.0028, -2.408, -1.7637, -1.0667, -0.31824, 0.47919, 1.3179, 2.1989, 3.1186, 4.0724, 5.0499, 6.0517, 7.0737, 8.1109, 9.1527, 10.2008, 11.2518, 12.3017, 13.3403, 14.3718, 15.3946, 16.4062, 17.397, 18.3728, 19.3328, 20.2749, 21.189, 22.0824, 22.9548, 23.805, 24.6222, 25.4163, 26.1884, 26.9377, 27.6538, 28.3466, 29.0165, 29.6621, 30.2707, 30.8549, 31.416, 31.9538, 32.4557, 32.9354, 33.3942, 33.8315, 34.2332, 34.613, 34.9714, 35.3072, 35.6047, 35.8803, 36.136, 36.3716, 36.5725, 36.7541, 36.9172, 37.0604, 37.1663, 37.2525, 37.3207, 37.3704, 37.3856, 37.3845, 37.3695, 37.3407, 37.2817, 37.2124, 37.1364, 37.0547, 36.9514, 36.8478, 36.7477, 36.6527, 36.5465, 36.4502, 36.367, 36.2969, 36.2222, 36.1618, 36.1168, 36.085, 36.046, 36.0174, 35.9986, 35.9863, 35.9539, 35.8015, 35.6229, 35.3996, 35.1472, 34.8671, 34.5588, 34.2085, 33.8337, 33.4375, 33.021, 32.5716, 32.1055, 31.6253, 31.1309, 30.6092, 30.0759, 29.5333, 28.982, 28.4101, 27.8326, 27.2519, 26.6686, 26.0712, 25.4745, 24.881, 24.2907, 23.6928, 23.0991, 22.5103, 21.9251, 21.3314, 20.7416, 20.1566, 19.576, 18.9904, 18.4092, 17.8328, 17.26, 16.6806, 16.1042, 15.5317, 14.9625, 14.3888, 13.8194, 13.2551, 12.6957, 12.1344, 11.5788, 11.0296, 10.4863, 9.943, 9.4059, 8.8751, 8.35, 7.8256, 7.307, 6.7943, 6.2873, 5.782, 5.2825, 4.789, 4.3013, 3.8162, 3.3365, 2.8623, 2.3931, 1.9264, 1.4649, 1.0089, 0.55876, 0.11339, -0.32492, -0.75545, -1.1777, -1.592, -1.9966, -2.3906, -2.7733, -3.1449, -3.503, -3.8462, -4.1732, -4.483, -4.7732, -5.0422, -5.2883, -5.5107, -5.7056, -5.8703, -6.0025, -6.1013, -6.1635, -6.1873, -6.1715, -6.117, -6.0199, -5.8784, -5.691, -5.4588, -5.1776, -4.8459, -4.4624, -4.0296, -3.5434, -3.0028, -2.408, -1.7637, -1.0667, -0.31824, 0.47919, 1.3179, 2.1989, 3.1186, 4.0724, 5.0499, 6.0517, 7.0737, 8.1109, 9.1527, 10.2008, 11.2518, 12.3017, 13.3403, 14.3718, 15.3946, 16.4062, 17.397, 18.3728, 19.3328, 20.2749, 21.189, 22.0824, 22.9548, 23.805, 24.6222, 25.4163, 26.1884, 26.9377, 27.6538, 28.3466, 29.0165, 29.6621, 30.2707, 30.8549, 31.416, 31.9538, 32.4557, 32.9354, 33.3942, 33.8315, 34.2332, 34.613, 34.9714, 35.3072, 35.6047, 35.8803, 36.136, 36.3716, 36.5725, 36.7541, 36.9172, 37.0604, 37.1663, 37.2525, 37.3207, 37.3704, 37.3856, 37.3845, 37.3695, 37.3407, 37.2817, 37.2124, 37.1364, 37.0547, 36.9514, 36.8478, 36.7477, 36.6527, 36.5465, 36.4502, 36.367, 36.2969, 36.2222, 36.1618, 36.1168, 36.085, 36.046, 36.0174, 35.9986, 35.9863, 35.9539, 35.8015, 35.6229, 35.3996, 35.1472, 34.8671, 34.5588, 34.2085, 33.8337, 33.4375, 33.021, 32.5716, 32.1055, 31.6253, 31.1309, 30.6092, 30.0759, 29.5333, 28.982, 28.4101, 27.8326, 27.2519, 26.6686, 26.0712, 25.4745, 24.881, 24.2907, 23.6928, 23.0991, 22.5103, 21.9251, 21.3314, 20.7416, 20.1566, 19.576, 18.9904, 18.4092, 17.8328, 17.26, 16.6806, 16.1042, 15.5317, 14.9625, 14.3888, 13.8194, 13.2551, 12.6957, 12.1344, 11.5788, 11.0296, 10.4863, 9.943, 9.4059, 8.8751, 8.35, 7.8256, 7.307, 6.7943, 6.2873, 5.782, 5.2825, 4.789, 4.3013, 3.8162, 3.3365, 2.8623, 2.3931, 1.9264, 1.4649, 1.0089, 0.55876, 0.11339, -0.32492, -0.75545, -1.1777, -1.592, -1.9966, -2.3906, -2.7733, -3.1449, -3.503, -3.8462, -4.1732, -4.483, -4.7732, -5.0422, -5.2883, -5.5107, -5.7056, -5.8703, -6.0025, -6.1013, -6.1635, -6.1873];
	session_speed = "slow"
	
	// Extracción de valores máximo y mínimo del ROM de ambas piernas		
	var l_max = Math.max(...l_rom);
	var r_max = Math.max(...r_rom);
	var r_min = Math.min(...r_rom);
	var l_min = Math.min(...l_rom);
	var l_total_rom = l_max - l_min;
	var r_total_rom = r_max - r_min;
	
	
	// Filtramos las señales de ROM (ventana = 5 muestras)
	/*
	for (i = 5; i < l_rom.length ; i++){
	  l_rom[i] = (l_rom[i] + l_rom[i-1] + l_rom[i-2]  + l_rom[i-3] + l_rom[i-4])/5
	  r_rom[i] = (r_rom[i] + r_rom[i-1] + r_rom[i-2] + l_rom[i-3] + l_rom[i-4])/5

	}*/
	
	
	// Calculo de la cadencia
	let [n_HS_r, steps_right] = getToeIn(r_rom)
	let [n_HS_l, steps_left] = getToeIn(l_rom)
	var [n_TO_r, times] = getToeOff(r_rom)
	var [n_TO_l, times] = getToeOff(l_rom)
	let steps = steps_right + steps_left
	let totalSeconds = r_rom.length/100;
	console.log(totalSeconds)
	let cadence = 60*steps/totalSeconds
	document.getElementById("cadence").innerHTML = cadence.toFixed(2) + "  pasos/min"
	// Calculo de la longitud de paso media
	if(session_speed != "none"){
	  if(session_speed == "slow"){
	    var floatSpeed = 0.068
	  } else if(session_speed == "normal"){
	    var floatSpeed = 0.112
	  } else if(session_speed == "high"){
	    var floatSpeed = 0.113
	  }
	  let distancia = floatSpeed*totalSeconds
	  document.getElementById("distancia_recorrida").innerHTML = distancia.toFixed(2) + " metros"
	  
	  // Longitud de paso Pierna derecha
	  let samplesPaso_dcha = getSamplesPaso(n_HS_r, n_TO_r)
	  let longitudPaso_dcha = samplesPaso_dcha/100*floatSpeed
	  document.getElementById("longitud_paso_dcha").innerHTML = longitudPaso_dcha.toFixed(2) + " metros"
	  // Longitud de paso Pierna derecha
	  let samplesPaso_izq = getSamplesPaso(n_HS_l, n_TO_l)
	  let longitudPaso_izq = samplesPaso_izq/100*floatSpeed
	  document.getElementById("longitud_paso_izq").innerHTML = longitudPaso_izq.toFixed(2) + " metros"
	  
	  // Longitud de zancada
	  let zancada = (n_HS_l[1] - n_HS_l[0])/100*floatSpeed
	  document.getElementById("longitud_zancada").innerHTML = zancada.toFixed(2) + " metros"
	  
	  // Tiempo de doble apoyo. Tiempo transcurrido desde que se apoya un pie (toe in), hasta que se levanta el opuesto (toe off)
	  // apoyo pie derecho -> n_HS_r
	  // levantamiento pie izquierdo:
	  var [n_TO_l, times] = getToeOff(l_rom)
	  // Buscamos la muestra de toe Off pierna izquierda, inmediatamente posterior a la primera de toe In derecha
	  let doubleSupportSamples = getDoubleSupportSamples(n_HS_r, n_TO_l)
	  let doubleSupportTime = doubleSupportSamples/100
	  document.getElementById("doubleSupport").innerHTML = doubleSupportTime.toFixed(2) + " segundos"
	  
	  // Tiempo de apoyo individual. Tiempo transcurrido desde que se levanta un pie (toe in), hasta que se apoya (toe in)   Coincide con el paso
	  // apoyo pie derecho -> n_HS_r
	  // levantamiento pie izquierdo -> n_TO_l
	  
	  // Buscamos la muestra de toe Off pierna izquierda, inmediatamente posterior a la primera de toe In derecha
	  console.log(samplesPaso_dcha)
	  let singleSupportTime = samplesPaso_dcha/100

	  document.getElementById("singleSupport").innerHTML = singleSupportTime.toFixed(2) + " segundos"
	  
	} else {
	  console.log(session_speed)
	}
	
	// calculo de la media de peso soportado durante la sesión
	let mean_load = 0;
	for (i=0; i<load.length;i++){
		mean_load = mean_load + load[i];
	}
	mean_load = Math.round(mean_load/load.length);
	
	// Añadimos datos al html. Si la sesión se ha hecho sin SW, los valores serán nulos (--)
	if (r_rom.length != 0){
		document.getElementById("l_Rom").innerHTML =  l_total_rom + "º";
		document.getElementById("l_maxRom").innerHTML =  l_max + "º";
		document.getElementById("l_minRom").innerHTML =  l_min + "º";
		document.getElementById("r_Rom").innerHTML =  r_total_rom + "º";
		document.getElementById("r_maxRom").innerHTML =  r_max + "º";
		document.getElementById("r_minRom").innerHTML =  r_min + "º";
		document.getElementById("supported_weight").innerHTML =  mean_load + "%";

	} else {
		document.getElementById("l_Rom").innerHTML =  "--";
		document.getElementById("l_maxRom").innerHTML =  "--";
		document.getElementById("l_minRom").innerHTML =  "--";
		document.getElementById("r_Rom").innerHTML =  "--";
		document.getElementById("r_maxRom").innerHTML =  "--";
		document.getElementById("r_minRom").innerHTML =  "--";
		document.getElementById("supported_weight").innerHTML =  "--";
	}

	// show modal in which the charts will be drown
	$("#modalviewsession").modal('show');

    
  }) 
  
  // Esta función se desencadena en el momento en que se muestra el modal "modalviewsession". 
  // Es necesario crear las gráficas después de mostrar el modal, y no antes, poeque sino quedarían por detrás del canvas, y no se vería nada.
  $('#modalviewsession').on('shown.bs.modal', function (event) {

      // objetos canvas html
      var ctxl = document.getElementById('l_hip_chart').getContext('2d');
      var ctxr = document.getElementById('r_hip_chart').getContext('2d');
      
	
    // opciones comunes para ambas gráficas
    var commonJointsOptions = {
      font: {
        size: 16
      },
      scales: {
        xAxes: [{
			type: 'time',
			time: {
				parser: 'mm-ss-SS',
				tooltipFormat: 'HH:mm',
				displayFormats: {
					millisecond: 'mm:ss.SSS',
					second: 'mm:ss',
					minute: 'mm'
				}
          },
		 
		  
		  
          scaleLabel: {
            fontSize: 18,
            display: true,
            labelString: 'Segundos (s)'
          },
          ticks: {
            fontSize: 18,
            autoSkip: true,
            sampleSize: 5,
            maxRotation: 0,
            minRotation: 0

          }
        }],
        yAxes: [{
          ticks: {
            max: 50,    // maximum will be 70, unless there is a lower value.
            min: -30,    // minimum will be -10, unless there is a lower value.
          },
          scaleLabel: {
            display: true,
            labelString: 'Grados (º)'
          }
        }]
      },
      maintainAspectRatio: false,
      //showLines: false, // disable for a single dataset
      animation: {
        duration: 0 // general animation time
      },
      elements: {
        line: {
          tension: 0.1 // disables bezier curves
        },
        point: {
			radius: 0
		}
        
      }
    };
  
    // Creación de ambas gráficas y especificaciuón de su configuración.
    var ctxrhipInstance = new Chart(ctxr, {
      type: 'line',
      data: {
        datasets: [{label: 'ROM',
          data: [],
          fill: false,
          borderColor: '#FF2626',
          borderWidth: 1.5,
          pointStyle: 'line'
        }],
        //labels: [total_time]
      },
      options: Object.assign({}, commonJointsOptions), 
    });
    
    var ctxlhipInstance = new Chart(ctxl, {
      type: 'line',
      data: {
        datasets: [{
          label: 'ROM',
          data: [],
          fill: false,
          borderColor: '#FF2626',
          borderWidth: 1.5,
          pointStyle: 'line'
        }],
        //labels: ['00-00-00', total_time]
      },
      options: Object.assign({}, commonJointsOptions),   
    });
    
    // se añade cada una de las muestras de rom al dataset de la gráfica destinado a ello. 
    
	
    for (i=0; i < r_rom.length ; i++){
	    // calculo de la etiqueta 'minutos:segundos:milisegundos" que dará forma al eje X.
	    var segundos = Math.trunc(i/100);
	    var milisegundos = (i/100 - segundos)*1000
	    var minutos = Math.trunc(segundos/60);
	    segundos = segundos - minutos*60; 
	    // Aseguramos que la variable milisegundos contiiene siempre 3 caracteres. 
	    if(Math.trunc(milisegundos).toString().length == 1){
		    milisegundos = '00' + milisegundos;
	    } else if (Math.trunc(milisegundos).toString().length == 2){
		    milisegundos = '0' + milisegundos;
	    } else if (Math.trunc(milisegundos).toString().length == 0){
		    milisegundos = '000';
	    }
	    var label = minutos + '-' + segundos + '-' + milisegundos;
	    
	    // Agregación de las muestras de ROM y label a los datasets de las gráfoicas
	    ctxrhipInstance.data.labels.push(label)
	    ctxrhipInstance.data.datasets[0].data.push(r_rom[i])
	    ctxlhipInstance.data.labels.push(label)
	    ctxlhipInstance.data.datasets[0].data.push(l_rom[i])
      }
      
      // Actualizaciñón de las gráficas
      ctxrhipInstance.update();
      ctxlhipInstance.update();
	
	
  }); 
	

});

var dt
var $dt
socket.on('datostabla', function(datas) {

    console.log(datas);
    

    //Creación de DataTables
    // comprobamos si la tabla ya ha sido creada. 
    if(! $.fn.DataTable.isDataTable('#sessionsList')){

		$dt = $('#sessionsList');
		dt = $dt.DataTable({
			"data": datas,
			"columns": [
				{// Se ingresa el control para agregar columnas y observar mas detalles del paciente
					"className":      'details-control', // Se
					"orderable":      false,
					"data":           null,
					"width": '4%',
					"defaultContent":  ' <i class="fas fa-plus" style="color:#325AC8;" aria-hidden="true"></i>'  //ingreso el icono de más
				},
				{"width": '4%',
				render: function(data, type, fullsessions, meta) {
				  // ACA controlamos la propiedad para des/marcar el input
				  return "<input type='checkbox'" + (fullsessions.checked ? ' checked' : '') + "/>";
				},
				orderable: false
				 },
				 {data: 'idtable_session'},
				{ data: 'date' },
				{ data: 'NombrePaciente' },
				{ data: 'ApellidoPaciente'},
				{ data: 'NumberSession'},
				{ data: 'gait_velocity'},
				{ data: 'observations'}
				],
				
		});
		
	} 
	
	
    // Cuando hacen click en el checkbox del thead
    $dt.on('change', 'thead input', function(evt) {
        let checked = this.checked;
        //let total = 0;
        let data = [];
  
        dt.data().each(function(info) {
          // ACA cambiamos el valor de la propiedad
          info.checked = checked;
          // ACA accedemos a las propiedades del objeto
         // if (info.checked) total += info.Precio;
          data.push(info);
        });
  
        dt.clear()
          .rows.add(data)
          .draw();
    });
  
    // Cuando hacen click en los checkbox del tbody SESSIONS
    $dt.on('change', 'tbody input', function() {
        let info = dt.row($(this).closest('tr')).data();
        // ACA accedemos a las propiedades del objeto
        info.checked = this.checked;
        //console.log(info.checked);
        if (this.checked){
            document.getElementById("remove_session").disabled = false;
            document.getElementById("download_sessions_config").disabled = false; 
            document.getElementById("download_session_data").disabled = false; 
            document.getElementById("view_session").disabled = false;
            
            
            var r_max = 0;
            var l_max = 0;
            var l_min = 0;
            var r_min = 0;
            var mean_load = 0;
            
            let dt = $('#sessionsList').DataTable();
			let vars = dt.data().toArray();
			let checkeds = dt.data().toArray().filter((data) => data.checked);
			console.log(checkeds[0]);
			n_session = checkeds[0].idtable_session;
			session_speed = checkeds[0].gait_velocity;
			
            
            

        }else{
            document.getElementById("remove_session").disabled = true;
            document.getElementById("download_sessions_config").disabled = true; 
            document.getElementById("download_session_data").disabled = true; 
            document.getElementById("view_session").disabled = true;
            
            
        }       
        
        
    });

    // Listener al click en detalles de cada paciente en SESSIONS
    dt.on('click', 'td.details-control', function () {
      var tr = $(this).closest('tr');
      var row = dt.row( tr );

      if (row.child.isShown() ) {
          // This row is already open - close it
          row.child.hide();
          tr.find('svg').attr('data-icon', 'plus');    // FontAwesome 5
      }
      else {
          // Open this row
          row.child( format(row.data()) ).show();
        tr.find('svg').attr('data-icon', 'minus'); // FontAwesome 5
      }
    });
})

var $pd
var pd;
socket.on('patientdata',function(datapatient){
	
	// comprobamos si la tabla ya ha sido creada. En ese caso, la borramos su contenido y añadimos las nuevas columnas.
  if(!$.fn.DataTable.isDataTable('#patientsList')){
	  $pd = $('#patientsList');
	  pd = $pd.DataTable({
		  "data": datapatient,
		  "columns": [
			  {"width": '4%',
			  render: function(data, type, fullistapacientes, meta) {
				// ACA controlamos la propiedad para des/marcar el input
				return "<input type='checkbox'" + (fullistapacientes.checked ? ' checked' : '') + "/>";
			  },
			  orderable: false
			   },
			   {data: 'idtabla_pacientes' },
			  { data: 'NombrePaciente' },
			  { data: 'ApellidoPaciente'},
			  { data: 'patiente_age'},
			  { data: 'patient_gender'},
			  { data: 'patiente_weight'},
			  { data: 'patient_height'},
			  { data: 'leg_length'},
			  { data: 'patient_active_rom'},
			  { data: 'hip_joint'},
			  { data: 'surgery'},
			  { data: 'estado_fisico'},
			  { data: 'estado_cognitivo'},
			  
			  ],
			  
		});
  } else {
	   $('#patientsList').DataTable().clear();
	   
		for (var i = 0; i < datapatient.length; i++) {	   	
		 console.log(datapatient[i])	
		 $('#patientsList').DataTable().row.add({
			'idtabla_pacientes':datapatient[i].idtabla_pacientes,
			'NombrePaciente': datapatient[i].NombrePaciente,
			'ApellidoPaciente': datapatient[i].ApellidoPaciente,
			'patiente_age': datapatient[i].patiente_age,
			'patient_gender': datapatient[i].patient_gender,
			'patiente_weight': datapatient[i].patiente_weight,
			'patient_height': datapatient[i].patient_height,
			'leg_length': datapatient[i].leg_length,
			'patient_active_rom': datapatient[i].patient_active_rom,
			'estado_fisico': datapatient[i].estado_fisico,
			'estado_cognitivo': datapatient[i].estado_cognitivo,
			'surgery': datapatient[i].surgery,
			'hip_joint': datapatient[i].hip_joint,
		  }).draw();
		}
     }
  
  



	// Cuando hacen click en los checkbox del tbody
	$pd.on('change', 'tbody input', function() {
	  let info = pd.row($(this).closest('tr')).data();
	  // ACA accedemos a las propiedades del objeto
	  info.checked = this.checked;
	  if (this.checked){
		  document.getElementById("edit_patient").disabled = false;
		  document.getElementById("remove_patient").disabled = false;
		  document.getElementById("download_list_patient").disabled = false;
	  }else{
		  document.getElementById("edit_patient").disabled = true;
		  document.getElementById("remove_patient").disabled = true;
		  document.getElementById("download_list_patient").disabled = true;
	  }
	 
  });


    //ADD PATIENT
    $('#b_add_p').on('click', function() {
      let patfname = document.getElementById("FNPatient").value;
      let patlname = document.getElementById("LNPatient").value;
      let patage= document.getElementById("AgePatient").value;
      let patweight = document.getElementById("WeightPatient").value;
      let patleglength = document.getElementById("LLPatient").value;
      let pathipjoint = document.getElementById("hip_joint").value;
      let patsurgery = document.getElementById("surgery").value;
      let patestadofisico = document.getElementById("estado_fisico").value;
      let patestadocognitivo = document.getElementById("estado_cognitivo").value;
      let patheight = document.getElementById("HeightPatient").value;
      let patmaxActiveRom = document.getElementById("activeRom").value;
      let patgender = document.getElementById("gender").value;
      socket.emit('insertPatient',[patfname, patlname, patage, patweight, patleglength, patestadofisico, patestadocognitivo, patsurgery, pathipjoint, patheight, patmaxActiveRom, patgender]);
      //location.reload(true);
      console.log("hola add patient");
      
      // refresh database to rewrite datatables
      socket.emit('refreshlist');
      
    });

        //  suscribimos un listener al click del boton remove
    $('#b_delete_p').on('click', function() {
        let dt = $('#patientsList').DataTable();
        let vars = dt.data().toArray();
        let checkeds = dt.data().toArray().filter((data) => data.checked);

        for (i = 0; i < vars.length; i++) {
            if (checkeds[0].idtabla_pacientes == vars[i].idtabla_pacientes){
              console.log(i);
              var indexrow = i;
            };
        };
        dt.row(indexrow).remove().draw();
        socket.emit('deleted_patient',checkeds[0].idtabla_pacientes);
    });

    $('#b_download_p').on('click', function() {
      socket.emit('download_patients');
      window.open('http://192.168.43.1:3000/downloadpatients');
    });


    $('#edit_patient').on('click', function() {
      let dt = $('#patientsList').DataTable();
      let vars = dt.data().toArray();
      let checkeds = dt.data().toArray().filter((data) => data.checked);

      for (i = 0; i < vars.length; i++) {
          if (checkeds[0].idtabla_pacientes == vars[i].idtabla_pacientes){
            console.log(i);
            var indexrow = i;
            console.log(checkeds[0].idtabla_pacientes);
          };
      };
      document.getElementById("editFNPatient").value = checkeds[0].NombrePaciente ;
      document.getElementById("editLNPatient").value =  checkeds[0].ApellidoPaciente;
      document.getElementById("editAgePatient").value =  checkeds[0].patiente_age;
      document.getElementById("editWeightPatient").value =  checkeds[0].patiente_weight;
      document.getElementById("editLLPatient").value =  checkeds[0].leg_length;
      document.getElementById("edithip_joint").value =  checkeds[0].hip_joint;
      document.getElementById("editsurgery").value =  checkeds[0].surgery;
      document.getElementById("editestado_fisico").value =  checkeds[0].estado_fisico;
      document.getElementById("editestado_cognitivo").value =  checkeds[0].estado_cognitivo;
      document.getElementById("editHeightPatient").value =  checkeds[0].patient_height;
      document.getElementById("editActiveRom").value =  checkeds[0].patient_active_rom;
      document.getElementById("editGender").value =  checkeds[0].patient_gender;
 
    })

    $('#b_edit_p').on('click', function() {
      let dt = $('#patientsList').DataTable();
      let vars = dt.data().toArray();
      let checkeds = dt.data().toArray().filter((data) => data.checked);
		console.log(checkeds[0])
      for (i = 0; i < vars.length; i++) {
          if (checkeds[0].idtabla_pacientes == vars[i].idtabla_pacientes){
            console.log(i);
            var indexrow = i;
            console.log(checkeds[0].idtabla_pacientes);
          };
      };
      
      checkeds[0].NombrePaciente = document.getElementById("editFNPatient").value;
      checkeds[0].ApellidoPaciente = document.getElementById("editLNPatient").value;
      checkeds[0].patiente_age = document.getElementById("editAgePatient").value;
      checkeds[0].patiente_weight = document.getElementById("editWeightPatient").value;
      checkeds[0].leg_length = document.getElementById("editLLPatient").value;
      checkeds[0].hip_joint = document.getElementById("edithip_joint").value;
      checkeds[0].surgery = document.getElementById("editsurgery").value;
      checkeds[0].estado_fisico = document.getElementById("editestado_fisico").value;
      checkeds[0].estado_cognitivo = document.getElementById("editestado_cognitivo").value;
      checkeds[0].patient_height = document.getElementById("editHeightPatient").value;
      checkeds[0].patient_gender = document.getElementById("editGender").value;
      checkeds[0].max_active_rom = document.getElementById("editActiveRom").value;
      

      dt.row(indexrow).remove().draw();
      $('#patientsList').DataTable().row.add({
        'idtabla_pacientes':checkeds[0].idtabla_pacientes,
        'NombrePaciente': checkeds[0].NombrePaciente,
        'ApellidoPaciente': checkeds[0].ApellidoPaciente,
        'patiente_age': checkeds[0].patiente_age,
        'patient_gender': checkeds[0].patient_gender,
	    'patiente_weight': checkeds[0].patiente_weight,
	    'patient_height': checkeds[0].patient_height,
	    'leg_length': checkeds[0].leg_length,
	    'patient_active_rom': checkeds[0].patient_active_rom,
        'estado_fisico': checkeds[0].estado_fisico,
        'estado_cognitivo': checkeds[0].estado_cognitivo,
        'surgery': checkeds[0].surgery,
        'hip_joint': checkeds[0].hip_joint,
      }).draw();
      
      console.log(checkeds[0])
      socket.emit('edit_patient',checkeds[0]);
    });


})

var $td
var td
socket.on('therapistdata',function(datatherapist){
  console.log(datatherapist);

  if(! $.fn.DataTable.isDataTable('#therapistList')){
	$td = $('#therapistList');
	  td = $td.DataTable({
		  "data": datatherapist,
		  "columns": [
			  {"width": '4%',
			  render: function(data, type, fullistater, meta) {
				// ACA controlamos la propiedad para des/marcar el input
				return "<input type='checkbox'" + (fullistater.checked ? ' checked' : '') + "/>";
			  },
			  orderable: false
			   },
			  { data: 'NombreTerapeuta' },
			  { data: 'ApellidoTerapeuta'},
			  { data: 'Centro'},
			  ],

	  });
  }
  




  // Cuando hacen click en los checkbox del tbody
  $td.on('change', 'tbody input', function() {
  let info = td.row($(this).closest('tr')).data();
  // ACA accedemos a las propiedades del objeto
  info.checked = this.checked;
      if (this.checked){
          document.getElementById("edit_therapist").disabled = false;
          document.getElementById("remove_therapist").disabled = false;
          //document.getElementById("download_list_therapist").disabled = false;
      }else{
          document.getElementById("edit_therapist").disabled = true;
          document.getElementById("remove_therapist").disabled = true;

      }
  
  });
  
  //ADD THERAPIST
  $('#b_add_t').on('click', function() {
      let therfname = document.getElementById("FNTherapist").value;
      let therlname = document.getElementById("LNTherapist").value;
      let center = document.getElementById("Center").value;
      console.log(therfname);
      socket.emit('insertTherapist',[therfname, therlname, center]);
      $('#therapistList').DataTable().row.add({
          'NombreTerapeuta': therfname,
          'ApellidoTerapeuta': therlname,
          'Centro': center,
      }).draw();
  });
  
  //  DELET THERAPIST
  $('#b_delete_t').on('click', function() {
    let dt = $('#therapistList').DataTable();
    let vars = dt.data().toArray();
    let checkeds = dt.data().toArray().filter((data) => data.checked);

    for (i = 0; i < vars.length; i++) {
        if (checkeds[0].idtabla_terapeutas == vars[i].idtabla_terapeutas){
          console.log(i);
          var indexrow = i;
        };
    };
    dt.row(indexrow).remove().draw();
    socket.emit('deleted_therapist',checkeds[0].idtabla_terapeutas);
  });

  $('#edit_therapist').on('click', function() {
    let dt = $('#therapistList').DataTable();
    let vars = dt.data().toArray();
    let checkeds = dt.data().toArray().filter((data) => data.checked);

    for (i = 0; i < vars.length; i++) {
        if (checkeds[0].idtabla_terapeutas == vars[i].idtabla_terapeutas){
          console.log(i);
          var indexrow = i;
          console.log(checkeds[0].idtabla_terapeutas);
        };
    };
    document.getElementById("editFNTherapist").value = checkeds[0].NombreTerapeuta ;
    document.getElementById("editLNTherapist").value =  checkeds[0].ApellidoTerapeuta;
    document.getElementById("editCenter").value =  checkeds[0].Centro;
  })

  $('#b_edit_t').on('click', function() {
    let dt = $('#therapistList').DataTable();
    let vars = dt.data().toArray();
    let checkeds = dt.data().toArray().filter((data) => data.checked);

    for (i = 0; i < vars.length; i++) {
        if (checkeds[0].idtabla_terapeutas == vars[i].idtabla_terapeutas){
          console.log(i);
          var indexrow = i;
          console.log(checkeds[0].idtabla_terapeutas);
        };
    };
    
    checkeds[0].NombreTerapeuta = document.getElementById("editFNTherapist").value;
    checkeds[0].ApellidoTerapeuta = document.getElementById("editLNTherapist").value;
    checkeds[0].Centro = document.getElementById("editCenter").value;

    dt.row(indexrow).remove().draw();
    $('#therapistList').DataTable().row.add({
      'NombreTerapeuta': checkeds[0].NombreTerapeuta,
      'ApellidoTerapeuta': checkeds[0].ApellidoTerapeuta,
      'Centro': checkeds[0].Centro
    }).draw();
    
    socket.emit('edit_therapist',checkeds[0]);
  });


  $('#b_download_t').on('click', function() {
    socket.emit('download_therapist');
    window.open('http://192.168.43.1:3000/downloadtherapists');
  });

  //  DELET SESSION
  $('#b_delete_s').on('click', function() {
    let dt = $('#sessionsList').DataTable();
    let vars = dt.data().toArray();
    let checkeds = dt.data().toArray().filter((data) => data.checked);
    for (i = 0; i < vars.length; i++) {
        if (checkeds[0].idtable_session == vars[i].idtable_session){
          console.log(i);
          var indexrow = i;
        };
    };
    console.log()
    dt.row(indexrow).remove().draw();
    socket.emit('deleted_session',checkeds[0].idtable_session);
  });

  // DOWNLOAD DATA SESSION
  $('#b_download_s_data').on('click', function() {
    console.log("Download Data")
    let dt = $('#sessionsList').DataTable();
    let vars = dt.data().toArray();
    let checkeds = dt.data().toArray().filter((data) => data.checked);

    for (i = 0; i < vars.length; i++) {
        if (checkeds[0].idtable_session == vars[i].idtable_session){
          console.log(i);
          console.log(checkeds[0].idtable_session);
          socket.emit('download_sessions_data', (checkeds[0].idtable_session));
        };
    };
    
  })
  
  // DOWNLOAD DATA SESSION
  $('#b_download_all_s_data').on('click', function() {
    console.log("Download  all Data Sessions")
    socket.emit('download_all_sessions_data');
    
    
  })

  socket.on('open_download_sessions_link',function(idsesion){
    window.open('http://192.168.43.1:3000/downloadsessionsdata');
  });
  socket.on('open_download_all_sessions_link',function(idsesion){
    window.open('http://192.168.43.1:3000/downloadallsessionsdata');
  });

  $('#b_download_s_conf').on('click', function() {
    socket.emit('download_sessions_config');
    window.open('http://192.168.43.1:3000/downloadsessionsconfig');
  });

  

})


$(document).ready(function() {
    //Asegurate que el id que le diste a la tabla sea igual al texto despues del simbolo #
  });
  
  
/////////////////////       FUNCIONES RESUMEN ROM       /////////////////////
function getToeIn(signal){
  steps = 0
  n_samples = [];
  for (i=1; i < signal.length -1; i++){
    // pierna derecha
    if(signal[i] > signal[i-1]){
      if(signal[i] > signal[i+1]){
      // this is a maximum
      steps = steps + 1
      n_samples.push(i)
      }
    }
  }
  
  return [n_samples, steps]
  
}

function getToeOff(signal){
  steps = 0
  n_samples = [];
  for (i=1; i < signal.length -1; i++){
    // pierna derecha
    if(signal[i] < signal[i-1]){
      if(signal[i] < signal[i+1]){
      // this is a maximum
      steps = steps + 1
      n_samples.push(i)
      }
    }
  }
  return [n_samples, steps]
}

function getDoubleSupportSamples(ToeIn_array, ToeOff_array){
  ToeIn = ToeIn_array[0]
  for (sample in ToeOff_array){
    if(ToeOff_array[sample] > ToeIn){
      var samples = ToeOff_array[sample]-ToeIn;
      break
    }
  }
  return samples
}

function getSamplesPaso(ToeIn_array, ToeOff_array){
  ToeOff = ToeOff_array[0]
  for (sample in ToeIn_array){
    if(ToeIn_array[sample] > ToeOff){
      var samples = ToeIn_array[sample]-ToeOff;
      break
    }
  }
  return samples
}

