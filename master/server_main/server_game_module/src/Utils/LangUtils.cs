using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay;

public class LangUtils
{
    public static string GetText(string baseStr, string[] extra, string lang)
    {
        var baseText = GIndex.Ins.Lang.GetTextByCodeAndKey(lang, baseStr);
        if (extra.Length == 0)
        {
            return baseText;
        }
        var extraText = extra.Select(key =>
        {
            if (key.StartsWith("_rs"))
            {
                return key.Substring(3);
            }
            else
            {
                return GIndex.Ins.Lang.GetTextByCodeAndKey(lang, key);
            }
        }).ToArray();
        var res = baseText;
        for (int i = 0; i < extraText.Length; i++)
        {
            var text = extraText[i];
            res = res.Replace($"xxx_{i + 1}", text);
        }
        return res;
    }

}
