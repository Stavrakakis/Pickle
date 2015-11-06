﻿using System;
using System.Collections.Generic;

namespace Pickle.Data.Models
{
    public class Channel
    {
        private readonly string id;
        private readonly string hubId;
        private readonly string name;
        private readonly IEnumerable<string> userIds;

        public Channel(string id, string hubId, string name, IEnumerable<string> userIds)
        {
            if (id == null)
            {
                throw new ArgumentNullException(nameof(id));
            }

            if (hubId == null)
            {
                throw new ArgumentNullException(nameof(hubId));
            }

            if (name == null)
            {
                throw new ArgumentNullException(nameof(name));
            }

            if (userIds == null)
            {
                throw new ArgumentNullException(nameof(userIds));
            }

            this.id = id;
            this.hubId = hubId;
            this.name = name;
            this.userIds = userIds;
        }

        public string Id
        {
            get
            {
                return id;
            }
        }

        public string HubId
        {
            get
            {
                return hubId;
            }
        }

        public string Name
        {
            get
            {
                return name;
            }
        }

        public IEnumerable<string> UserIds
        {
            get
            {
                return userIds;
            }
        }
    }
}