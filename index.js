
const path = require('path'); // Modulo de nodejs para trabajar con rutas
const express = require('express'); // Configurar express
const fs = require('fs'); //  File System module
const net = require('net');
const PLOTSAMPLINGTIME = 100; //ms
const VRSAMPLINGRATE = 50;
const swBluetoothName = 'RNBT-4CEE';
const BluetoothClassicSerialportClient = require('bluetooth-classic-serialport-client');
const serial_swalker = new BluetoothClassicSerialportClient();

// Relative configuration file path:
var therapyConfigPath = path.join(__dirname, 'config','therapySettings.json');

//////////////////////////////
////////** SWalker**//////////
//////////////////////////////
var is_swalker_connected = false;
var speed_char = 's';
var direction_char = 's';
var global_patient_weight = 1;
var patient_leg_length = 0;
var counter = 0;
// Testing vars
var test_rom_right_vector = [36.5585, 36.5259, 36.4962, 36.4689, 36.4408, 36.3909, 36.335, 36.271, 36.1943, 36.0842, 35.9539, 35.8015, 35.6229, 35.3996, 35.1472, 34.8671, 34.5588, 34.2085, 33.8337, 33.4375, 33.021, 32.5716, 32.1055, 31.6253, 31.1309, 30.6092, 30.0759, 29.5333, 28.982, 28.4101, 27.8326, 27.2519, 26.6686, 26.0712, 25.4745, 24.881, 24.2907, 23.6928, 23.0991, 22.5103, 21.9251, 21.3314, 20.7416, 20.1566, 19.576, 18.9904, 18.4092, 17.8328, 17.26, 16.6806, 16.1042, 15.5317, 14.9625, 14.3888, 13.8194, 13.2551, 12.6957, 12.1344, 11.5788, 11.0296, 10.4863, 9.943, 9.4059, 8.8751, 8.35, 7.8256, 7.307, 6.7943, 6.2873, 5.782, 5.2825, 4.789, 4.3013, 3.8162, 3.3365, 2.8623, 2.3931, 1.9264, 1.4649, 1.0089, 0.55876, 0.11339, -0.32492, -0.75545, -1.1777, -1.592, -1.9966, -2.3906, -2.7733, -3.1449, -3.503, -3.8462, -4.1732, -4.483, -4.7732, -5.0422, -5.2883, -5.5107, -5.7056, -5.8703, -6.0025, -6.1013, -6.1635, -6.1873, -6.1715, -6.117, -6.0199, -5.8784, -5.691, -5.4588, -5.1776, -4.8459, -4.4624, -4.0296, -3.5434, -3.0028, -2.408, -1.7637, -1.0667, -0.31824, 0.47919, 1.3179, 2.1989, 3.1186, 4.0724, 5.0499, 6.0517, 7.0737, 8.1109, 9.1527, 10.2008, 11.2518, 12.3017, 13.3403, 14.3718, 15.3946, 16.4062, 17.397, 18.3728, 19.3328, 20.2749, 21.189, 22.0824, 22.9548, 23.805, 24.6222, 25.4163, 26.1884, 26.9377, 27.6538, 28.3466, 29.0165, 29.6621, 30.2707, 30.8549, 31.416, 31.9538, 32.4557, 32.9354, 33.3942, 33.8315, 34.2332, 34.613, 34.9714, 35.3072, 35.6047, 35.8803, 36.136, 36.3716, 36.5725, 36.7541, 36.9172, 37.0604, 37.1663, 37.2525, 37.3207, 37.3704, 37.3856, 37.3845, 37.3695, 37.3407, 37.2817, 37.2124, 37.1364, 37.0547, 36.9514, 36.8478, 36.7477, 36.6527, 36.5465, 36.4502, 36.367, 36.2969, 36.2222, 36.1618, 36.1168, 36.085, 36.046, 36.0174, 35.9986, 35.9863];
var test_rom_left_vector = [36.5585, 36.5259, 36.4962, 36.4689, 36.4408, 36.3909, 36.335, 36.271, 36.1943, 36.0842, 35.9539, 35.8015, 35.6229, 35.3996, 35.1472, 34.8671, 34.5588, 34.2085, 33.8337, 33.4375, 33.021, 32.5716, 32.1055, 31.6253, 31.1309, 30.6092, 30.0759, 29.5333, 28.982, 28.4101, 27.8326, 27.2519, 26.6686, 26.0712, 25.4745, 24.881, 24.2907, 23.6928, 23.0991, 22.5103, 21.9251, 21.3314, 20.7416, 20.1566, 19.576, 18.9904, 18.4092, 17.8328, 17.26, 16.6806, 16.1042, 15.5317, 14.9625, 14.3888, 13.8194, 13.2551, 12.6957, 12.1344, 11.5788, 11.0296, 10.4863, 9.943, 9.4059, 8.8751, 8.35, 7.8256, 7.307, 6.7943, 6.2873, 5.782, 5.2825, 4.789, 4.3013, 3.8162, 3.3365, 2.8623, 2.3931, 1.9264, 1.4649, 1.0089, 0.55876, 0.11339, -0.32492, -0.75545, -1.1777, -1.592, -1.9966, -2.3906, -2.7733, -3.1449, -3.503, -3.8462, -4.1732, -4.483, -4.7732, -5.0422, -5.2883, -5.5107, -5.7056, -5.8703, -6.0025, -6.1013, -6.1635, -6.1873, -6.1715, -6.117, -6.0199, -5.8784, -5.691, -5.4588, -5.1776, -4.8459, -4.4624, -4.0296, -3.5434, -3.0028, -2.408, -1.7637, -1.0667, -0.31824, 0.47919, 1.3179, 2.1989, 3.1186, 4.0724, 5.0499, 6.0517, 7.0737, 8.1109, 9.1527, 10.2008, 11.2518, 12.3017, 13.3403, 14.3718, 15.3946, 16.4062, 17.397, 18.3728, 19.3328, 20.2749, 21.189, 22.0824, 22.9548, 23.805, 24.6222, 25.4163, 26.1884, 26.9377, 27.6538, 28.3466, 29.0165, 29.6621, 30.2707, 30.8549, 31.416, 31.9538, 32.4557, 32.9354, 33.3942, 33.8315, 34.2332, 34.613, 34.9714, 35.3072, 35.6047, 35.8803, 36.136, 36.3716, 36.5725, 36.7541, 36.9172, 37.0604, 37.1663, 37.2525, 37.3207, 37.3704, 37.3856, 37.3845, 37.3695, 37.3407, 37.2817, 37.2124, 37.1364, 37.0547, 36.9514, 36.8478, 36.7477, 36.6527, 36.5465, 36.4502, 36.367, 36.2969, 36.2222, 36.1618, 36.1168, 36.085, 36.046, 36.0174, 35.9986, 35.9863];
var test_load_vector = [36.5585, 36.5259, 36.4962, 36.4689, 36.4408, 36.3909, 36.335, 36.271, 36.1943, 36.0842, 35.9539, 35.8015, 35.6229, 35.3996, 35.1472, 34.8671, 34.5588, 34.2085, 33.8337, 33.4375, 33.021, 32.5716, 32.1055, 31.6253, 31.1309, 30.6092, 30.0759, 29.5333, 28.982, 28.4101, 27.8326, 27.2519, 26.6686, 26.0712, 25.4745, 24.881, 24.2907, 23.6928, 23.0991, 22.5103, 21.9251, 21.3314, 20.7416, 20.1566, 19.576, 18.9904, 18.4092, 17.8328, 17.26, 16.6806, 16.1042, 15.5317, 14.9625, 14.3888, 13.8194, 13.2551, 12.6957, 12.1344, 11.5788, 11.0296, 10.4863, 9.943, 9.4059, 8.8751, 8.35, 7.8256, 7.307, 6.7943, 6.2873, 5.782, 5.2825, 4.789, 4.3013, 3.8162, 3.3365, 2.8623, 2.3931, 1.9264, 1.4649, 1.0089, 0.55876, 0.11339, -0.32492, -0.75545, -1.1777, -1.592, -1.9966, -2.3906, -2.7733, -3.1449, -3.503, -3.8462, -4.1732, -4.483, -4.7732, -5.0422, -5.2883, -5.5107, -5.7056, -5.8703, -6.0025, -6.1013, -6.1635, -6.1873, -6.1715, -6.117, -6.0199, -5.8784, -5.691, -5.4588, -5.1776, -4.8459, -4.4624, -4.0296, -3.5434, -3.0028, -2.408, -1.7637, -1.0667, -0.31824, 0.47919, 1.3179, 2.1989, 3.1186, 4.0724, 5.0499, 6.0517, 7.0737, 8.1109, 9.1527, 10.2008, 11.2518, 12.3017, 13.3403, 14.3718, 15.3946, 16.4062, 17.397, 18.3728, 19.3328, 20.2749, 21.189, 22.0824, 22.9548, 23.805, 24.6222, 25.4163, 26.1884, 26.9377, 27.6538, 28.3466, 29.0165, 29.6621, 30.2707, 30.8549, 31.416, 31.9538, 32.4557, 32.9354, 33.3942, 33.8315, 34.2332, 34.613, 34.9714, 35.3072, 35.6047, 35.8803, 36.136, 36.3716, 36.5725, 36.7541, 36.9172, 37.0604, 37.1663, 37.2525, 37.3207, 37.3704, 37.3856, 37.3845, 37.3695, 37.3407, 37.2817, 37.2124, 37.1364, 37.0547, 36.9514, 36.8478, 36.7477, 36.6527, 36.5465, 36.4502, 36.367, 36.2969, 36.2222, 36.1618, 36.1168, 36.085, 36.046, 36.0174, 35.9986, 35.9863];
var i_test_rom_r = 0;
var i_test_rom_l = Math.trunc(test_rom_left_vector.length/2);

// vars of recorded therapy data
var record_therapy = false;
var time_stamp_vector = [];
var therapy_speed = 's';
// vars used to imus storage
var is_first_data = [true, true, true, true];   //sw, imu1, imu2, imu3
var is_imu1_connected = false;
// vars used for swalker data storage
var rom_left_vector = []
var rom_right_vector = []
var load_vector = []
var direction_vector = [];
// vars used for the swalker data reception
var rom_left =0; 
var rom_right= 0; 
var load = 0;
var ascii_msg;
// vars used for SW calibration
var rom_left_calibration = 0
var rom_right_calibration = 0;
var is_calibrated = false;
// session vars
var load_session_rom_right = [];
var load_session_rom_left = [];
var load_session_weight_gauge = [];
var load_session_rom_right_objects = [];
var load_session_rom_left_objects = [];
var load_session_weight_gauge_objects = [];

var lasthex_sw = "";
// SWalker data reception (bt)
serial_swalker.on('data', function(data){ 
	
    ascii_msg = hex2a_general(data, lasthex_sw, is_first_data[0]);
    let msg_list_sw = ascii_msg[0];
    is_first_data[0] = ascii_msg[1];
    for(i=0; i < msg_list_sw.length; i++){
		
		if(msg_list_sw[i].includes("=") & msg_list_sw[i].includes(',')){
			let data_vector = msg_list_sw[i].split('=')[1].split(',');
		//	console.log(data_vector);
			if(data_vector.length == 4){	
				// Data storage
				
				rom_left = parseFloat(data_vector[2]);
			//	console.log(rom_left)
					rom_right = parseFloat(data_vector[1]);
				load = parseFloat(data_vector[0]);
				lasthex_sw = "";
				
				if (record_therapy){
					if(! is_delsys_connected){
						// swalker data
						rom_left_vector.push(parseFloat(rom_left-rom_left_calibration));
						rom_right_vector.push(parseFloat(rom_right-rom_right_calibration));
						load_vector.push(((parseFloat(load)/global_patient_weight)*100).toFixed(2));
						time_stamp_vector.push(Date.now());
						direction_vector.push(direction_char);
					}
				}
						
				// store the data message into "dcm_msgData" variable, which will be sent to the client socket games.
				let sw_msgData = "#" + msg_list_sw[i];	
				//console.log(sw_msgData);
				
			} else {
				lasthex_sw = '#' + msg_list_sw[i]
			}
		} else {
			lasthex_sw = '#' + msg_list_sw[i]
		}
				
	}
}); 

serial_swalker.on('closed', function(){
	console.log("connection closed");  
	sockets['websocket'].emit('monitoring:connection_status',{
		 device: "sw",
		 status:3
	})
	disconnect_bt_device(sockets['websocket'], serial_swalker, is_swalker_connected, "sw")

})

////////////////////////////////////
//** DELSYS TRIGNO WIRELESS EMG **//
//////////////////////(/////////////
// The webserver is connected to a EMG Delsys device that streams
// the emg data from the 8 sensors.

const client_delsys_start = new net.Socket();
const client_delsys_data = new net.Socket();
const DELSYS_PC_IP = '192.168.43.9';
const DELSYS_START_PORT = 30000;
const DELSYS_DATA_PORT = 30002;
var is_delsys_connected = false;
var emg_msg = "";    // var sent to therapy_monitoring.js
//var emg_binary_activation_vector = [];
//var emg_activity_vector = [];
var envelope_emg = []

var received_data = "";
client_delsys_data.on('data', function(data) {
    var datos = data.toString();
    var msg_data = false;
    for (let index = 0; index < datos.length; index++) {
        msg_data = true;
		if(msg_data){
            received_data = received_data + datos.charAt(index);
            if (datos.charAt(index) == '}') {
                emg_msg = received_data;
		envelope_emg = JSON.parse(emg_msg).envelope_emg
                //console.log(JSON.parse(emg_msg).envelope_emg)
                received_data = "";
            }
        }
    }
});

// ACCelerometer data dELSYS 
const client_delsys_acc = new net.Socket();
const delsys_acc_port = 50042;
var tibiaR_accX_vector = [];
var tibiaL_accX_vector = [];
var tibiaR_accX = 0
var tibiaL_accX = 0;
var index_channel = 1;

var acc_all_data = [];
var s1_accX_ = 0;
var s1_accY = 0;
var s1_accZ = 0;
var s2_accX_ = 0;
var s2_accY = 0;
var s2_accZ = 0;
var s3_accX_ = 0;
var s3_accY = 0;
var s3_accZ = 0;
var s4_accX_ = 0;
var s4_accY = 0;
var s4_accZ = 0;
var s5_accX_ = 0;
var s5_accY = 0;
var s5_accZ = 0;
var s6_accX_ = 0;
var s6_accY = 0;
var s6_accZ = 0;
var s7_accX_ = 0;
var s7_accY = 0;
var s7_accZ = 0;
var s8_accX_ = 0;
var s8_accY = 0;
var s8_accZ = 0;

client_delsys_acc.on('data', function(msg) {
    var len = Buffer.byteLength(msg)
    index_channel = decodeFloat(msg, index_channel);
    
    if (record_therapy){
		// Almacenamos los datos en una lista, que posteriormente será volcada en la base de datos.    //148 hz
		time_stamp_vector.push(Date.now());
		//emg_activity_vector.push(JSON.parse(emg_msg).emg);
		//emg_binary_activation_vector.push(JSON.parse(emg_msg).binary_activation_values);

		// acc
		tibiaR_accX_vector.push(tibiaR_accX)
		tibiaL_accX_vector.push(tibiaL_accX)
		
		// swalker data    (si ni está conectado, se almacenarán 0s)
		rom_left_vector.push(parseFloat(rom_left-rom_left_calibration));
		rom_right_vector.push(parseFloat(rom_right-rom_right_calibration));
		load_vector.push(((parseFloat(load)/global_patient_weight)*100).toFixed(2));
		direction_vector.push(direction_char);
		
		// acc
		acc_all_data.push([s1_accX, s1_accY, s1_accZ, s2_accX, s2_accY, s2_accZ, s3_accX, s3_accY, s3_accZ, s4_accX, s4_accY, s4_accZ, s5_accX, s5_accY, s5_accZ, s6_accX, s6_accY, s6_accZ,s7_accX, s7_accY, s7_accZ, s8_accX, s8_accY, s8_accZ])
				    
	}
    
});

////////////////////////////////////////
/////  VR OQULUS QUEST  ENVIRONMENTS ///
////////////////////////////////////////
var sockets = Object.create(null);
var udpServer_VR = net.createServer();
udpServer_VR.listen(41235);
console.log("listening on server 41235 - VR");
var is_client_connected = false;
var vr_ready = false; 

fs.readFile(therapyConfigPath, (err, data) => {
    if (err) throw err;
    var config = JSON.parse(data);
    console.log(config)
    patient_leg_length = config.leg_length;
});


udpServer_VR.on('connection', function(socket){
	socket.nickname = "conVR";
	var clientname = socket.nickname;
	sockets[clientname] = socket;
	
	 socket.emit('monitoring:connection_status',{
		device: "vr",
		status:0});
               
	//nos aseguramos que se calibra al conectar la gafa
	is_calibrated = false;
	configureStartPos()

	console.log('There is a new connection !!');
	is_client_connected = true;
	socket.on('data',function(data){
	//	console.log(data.toString());
		if (data.toString() == "#ready"){
			
		
			var timer = setInterval(function () {
                                
				if(is_client_connected){
					if( is_calibrated){
			                
						//is_swalker_connected = true;
                        if(envelope_emg.length == 0){
						//	envelope_emg =[0,0,0,0,0,0,0,0];
                        }                       //is_swalker_connected = true;
						//rom_right = 0
						//rom_left = 0
						if(is_swalker_connected){
							//var json_msg = {rom: [(rom_right-parseFloat(rom_right_calibration)), (rom_left-parseFloat(rom_left_calibration))], leg: parseInt(patient_leg_length)}
						        var msg = ((rom_right-parseFloat(rom_right_calibration)).toFixed(2)).toString() + "|" + ((rom_left-parseFloat(rom_left_calibration)).toFixed(2)).toString() + "|" + patient_leg_length.toString() + "|" 
 							
// console.log(json_msg)
                                                        socket.write(msg)
							//socket.write(JSON.stringify(json_msg))
						}
					}
				} else{
					clearInterval(timer)
				}
			}, VRSAMPLINGRATE);
	   }
	});
	socket.on('error', function(ex) {
		console.log(ex);
		is_client_connected = false;
		 socket.emit('monitoring:connection_status',{
               device: "vr",
               status:1});
	});
	socket.on('end', function() {
		console.log('VR data ended');
		is_client_connected = false
		 socket.emit('monitoring:connection_status',{
               device: "vr",
               status:1});
	});
	socket.on('close', function() {
		console.log('VR data closed');
		is_client_connected = false;
		 socket.emit('monitoring:connection_status',{
               device: "vr",
               status:1});
	});
});




/////////////////////////////////
//** Webserver configuration **//
/////////////////////////////////
//
// Express initialization SWalker
const app = express();
app.set('port', process.env.PORT || 3000)
// Send static files
app.use(express.static(path.join(__dirname, 'public')));
// Configure PORT of the web
const server = app.listen(app.get('port'), () => {
    console.log('Server', app.get('port'));
})

/////////////////////////////////
//** Socket io configuration **//
/////////////////////////////////
// Socket io is the javascript library used for the
// realtime, bi-directional communication between web
// clients and servers.
//
// Give the server to socketio
const SocketIO = require('socket.io');
const io = SocketIO(server);

////////////////////////////////
//** Database configuration **//
////////////////////////////////
//
var mysql = require('mysql');

////////////////////////////////////
//** Export .xlsx configuration **//
////////////////////////////////////
//
const ExcelJS = require('exceljs');
const { parse } = require('path');
// Identificators database files 
var data_session_id;

///////////////////////////////////////
//*** Server-Client communication ***//
///////////////////////////////////////
//
//Connect with DataBase CPW_DB
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "swdb",
    multipleStatements: true
});

// Websockets
io.on('connection', (socket) => {
    console.log('new connection', socket.id);
    sockets['websocket'] = socket;
    
    var datitos=[];

    // ***** SW DATABASE INTERACTIONS
    socket.on('refreshlist',function() {
        console.log("Connected!");
        console.log("Connected Sessions!");
        var sql = "SELECT * FROM tabla_sesion JOIN tabla_pacientes ON tabla_sesion.idPaciente = tabla_pacientes.idtabla_pacientes";
        con.query(sql, function (err, sessions_data) {
            if (err) throw err;
            socket.emit('datostabla', sessions_data);   //session_data --- datos de las sesiones (configuraciones)
        });
        console.log("Connected Patient!");
        var sql = "SELECT * FROM tabla_pacientes";
        con.query(sql, function (err, patients_list) {
            if (err) throw err;
            socket.emit('patientdata', patients_list);  //patients_list ----- lista de pacientes(id-nombre-apellido)
        });
        console.log("Connected Therapist!");
        var sql = "SELECT * FROM tabla_terapeutas";
        con.query(sql, function (err, therapist_list) {
            if (err) throw err;
            socket.emit('therapistdata', therapist_list);     //therapist_list ---- Lista de Terapeutas, id-nombre-apellido-centro
        });
        var sql = "SELECT * FROM data_sessions";
        con.query(sql, function (err, datasessions_list) {
            if (err) throw err;
            socket.emit('datasessions', datasessions_list);    
        });
        
        
    })

    //DELETE PATIENT DATABASE
    socket.on('deleted_patient', function(iddeleted) {
        var sql = "DELETE FROM tabla_pacientes WHERE idtabla_pacientes="+iddeleted;
        con.query(sql, function (err, result) {
            console.log("Deleted Patient");
        });
    });

    //EDIT PATIENT DATABASE
    socket.on('edit_patient', function(editpat) {
		console.log(editpat)
        var sql = 'UPDATE tabla_pacientes SET NombrePaciente = ?, ApellidoPaciente = ?, patiente_age = ?, patiente_weight = ?, leg_length = ?, estado_fisico = ?, estado_cognitivo = ?, surgery = ?, hip_joint = ?, patient_height = ?, patient_active_rom = ?, patient_gender = ?  WHERE (idtabla_pacientes=?)'
        con.query(sql,[editpat.NombrePaciente,editpat.ApellidoPaciente,editpat.patiente_age, editpat.patiente_weight, editpat.leg_length, editpat.estado_fisico, editpat.estado_cognitivo, editpat.surgery, editpat.hip_joint, editpat.patient_height, editpat.patient_active_rom, editpat.patient_gender, editpat.idtabla_pacientes], function (err, result) {
            console.log("Edited Patient");
        });
    });
    // ADD PATIENT IN DATABASE
    socket.on('insertPatient', function(patient) {
        var sql = "INSERT INTO tabla_pacientes (NombrePaciente, ApellidoPaciente, patiente_age, patiente_weight, leg_length, estado_fisico, estado_cognitivo, surgery, hip_joint, patient_height, patient_active_rom, patient_gender) VALUES (?)";
        con.query(sql,[patient], function (err, result) {
            if (err) throw err;
            console.log("1 record Patient");
        });
    });

    //DOWNLOAD PATIENT LIST (DATABASE)
    socket.on('download_patients',function(res){
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');
        worksheet.columns = [
            { header: 'Id Patient', key: 'idtabla_pacientes', width: 10 },
            { header: 'First Name', key: 'NombrePaciente', width: 10 },
            { header: 'Last Name', key: 'ApellidoPaciente', width: 10 },
            { header: 'Gender', key: 'patient_gender', width: 10 },
            { header: 'Age', key: 'patiente_age', width: 10 },
            { header: 'Weight (kg)', key: 'patiente_weight', width: 10 },
            { header: 'Height (cm)', key: 'patient_height', width: 10 },
            { header: 'Leg Lenth (cm)', key: 'leg_length', width: 10 },
            { header: 'Max Active ROM (º)', key: 'patient_active_rom', width: 10 },
            { header: 'Physical Status', key: 'estado_fisico', width: 10 },
            { header: 'Cognitive Status', key: 'estado_cognitivo', width: 10 },
            { header: 'Type of Surgery', key: 'surgery', width: 10 },
            { header: 'Affected Hip Joint', key: 'hip_joint', width: 10 }
        ];
        var sql = "SELECT * FROM tabla_pacientes";
        con.query(sql, function (err, patients_list) {
            if (err) throw err;
            datitos=patients_list;
                for (var i = 0; i < patients_list.length; i++) {
                    worksheet.addRow((patients_list[i]));
                }
            workbook.xlsx.writeFile("Patients_DB.xlsx");
        });
    })

    // ADD THERAPIST IN DATABASE
    socket.on('insertTherapist', function(therapist) {
        var sql = "INSERT INTO tabla_terapeutas (NombreTerapeuta, ApellidoTerapeuta, Centro) VALUES (?)";
        con.query(sql,[therapist], function (err, result) {
            if (err) throw err;
            console.log("1 record Therapist");
        });
    });

    //EDIT THERAPIST DATABASE
    socket.on('edit_therapist', function(editpat) {
        var sql = 'UPDATE tabla_terapeutas SET NombreTerapeuta = ?, ApellidoTerapeuta = ?, Centro = ?  WHERE (idtabla_terapeutas=?)'
        con.query(sql,[editpat.NombreTerapeuta,editpat.ApellidoTerapeuta, editpat.Centro,editpat.idtabla_terapeutas], function (err, result) {
            console.log("Edited therapist");
        });
    });

    //DELET THERAPIST DATABASE
    socket.on('deleted_therapist', function(iddeleted) {
        var sql = "DELETE FROM tabla_terapeutas WHERE idtabla_terapeutas="+iddeleted;
        con.query(sql, function (err, result) {
            console.log("Delet Therapist");
        });
    });

    //DOWNLOAD PATIENT LIST (DATABASE)
    socket.on('download_therapist',function(res){
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Therapists');
        worksheet.columns = [
            { header: 'Id Therapist', key: 'idtabla_terapeutas', width: 10 },
            { header: 'First Name', key: 'NombreTerapeuta', width: 10 },
            { header: 'Last Name', key: 'ApellidoTerapeuta', width: 10 }
        ];
        var sql = "SELECT * FROM tabla_terapeutas";
        con.query(sql, function (err, therapist_list) {
            if (err) throw err;
                for (var i = 0; i < therapist_list.length; i++) {
                    worksheet.addRow((therapist_list[i]));
                }
            workbook.xlsx.writeFile("Therapists_DB.xlsx");
        });
    })

    // ADD SESSIONS DATA IN DATABASE
    socket.on('addsesiondata', function(data) {
		/*
        rom_left_vector = test_rom_left_vector
        rom_right_vector = test_rom_right_vector
        load_vector = test_rom_left_vector
        time_stamp_vector = test_rom_left_vector
		is_swalker_connected = true;		*/				

        console.log("Add session data")
        var sql = "INSERT INTO tabla_sesion (idPaciente, NumberSession, idTerapeuta, gait_velocity, observations) VALUES (?)";
        // Read therapy configuration from conf file
        fs.readFile(therapyConfigPath, (err, data) => {
            if (err) throw err;
            console.log(data);
            var config = JSON.parse(data);
            var terapist_id = "SELECT idtabla_terapeutas from tabla_terapeutas where NombreTerapeuta in ('" + (config.therapist_name.split(" "))[0] +"') AND ApellidoTerapeuta in ('" + (config.therapist_name.split(" "))[1] +"'); ";
            var patient_id = "SELECT idtabla_pacientes from tabla_pacientes where NombrePaciente in ('" + (config.patient_name.split(" "))[0] +"') AND ApellidoPaciente in ('" + (config.patient_name.split(" "))[(config.patient_name.split(" ").length) -1] +"'); ";
            var IDs = terapist_id + patient_id
            con.query(IDs , [1,2], function (err, result) {
                if (err) throw err;
				console.log(result)
                patient_id = result[1][0].idtabla_pacientes;
                terapist_id = result[0][0].idtabla_terapeutas;
                patient_leg_length = config.leg_length;
                var n_session = "SELECT COUNT(NumberSession) AS count from tabla_sesion WHERE idPaciente =" + patient_id + ";"
                con.query(n_session, function (err, result) {
				    if (err) throw err;
				    n_session = result[0].count +1;
		    
				    var sessionConfig = [patient_id, n_session, terapist_id, config.gait_velocity, config.observations];
				    
				    var surgery = config.surgery;
				    con.query(sql,[sessionConfig], function (err, result) {
					    if (err) throw err;
					    // Save Data of the session
					    var sessionID = "SELECT idtable_session from tabla_sesion ORDER BY idtable_session DESC LIMIT 1;";
					    con.query(sessionID , function (err, sessionID) {
						    if (err) throw err;
						    // Get last session ID
						    sessionID = sessionID[0].idtable_session;
						    // Prepare joints angles data of the last session
						    var insertDataRows = ""
						    if (is_swalker_connected){
							    var total_length = rom_right_vector.length;
						    } else if (is_delsys_connected){
							    var total_length = tibiaL_accX_vector.length;
							    //var total_length = emg_activity_vector.length;
						    } 
						    
						    for (let index = 0; index < total_length; index++) {
							    if(is_swalker_connected){
								    if (direction_vector[index] == 's'){
									    var dir_vector =  0;
								    } else if (direction_vector[index] == 'b'){
									    var dir_vector = 1;
								    } else if (direction_vector[index] == 'f'){
									    var dir_vector = 2;
								    } else if (direction_vector[index] == 'r'){
									    var dir_vector = 3;
								    } else if (direction_vector[index] == 'l'){
									    var dir_vector = 4;
								    } else {
									    var dir_vector = 5;
								    }
							    }    
									    
							    if ((is_swalker_connected & is_delsys_connected)) {
								    
								    insertDataRows = "(" + (sessionID).toString() + "," + (time_stamp_vector[index]).toString() +","+ 
												    (rom_left_vector[index]).toString() + "," + (rom_right_vector[index]).toString()  + "," + (load_vector[index]).toString() + "," + (dir_vector).toString() +  "," + 
												    //(emg_activity_vector[index][0]).toString() + "," + (emg_binary_activation_vector[index][0]).toString() + "," + (emg_activity_vector[index][1]).toString() + "," + (emg_binary_activation_vector[index][1]).toString() +  "," + (emg_activity_vector[index][2]).toString()  + "," + (emg_binary_activation_vector[index][2]).toString()+  "," + (emg_activity_vector[index][3]).toString()  + "," + (emg_binary_activation_vector[index][3]).toString() +  "," + (emg_activity_vector[index][4]).toString()  + "," + (emg_binary_activation_vector[index][4]).toString() +  "," + (emg_activity_vector[index][5]).toString()  + "," + (emg_binary_activation_vector[index][5]).toString() +  "," + (emg_activity_vector[index][6]).toString()  + "," + (emg_binary_activation_vector[index][6]).toString()+  "," + (emg_activity_vector[index][7]).toString()  + "," + (emg_binary_activation_vector[index][7]).toString() + 
												    tibiaL_accX_vector[index].toString() + "," + tibiaR_accX_vector[index].toString() +  ");"
								    //var sql = "INSERT INTO data_sessions (idSesion, Date, left_hip, right_hip, weight_gauge, direction, emg_muscle_activity_s1,  muscle_binary_activation_s1, emg_muscle_activity_s2,  muscle_binary_activation_s2, emg_muscle_activity_s3,  muscle_binary_activation_s3,  emg_muscle_activity_s4,  muscle_binary_activation_s4,  emg_muscle_activity_s5,  muscle_binary_activation_s5, emg_muscle_activity_s6,  muscle_binary_activation_s6, emg_muscle_activity_s7,  muscle_binary_activation_s7, emg_muscle_activity_s8, muscle_binary_activation_s8, accX_s7, accY_s7, accZ_s7, accX_s3, accY_s3, accZ_s3) VALUES " + insertDataRows;
								    var sql = "INSERT INTO data_sessions (idSesion, Date, left_hip, right_hip, weight_gauge, direction, accX_s7, accX_s3) VALUES " + insertDataRows;
								    
								    
							    
							    
							    } else if(is_delsys_connected){
							    
								    // emg connected. No swalker.
								    insertDataRows = "(" + (sessionID).toString() + "," + (time_stamp_vector[index]).toString() +","+ 
												    //(emg_activity_vector[index][0]).toString() + "," + (emg_binary_activation_vector[index][0]).toString() + "," + (emg_activity_vector[index][1]).toString() + "," + (emg_binary_activation_vector[index][1]).toString() +  "," + (emg_activity_vector[index][2]).toString()  + "," + (emg_binary_activation_vector[index][2]).toString()+  "," + (emg_activity_vector[index][3]).toString()  + "," + (emg_binary_activation_vector[index][3]).toString() +  "," + (emg_activity_vector[index][4]).toString()  + "," + (emg_binary_activation_vector[index][4]).toString() +  "," + (emg_activity_vector[index][5]).toString()  + "," + (emg_binary_activation_vector[index][5]).toString() +  "," + (emg_activity_vector[index][6]).toString()  + "," + (emg_binary_activation_vector[index][6]).toString()+  "," + (emg_activity_vector[index][7]).toString()  + "," + (emg_binary_activation_vector[index][7]).toString() + 
												    tibiaL_accX_vector[index].toString() + "," + tibiaR_accX_vector[index].toString() +  ");"

								    //var sql = "INSERT INTO data_sessions (idSesion, Date, emg_muscle_activity_s1,  muscle_binary_activation_s1, emg_muscle_activity_s2,  muscle_binary_activation_s2, emg_muscle_activity_s3,  muscle_binary_activation_s3,  emg_muscle_activity_s4,  muscle_binary_activation_s4,  emg_muscle_activity_s5,  muscle_binary_activation_s5, emg_muscle_activity_s6,  muscle_binary_activation_s6, emg_muscle_activity_s7,  muscle_binary_activation_s7, emg_muscle_activity_s8, muscle_binary_activation_s8, accX_s7, accY_s7, accZ_s7, accX_s3, accY_s3, accZ_s3) VALUES " + insertDataRows;
								    var sql = "INSERT INTO data_sessions (idSesion, Date, accX_s7,accX_s3) VALUES " + insertDataRows;
								    
								    
							    } else if (is_swalker_connected){
								    
								    // swalker connected. No emg .

									    insertDataRows = "(" + (sessionID).toString() + "," + (time_stamp_vector[index]).toString() +","+ 
													    (rom_left_vector[index]).toString() + "," + (rom_right_vector[index]).toString()  + "," + (load_vector[index]).toString() + "," + (dir_vector).toString()  + ");"
									    var sql = "INSERT INTO data_sessions (idSesion, Date, left_hip, right_hip, weight_gauge, direction) VALUES " + insertDataRows;
								    
								    
							    
							    }
							    //console.log(sql);
							    con.query(sql, function (err, result) {
								    
								    if (err) throw err;
							    });
						    }
						    console.log("Recorded Session Data");
						    socket.emit("monitoring:recorded_sessionData");
					    });
				    });
			   });
           });

        })
	
	
	//download acc excel
	if(is_delsys_connected){
		const workbook = new ExcelJS.Workbook();
        const worksheetx = workbook.addWorksheet('X Axis');
        const worksheety = workbook.addWorksheet('Y Axis');
        const worksheetz = workbook.addWorksheet('Z Axis');
	
        worksheetx.addRow(["RF D X", "BF D X" ,"TA D X", "GM D X", "RF I X", "BF I X", "TA I X", "GM I X"])
        worksheety.addRow(["RF D Y", "BF D Y" ,"TA D Y", "GM D Y", "RF I Y", "BF I Y", "TA I Y", "GM I Y"])
        worksheetz.addRow(["RF D Z", "BF D Z" ,"TA D Z", "GM D Z", "RF I Z", "BF I Z", "TA I Z", "GM I Z"])
		console.log(acc_all_data.length)
        for (var i = 0; i < acc_all_data.length; i++) {
			worksheetx.addRow([acc_all_data[i][0], acc_all_data[i][3] , acc_all_data[i][6], acc_all_data[i][9], acc_all_data[i][12], acc_all_data[i][15], acc_all_data[i][18], acc_all_data[i][21]]).commit()
			worksheety.addRow([acc_all_data[i][1], acc_all_data[i][4] ,acc_all_data[i][7], acc_all_data[i][10], acc_all_data[i][13], acc_all_data[i][16], acc_all_data[i][19], acc_all_data[i][22]]).commit()
			worksheetz.addRow([acc_all_data[i][2], acc_all_data[i][5] ,acc_all_data[i][8], acc_all_data[i][11], acc_all_data[i][14], acc_all_data[i][17], acc_all_data[i][20], acc_all_data[i][23]]).commit()
			
			
		}	
		workbook.xlsx.writeFile('all_acc_datax.xlsx');
		n = 1;
		const limitedInterval = setInterval(() => {
			if (n == 4){
				socket.emit("monitoring:downloadAccExcellx");
				console.log("sent")
			
			}
			if(n == 5){

				clearInterval(limitedInterval);	
			}	 
			n++
			
		}, 1000)
	}
	
	//workbooky.xlsx.writeFile('all_acc_datay.xlsx');
	//workbookz.xlsx.writeFile('all_acc_dataz.xlsx');
	
	
	//socket.emit("monitoring:downloadAccExcelly");
	//socket.emit("monitoring:downloadAccExcellz");
	console.log("send")
    });

    //DELETE SESSION FROM DATABASE
    socket.on('deleted_session', function(iddeleted) {
        var sql_sessions = "DELETE FROM tabla_sesion WHERE idtable_session="+iddeleted;
        var sql_data = "DELETE FROM data_sessions WHERE idSesion="+iddeleted;
        con.query(sql_sessions, function (err, result) {
            console.log("Delet Session");
        });
        con.query(sql_data, function (err, result) {
            console.log("Delet Data Session");
        });
    });

    //DOWNLOAD SESSIONS CONFIGURATION (DATABASE)
    socket.on('download_sessions_config',function(res){
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Session');
        worksheet.columns = [
            { header: 'Id Session', key: 'idtable_session', width: 20 },
            { header: 'Date', key: 'Date', width: 10 },
            { header: 'Id Patient', key: 'idPaciente', width: 20 },
            { header: 'Number of session', key: 'NumberSession', width: 30 },
            { header: 'Id Therapist', key: 'idTerapeuta', width: 20 },
            { header: 'Gait Velocity', key: 'gait_velocity', width: 20 },
            { header: 'Observations', key: 'observations', width: 100 },
        ];
        var sql = "SELECT * FROM tabla_sesion";
        con.query(sql, function (err, sessions_data) {
            if (err) throw err;
                for (var i = 0; i < sessions_data.length; i++) {
                    worksheet.addRow((sessions_data[i]));
                }
            workbook.xlsx.writeFile('Sessions_Configurations_data.xlsx');
        });
    })

    //DOWNLOAD SESSION DATA (DATABASE)
    socket.on('download_sessions_data',function(idsesion){
        console.log("Download Data")
        idsesion = idsesion;
        console.log(idsesion)
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Session');
        worksheet.columns = [
            { header: 'Id Data', key: 'iddata_sessions', width: 10 },
            { header: 'Id Sesion', key: 'idSesion', width: 10 },
            { header: 'Time (ms)', key: 'Date', width: 10 },
            { header: 'Left Hip Real', key: 'left_hip', width: 10 },
            { header: 'Right Hip Real', key: 'right_hip', width: 10 },
            { header: 'Weigth Gauge', key: 'weight_gauge', width: 20 },
            { header: 'Direction', key: 'direction', width: 20 },
            /*
            { header: 'Right RF muscle activity', key: 'emg_muscle_activity_s1', width: 20 },
            { header: 'Right RF muscle activation (1/0)', key: 'muscle_binary_activation_s1', width: 30 },
            { header: 'Right LH muscle activity', key: 'emg_muscle_activity_s2', width: 20 },
            { header: 'Right LH muscle activation (1/0)', key: 'muscle_binary_activation_s2', width: 30 },
            { header: 'Right TA muscle activity', key: 'emg_muscle_activity_s3', width: 20 },
            { header: 'Right TA muscle activation (1/0)', key: 'muscle_binary_activation_s3', width: 30 },
            { header: 'Right MG muscle activity', key: 'emg_muscle_activity_s4', width: 20 },
            { header: 'Right MG muscle activation (1/0)', key: 'muscle_binary_activation_s4', width: 30 },
            { header: 'Left RF muscle activity', key: 'emg_muscle_activity_s5', width: 20 },
            { header: 'Left RF muscle activation (1/0)', key: 'muscle_binary_activation_s5', width: 30 },
            { header: 'Left LH muscle activity', key: 'emg_muscle_activity_s6', width: 20 },
            { header: 'Left LH muscle activation (1/0)', key: 'muscle_binary_activation_s6', width: 30 },
            { header: 'Left TA muscle activity', key: 'emg_muscle_activity_s7', width: 20 },
            { header: 'Left TA muscle activation (1/0)', key: 'muscle_binary_activation_s7', width: 30 },
            { header: 'Left MG muscle activity', key: 'emg_muscle_activity_s8', width: 20 },
            { header: 'Left MG muscle activation (1/0)', key: 'muscle_binary_activation_s8', width: 30 },
            * */
            { header: 'Left Tibia AccX', key: 'accX_s7', width: 30 },
            { header: 'Right Tibia AccX', key: 'accX_s3', width: 30 },
           

        ];
        var sql = "SELECT * FROM data_sessions WHERE idSesion=" + idsesion.toString() + ";";
        console.log(sql);
        con.query(sql, function (err, sessions_data) {
            if (err) throw err;
                for (var i = 0; i < sessions_data.length; i++) {
                    worksheet.addRow((sessions_data[i]));
                }
            data_session_id = idsesion.toString();
            workbook.xlsx.writeFile("Session_" + data_session_id + ".xlsx");
            socket.emit('open_download_sessions_link');
        });
    })
    
    //DOWNLOAD SESSION DATA (DATABASE)
    socket.on('download_all_sessions_data',function(){
        console.log("Download all sessions Data")
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('DataSessions');
        worksheet.columns = [
            { header: 'Id Data', key: 'iddata_sessions', width: 10 },
            { header: 'Id Sesion', key: 'idSesion', width: 10 },
            { header: 'Time (ms)', key: 'Date', width: 10 },
            { header: 'Left Hip Real', key: 'left_hip', width: 10 },
            { header: 'Right Hip Real', key: 'right_hip', width: 10 },
            { header: 'Weigth Gauge', key: 'weight_gauge', width: 20 },
            { header: 'Direction', key: 'direction', width: 20 },
            { header: 'Left Tibia AccX', key: 'accX_s7', width: 30 },
            { header: 'Right Tibia AccX', key: 'accX_s3', width: 30 },
        ];
        var sql = "SELECT * FROM data_sessions;";
        console.log(sql);
        con.query(sql, function (err, sessions_data) {
            if (err) throw err;
                for (var i = 0; i < sessions_data.length; i++) {
                    worksheet.addRow((sessions_data[i]));
                }
            workbook.xlsx.writeFile("All_DataSessions.xlsx");
            socket.emit('open_download_all_sessions_link');
        });
    })

    //DOWNLOAD SESSION DATA (DATABASE)
    socket.on('load_session_data',function( idsesion){
        // store the ROM values for the summary
        var sql = "SELECT left_hip FROM data_sessions WHERE idSesion=" + idsesion.toString() + ";";
        con.query(sql, function (err, rom_left_data) {
            if (err) throw err;
            load_session_rom_left_objects = rom_left_data;
            for( var i = 0; i < load_session_rom_left_objects.length; i++ )  {
                load_session_rom_left.push(load_session_rom_left_objects[i].left_hip)
            }
            
        });
        // store the ROM values for the summary
        var sql = "SELECT right_hip FROM data_sessions WHERE idSesion=" + idsesion.toString() + ";";
        con.query(sql, function (err, rom_right_data) {
            if (err) throw err;
            load_session_rom_right_objects = rom_right_data;
            for( var i = 0; i < load_session_rom_right_objects.length; i++ )  {
                load_session_rom_right.push(load_session_rom_right_objects[i].right_hip)
            }            
        });
        
        // store the weight supported values for the summary
        var sql = "SELECT weight_gauge FROM data_sessions WHERE idSesion=" + idsesion.toString() + ";";
        con.query(sql, function (err, rom_right_data) {
            if (err) throw err;
            load_session_weight_gauge_objects = rom_right_data;
            for( var i = 0; i < load_session_rom_right_objects.length; i++ )  {
                load_session_weight_gauge.push(load_session_weight_gauge_objects[i].weight_gauge)
            }            
        });
        
        socket.emit('session_data_loaded', {
            rom_l: load_session_rom_left,
            rom_r: load_session_rom_right,
            load: load_session_weight_gauge
        })
        
        load_session_rom_right = []
        load_session_rom_left = []
        load_session_weight_gauge = []
    })

    app.get('/downloadsessionsconfig', (req, res) => setTimeout(function(){ res.download('./Sessions_Configurations_data.xlsx'); }, 1000))
    app.get('/downloadsessionsdata', (req, res) => setTimeout(function(){ res.download('./Session_' + data_session_id + '.xlsx'); }, 1000))
    app.get('/downloadallsessionsdata', (req, res) => setTimeout(function(){ res.download('./All_DataSessions.xlsx'); }, 1000))
    app.get('/downloadtherapists', (req, res) => setTimeout(function(){ res.download('./Therapists_data.xlsx'); }, 1000))
    app.get('/downloadpatients', (req, res) => setTimeout(function(){ res.download('./Patients_DB.xlsx'); }, 1000))

    app.get('/downloadaccdata1', (req, res) => setTimeout(function(){ res.download('./all_acc_datax.xlsx'); }, 1000))
    app.get('/downloadaccdata2', (req, res) => setTimeout(function(){ res.download('./all_acc_datay.xlsx'); }, 1000))
    app.get('/downloadaccdata3', (req, res) => setTimeout(function(){ res.download('./all_acc_dataz.xlsx'); }, 1000))

    //GET PATIENT INFO AND AUTOFILL IN "Therapy Settings" (DATABASE)
    socket.on('get_patient_info',function(data){
        // Get patient ID from database
        var name = data.patient_name.split(" ")[0];
        var surname =  data.patient_name.split(" ")[(data.patient_name.split(" ").length -1 )];
        var patient_id = "";
        var sql_patient = "SELECT * FROM tabla_pacientes WHERE NombrePaciente='" + name.toString() + "' AND ApellidoPaciente='" + surname.toString() + "';";
        console.log(sql_patient);
        con.query(sql_patient, function (err, patient_data) {
            if (err) throw err;
            console.log(patient_data);
            patient_id = patient_data[0].idtabla_pacientes; 
            console.log(patient_data[0].idtabla_pacientes);
            if (patient_id =! undefined) {
                patient_id = patient_data[0].idtabla_pacientes;
               
				patient_age = patient_data[0].patiente_age; test_rom_right_vector
				patient_weight = patient_data[0].patiente_weight;
				global_patient_weight = parseFloat(patient_data[0].patiente_weight);
				patient_leg_length = patient_data[0].leg_length;
				patient_hip_joint = patient_data[0].hip_joint;
				var surgery = patient_data[0].surgery;
				var estado_fisico = patient_data[0].estado_fisico;
				var estado_cognitivo = patient_data[0].estado_cognitivo;
				console.log("patient_age: " + patient_age.toString() + " patient_weight: " + patient_weight.toString());
				socket.emit('set_patient_info', {
					patient_age: patient_age,
					patient_weight: patient_weight,
					patient_leg_length: patient_leg_length,
					patient_hip_joint: patient_hip_joint,
					patient_surgery: surgery,
					estado_fisico: estado_fisico,
					estado_cognitivo: estado_cognitivo,
					
				})

			}
                
        });
    })
    
    // Move the SWalker
    socket.on('traction:message', (data) => {
		//Get command value
		direction_char  = data.direction_char;
		speed_char = therapy_speed;
		if (therapy_speed == "high"){
			speed_char = 'f';
		} else if (therapy_speed == 'slow'){
			speed_char = 's';
		} else{
			speed_char = 'n';
		}

		var cmd = ''
		//Command var to send
		if (direction_char == 'b' | direction_char == 'f'){
			cmd = '#'+ direction_char + speed_char;
		} else {
			cmd = '#'+ direction_char;
		}

		//send command cmd to swalker
		console.log(cmd)
		var buf = Buffer.from(cmd, 'utf8');
		serial_swalker.write(buf)
		.then(() => console.log('Data successfully written'))
		.catch((err) => console.log('Error while sending command to SWALKERII', err))
    })

    // Send data to the charts in therapy monitoring
    setInterval(function () {
        socket.emit('monitoring:jointData', {
            // SWALKER
            swalker_connection_status: is_swalker_connected,
            //swalker_connection_status: true,
            load: (parseFloat(load)/global_patient_weight)*100,
            //load: (parseFloat(test_load_vector[i_test_rom_r])/global_patient_weight)*100,
            //rom_right: test_rom_right_vector[i_test_rom_r],
            rom_right: (rom_right - parseFloat(rom_right_calibration)),
            rom_left: (rom_left - parseFloat(rom_left_calibration)),
            //rom_left: test_rom_left_vector[i_test_rom_l],
            // EMG
            emg: emg_msg,
            emg_connection_status: is_delsys_connected,
        })
	/*
	if(i_test_rom_r >= (test_rom_right_vector.length -1 )){
	    i_test_rom_r = 0;
	} else {
	    i_test_rom_r = i_test_rom_r+5;
	}
	if(i_test_rom_l >= (test_rom_right_vector.length - 1)){
	    i_test_rom_l = 0;
	} else {
	    i_test_rom_l = i_test_rom_l+5;
	}*/
	
    }, PLOTSAMPLINGTIME);

    // Save therapy settings in a JSON file.
    socket.on('settings:save_settings', (data) => {
		console.log("save_Settings");
        fs.writeFileSync(therapyConfigPath, JSON.stringify(data), function (err){
            if (err) throw err;
            console.log('Therapy settings saved!')
        })
    })
    
    // Update json therapy settings in session observations.
    socket.on('monitoring:save_settings', (obs) => {
		console.log("update save_settings");
        var therapyConfigPath = path.join(__dirname, 'config','therapySettings.json');

		fs.readFile(therapyConfigPath, (err, data) => {
			if (err) throw err;
			let json_obj = JSON.parse(data);
			console.log(json_obj)
			json_obj["observations"] = obs;
			console.log(json_obj)
			fs.writeFileSync(therapyConfigPath, JSON.stringify(json_obj), function (err){
				if (err) throw err;
				console.log('Therapy settings re-saved!')
			})
		});
    })	

    // Show therapy settings in the monitoring screen.
    socket.on('monitoring:ask_therapy_settings', function(callbackFn) {
        // Read therappy settings from config file.
        fs.readFile(therapyConfigPath, (err, data) => {
            if (err) throw err;
            let config = JSON.parse(data);
            console.log(config);
            console.log(config.gait_velocity)
            therapy_speed = config.gait_velocity;
			patient_leg_length = config.leg_length;
			global_patient_weight = config.patient_weight;
			console.log(global_patient_weight);
            // Send values
            socket.emit('monitoring:show_therapy_settings', {
                patient_name : config.patient_name,
                patient_age : config.patient_age,
                patient_weight :  config.patient_weight,
                gait_velocity :   config.gait_velocity,
                pbws :   config.pbws,
                leg_length: config.leg_length
            })
        });
    });

    socket.on('deleted_patient', function(iddeleted) {
		console.log("deleted  patient 2");
        console.log(iddeleted);
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "mysql",
            database: "swdb",
            multipleStatements: true
          });
            con.connect(function(err) {
                if (err) throw err;
                console.log("Eliminado");

            });
    });

    // Configure the robot.
    socket.on('monitoring:configure_robot', function(callbackFn) {
        console.log("monitoring:configure_robot");
        configureStartPos();
    });

    // Connect SWalker
    socket.on('monitoring:connect_swalker', function(callbackFn) {
	console.log(is_swalker_connected);
        connect_bt_device(socket, serial_swalker, is_swalker_connected, "sw");

    });
    // Disconnect SWalker
    socket.on('monitoring:disconnect_swalker', function(callbackFn) {
        // Reset all vectors
        load_vector = []
        rom_right_vector = []
        rom_left_vector = []
        
        rom_left = 0;
        rom_right = 0;
        load = 0;
        rom_right_calibration = 0;
        rom_left_calibration = 0;

        disconnect_bt_device(socket, serial_swalker, is_swalker_connected, "sw");

    });
    
   
    // Connect EMG
    socket.on('monitoring:connect_emg', function(callbackFn) {
	console.log(is_delsys_connected)
	    if (!is_delsys_connected) {
			
		// start port
	        client_delsys_start.connect(DELSYS_START_PORT, DELSYS_PC_IP, function() {
	            console.log('Connected to start');
	        });  
            // 0: connected (no error), 1: connection error, 2: connection close
            client_delsys_start.on('error', function(ex) {
                console.log(ex);
                socket.emit('monitoring:connection_status', {
                    device: "emg",
                    // status--> 0: connect, 1: disconnect, 2: not paired, 3: conn error, 4: conn closed
                    status: 3
                }) 
            });  
            client_delsys_start.on('end', function() {
                console.log('Delsys start ended');
		socket.emit('monitoring:connection_status', {
                    device: "emg",
                    // status--> 0: connect, 1: disconnect, 2: not paired, 3: conn error, 4: conn closed
                    status: 1
                }) 
            });
            client_delsys_start.on('close', function() {
                console.log('Delsys start closed');
                socket.emit('monitoring:connection_status', {
                    device: "emg",
                    // status--> 0: connect, 1: disconnect, 2: not paired, 3: conn error, 4: conn closed
                    status: 4
                }) 
            });   
	            
	        // EMG data port
	        client_delsys_data.connect(DELSYS_DATA_PORT, DELSYS_PC_IP, function() {
                console.log('Connected to data');
                client_delsys_start.write('#startStream');

                is_delsys_connected = true;

                socket.emit('monitoring:connection_status', {
                    device: "emg",
                    // status--> 0: connect, 1: disconnect, 2: not paired, 3: conn error, 4: conn closed
                    status: 0
                }) 

            }); 
            client_delsys_data.on('error', function(ex) {
                console.log(ex);
                connect_delsys = false;
		socket.emit('monitoring:connection_status', {
                    device: "emg",
                    // status--> 0: connect, 1: disconnect, 2: not paired, 3: conn error, 4: conn closed
                    status: 3
                }) 
            });
            client_delsys_data.on('end', function() {
                console.log('Delsys data ended');
		socket.emit('monitoring:connection_status', {
                    device: "emg",
                    // status--> 0: connect, 1: disconnect, 2: not paired, 3: conn error, 4: conn closed
                    status: 2
                }) 
            });
            client_delsys_data.on('close', function() {
                console.log('Delsys data closed');
		socket.emit('monitoring:connection_status', {
                    device: "emg",
                    // status--> 0: connect, 1: disconnect, 2: not paired, 3: conn error, 4: conn closed
                    status: 4
                }) 
            });
            
            // AUX Acc data port
            client_delsys_acc.connect(delsys_acc_port, DELSYS_PC_IP, function() {
                console.log('Connected to acc');

            }); 
            client_delsys_acc.on('error', function(ex) {
                console.log(ex);
                connect_delsys = false;
            });
            client_delsys_acc.on('end', function() {
                console.log('Delsys acc ended');
            });
            client_delsys_acc.on('close', function() {
                console.log('Delsys acc closed');
            });
	    }
    });
    // Disconnect EMG
    socket.on('monitoring:disconnect_emg', function(callbackFn) {
    	if(is_delsys_connected) {
            console.log("----------------STOP_RECORD--------------------");
            client_delsys_start.write('#stopStream');
        }
		client_delsys_start.destroy();
		client_delsys_data.destroy();
		client_delsys_acc.destroy();
		is_delsys_connected = false;
        socket.emit('monitoring:connection_status', {
            device: "emg",
            // status--> 0: connect, 1: disconnect, 2: not paired, 3: conn error, 4: conn closed
            status: 1
        }) 
    });

    // Flag to emg acquisition program to save the raw data
    socket.on('monitoring:save_emg', function(callbackFn) {
    	if(is_delsys_connected) {
            console.log("----------------Save data--------------------");
            client_delsys_start.write('#record');
        }
    });

    socket.on('monitoring:connect_vr', function(callbackFn) {
        // The UDP network is used to communicate with oculus quest.
        // The predicted stride length will be send through this socket to feed the VR environment.
        // UPD sockets to send data
        
        if (is_client_connected){
           socket.emit('monitoring:connection_status',{
               device: "vr",
               status:0});
           vr_ready = true;
           
        }else{
           socket.emit('monitoring:connection_status',{
             device: "vr",
             status:1})
            }
    });

    socket.on('monitoring:disable_vr', function(callbackFn) {
        //udpServer_VR_.close();
        vr_ready = false;
        socket.emit('monitoring:connection_status', {
            device: "vr",
            // status--> 0: connect, 1: disconnect, 2: not paired, 3: conn error, 4: conn closed
            status: 1
        }) 
    });
    
    // Start therapy.
    socket.on('monitoring:start', function(callbackFn) {

        // Reset all vectors
        time_stamp_vector = [];
        // SWALKER
        load_vector = [];
        rom_right_vector = [];
        rom_left_vector = [];
        load = 0;
        rom_right = 0;
        rom_left = 0;
       // rom_right_calibration = 0;
       // rom_left_calibration = 0;
        // EMG
        //emg_activity_vector = [];
        //emg_binary_activation_vector = [];
        // ACC
        tibiaR_accX_vector = [];
        tibiaR_accX = 0;
        tibiaL_accX_vector = [];
        tibiaL_accX = 0;

        // Start recording
        record_therapy = true;

        if(is_delsys_connected) {
            console.log("----------------RECORD--------------------");
            client_delsys_start.write('#start');
        }
    });

    // Stop therapy.
    socket.on('monitoring:stop', function(callbackFn) {

    	if(is_delsys_connected) {
            console.log("----------------STOP_RECORD--------------------");
            client_delsys_start.write('#stop');
        }
		if(is_swalker_connected){
			stopTherapy();
		}
        record_therapy = false;

        console.log("Duration of the therapy:" + ((time_stamp_vector[time_stamp_vector.length - 1] - time_stamp_vector[0]) / 1000.00 / 60.00).toString());
		is_calibrated = false;
    });
});

// Configure swalker to start the therapy. Set ROM calibration in stance position.
function configureStartPos() {
    console.log("ROM calibration");
    is_calibrated = true;
    console.log(is_calibrated);
    rom_left_calibration = rom_left;
    rom_right_calibration = rom_right;

}

// Stop therapy.
function stopTherapy() {
    console.log("Stop Therapy");
    
    // send command stop to swalker
    stopSwalker();

    rom_left_calibration = 0;
    rom_right_calibration = 0;
}

function stopSwalker(){
    //send command cmd to swalker
    var buf = Buffer.from("#s", 'utf8');
    serial_swalker.write(buf)
    .then(() => console.log('Data successfully written'))
    .catch((err) => console.log('Error', err))
}

function hex2a_general(hexx, lasthex, is_first_data) {
    var hex = hexx.toString();//force conversion
    var message = [];
    var newhex = "";
    
    if(is_first_data){
		is_first_data = false;
		lasthex = "";
		var splitted = [];
			
	} else {
		for (var i = 0; i < hex.length; i++){
			if (!(hex[i] == "\r" || hex[i] == "\n")){
				newhex += hex[i];
			}
		}
		
		newhex = lasthex + newhex;
		if (newhex.includes("#")){
			var splitted = newhex.split("#");
		} else {
			var splitted = []
		}
	
	}
	message.push(splitted)
	message.push(is_first_data)
	
    return message; 
}

function connect_bt_device(socket, bt_object, status_boolean, str_device){
		
	if (!status_boolean){
		status_boolean = false;
		var deviceNotFound = true;
		var pairedDevices = bt_object.scan()
		.then(function(devices) {
			console.log("[Bt] Scanning devices ...");
			console.log(devices)
			
			// Check if the device is switch on and close to the raspberry
			for (let i = 0; i < devices.length; i++) {
				
				if(deviceNotFound){
					var device_name = devices[i].name;
					var device_address = devices[i].address;
							
					// case SWalker
					if ( str_device == 'sw'){
						if (devices[i].name == swBluetoothName | devices[i].name == "00:06:66:F2:4C:EE"){
							console.log("[Bt] Device found. Trying connection...")
							deviceNotFound = false;
						}
					// case sensors ProMotion 
					}
					
					// Device found
					if(!deviceNotFound){
						bt_object.connect(device_address)
						.then(function() {
							console.log('[Bt] Bluetooth connection established with device name: ' + device_name)
							socket.emit('monitoring:connection_status', {
								device: str_device,
								// status--> 0: connect, 1: disconnect, 2: not paired
								status: 0
							}) 
							if(str_device == "sw"){
								is_swalker_connected = true;
							}
							
						})
						.catch(function(err) {
							// The device has not been found.
							var deviceNotFound = false;
							console.log('[Error] Device: ' + device_name , err);
							
							// message status in case WALKERII interface
							socket.emit('monitoring:connection_status', {
								device: str_device,
								// status--> 0: connect, 1: disconnect, 2: not paired
								status: 1
							}) 
						})
					}
				}
			}
			
			// Device not found
			if(deviceNotFound){
				console.log("device not found!");
				// message status in case SWALKERII interface
				socket.emit('monitoring:connection_status', {
					device: str_device,
					// status--> 0: connect, 1: disconnect, 2: not paired/not found
					status: 2
				}) 
			
			} 
				
		})
		.catch(function(err){
			console.log("error in bluetooth connection")
		});
		
	
		
	}else{
		console.log('[Bt] The device is already connected!')
		socket.emit('monitoring:connection_status', {
			device: str_device,
			// status--> 0: connect, 1: disconnect, 2: not paired
			status: 0
		}) 
    }
	
}

function disconnect_bt_device(socket, bt_object, status_boolean, str_device){
    if (status_boolean){
		bt_object.close()
		.then(function() {
			console.log('[Bt] Bluetooth connection successfully closed ');
			status_boolean = false;
			
			sockets['websocket'].emit('monitoring:connection_status',{
				 device: "sw",
				 status:3
			})
		})
		.catch(function(err) {
			console.log('Connetion already close')
			
		})
	
		if(str_device == "sw"){
			is_swalker_connected = false;
		}			
	}
	
}

function decodeFloat(buf1, last_index){
	let index_channel = last_index

	let posInBuf = 0;
	let len = Buffer.byteLength(buf1);
	
	while (posInBuf < (len/4)){
		var data = [buf1[posInBuf+3], buf1[posInBuf+2], buf1[posInBuf+1], buf1[posInBuf]];
		var buf = new ArrayBuffer(4);
		var view = new DataView(buf);
		//set bytes
		data.forEach(function(b,i){
			view.setUint8(i,b);
		});
		let float = view.getFloat32(0);
		
		posInBuf = posInBuf+4;
		
		if(record_therapy){
			if (index_channel  == 1){   
			    s1_accX = float
			} else if (index_channel  == 2){   
			    s1_accY = float
			} else if (index_channel == 3){
			    s1_accZ = float
			} else if (index_channel  == 4){   
			    s2_accX = float
			} else if (index_channel  == 5){   
			    s2_accY = float
			} else if (index_channel == 6){
			    s2_accZ = float
			} else if(index_channel  == 7){   //accx sensor 3
			    tibiaR_accX = float
			    s3_accX = float
			} else if (index_channel == 8){
			    s3_accY = float
			} else if (index_channel == 9){
			    s3_accZ = float
			} else if (index_channel  == 10){   
			    s4_accX = float
			} else if (index_channel  == 11){  
			    s4_accY = float
			} else if (index_channel == 12){
			    s4_accZ = float
			} else if (index_channel  == 13){   
			    s5_accX = float
			} else if (index_channel  == 14){  
			    s5_accY = float
			} else if (index_channel == 15){
			    s5_accZ = float
			} else if (index_channel  == 16){  
			    s6_accX = float
			} else if (index_channel  == 17){   
			    s6_accY = float
			} else if (index_channel == 18){
			    s6_accZ = float
			} else if (index_channel == 19){
			    tibiaL_accX = float			//accx sensor 7
			    s7_accX = float
			} else if (index_channel == 20){
			    s7_accY = float
			} else if (index_channel == 21){
			    s7_accZ = float
			}else if (index_channel  == 22){   
			    s8_accX = float
			} else if (index_channel  == 23){  
			    s8_accY = float
			} else if (index_channel  == 24){  
			    s8_accZ = float
			} else if(index_channel == 48){
			    index_channel = 0;
			}
		}
		
		index_channel ++
		
	}
	
	return last_index;
	
}


