using System;
using System.Collections.Generic;

namespace Pickle.Data.Models
{
    public class Channel
    {
        private readonly string id;
        private readonly string name;
        private readonly IEnumerable<string> userIds;

        public Channel(string id, string name, IEnumerable<string> userIds)
        {
            if (id == null)
            {
                throw new ArgumentNullException(nameof(id));
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
