using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using C.Model.Return;

namespace C.BLL
{
    /// <summary>
    /// 分类相关
    /// </summary>
    public class Category : DbContext
    {
        public Category(string code)
        {
            Db.MappingTables.Add("template_category", code + "_doc_category");
            Db.MappingTables.Add("template_file", code + "_doc_file");
        }

        /// <summary>
        /// 获得分类菜单
        /// </summary>
        /// <returns></returns>
        public List<ReturnCMenu> GetCategoryMenu()
        {
            List<Model.template_category> categories = CategoryDb.GetList();
            List<ReturnCMenu> returnCMenus = new List<ReturnCMenu>();
            for (int i = 0; i < categories.Count; i++)
            {
                returnCMenus.Add(new ReturnCMenu(categories[i]));
            }
            return MenuRecursion(returnCMenus);
        }

        /// <summary>
        /// 获取分类下所有分类ID
        /// </summary>
        /// <param name="cAssemblyId"></param>
        /// <returns></returns>
        public List<int> GetCategoryId(int categoryId)
        {
            List<int> categoryIdList = new List<int>();
            if (categoryId == 0)
            {
                categoryIdList = CategoryDb.GetList().OrderBy(o => o.Id).Select(o => o.Id).ToList();
            }
            else
            {
                categoryIdList = CategoryDb.GetList(o => o.FatherId == categoryId).OrderBy(o => o.Id).Select(o => o.Id).ToList();
                categoryIdList.Add(categoryId);
            }
            return categoryIdList;
        }

        public List<Category_FileForMenu> GetCategory_FileForMenus()
        {
            List<Model.template_category> categories = CategoryDb.GetList();
            List<Category_FileForMenu> menus = new List<Category_FileForMenu>();
            foreach (var topMenu in categories.Where(o => o.FatherId == 0).ToList())
            {
                menus.Add(new Category_FileForMenu(topMenu));
            }
            if (menus.Count() > 0)
            {
                foreach (var menu in menus)
                {
                    menu.SubMenu = categories.Where(o => o.FatherId == menu.Id).Select(o => new Category_FileForMenu.FileMenuByCategory
                    {
                        Id = o.Id,
                        Name = o.Name,
                        FatherId = o.FatherId,
                        Sort = o.Sort,
                        Files = FileDb.GetList(x => x.CategoryId == o.Id).Select(y => new Category_FileForMenu.File_IdAndTitle
                        {
                            FileId = y.Id,
                            Title = y.Title
                        }).ToList()
                    }).ToList();
                };
            }
            return menus;
        }

        #region 递归构建树形结构

        private List<ReturnCMenu> MenuRecursion(List<ReturnCMenu> menuList, int fatherId = 0)
        {
            List<ReturnCMenu> treeMenuList = new List<ReturnCMenu>();
            for (int i = 0; i < menuList.Count; i++)
            {
                if (menuList[i].FatherId == fatherId)
                {
                    menuList[i].SubMenu = MenuRecursion(menuList, menuList[i].Id);
                    treeMenuList.Add(menuList[i]);
                }
            }
            return treeMenuList;
        }

        #endregion 递归构建树形结构
    }
}