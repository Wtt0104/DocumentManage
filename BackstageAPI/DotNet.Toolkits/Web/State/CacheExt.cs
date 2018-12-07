using System;
using System.Runtime.Caching;

namespace Toolkits.Web
{
    public class CacheExt
    {
        public static object Get(string name)
        {
            ObjectCache cache = MemoryCache.Default;    //得到MemoryCache全局实例
            var myData = cache[name] as object;  //访问缓存数据
            return myData;
        }

        public static void Set(string name, object data)
        {
            ObjectCache cache = MemoryCache.Default;
            CacheItemPolicy policy = new CacheItemPolicy();  //创建缓存项策略
            policy.SlidingExpiration = new TimeSpan(6, 0, 0);    //设定某个时间段内未被访问将逐出缓存
            cache.Set(name, data, policy);  //设置缓存数据,如果已存在则覆盖
        }

        public static void Remove(string name)
        {
            ObjectCache cache = MemoryCache.Default;
            cache.Remove(name);
        }
    }
}