const config = {
  ENCRYPTION: true
}

export const Base64 = {
  encode: function (v) {
    return window.btoa(window.encodeURIComponent(v));
  },
  decode: function (v) {
    return window.decodeURIComponent(window.atob(v));
  }
};

export const setLocalItem = (key: string, value) => {
  try {
    if (key === "" || key === undefined) {
      return;
    }
    if (key) {
      if (value == 0) {
        value = JSON.stringify(value);
        localStorage.setItem(config.ENCRYPTION ? Base64.encode(key) : key, value);
        return;
      }
      if (value === null || value === undefined || value === "") {
        return "";
      }
      // 编码
      const enObj = JSON.stringify(value);
      if (config.ENCRYPTION) {
        localStorage.setItem(Base64.encode(key), Base64.encode(enObj));
      } else {
        localStorage.setItem(key, enObj);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const getLocalItem = (key) => {
  try {
    if (key === null || key === "" || key === undefined) {
      return ""
    }
    if (key) {
      let value = localStorage.getItem(config.ENCRYPTION ? Base64.encode(key) : key);
      if (value === null || value == undefined || value === "") {
        return "";
      } else {
        value = config.ENCRYPTION ? Base64.decode(value) : value;
        return JSON.parse(value);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const setSessionItem = (key, value) => {
  try {
    if (key === "" || key === undefined) {
      return;
    }
    if (key) {
      if (value == 0) {
        value = JSON.stringify(value);
        sessionStorage.setItem(config.ENCRYPTION ? Base64.encode(key) : key, value);
      }
      if (value === null || value === undefined || value === "") {
        return "";
      }
      // 编码
      const enObj = JSON.stringify(value);
      if (config.ENCRYPTION) {
        sessionStorage.setItem(Base64.encode(key), Base64.encode(enObj));
      } else {
        sessionStorage.setItem(key, enObj);
      }
    }
  } catch (e) {
    console.log(e);
    return sessionStorage.setItem(config.ENCRYPTION ? Base64.encode(key) : key, value);
  }
};

export const getSessionItem = (key) => {
  if (key === null || key === "" || key === undefined) {
    return null;
  }
  try {
    if (key) {
      let value = sessionStorage.getItem(config.ENCRYPTION ? Base64.encode(key) : key);
      if (value === null || value === undefined || value === "") {
        return value;
      } else {
        value = config.ENCRYPTION ? Base64.decode(value) : value;
        return JSON.parse(value);
      }
    }
  } catch (e) {
    console.log(e);
    return  sessionStorage.getItem(config.ENCRYPTION ? Base64.encode(key) : key);
  }
};

export const removeLocalItem = (key) => {
  if (key === null || key === "" || key === undefined) {
    return;
  }
  if (key) {
    const enObj = config.ENCRYPTION ? Base64.encode(key) : key;
    localStorage.removeItem(enObj);
  }
}

// 清空 session 数据
export const removeSessionItem = (key) => {
  if (key === null || key === "" || key === undefined) {
    return;
  }
  if (key) {
    const enObj = config.ENCRYPTION ? Base64.encode(key) : key;
    sessionStorage.removeItem(enObj);
  }
}

export const clearSession = () => {
  sessionStorage.clear()
}

export const clearLocal = () => {
  localStorage.clear()
}
