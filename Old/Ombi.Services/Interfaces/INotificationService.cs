﻿#region Copyright
// /************************************************************************
//    Copyright (c) 2016 Jamie Rees
//    File: INotificationService.cs
//    Created By: Jamie Rees
//   
//    Permission is hereby granted, free of charge, to any person obtaining
//    a copy of this software and associated documentation files (the
//    "Software"), to deal in the Software without restriction, including
//    without limitation the rights to use, copy, modify, merge, publish,
//    distribute, sublicense, and/or sell copies of the Software, and to
//    permit persons to whom the Software is furnished to do so, subject to
//    the following conditions:
//   
//    The above copyright notice and this permission notice shall be
//    included in all copies or substantial portions of the Software.
//   
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
//    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
//    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
//    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//  ************************************************************************/
#endregion

using System.Threading.Tasks;
using Ombi.Core.SettingModels;
using Ombi.Services.Notification;

namespace Ombi.Services.Interfaces
{
    public interface INotificationService
    {
        /// <summary>
        /// Sends a notification to the user. This one is used in normal notification scenarios 
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        Task Publish(NotificationModel model);
        Task PublishTest(NotificationModel model, Settings settings, INotification type);
        /// <summary>
        /// Sends a notification to the user, this is usually for testing the settings.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <param name="settings">The settings.</param>
        /// <returns></returns>
        Task Publish(NotificationModel model, Settings settings);
        void Subscribe(INotification notification);
        void UnSubscribe(INotification notification);

    }
}