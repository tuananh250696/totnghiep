angular.module('myApp', [
    'ngRoute',
    'mobile-angular-ui',
	'btford.socket-io'
]).config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home.html',
        controller: 'Home'
    });
}).factory('mySocket', function (socketFactory) {
	var myIoSocket = io.connect('/webapp');	//Tên namespace webapp

	mySocket = socketFactory({
		ioSocket: myIoSocket
	});
	return mySocket;
	
/////////////////////// Những dòng code ở trên phần này là phần cài đặt, các bạn hãy đọc thêm về angularjs để hiểu, cái này không nhảy cóc được nha!
}).controller('Home', function($scope, mySocket) {
	////Khu 1 -- Khu cài đặt tham số 
    //cài đặt một số tham số test chơi
	//dùng để đặt các giá trị mặc định
        $scope.CamBienMua = "chưa cap nhat";
	////Khu 2 -- Cài đặt các sự kiện khi tương tác với người dùng
	//các sự kiện ng-click, nhấn nút
	$scope.updateSensor  = function() {
		mySocket.emit("RAIN")
	}

	////Khu 3 -- Nhận dữ liệu từ Arduno gửi lên (thông qua ESP8266 rồi socket server truyền tải!)
	//các sự kiện từ Arduino gửi lên (thông qua esp8266, thông qua server)
	mySocket.on('RAIN', function(json) {
		$scope.CamBienMua = (json.digital == 1) ? "Không mưa" : "Có mưa rồi yeah ahihi"
	})

	
	//// Khu 4 -- Những dòng code sẽ được thực thi khi kết nối với Arduino (thông qua socket server)
	mySocket.on('connect', function() {
		console.log("connected")
		mySocket.emit("RAIN") //Cập nhập trạng thái mưa
		
	
	})
      $scope.upt5  = function(){
	var ip = document.getElementById('ip').value;
		mySocket.emit("LED1ON"+ip)
    
	}
	$scope.upt51  = function(){
	     var ip = document.getElementById('ip').value;
		mySocket.emit("LED1OFF"+ip)
	}
	$scope.upt6  = function(){
		var ip = document.getElementById('ip').value;
		mySocket.emit("LED2ON"+ip)
	}
	$scope.upt61  = function(){
		var ip = document.getElementById('ip').value;
		mySocket.emit("LED2OFF"+ip)
	}
	$scope.upt7  = function(){
		var ip = document.getElementById('ip').value;
		mySocket.emit("LED3ON"+ip)
	}
	$scope.upt71  = function(){
		var ip = document.getElementById('ip').value;
		mySocket.emit("LED3OFF"+ip)
	}
	$scope.upt8  = function(){
		var ip = document.getElementById('ip').value;
		mySocket.emit("LED4ON"+ip)
	}
	$scope.upt81  = function(){
		var ip = document.getElementById('ip').value;
		mySocket.emit("LED4OFF"+ip)
	}
	//khi nhận được lệnh Button
	mySocket.on('BUTTON', function(json) {
		//Nhận được thì in ra thôi hihi.
		console.log("recv BUTTON", json)
		$scope.buttons = json.data
	})
	
	
	
		
});
