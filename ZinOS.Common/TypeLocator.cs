using Ninject;
using Ninject.Modules;
using System.Dynamic;
using System.Reflection;

namespace ZinOS.Configuration
{
    public class TypeLocator
    {
        private static TypeLocator _instance;
        
        public static TypeLocator GetInstance()
        {
            return _instance;
        }

        static TypeLocator()
        {
            _instance = new TypeLocator();
        }
        
        private IKernel _ninjectKernel;

        private TypeLocator()
        {
            initKernel();
        }

        public T GetType<T>()
        {
            return _ninjectKernel.Get<T>();
        }

        private void initKernel()
        {
            _ninjectKernel = new StandardKernel();
            _ninjectKernel.Load(Assembly.Load("ZinOS.Configuration, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"));
        }
    }
}
