angular.module('cse.controller.register', [
  'ionic', 
  'ngCordova',
  'ionic.service.core',
  'ionic.service.push'
])

.config(['$ionicAppProvider', function($ionicAppProvider) {
  $ionicAppProvider.identify({
    app_id: '0424211a',
    api_key: 'f6a6081f6804ea0572e7661a4d18faf988a25db6cde2650c',
    dev_push: true,
    gcm_id: '253340701787'
  });
}])

.controller("RegisterCtrl", function($scope, $rootScope, $ionicUser, $ionicPush, Register) {
  $scope.$on('$ionicView.enter', function(e, data) {
    var registred = localStorage.getItem("registred");

    if(registred === "true" && data.direction === "none") {
      location.href = "#/tab/home";
    } else {
      $scope.registerData = Register.get();

      $(".register-fields").removeClass("register-fields-ok");
      $(".card-success").addClass("hide");
      $(".loading-register").addClass("hide");

      if(registred === "true") {
        $scope.labelData = {
          register: "Salvar dados",
          later: "Cancelar edição",
          icon: ""
        };        
      } else {
        $scope.labelData = {
          register: "Registrar dados",
          later: "Cadastrar Depois",
          icon: " icon-right ion-android-alarm-clock"
        };
      }
    }
  });

  $scope.skipRegister = function() {
    location.href = "#/tab/home";
  };

  $scope.register = function() {
    var userRegister = {
      name: $("input[name=userName]").val(),
      lastName: $("input[name=userLastName]").val(),
      email: $("input[name=userEmail]").val()
    };

    // Animations fields
    $(".register-fields").addClass("register-fields-ok");

    setTimeout(function() {
		  $(".card-success").removeClass("hide");
		  $(".loading-register").removeClass("hide");

		  var user = $ionicUser.get();

      if(!user.user_id) {
        $(".card-success-data").html(MESSAGE_REGISTER);

  		  user.user_id = $ionicUser.generateGUID();
      } else {
        $(".card-success-data").html(MESSAGE_ALTERATION);
      }

      userRegister.userId = user.user_id;

      // Metadata
      angular.extend(user, {
        name: userRegister.name,
        bio: 'C.S.E user ;)',
        lastName: userRegister.lastName,
        email: userRegister.email
      });

      // Identify your user with the Ionic User Service
      $ionicUser.identify(user).then(function() {
        // Register with the Ionic Push service.  All parameters are optional.
        $ionicPush.register({
          canShowAlert: true, //Can pushes show an alert on your screen?
          canSetBadge: true, //Can pushes update app icon badges?
          canPlaySound: true, //Can notifications play a sound?
          canRunActionsOnWake: true, //Can run actions outside the app,
          onNotification: function(notification) {
            // Handle new push notifications here
            return true;
          }
        });
      });

    	$rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
  	    userRegister.token = data.token;
        userRegister.platform = data.platform;

      	localStorage.setObj("userData", userRegister);

        localStorage.setItem("registred", true);

      	$(".loading-register").addClass("hide");
        
        location.href = "#/tab/home";
    	});
    }, 1000);
  };
})
