ZinOS.DOMReady(function () {
    ZinOS.BindEvent('click', 'my-zinos-desktop', function () { ZinOS.RedirectToPage('/Desktop/' + ZinOS.Bag.DesktopId); });
});