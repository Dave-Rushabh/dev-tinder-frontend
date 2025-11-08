import { createContext, useContext, useState, useCallback } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const triggerAlert = useCallback(({ type = "info", message = "" }) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 7000); // auto close
  }, []);

  return (
    <AlertContext.Provider value={{ triggerAlert }}>
      {children}
      {alert && (
        <div className="toast toast-top toast-center">
          <div className={`alert alert-${alert.type}`}>
            <span>{alert.message}</span>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
