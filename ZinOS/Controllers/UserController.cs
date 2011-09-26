using System.Web.Mvc;
using ZinOS.Mvc;
using ZinOS.Services.Definitions;
using ZinOS.OAuth;
using ZinOS.Services.Definitions.Users;

namespace ZinOS.Controllers
{
    public class UserController : ZinOSController
    {
        private readonly IUserService _userService;
        private readonly IDropboxService _dropboxService;

        public UserController(IUserService userService, IDropboxService dropboxService)
        {
            _userService = userService;
            _dropboxService = dropboxService;
        }

        [HttpGet]
        [IgnoreAuthorization]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [IgnoreAuthorization]
        public ActionResult Create(ViewModels.User.Create userCreateModel)
        {
            if (!ModelState.IsValid)
                return View();

            try
            {
                var newUser = userCreateModel.GetUser();
                _userService.CreateUser(newUser);
            }
            catch (ValidationException validationException)
            {
                foreach (var error in validationException.Errors)
                    ModelState.AddModelError(error.ErrorKey, error.ErrorMessage);
            }

            if (ModelState.IsValid)
                return RedirectToAction("UserCreated");

            return View();
        }

        [HttpGet]
        [IgnoreAuthorization]
        public ActionResult UserCreated()
        {
            return View();
        }

        [HttpGet]
        public ActionResult UserEdited()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Edit()
        {
            var user = _userService.GetUserById(CurrentUserId);
            return View(user);
        }

        [HttpPost]
        public ActionResult Edit(ViewModels.User.Edit userEditModel)
        {
            if (!ModelState.IsValid)
            {
                var user = _userService.GetUserById(CurrentUserId);
                return View(user);
            }

            try
            {
                _userService.ChangeUserPassword(CurrentUserId,userEditModel.Password);
            }
            catch (ValidationException validationException)
            {
                foreach (var error in validationException.Errors)
                    ModelState.AddModelError(error.ErrorKey, error.ErrorMessage);
            }

            if (ModelState.IsValid)
                return RedirectToAction("UserEdited");

            return View(_userService.GetUserById(CurrentUserId));
        }

        [HttpGet]
        public ActionResult AuthenticateDropbox()
        {
            var consumer = new DropboxOAuthConsumer(CurrentUserId, _dropboxService, _userService);

            if (consumer.IsAuthorized())
                return RedirectToAction("Edit");

            consumer.RequestToken();

            return null;
        }
    }
}
