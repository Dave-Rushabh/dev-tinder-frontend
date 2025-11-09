import { createContext, useContext, useState, useCallback } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const triggerAlert = useCallback(({ type = "info", message = "" }) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 7000);
  }, []);

  const getAlertClass = (type) => {
    switch (type) {
      case "success":
        return "alert-success";
      case "error":
        return "alert-error";
      case "warning":
        return "alert-warning";
      case "info":
      default:
        return "alert-info";
    }
  };

  return (
    <AlertContext.Provider value={{ triggerAlert }}>
      {children}
      {alert && (
        <div
          role="alert"
          className={`alert ${getAlertClass(
            alert.type
          )} fixed top-6 left-1/2 transform -translate-x-1/2 shadow-lg border border-base-300 backdrop-blur-md transition-all duration-500 ${
            alert ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          } z-9999 px-6 py-3 max-w-full w-auto`}
        >
          <span className="text-base text-center">{alert.message}</span>
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
