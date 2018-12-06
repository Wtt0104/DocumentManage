using StackExchange.Redis;
using System;
using System.Threading.Tasks;
using Toolkits.IO;

namespace Toolkits.Redis
{
    public class RedisCache : IDisposable
    {
        private IDatabase Client { get; set; }

        private RedisClient RedisClient { get; set; }

        public RedisCache()
        {
            RedisClient = new RedisClient();
            Client = RedisClient.GetClient();
        }

        private string GetKey(string key)
        {
            return RedisConfig.Prefix + ":" + key;
        }

        public void Dispose()
        {
            RedisClient.Dispose();
        }

        /// <summary>
        /// 根据key获取缓存对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        public T Get<T>(string key) where T : class
        {
            return SerializeHelper.JsonToObject<T>(Client.StringGet(GetKey(key)).ToString());
        }

        /// <summary>
        /// 根据key获取缓存对象
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public string Get(string key)
        {
            return Client.StringGet(GetKey(key)).ToString();
        }

        /// <summary>
        /// 根据key获取缓存对象
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public async Task<object> GetAsync(string key)
        {
            object value = await Client.StringGetAsync(GetKey(key));
            return value;
        }

        /// <summary>
        /// 根据key获取缓存对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        public async Task<T> GetAsync<T>(string key) where T : class
        {
            object value = await Client.StringGetAsync(GetKey(key));
            return value as T;
        }

        /// <summary>
        /// 设置缓存
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <param name="expiry"></param>
        /// <param name="when"></param>
        /// <param name="flags"></param>
        public bool Set(string key, object value, TimeSpan? expiry = default(TimeSpan?), When when = When.Always, CommandFlags flags = CommandFlags.None)
        {
            return Client.StringSet(GetKey(key), SerializeHelper.ObjectToJson(value), expiry, when, flags);
        }

        /// <summary>
        /// 设置缓存
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <param name="expiry"></param>
        /// <param name="when"></param>
        /// <param name="flags"></param>
        /// <returns></returns>
        public async Task<bool> SetAsync(string key, object value, TimeSpan? expiry = default(TimeSpan?), When when = When.Always, CommandFlags flags = CommandFlags.None)
        {
            return await Client.StringSetAsync(GetKey(key), SerializeHelper.ObjectToJson(value), expiry, when, flags);
        }

        /// <summary>
        /// 判断在缓存中是否存在该key的缓存数据
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public bool Exists(string key)
        {
            return Client.KeyExists(GetKey(key));  //可直接调用
        }

        /// <summary>
        /// 判断在缓存中是否存在该key的缓存数据
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public async Task<bool> ExistsAsync(string key)
        {
            return await Client.KeyExistsAsync(GetKey(key));
        }

        /// <summary>
        /// 移除指定key的缓存
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public bool Remove(string key)
        {
            return Client.KeyDelete(GetKey(key));
        }

        /// <summary>
        /// 移除指定key的缓存
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public async Task<bool> RemoveAsync(string key)
        {
            return await Client.KeyDeleteAsync(GetKey(key));
        }

        /// <summary>
        /// 实现递增
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public long Increment(string key)
        {
            return Client.StringIncrement(GetKey(key), flags: CommandFlags.FireAndForget);
        }

        /// <summary>
        /// 实现递增
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public async Task<long> IncrementAsync(string key)
        {
            return await Client.StringIncrementAsync(GetKey(key), flags: CommandFlags.FireAndForget);
        }

        /// <summary>
        /// 实现递减
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public long Decrement(string key, string value)
        {
            return Client.HashDecrement(GetKey(key), value, flags: CommandFlags.FireAndForget);
        }

        /// <summary>
        /// 实现递减
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public async Task<long> DecrementAsync(string key, string value)
        {
            return await Client.HashDecrementAsync(GetKey(key), value, flags: CommandFlags.FireAndForget);
        }
    }
}