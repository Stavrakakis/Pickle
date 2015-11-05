using System.Collections;
using System.Collections.Generic;

namespace Pickle.Data.Models
{
    public class PagedCollection<T> : IEnumerable<T>
    {
        private readonly IEnumerable<T> enumerable;
        private readonly int pageNumber;
        private readonly int pageSize;
        private readonly int totalCount;

        public PagedCollection(IEnumerable<T> enumerable, int pageNumber, int pageSize, int totalCount)
        {
            this.enumerable = enumerable;
            this.pageNumber = pageNumber;
            this.pageSize = pageSize;
            this.totalCount = totalCount;
        }

        public int PageNumber
        {
            get
            {
                return pageNumber;
            }
        }

        public int PageSize
        {
            get
            {
                return pageSize;
            }
        }

        public int TotalCount
        {
            get
            {
                return totalCount;
            }
        }

        public IEnumerator<T> GetEnumerator()
        {
            return this.enumerable.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.enumerable.GetEnumerator();
        }
    }
}
