using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ZinOS.Services.Definitions
{
    public class ValidationException : Exception
    {
        public IEnumerable<ValidationError> Errors { get; private set; }

        public ValidationException(IEnumerable<ValidationError> errors)
        {
            Errors = errors;
        }

        public ValidationException(string fieldName, string errorMessage)
        {
            Errors = new[]
                         {
                             new ValidationError(fieldName, errorMessage)
                         };
        }
    }

    public class ValidationError
    {
        public ValidationError(string fieldName, string errorMessage)
        {
            ErrorKey = fieldName;
            ErrorMessage = errorMessage;
        }

        public string ErrorKey { get; private set; }

        public string ErrorMessage { get; private set; }
    }
}
