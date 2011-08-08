using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Dynamic;
using System.Configuration;

namespace ZinOS.Common
{
    public static class ApplicationSettings
    {
        public static dynamic Setting
        {
            get;
            private set;
        }

        static ApplicationSettings()
        {
            Setting = new SettingsBag();
        }

        private class SettingsBag : DynamicObject
        {
            public override bool TryGetMember(GetMemberBinder binder, out object result)
            {
                string name = binder.Name;

                result = getSetting(name);

                return true;
            }

            private object getSetting(string settingName)
            {
                return ConfigurationManager.AppSettings[settingName];
            }
        }
    }
}
