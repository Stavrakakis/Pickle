using PagedList;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Pickle.Data.Repositories
{
    public class InMemoryGenericRepository<T> : IRepository<T>
    {
        private static List<T> objects = new List<T>();

        public void Dispose()
        {
            
        }

        public Task<IPagedList<T>> GetPaged(int pageNumber = 1, int pageSize = 100, Func<IEnumerable<T>, IEnumerable<T>> action = null)
        {

            var results = objects.AsEnumerable<T>();

            if (action != null) {
                results = action.Invoke(results);
            }

            var pagedResults = results.ToPagedList(pageNumber, pageSize);

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
