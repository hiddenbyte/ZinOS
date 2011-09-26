$(document).ready(function () {
    $('#my-zinos-desktop').click(function() {
        ZinOS.RedirectToPage('/Desktop/' + ZinOS.Bag.DesktopId);
    });

    $('#my-zinos-account').click(function () {
        ZinOS.RedirectToPage('/User/Edit');
    });
    
    $('#my-zinos-developer').click(function () {
        ZinOS.RedirectToPage('/Developers/MyApps');
    });
});