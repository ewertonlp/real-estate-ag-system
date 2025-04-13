import { useState, ReactNode, Children, cloneElement, isValidElement } from 'react';

interface TabProps {
  title: string;
  children: ReactNode;
}

export function Tab({ children }: TabProps) {
  return <div>{children}</div>;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

export function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Botões das Tabs */}
      <div className="flex border-b border-gray-200 justify-between ">
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) return null;
          
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-2 text-md font-medium transition-colors duration-200 cursor-pointer ${
                activeTab === index
                  ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                  : 'text-gray-500 hover:text-[var(--secondary)] hover:border-b-2 hover:border-[var(--secondary)]'
              }`}
            >
              {child.props.title}
            </button>
          );
        })}
      </div>

      {/* Conteúdo das Tabs */}
      <div className="p-4">
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) return null;
          
          return (
            <div
              key={index}
              className={`${activeTab === index ? 'block' : 'hidden'}`}
            >
              {child.props.children}
            </div>
          );
        })}
      </div>
    </div>
  );
}