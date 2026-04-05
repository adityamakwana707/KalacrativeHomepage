import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CursorState = 'default' | 'hover' | 'drag' | 'explore' | 'video' | 'hidden';

interface CursorContextType {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [cursorText, setCursorText] = useState('');

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState, cursorText, setCursorText }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}
