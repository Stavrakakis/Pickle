namespace Pickle.Api.Models
{
    public class Channel
    {
        private readonly string id;
        private readonly string name;

        public Channel(string id, string name)
        {
            this.id = id;
            this.name = name;
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
