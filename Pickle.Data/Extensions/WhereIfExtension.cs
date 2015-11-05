using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Pickle.Data.Extensions
{
    public static class WhereIfExtension
    {
        /// <summary>
        /// Extension method to run a collection through a filter if it is defined.
        /// </summary>
        /// <typeparam name="T">The type of the collection</typeparam>
        /// <param name="collection">The collection to filter</param>
        /// <param name="filter">A filter function to use if not null</param>
        /// <returns></returns>
        public static IEnumerable<T> FilterIfDefined<T>(this IEnumerable<T> collection, Expression<Func<T, bool>> filter)
        {
            if (filter == null)
            {
                return collection;
            }

            var filterFunc = filter.Compile();

            return collection.Where(filterFunc);
        }
    }
}
