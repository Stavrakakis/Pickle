using PagedList;
using Pickle.Data.Extensions;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Pickle.Data.Repositories
{
    public class InMemoryGenericRepository<T> : IRepository<T>
    {
        private static List<T> objects = new List<T>();

        public Task<IPagedList<T>> GetPaged(int pageNumber = 1, int pageSize = 100, Expression<Func<T, bool>> filter = null)
        {
            var pagedResults = objects.FilterIfDefined(filter)
                                      .ToPagedList(pageNumber, pageSize);

            return Task.FromResult(pagedResults);
        }

        public Task<T> Insert(T value)
        {
            if (value == null)
            {
                throw new ArgumentNullException(nameof(value));
            }

            objects.Add(value);

            return Task.FromResult(value);
        }
    }
}
