using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Pickle.Data.Models;
using System.Text.RegularExpressions;

namespace Pickle.Data.HubAccessStrategies
{
    public class EmailAddressAccessStrategy : IHubAccessStrategy
    {
        private readonly Regex emailPattern;
        
        public EmailAddressAccessStrategy(Regex emailPattern)
        {
            if (emailPattern == null)
            {
                throw new ArgumentNullException(nameof(emailPattern));
            }

            this.emailPattern = emailPattern;
        }

        public Regex EmailPattern
        {
            get
            {
                return emailPattern;
            }
        }

        public Task<bool> UserCanAccessHub(string username)
        {
            if (username == null)
            {
                throw new ArgumentNullException(nameof(username));
            }

            return Task.FromResult(emailPattern.IsMatch(username));
        }
    }
}
