using Pickle.Data.Repositories;
using System;
using System.Threading.Tasks;
using PagedList;
using System.Linq.Expressions;
using Microsoft.Data.Entity;
using Pickle.Data.EntityFramework.Context;
using System.Linq;
using Pickle.Data.Mapping;

namespace Pickle.Data.EntityFramework.Repositories
{
    public class EntityFrameworkRepository<TDomain, TDto> : IRepository<TDomain> where TDomain : class where TDto : class
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

        public Task<IPagedList<TDomain>> GetPaged(
            int pageNumber = 1, int pageSize = 100,
            Expression<Func<TDomain, bool>> filter = null, 
            Func<TDomain, object> orderBy = null)
        {
            var items = this.dbSet.AsQueryable();

            if (filter != null)
            { 
                var dtoFilter = MappingHelper.ConvertExpression<TDomain, TDto>(filter);
                items = items.Where(dtoFilter);
            }
            
            var mapped = items.ToList().Select(o => this.mapper.Map<TDto, TDomain>(o));

            return Task.FromResult(mapped.ToPagedList(pageNumber, pageSize));
        }

        public async Task<TDomain> Insert(TDomain value)
        {
            var dto = this.mapper.Map<TDomain, TDto>(value);
            
            this.dbSet.Add(dto);

            await this.context.SaveChangesAsync();
            
            return this.mapper.Map<TDto, TDomain>(dto);
        }
    }
}
