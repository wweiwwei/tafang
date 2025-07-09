using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace GamePlay
{
    public abstract class AbstractManager<T> where T : class, new()
    {
        public AbstractManager(JToken saveData, PlayerDataManager ctx)
        {
            Ctx = ctx;
            var keyName = GetKeyName();
            var json = saveData[keyName];
            if (json == null)
            {
                Data = new T();
            }
            else
            {
                Data = JsonUtils.Parse<T>(json);
            }
        }
        public string GetKeyName()
        {
            return GetType().Name.Replace("Manager", "").ToLower();
        }
        public PlayerDataManager Ctx;
        protected T Data;
        private T BackUpData;

        public abstract void InitData();

        public abstract void DailyRefresh();

        public virtual void Tick() { }

        public virtual void PostInit() { }

        public object GetSaveData()
        {
            return Data;
        }
        public void RollBack()
        {
            Data = BackUpData;
        }
        public void BackUp()
        {
            BackUpData = Data;
        }


    }
}