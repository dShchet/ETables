var eTable = angular.module('eTable', ["ngRoute"]);

eTable.controller('MainCtrl',['$scope','$timeout','$http', function($scope, $timeout, $http) {
// $scope.shot=true;
$scope.shot=false;
$scope.type="column";
$scope.wheelName="";
$scope.wheelForm="";
$scope.wheelPos="";
$scope.wheelShow =function(wheelName, el){
    $scope.wheelName=wheelName;
    $scope.wheelForm=el;
    $scope.wheelPos=1;
    $('.wheelsWrap2, .shadow').css("left","0%");
    $('.wheelNHide,.wheelRHide,.wheelVHide,.wheelMHide,.wheelTable,.wheelGraph,.wheelBlock2').hide();
    if(el === ".wheelNHide"){$('.dd').nestable('collapseAll')}
    $(el).css("display","block")
}
$scope.wheelHide=function(pos) {
    $scope.wheelPos=1;
    if($scope.wheelPos==1){
        $('.wheelNHide,.wheelRHide,.wheelVHide,.wheelMHide,.wheelTable,.wheelGraph,.wheelBlock2').hide();
        $('.shadow, .wheelsWrap2').css("left","-150%");
    }else{
        $('.wheelNHide,.wheelRHide,.wheelVHide,.wheelMHide,.wheelTable,.wheelGraph,.wheelBlock2').hide();
        $scope.wheelPos=1;
        if($scope.wheelForm === ".wheelNHide"){$('.dd').nestable('collapseAll')}
        $($scope.wheelForm).css("display","block")
    }
};
$scope.wheelShow2=function(el,name) {
    $scope.wheelBlock2Name=name;
    $scope.wheelPos=1;

        $('.wheelsWrap2, .shadow').css("left","0%");

    $('.wheelNHide,.wheelRHide,.wheelVHide,.wheelMHide').hide();
    $(el).css("display","table-cell");
}

}]);
