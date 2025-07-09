using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    [AttributeUsage(AttributeTargets.Method)]
    public class Update : Attribute
    {
        public readonly string Path;

        public Update(string path)
        {
            Path = path;
        }
    }
}