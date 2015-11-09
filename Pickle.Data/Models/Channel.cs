using System;
using System.Collections.Generic;

namespace Pickle.Data.Models
{
    public class Channel
    {
        private readonly string id;
        private readonly string hubId;
        private readonly string name;
        
        public Channel(string id, string hubId, string name)
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

            this.id = id;
            this.hubId = hubId;
            this.name = name;
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
    }
}
