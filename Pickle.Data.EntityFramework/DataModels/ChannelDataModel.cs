using System;

namespace Pickle.Data.DataModels
{
    public class ChannelDataModel
    {
        public string Id
        {
            get; set;
        }

        public string HubId
        {
            get; set;
        }

        public string Name
        {
            get; set;
        }

        public DateTime CreatedDate { get; set; }
    }
}
