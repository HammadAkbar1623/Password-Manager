
const Navbar = () => {
    return (
      <div>
        <nav className="bg-slate-900 flex items-center px-4 text-white font-bold justify-between">
          <div className="flex items-center">
            <span className="text-blue-700">&lt;</span>
            <div className="logo font-bold">
              Developed By <span className="text-blue-700">Hammad /&gt;</span>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 py-2">
            <a href="https://github.com/HammadAkbar1623/Password-Manager.git"><img className="w-12 cursor-pointer" src="/icons/github.png" alt="GitHub" /></a>
            <span>GitHub</span>
          </div>
  
  
  
        </nav>
      </div>
    );
  };
  
  export default Navbar;
  