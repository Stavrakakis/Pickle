using PagedList;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using Newtonsoft.Json;

namespace Pickle.Data.Repositories
{
    public class MongoRepository<T> : IRepository<T>
    {
        private readonly IMongoCollection<BsonDocument> collection;
        private readonly IMongoDatabase database;

        public MongoRepository()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            this.database = client.GetDatabase("pickle");
            this.collection = database.GetCollection<BsonDocument>(Pluralize(TypeName<T>()).ToString());
        }

        public Task<IPagedList<T>> GetPaged(int pageNumber = 1, int pageSize = 100, Expression<Func<T, bool>> filter = null)
        {

            throw new NotImplementedException();
        }

        public async Task<T> Insert(T value)
        {
            await this.collection.InsertOneAsync(ToDocument(value));

            return value;
        }

        private BsonDocument ToDocument(T value)
        {
            if (value == null)
            {
                throw new ArgumentNullException(nameof(value));
            }

            var jsonDoc = JsonConvert.SerializeObject(value);

            return MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(jsonDoc);
        }

        private static string Pluralize(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
            {
                throw new ArgumentNullException(nameof(input));
            }

            return string.Format("{0}s", input);
        }

        private string TypeName<TType>()
        {
            return typeof(TType).Name;
        }
    }
}
