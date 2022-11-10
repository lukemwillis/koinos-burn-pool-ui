import React, {
    SetStateAction,
    useContext,
    useState,
    createContext,
    useEffect,
  } from "react";
  
  const LOCAL_STORAGE_KEY = "EXPERIENCE_MODE";
  
  export type ExperienceMode = "basic" | "advanced";

  type ExperienceModeContextType = {
    experienceMode?: ExperienceMode;
    setExperienceMode: React.Dispatch<SetStateAction<ExperienceMode | undefined>>;
  };
  
  export const ExperienceModeContext = createContext<ExperienceModeContextType>({
    experienceMode: "basic",
    setExperienceMode: () => undefined,
  });
  
  export const useExperienceMode = () => useContext(ExperienceModeContext);
  
  export const ExperienceModeProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }): JSX.Element => {
    const [experienceMode, setExperienceMode] = useState<ExperienceMode | undefined>();
  
    useEffect(() => {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setExperienceMode(saved as ExperienceMode);
      } else {
        setExperienceMode("basic");
      }
    }, []);
  
    useEffect(() => {
      if (!experienceMode) return;
      localStorage.setItem(LOCAL_STORAGE_KEY, experienceMode);
    }, [experienceMode]);
  
    return (
      <ExperienceModeContext.Provider value={{ experienceMode, setExperienceMode }}>
        {children}
      </ExperienceModeContext.Provider>
    );
  };
  