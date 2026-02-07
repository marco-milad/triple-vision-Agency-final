import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface ContactContextType {
  isContactOpen: boolean;
  preSelectedService?: string;
  openContact: (preSelectedService?: string) => void;
  closeContact: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<string | undefined>();

  const openContact = useCallback((service?: string) => {
    setPreSelectedService(service);
    setIsContactOpen(true);
  }, []);

  const closeContact = useCallback(() => {
    setIsContactOpen(false);
    setPreSelectedService(undefined);
  }, []);

  return (
    <ContactContext.Provider value={{ isContactOpen, preSelectedService, openContact, closeContact }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
};
