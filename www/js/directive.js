/* angular.module('starter', [])
.directive('showInitials', function() {
    return function(scope, element, attrs) {
        var userVals = attrs.showInitials;
        var arrUserVals = userVals.split(',');
        if(arrUserVals[0] == "" || arrUserVals[0].lastIndexOf('default-image.png') != -1){
            var initialStr = (arrUserVals[1].substr(0, 1) + "" + arrUserVals[2].substr(0, 1)).toUpperCase();;
            var initialHtml = '<div class="avatar-framed text">'+initialStr+'</div>';
            $(element).parent().html(initialHtml);
        }
    }
}); */