using Pickle.Data.HubAccessStrategies;
using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Xunit;

namespace Pickle.Data.Tests.HubAccessStrategies
{
    public class EmailAddressAccessStrategyTests
    {
        private readonly Regex testGmailPattern = new Regex(@"^.*@gmail\.com$");

        [Fact]
        public void StrategyPassesForMatchingEmailAddress()
        {
            var userEmailAddress = "test.person@gmail.com";

            var strategyUnderTest = new EmailAddressAccessStrategy(testGmailPattern);

            Assert.True(strategyUnderTest.UserCanAccessHub(userEmailAddress).Result);
        }

        [Fact]
        public void StrategyFailsForNonMatchingEmailAddress()
        {
            var userEmailAddress = "test.person@hotmail.com";

            var strategyUnderTest = new EmailAddressAccessStrategy(testGmailPattern);

            Assert.False(strategyUnderTest.UserCanAccessHub(userEmailAddress).Result);
        }

        [Fact]
        public void ThrowsExceptionWhenRegexIsNull()
        {
            Assert.Throws<ArgumentNullException>(() => new EmailAddressAccessStrategy(null));
        }

        [Fact]
        public void ReturnsFalseWithEmptyString()
        {
            var strategyUnderTest = new EmailAddressAccessStrategy(testGmailPattern);
            
            Assert.False(strategyUnderTest.UserCanAccessHub("").Result);
        }

        [Fact]
        public async Task ThrowsExceptionWithNullInput()
        {
            var strategyUnderTest = new EmailAddressAccessStrategy(testGmailPattern);

            await Assert.ThrowsAsync<ArgumentNullException>(() => strategyUnderTest.UserCanAccessHub(null));
        }
    }
}
