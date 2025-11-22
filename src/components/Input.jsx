import { useState, useCallback, useEffect, useRef } from "react";

function Input() {
  const [length, setLength] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook

  const passwordref = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str = str + "0123456789";
    }
    if (characterAllowed) {
      str = str + "!@#$%^&*)(-";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(char); // will catch the index

      setPassword(pass);
    }
  }, [length, numberAllowed, characterAllowed, setPassword]);

  // Copy Text Logic
const copyToClipBoard = useCallback(() => {
  passwordref.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])
  

  // Removed useEffect Auto call

  // Whenever the some touches the checkbox it will automatically run
  /* useEffect(() => {
    passwordGenerator();
    }, [length, numberAllowed, characterAllowed, passwordGenerator]); */

  return (
    <div className="bg-neutral-900 flex justify-center items-center h-screen">
      <div>
        <div className="bg-gray-400 p-5 rounded-2xl">
          <div className="flex justify-center mb-20">
            <h1 className="text-white text-xl items-center">
              Password Generator
            </h1>
          </div>
          <div className="relative">
            <input
              type="text"
              id="password"
              value = {password}
              readOnly
              placeholder="Password"
              ref={passwordref}
              className="bg-white text-black pl-2 pr-14  py-2 border-2 text-2xl"
            />
            <div className="absolute right-0 top-0">
              <button
                className="bg-blue-400 size-13 text-white hover:bg-green-300
                                        cursor-pointer border-2 border-black"
                onClick={copyToClipBoard}
              >
                Copy
              </button>
            </div>
          </div>

            {/* length and Range */}
            
          <div className="flex flex-col justify-center items-center">
            <label htmlFor="character">Length : {length} 
            <input
              type="range"
              min={0}
              max={20}
              value= {length}
              onChange={(e) => {setLength(e.target.value)}}
              className="w-50 cursor-pointer"
            />
            </label>
            
            
            {/* character section */}

            <label 
            htmlFor="character">Character :
            <input 
            type="checkbox" 
            id="character" 
            defaultChecked={characterAllowed}
            onChange={() => {
                setCharacterAllowed((prev => !prev));
            }}
            />
            </label>
            

            {/* Number Section     */}

            <label htmlFor="number">Number :
              <input 
            type="checkbox"  
            id="number" 
            defaultChecked = {numberAllowed}
            onChange={() => {
                setNumberAllowed((prev) => !prev);
            }}
            />
            </label>
            


          </div>
          <div>
            <div className=" flex justify-center items-center mt-4">
              <button 
              className="text-center px-10 py-4 bg-cyan-500 text-white cursor-pointer rounded-2xl
                               hover:bg-emerald-400 hover:scale-95 transition ease-in-out duration-300"
                onClick={passwordGenerator}>
                Generate Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Input;


