using System;

namespace Pickle.Data.Models
{
    public class ChatMessage
    {
        private readonly string channelId;
        private readonly string message;
        private readonly string username;

        public ChatMessage(string username, string channelId, string message)
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

            this.username = username;
            this.channelId = channelId;
            this.message = message;
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
    }
}
