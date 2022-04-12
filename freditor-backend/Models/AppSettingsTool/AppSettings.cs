﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreditorBackend.Models.AppSettingsTool
{
    /// <summary>
    /// Class <c>AppSettings</c> manages some configurations for Web app.
    /// </summary>
    public class AppSettings
    {
        /// <summary>
        /// Property <c>Secret</c> represents special key.
        /// </summary>
        public string Secret { get; set; }
    }
}
