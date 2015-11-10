using System;

namespace Pickle.Data.DataModels
{
    public class ChatMessageDataModel
    {
        public string Id
        {
            get; set;
        }

        public string ChannelId
        {
            get; set;
        }

        public string Message
        {
            get; set;
        }

        public string Username
        {
            get; set;
        }

        public DateTime CreatedDate { get; set; }
    }
}
