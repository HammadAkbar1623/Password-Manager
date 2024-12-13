import { useEffect, useRef, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src: string;
        trigger?: string;
        colors?: string;
      };
    }
  }
}

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState<
    { site: string; username: string; password: string }[]
  >([]); // Explicit type for the state

  useEffect(() => {
    let password = localStorage.getItem("password");
    if (password) {
      setPasswordArray(JSON.parse(password));
    }
  }, []);

  const passwordRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLImageElement | null>(null); // Explicit type for the ref


  const showPassword = () => {
    if (passwordRef.current && ref.current) {
      const isPasswordVisible = passwordRef.current.type === "text";
      passwordRef.current.type = isPasswordVisible ? "password" : "text";
      ref.current.src = isPasswordVisible ? "/icons/eyeCross.png" : "/icons/eye.png";
    }
  };


  const savePassword = () => {
    setPasswordArray((prev) => {
      const updatedArray = [...prev, form];
      localStorage.setItem("password", JSON.stringify(updatedArray));
      return updatedArray;
    });

    
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  return (
    <>
   
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="container mx-auto max-w-4xl px-2 pt-10 md:px-0">
        <p className="text-blue-700 text-lg text-center font-bold">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            name="site"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-blue-700 w-full p-4 py-1"
            type="text"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-blue-700 w-full p-4 py-1"
              type="text"
            />
            <div className="relative">
              <input ref={passwordRef}
              maxLength={8}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-blue-700 w-full p-4 py-1"
                type="password"
              />
              <span
                onClick={showPassword}
                className="absolute right-[3px] top-[3px] cursor-pointer"
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={30}
                  src="/icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>

          <button
          
            onClick={savePassword}
            className="flex justify-center text-white items-center bg-blue-500 rounded-full px-2 py-2 w-fit hover:bg-blue-700"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              colors="primary:#ffffff,secondary:#ffffff"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          {passwordArray.length === 0 ? (
            <div className="text-white text-center font-bold md:text-center">No passwords to show</div>
          ) :
            (
              <table className="table-auto w-full rounded-md overflow-hidden">

                <thead className="bg-blue-700">
                  <tr className="text-white">
                    <th>Site</th>
                    <th>Username</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody className="bg-blue-100">
                  {passwordArray.map((password, index) => (
                    <tr key={index}>
                      <td className="text-center w-32 border py-1 border-white">{password.site}</td>
                      <td className="text-center w-32 border py-1 border-white">{password.username}</td>
                      <td className="text-center w-32 border py-1 border-white">{password.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      </div>
    </>
  );
};

export default Manager;
