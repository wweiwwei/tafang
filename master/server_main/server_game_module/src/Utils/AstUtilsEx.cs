
namespace GamePlay;
public static class AstUtilsEx
{
    /** 优化过的eval，在公式是纯数字时直接返回，避免不必要的解析 */
    public static double EvalOptimize(string formula, Dictionary<string, double> env)
    {
        var ok = double.TryParse(formula, out var result);
        if (ok)
        {
            return result;
        }
        return AstUtil.Eval(formula, env);
    }
}