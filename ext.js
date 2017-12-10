function isModile(){
//    console.log($(window).width());
    return $(window).width() <= 768 ;
}

function createLoadingAnimation(){
    var circleContainer = jQuery('<div/>',{
        class:'sk-fading-circle'
    });
    
    for(let i = 1;i<=12;++i){
        jQuery('<div/>',{
            class:'sk-circle'+' sk-circle'+i,
        }).appendTo(circleContainer);
    }
    return circleContainer
}