using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public class LangIndex
    {
        private readonly Table2D<string, string, string> codeAndKeyToText;

        public LangIndex(TableData Table, TableConfigData Config)
        {
            var res = new Table2D<string, string, string>();
            Table.ServerLangTblList.ForEach(tbl =>
            {
                res.Set("zh_chs", tbl.ConfigPath, tbl.Zh_chs);
                res.Set("zh_cht", tbl.ConfigPath, tbl.Zh_cht);
                res.Set("en", tbl.ConfigPath, tbl.En);
            });
            Table.ClientLangTblList.ForEach(tbl =>
            {
                res.Set("zh_chs", tbl.ConfigPath, tbl.Zh_chs);
                res.Set("zh_cht", tbl.ConfigPath, tbl.Zh_cht);
                res.Set("en", tbl.ConfigPath, tbl.En);
            });
            codeAndKeyToText = res;
        }

        public string GetTextByCodeAndKey(string code, string key)
        {
            return codeAndKeyToText.GetOrDefault(code, key) ?? key;
        }

    }
}