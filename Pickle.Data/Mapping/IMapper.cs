namespace Pickle.Data.Mapping
{
    public interface IMapper
    {
        TResult Map<TSource, TResult>(TSource source);
    }
}
