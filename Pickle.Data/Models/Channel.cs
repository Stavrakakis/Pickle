using System;

namespace Pickle.Data.Models
{
    public class Channel
    {
        private readonly string id;
        private readonly string hubId;
        private readonly string name;
        private readonly DateTime createdDate;

        public Channel(string id, string hubId, string name, DateTime createdDate)
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

            if (createdDate == null)
            {
                throw new ArgumentNullException(nameof(createdDate));
            }

            this.id = id;
            this.hubId = hubId;
            this.name = name;
            this.createdDate = createdDate;
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

        public DateTime CreatedDate
        {
            get
            {
                return createdDate;
            }
        }
    }
}
