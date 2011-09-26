using System;
using System.Collections;
using System.Collections.Generic;

namespace ZinOS.Repositories.Definitions
{
    public class RepositoryException : Exception
    {
        public IEnumerable<RepositoryError> Errors { private set; get; }

        public RepositoryException(Type entityType, string entityAttributeName, string message)
        {
            Errors = new[]
                         {
                             new RepositoryError
                                 {
                                     EntityType = entityType,
                                     EntityAttributeName = entityAttributeName,
                                     Message = message
                                 }
                         };
        }

        public RepositoryException(IEnumerable<RepositoryError> errors)
        {
            Errors = errors;
        }
    }

    public class RepositoryError
    {
        public Type EntityType { get; set; }
        public string EntityAttributeName { get; set; }
        public string Message { get; set; }
    }
}
