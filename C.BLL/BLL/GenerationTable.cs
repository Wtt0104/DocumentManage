using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C.BLL
{
    public class GenerationTable : DbContext
    {
        /// <summary>
        /// 根据表ID获取表字段与表名
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private Tuple<string, List<DbColumnInfo>> GetTableAttribute(int id)
        {
            string tableName = TableDb.GetById(id).Name;
            List<DbColumnInfo> dbColumnInfos = Db.Queryable<Model.doc_template_field, Model.doc_datatype>
                ((o, v) => o.DataType == v.Id)
                .Where(o => o.TableId == id)
                .Select((o, v) => new DbColumnInfo
                {
                    DbColumnName = o.Name,
                    DataType = v.RawType,
                    Length = v.Length
                })
                .ToList();
            return new Tuple<string, List<DbColumnInfo>>(tableName, dbColumnInfos);
        }

        /// <summary>
        /// 生成应用表，字段表
        /// </summary>
        /// <returns></returns>
        public bool CreateTable(string code)
        {
            List<int> ids = TableDb.GetList().Select(o => o.Id).ToList();
            bool flag = false;
            foreach (var id in ids)
            {
                var tableAttribute = GetTableAttribute(id);
                string tableName = code + tableAttribute.Item1;
                //循环建立主键与自增
                foreach (var a in tableAttribute.Item2)
                {
                    if (a.DbColumnName == "Id")
                    {
                        a.IsIdentity = true;
                        a.IsPrimarykey = true;
                    }
                }
                flag = Db.DbMaintenance.CreateTable(tableName, tableAttribute.Item2);
                if (!flag)
                {
                    throw new Exception("建表失败");
                }
            }
            return flag;
        }
    }
}