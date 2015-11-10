using Pickle.Data.Models;
using Pickle.Data.Repositories;
using System;
using System.Collections.Generic;

namespace Pickle.Web.Api.Seed
{
    public class InMemoryDataSeeder
    {
        public static void Seed(IRepository<Hub> hubRepository, IRepository<Channel> channelRepository, IRepository<ChatMessage> messageRepository)
        {

            hubRepository.Insert(new Hub("scottlogic", "Scott Logic", new List<Channel>()));

            channelRepository.Insert(new Channel("bristol", "scottlogic", "Bristol", DateTime.Now));
            channelRepository.Insert(new Channel("edinburgh", "scottlogic", "Edinburgh", DateTime.Now));
            channelRepository.Insert(new Channel("newcastle", "scottlogic", "Newcastle", DateTime.Now));

            messageRepository.Insert(new ChatMessage("nico", "bristol", "Bristol message", DateTime.Now));
            messageRepository.Insert(new ChatMessage("nico", "edinburgh", "Edinburgh message", DateTime.Now));
            messageRepository.Insert(new ChatMessage("nico", "newcastle", "Newcastle message", DateTime.Now));
        }
    }
}
