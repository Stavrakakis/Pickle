using System;

namespace Pickle.Data.Models
{
    public class ChatMessage
    {
        private readonly string id;
        private readonly string channelId;
        private readonly string message;
        private readonly string username;
        private readonly DateTime createdDate;

        public ChatMessage(string username, string channelId, string message, DateTime createdDate)
        {
            if (username == null)
            {
                throw new ArgumentNullException(nameof(username));
            }

            if (channelId == null)
            {
                throw new ArgumentNullException(nameof(channelId));
            }

            if (message == null)
            {
                throw new ArgumentNullException(nameof(message));
            }
            
            if (createdDate == null)
            {
                throw new ArgumentNullException(nameof(createdDate));
            }

            this.id = Guid.NewGuid().ToString();
            this.username = username;
            this.channelId = channelId;
            this.message = message;
            this.createdDate = createdDate;
        }

        public string Id
        {
            get
            {
                return id;
            }
        }

        public string ChannelId
        {
            get
            {
                return channelId;
            }
        }

        public string Message
        {
            get
            {
                return message;
            }
        }

        public string Username
        {
            get
            {
                return username;
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
