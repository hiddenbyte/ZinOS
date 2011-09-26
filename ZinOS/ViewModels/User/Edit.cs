using System.ComponentModel.DataAnnotations;

namespace ZinOS.ViewModels.User
{
    public class Edit
    {
        [RetypePassword("RetypePassword", ErrorMessage = "password and retype password should be equal")]
        [Required]
        public string Password { get; set; }

        [Required]
        public string RetypePassword { get; set; }
    }
}