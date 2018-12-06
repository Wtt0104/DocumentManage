using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Toolkits.DateTimeExt;

namespace C.BLL
{
    /// <summary>
    /// 文档操作
    /// </summary>
    public class File : DbContext
    {
        public File(string code)
        {
            Db.MappingTables.Add("template_category", code + "_doc_category");
            Db.MappingTables.Add("template_file", code + "_doc_file");
            Db.MappingTables.Add("template_filecategory", code + "_doc_filecategory");
        }

        /// <summary>
        /// 添加实体
        /// </summary>
        /// <param name="cEntity"></param>
        /// <returns></returns>
        public bool AddFile(Model.Request.Flie rflie)
        {
            long id = new Random().Next(1000, 9999) + Time.GetTimestamp(DateTime.Today);
            Model.template_file file = new Model.template_file
            {
                Id = id,
                Title = rflie.Title,
                Describe = rflie.Describe,
                DocUrl = rflie.DocUrl,
                DocText = rflie.DocText,
                PhysicalPath = rflie.PhysicalPath,
                ClickNumber = 0,
                Submitter = 1,
                UploadTime = Time.GetTimestamp(),
                CategoryId = rflie.CategoryId
            };
            if (FileDb.Insert(file))
            {
                return true;
            }
            else
            {
                throw new Exception("上传失败");
            }
        }

        /// <summary>
        /// 获得实体列表
        /// </summary>
        /// <param name="cAssemblyId"></param>
        /// <returns></returns>
        public List<Model.Return.ReturnFile> GetFileList(int categoryId, string search, string code)
        {
            List<int> cAssemblyIds = new Category(code).GetCategoryId(categoryId);
            return Db.Queryable<Model.template_file, Model.template_category>((f, c) => f.CategoryId == c.Id)
                .Where((f, c) => cAssemblyIds.Contains(c.Id))
                .WhereIF(!string.IsNullOrEmpty(search), (f, c) => f.Title.Contains(search))
                .Select((f, c) => new Model.Return.ReturnFile { Id = f.Id, Title = f.Title, CategoryName = c.Name, ClickNumber = f.ClickNumber, Describe = f.Describe })
                .ToList();
        }

        /// <summary>
        /// 根据ID获取实体信息
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        public Model.Return.ReturnFileDetails GetFileInfo(long fileId)
        {
            Model.template_file file = FileDb.GetById(fileId);
            Model.Return.ReturnFileDetails returnFileDetails = Db.Queryable<Model.template_file, Model.template_category>((f, c) => f.CategoryId == c.Id)
                .Where((f, c) => f.Id == fileId)
                .Select((f, c) => new Model.Return.ReturnFileDetails
                {
                    Id = f.Id,
                    Title = f.Title,
                    CategoryName = c.Name,
                    ClickNumber = f.ClickNumber,
                    Describe = f.Describe,
                    DocText = f.DocText,
                    DocUrl = f.DocUrl,
                    PhysicalPath = f.PhysicalPath,
                    Submitter = f.Submitter,
                    UploadTime = f.UploadTime
                })
                .ToList()[0];
            file.ClickNumber++;
            FileDb.Update(file);
            return returnFileDetails;
        }

        public Model.template_file GetFileInfo2(long fileId)
        {
            Model.template_file file = FileDb.GetById(fileId);
            file.ClickNumber++;
            FileDb.Update(file);
            return file;
        }

        public Tuple<List<Model.template_file>, int> GetFileList2(int index, int count, string search, string code)
        {
            var list = Db.Queryable<Model.template_file>().OrderBy(o => o.UploadTime, OrderByType.Desc).ToPageList(index, count);
            int c = FileDb.Count(o => o.Id > 0);
            return new Tuple<List<Model.template_file>, int>(list, c);
        }
    }
}