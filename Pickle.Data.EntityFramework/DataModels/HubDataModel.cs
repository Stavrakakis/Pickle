using System.Collections.Generic;

namespace Pickle.Data.DataModels
{
    public class HubDataModel
    {
        public ICollection<ChannelDataModel> Channels
        {
            get;set;
        }

        public string Id
        {
            get; set;
        }

        public string Name
        {
            get; set;
        }
    }
}
