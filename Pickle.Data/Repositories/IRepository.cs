using PagedList;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Pickle.Data.Repositories
{
    public interface IRepository<T>
    {
        /// <summary>
        /// Gets a paged collection of generic type T.
        /// </summary>
        /// <param name="pageNumber">Defaults to 1</param>
        /// <param name="pageSize">Defaults to 100</param>
        /// <param name="filter">An optional filter expression</param>
        /// <returns></returns>
        
        Task<IPagedList<T>> GetPaged(int pageNumber = 1, int pageSize = 100, Expression<Func<T, bool>> filter = null, Func<T, object> orderBy = null);
        
        /// <summary>
        /// Inserts an object into the repository
        /// </summary>
        /// <param name="value">The value to insert</param>
        /// <returns>The inserted value</returns>
        Task<T> Insert(T value);
    }
}
