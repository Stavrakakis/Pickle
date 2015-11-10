using Pickle.Data.Repositories;
using System;
using System.Threading.Tasks;
using PagedList;
using System.Linq.Expressions;
using Microsoft.Data.Entity;
using Pickle.Data.EntityFramework.Context;
using System.Linq;
using Pickle.Data.Mapping;
using System.Collections.Generic;

namespace Pickle.Data.EntityFramework.Repositories
{
    public class EntityFrameworkRepository<TDto> : IRepository<TDto> where TDto : class
    {
        private readonly PickleContext context;
        private readonly DbSet<TDto> dbSet;
        private readonly IMapper mapper;

        public EntityFrameworkRepository(PickleContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
            this.dbSet = context.Set<TDto>();
        }

        public Task<IPagedList<TDto>> GetPaged(
            int pageNumber = 1, int pageSize = 100,
            Func<IEnumerable<TDto>, IEnumerable<TDto>> action = null)
        {
            var items = this.dbSet.AsEnumerable();

            if (action != null)
            {
                items = action.Invoke(items);
            }
            
            return Task.FromResult(items.ToPagedList(pageNumber, pageSize));
        }

        public async Task<TDto> Insert(TDto dto)
        {            
            this.dbSet.Add(dto);

            await this.context.SaveChangesAsync();

            return dto;
        }
    }
}
