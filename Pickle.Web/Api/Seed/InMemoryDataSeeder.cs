using Pickle.Data.Models;
using Pickle.Data.Repositories;
using System.Collections.Generic;

namespace Pickle.Web.Api.Seed
{
    public class InMemoryDataSeeder
    {
        public static void Seed(IRepository<Hub> hubRepository, IRepository<Channel> channelRepository, IRepository<ChatMessage> messageRepository)
        {

            hubRepository.Insert(new Hub("scottlogic", "Scott Logic", new List<Channel>()));

            channelRepository.Insert(new Channel("bristol", "scottlogic", "Bristol", new List<string>()));
            channelRepository.Insert(new Channel("edinburgh", "scottlogic", "Edinburgh", new List<string>()));
            channelRepository.Insert(new Channel("newcastle", "scottlogic", "Newcastle", new List<string>()));

            messageRepository.Insert(new ChatMessage("nico", "bristol", "Bristol message"));
            messageRepository.Insert(new ChatMessage("nico", "edinburgh", "Edinburgh message"));
            messageRepository.Insert(new ChatMessage("nico", "newcastle", "Newcastle message"));
        }
    }
}
