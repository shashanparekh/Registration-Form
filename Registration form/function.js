
    var app = angular.module('myApp', ["ngRoute"]);
    app.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider){
        $routeProvider.when("/",{
                   "templateUrl":"information.html"
                 }).when("/infoo",{
                    "templateUrl":"view.html"
                 }).otherwise({
                     redirectTo:"/index"
                 });
                 $locationProvider.hashPrefix('');
    }]);
    app.controller('myCtrl', function($scope,passing){
        $scope.submit=function(){
            
            if($scope.username==null||$scope.phone==null|| $scope.age==null||$scope.gender==null||$scope.status==null)
            {
                alert("enter the required data");
            }else{
               passing.set($scope.username,$scope.phone,$scope.age,$scope.gender,$scope.status); 
               $scope.username=null;
            $scope.phone=null;
            $scope.age=null;
            $scope.gender=null;
            $scope.status=null; 
            passing.check(1); 
            
           } 
            } 
        $scope.reset=function(){
            $scope.username=null;
            $scope.phone=null;
            $scope.age=null;
            $scope.gender=null;
            $scope.status=null; 
           }
    });
    app.controller("myCtr2",function($scope,$rootScope,passing){
        $scope.print=function(printwindow){
            var n1=document.getElementById("printwindow").innerHTML;
            var n2=document.body.innerHTML;
            document.body.innerHTML=n1;
            window.print();
            document.body.innerHTML=n2;
        };
        $rootScope.$on("dummyevent1",function(){
            $scope.show11=passing.check2();
        });
        $rootScope.$on("dummyevent",function(){
            $scope.name=passing.get1();
            $scope.contact=passing.get2();
            $scope.age=passing.get3();
            $scope.gender=passing.get4();
            $scope.status=passing.get5();
        });
    });
    app.service("passing",function($rootScope){
        this.name="";
        this.phone="";
        this.age="";
        this.gender="";
        this.status="";
        this.boo="";
        this.check=function(seee){
            if(seee==1){
                this.boo="true";
            }else{
                this.boo="false";
            }
            $rootScope.$emit("dummyevent1");
        };
        this.check2=function(){
            return this.boo;
        };
        this.set=function(user,phone,age,gender,status){
            this.name=user;
            this.phone=phone;
            this.age=age;
            this.gender=gender;
            this.status=status;   
            $rootScope.$emit("dummyevent");
        }
        this.get1=function(){
            return this.name;
        }
        this.get2=function(){
            return this.phone;
        }
        this.get3=function(){
            return this.age;
        }
        this.get4=function(){
            return this.gender;
        }
        this.get5=function(){
            return this.status;
        }
    });
    