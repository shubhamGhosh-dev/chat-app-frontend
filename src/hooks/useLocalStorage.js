import { useState, useEffect } from "react";

const PREFIX = "chat-app-";

const useLocalStorage = (key, initialValue) => {
   const prefixedKey = PREFIX + key;
   const [value, setValue] = useState(() => {
      const jsonValue = localStorage.getItem(prefixedKey);
      if (jsonValue != null || undefined) return JSON.parse(jsonValue);
      if (typeof initialValue === "function") {
         return initialValue();
      } else {
         return initialValue;
      }
   });
   
   useEffect(() => {
      if (value) {
         localStorage.setItem(prefixedKey, JSON.stringify(value));
      }
   }, [prefixedKey, value]);
   // console.log("from Localstorage")
   return [value, setValue];
};

export default useLocalStorage;
