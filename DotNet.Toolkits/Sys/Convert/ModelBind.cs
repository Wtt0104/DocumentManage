using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Toolkits.ConvertExt
{
    public class ModelBind<T>
    {
        public static T BindList(T model, List<KeyValuePair<string, string>> list)
        {
            Type type = model.GetType(); //获取类型
            FieldInfo[] fields = type.GetFields(BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.Static);
            foreach (FieldInfo m in fields)
            {
                var value = list.FirstOrDefault(o => "_" + o.Key == m.Name).Value;
                if (value == null || value == "")
                    continue;
                else
                    m.SetValue(model, Convert.ChangeType(value, m.FieldType));
            }

            return model;
        }
    }
}