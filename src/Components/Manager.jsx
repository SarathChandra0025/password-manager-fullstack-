import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("/hide.png")) {
      passwordRef.current.type = "password";
      ref.current.src = "/view.png";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "/hide.png";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 4 &&
      form.username.length > 4 &&
      form.password.length > 4
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      toast.success("Saved Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("All should have minimum 4 characters!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast.success("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const editPassword = (id) => {
    console.log("Editing password with id " + id);
    setform(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id != id));
  };

  const deletePassword = (id) => {
    toast.success("Password Deleted Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    console.log("Deleting password with id " + id);
    let c = confirm("Do you really want to delete the Password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id != id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id != id))
      );
    }
  };

  return (
    <div className="relative min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className=" absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <div className="p-3 mycontainer min-h-[88.5vh]">
        <h1 className="text-4xl font-bold text-center py-4">
          <span className="text-green-600">&lt;</span>
          Pass
          <span className="text-green-600">Man/&gt;</span>
        </h1>
        <p className="text-center text-lg text-green-800">
          Your Own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter URL"
            type="text"
            className="rounded-full border border-green-500 text-black py-1 p-4 w-full"
            name="site"
            required
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              type="text"
              className="rounded-full border border-green-500 text-black py-1 p-4 w-full"
              name="username"
              required
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                type="password"
                className="rounded-full border border-green-500 text-black py-1 p-4 w-full"
                name="password"
                required
              />
              <span
                className="absolute right-[4px] top-[4px]"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="/view.png"
                  alt="view"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex gap-1 justify-center items-center w-fit bg-green-500 rounded-full px-8 py-2 hover:bg-green-400 cursor-pointer border border-green-500"
          >
            Save
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && (
            <div className="text-center text-xl py-10">
              No Passwords to Show
            </div>
          )}
          {passwordArray.length != 0 && (
            <div className="overflow-x-auto w-full">
            <table className="table-auto w-full rounded-md mb-6 ">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center w-32 pl-3">
                        <div className="flex justify-center items-center gap-2 break-words">
                          <a href={item.site} target="_blank" className="break-words">
                            {item.site}
                          </a>
                          <span
                            className="cursor-pointer"
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                      <td className="py-1 border border-white text-center w-32 p-2">
                        <div className="flex justify-center items-center gap-2 break-words">
                          {item.username}
                          <span
                            className="cursor-pointer"
                            onClick={() => copyText(item.username)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                      <td className="py-1 border border-white text-center w-32 p-3">
                        <div className="flex justify-center items-center gap-2 break-words">
                          {"*".repeat(item.password.length)}
                          <span
                            className="cursor-pointer"
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>

                    {/* Actions  */}
                      <td className="py-1 border border-white text-center w-32 px-3 ">
                        <div className="flex justify-center items-center">
                          <span
                            className="mx-3 cursor-pointer"
                            onClick={() => editPassword(item.id)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{ width: "17px", height: "17px" }}
                            ></lord-icon>
                          </span>
                          <span
                            onClick={() => deletePassword(item.id)}
                            className="cursor-pointer"
                          >
                            <lord-icon className="mr-2"
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "17px", height: "17px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
