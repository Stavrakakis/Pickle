﻿using Microsoft.AspNet.Mvc;
using Moq;
using Pickle.Api.ApiRequestModels;
using Pickle.Api.Controllers;
using Pickle.Data.Models;
using Pickle.Data.Repositories;
using Pickle.Web.Api.Providers;
using Pickle.Web.Tests.Attributes;
using Pickle.Web.Tests.Helpers;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Xunit;

namespace Pickle.Web.Tests.Controllers
{
    public class MessagesControllerTests
    {
        [Theory]
        [AutoMoqData]
        public async Task GetPagedMessagesForChannelCallsCorrectRepositoryMethod(
            Mock<IUsernameProvider> usernameProvider,    
            Mock<IRepository<ChatMessage>> messageRepository,
            string hubId,
            string channelId,
            string username)
        {
            usernameProvider.Setup(p => p.GetUsername()).ReturnsAsync(username);

            var controllerUnderTest = new MessagesController(usernameProvider.Object, messageRepository.Object);

            await controllerUnderTest.GetPagedMessagesForChannel(hubId, channelId, 1, 100);

            messageRepository.Verify(mock => mock.GetPaged(1, 100, It.IsAny<Expression<Func<ChatMessage, bool>>>()), Times.Once);
        }

        [Theory]
        [AutoMoqData]
        public async Task PostNewMessagesCallsTheRepositoryInsertMethod(
            Mock<IUsernameProvider> usernameProvider,
            Mock<IRepository<ChatMessage>> messageRepository,
            string hubId,
            string channelId,
            string username,
            NewMessageModel newMessage)
        {
            usernameProvider.Setup(p => p.GetUsername()).ReturnsAsync(username);

            var controllerUnderTest = new MessagesController(usernameProvider.Object, messageRepository.Object);

            await controllerUnderTest.PostNewMessage(hubId, channelId, newMessage);

            var expectedMessageParameter = new ChatMessage(username, channelId, newMessage.Message);
            
            messageRepository.Verify(mock => mock.Insert(It.Is<ChatMessage>(parameter => parameter.JsonEquals(expectedMessageParameter))), Times.Once);
        }
    }
}