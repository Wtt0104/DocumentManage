using StackExchange.Redis;
using System;

namespace Toolkits.Redis
{
    public class RedisClient : IDisposable
    {
        private ConnectionMultiplexer ConnectionMultiplexer => CreateManager();
        private static readonly object Locker = new object();
        private static ConnectionMultiplexer Instance { get; set; }
        private readonly string _connectServer = RedisConfig.ConnectServer;

        private ConnectionMultiplexer CreateManager()
        {
            if (Instance != null && Instance.IsConnected) return Instance;
            lock (Locker)
            {
                if (Instance != null && Instance.IsConnected) return Instance;
                Instance = ConnectionMultiplexer.Connect(_connectServer);
                //注册如下事件
                Instance.ConnectionFailed += MuxerConnectionFailed;
                Instance.ConnectionRestored += MuxerConnectionRestored;
                Instance.ErrorMessage += MuxerErrorMessage;
                Instance.ConfigurationChanged += MuxerConfigurationChanged;
                Instance.HashSlotMoved += MuxerHashSlotMoved;
                Instance.InternalError += MuxerInternalError;
            }
            return Instance;
        }

        /// <summary>
        /// 配置更改时
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void MuxerConfigurationChanged(object sender, EndPointEventArgs e)
        {
            //Logger.Debug("Configuration changed: " + e.EndPoint);
        }

        /// <summary>
        /// 发生错误时
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void MuxerErrorMessage(object sender, RedisErrorEventArgs e)
        {
            //Logger.Debug("ErrorMessage: " + e.Message);
        }

        /// <summary>
        /// 重新建立连接之前的错误
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void MuxerConnectionRestored(object sender, ConnectionFailedEventArgs e)
        {
            //Logger.Debug("ConnectionRestored: " + e.EndPoint);
        }

        /// <summary>
        /// 连接失败 ， 如果重新连接成功你将不会收到这个通知
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void MuxerConnectionFailed(object sender, ConnectionFailedEventArgs e)
        {
            //Logger.Debug("重新连接：Endpoint failed: " + e.EndPoint + ", " + e.FailureType + (e.Exception == null ? "" : (", " + e.Exception.Message)));
        }

        /// <summary>
        /// 更改集群
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void MuxerHashSlotMoved(object sender, HashSlotMovedEventArgs e)
        {
            //Logger.Debug("HashSlotMoved:NewEndPoint" + e.NewEndPoint + ", OldEndPoint" + e.OldEndPoint);
        }

        /// <summary>
        /// redis类库错误
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void MuxerInternalError(object sender, InternalErrorEventArgs e)
        {
            //Logger.Debug("MuxerInternalError");
        }

        public IDatabase GetClient()
        {
            return ConnectionMultiplexer.GetDatabase(RedisConfig.Database);
        }

        public void Dispose()
        {
            ConnectionMultiplexer.Dispose();
        }
    }
}