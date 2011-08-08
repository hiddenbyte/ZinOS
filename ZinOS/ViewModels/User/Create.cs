using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Web;

namespace ZinOS.ViewModels.User
{
    public class Create 
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Username { get; set; }
        
        [RetypePassword("RetypePassword", ErrorMessage = "password and retype password should be equal")]
        [Required]
        public string Password { get; set; }

        [Required]
        public string RetypePassword { get; set; }

        public Data.Entities.User GetUser()
        {
            return new Data.Entities.User
                       {
                           Name = Name,
                           Username = Username,
                           Password = Password
                       };
        }
    }

    public class RetypePasswordAttribute : ValidationAttribute
    {
        private readonly string _retypePasswordFieldName;

        public RetypePasswordAttribute(string retypePasswordFieldName)
        {
            _retypePasswordFieldName = retypePasswordFieldName;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null)
            {
                var modelType = validationContext.ObjectType;

                var prop = modelType.GetProperty(_retypePasswordFieldName);

                if (prop == null)
                    return base.IsValid(value, validationContext);

                var retypePassword = prop.GetValue(validationContext.ObjectInstance, null);


                if (!value.ToString().Equals(retypePassword.ToString()))
                    return new ValidationResult(ErrorMessage);
            }

            return base.IsValid(value, validationContext);
        }

        public override bool IsValid(object value)
        {
            return value != null;
        }
    }
}