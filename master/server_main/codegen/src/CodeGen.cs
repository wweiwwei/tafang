using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public static class CodeGen
    {
        public static void GenerateCode()
        {
            GenerateCacheHandler();
            GenerateRequestHandler();
        }
        private static void GenerateCacheHandler()
        {
            var template = @"using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Serilog;

namespace GamePlay
{
    public class CacheHandler
    {
        public PlayerDataManager Ctx;
        public CacheHandler(PlayerDataManager Ctx)
        {
            this.Ctx = Ctx;
        }
【keyFieldParts】
        public INotifyMessage CacheHandle(string path, bool partial, ImmutableHashSet<dynamic> keySet)
        {
            switch (path)
            {
【caseParts】
                default:
                    {
                        Log.Warning($""PlayerGrain roleId:{Ctx.RoleData.id} no such cache route {path}"");
                        return new NotifyCacheMessage(path, null);
                    }
            }

        }

    }
}";
            var keyTemplate = @"        private ImmutableHashSet<【keyType】> 【keyName】_keys = ImmutableHashSet<【keyType】>.Empty;";
            var caseTemplatePartial = @"                case ""【keyName】"":
                    {
                        var data = Ctx.【manager】.【method】();
                        if(partial)
                        {
                            var patch = data.Where(kv => keySet.Contains(kv.Key)).ToImmutableDictionary(kv => kv.Key, kv => kv.Value);
                            var curKeySet = data.Keys.ToImmutableHashSet();
                            var delKey = 【keyName】_keys.Except(curKeySet).ToImmutableHashSet();
                            【keyName】_keys = curKeySet;
                            return new NotifyPartialCacheMessage(path, patch, delKey, partial);
                        }
                        else
                        {
                            【keyName】_keys = data.Keys.ToImmutableHashSet();
                            return new NotifyPartialCacheMessage(path, data, ImmutableHashSet<object>.Empty, partial);
                        }
                    }";
            var caseTemplate = @"                case ""【keyName】"":
                    {
                        var data = Ctx.【manager】.【method】();
                        return new NotifyCacheMessage(path, data);
                    }";
            var keyPartList = PlayerDataManager.CacheRoute.Values.Where(v => v.Partial).Select(v =>
            {
                var keyName = v.Path;
                var keyType = v.HandlerMethod.ReturnType.GenericTypeArguments[0].FullName;
                return keyTemplate.Replace("【keyName】", keyName).Replace("【keyType】", keyType);
            });
            var keyPart = string.Join("\n", keyPartList);
            var casePartList = PlayerDataManager.CacheRoute.Values.Select(v =>
            {
                var keyName = v.Path;
                var manager = v.ManagerField.Name;
                var method = v.HandlerMethod.Name;
                if (v.Partial)
                {
                    return caseTemplatePartial.Replace("【keyName】", keyName).Replace("【manager】", manager).Replace("【method】", method);
                }
                else
                {
                    return caseTemplate.Replace("【keyName】", keyName).Replace("【manager】", manager).Replace("【method】", method);
                }
            });
            var casePart = string.Join("\n", casePartList);
            var code = template.Replace("【keyFieldParts】", keyPart).Replace("【caseParts】", casePart);
            File.WriteAllText("../server_game_module/src/Game/Generated/CacheHandler.cs", code);
        }

        private static void GenerateRequestHandler()
        {
            var template = @"using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public class RequestHandler
    {
        public PlayerDataManager Ctx;
        public RequestHandler(PlayerDataManager Ctx)
        {
            this.Ctx = Ctx;
        }

        public async Task<object?> RequestHandle(string path, JObject? param)
        {
            switch (path)
            {
【caseParts】
                default:
                    throw new GameOrdinaryException(404);
            }
        }
    }
}";
            var caseTemplate = @"                case ""【path】"":
                    {
【paramTrans】
                        【returnPart】【awaitPart】Ctx.【manager】.【method】(【params】);
【returnNull】
                    }";
            var paramTransTemplate = @"                        var p_【param】 = param![""【param】""]!.ToObject<【paramType】>()!;";
            var casePartList = PlayerDataManager.RequestRoute.Select(r =>
            {
                var route = r.Value;
                var path = route.Path;
                var manager = route.ManagerField.Name;
                var method = route.HandlerMethod.Name;
                var ps = string.Join(",", route.HandlerMethod.GetParameters().Select(p =>
                {
                    return "p_" + p.Name;
                }));
                var psTrans = string.Join("\n", route.HandlerMethod.GetParameters().Select(p =>
                {
                    return paramTransTemplate
                    .Replace("【param】", p.Name)
                    .Replace("【paramType】", p.ParameterType.Name);
                }));
                var noReturn = route.HandlerMethod.ReturnType.Name == "Void" || route.HandlerMethod.ReturnType.Name == "Task";
                var returnPart = noReturn ? "" : "return ";
                var awaitPart = route.HandlerMethod.ReturnType.Name.StartsWith("Task") ? "await " : "";
                var returnNull = noReturn ? "                        return null;" : "";
                return caseTemplate
                .Replace("【path】", path)
                .Replace("【paramTrans】", psTrans)
                .Replace("【returnPart】", returnPart)
                .Replace("【awaitPart】", awaitPart)
                .Replace("【manager】", manager)
                .Replace("【method】", method)
                .Replace("【params】", ps)
                .Replace("【returnNull】", returnNull);
            });
            var casePart = string.Join("\n", casePartList);
            var code = template.Replace("【caseParts】", casePart);
            File.WriteAllText("../server_game_module/src/Game/Generated/RequestHandler.cs", code);
        }
    }


}