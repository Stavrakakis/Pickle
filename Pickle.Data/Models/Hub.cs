using System;
using System.Collections.Generic;

namespace Pickle.Data.Models
{
    public class Hub
    {
        private readonly IEnumerable<Channel> channels;
        private readonly string id;
        private readonly string name;

        public Hub()
        {
        }

        public Hub(string id, string name, IEnumerable<Channel> channels)
        {
            if (id == null)
            {
                throw new ArgumentNullException(nameof(id));
            }

            if (name == null)
            {
                throw new ArgumentNullException(nameof(name));
            }

            if (channels == null)
            {
                throw new ArgumentNullException(nameof(channels));
            }

            this.id = id;
            this.name = name;
            this.channels = channels;
        }

        public IEnumerable<Channel> Channels
        {
            get
            {
                return channels;
            }
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
    }
}
