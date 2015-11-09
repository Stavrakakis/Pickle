using Pickle.Data.Models;
using Pickle.Data.Repositories;
using System.Collections.Generic;

namespace Pickle.Web.Api.Seed
{
    public class MongoSeeder
    {
        public static void Seed(IRepository<Hub> hubRepository, IRepository<Channel> channelRepository, IRepository<ChatMessage> messageRepository)
        {
            var scottlogic = new Hub("scottlogic", "Scott Logic", new List<Channel>() {
                new Channel("bristol", "scottlogic", "Bristol", new List<string>()),
                new Channel("edinburgh", "scottlogic", "Edinburgh", new List<string>()),
            });
            
            hubRepository.Insert(scottlogic);
            
        }
    }
}
