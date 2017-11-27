$( document ).ready(function() {
    nav.sideNavSetting();
});


var nav = (function () {
    function sideNavSetting() {
        $('div.sideNavOption').click(function () {
            console.log('click');
            let target = $('#' + $(this).attr('data-target'));

            if (target.hasClass('clicking')) return;

            $('div.sideNavItem').removeClass('clicking').hide();
            target.addClass('clicking').fadeIn(300);
        })
    }
    
    return {
        sideNavSetting:sideNavSetting,
    }
}());
