using System;
using System.Configuration;

namespace Toolkits.Redis
{
    public static class RedisConfig
    {
        public static readonly string ConnectServer = ConfigurationManager.AppSettings["ConnectServer"].ToString();

        public static readonly string Prefix = ConfigurationManager.AppSettings["Prefix"].ToString();

        public static readonly int Database = Convert.ToInt32(ConfigurationManager.AppSettings["Database"].ToString());
    }
}