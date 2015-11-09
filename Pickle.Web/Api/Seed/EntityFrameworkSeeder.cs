﻿using Pickle.Data.Models;
using Pickle.Data.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pickle.Web.Api.Seed
{
    public class EntityFrameworkSeeder
    {
        public static async Task Seed(IRepository<Hub> hubRepository, IRepository<Channel> channelRepository, IRepository<ChatMessage> messageRepository)
        {
            var bristol = new Channel("bristol", "scottlogic", "Bristol");
            var edinburgh = new Channel("edinburgh", "scottlogic", "Edinburgh");
            var newcastle = new Channel("newcastle", "scottlogic", "Newcastle");

            await channelRepository.Insert(bristol);
            await channelRepository.Insert(edinburgh);
            await channelRepository.Insert(newcastle);

            var scottlogic = new Hub("scottlogic", "Scott Logic", new List<Channel>() {
                bristol,
                edinburgh,
                newcastle
            });
            
            await hubRepository.Insert(scottlogic);
        }
    }
}
