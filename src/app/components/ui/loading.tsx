// components/Loading.tsx
export default function Loading() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-18 w-18 border-t-3 border-b-3 border-[var(--primary)]"></div>
      </div>
    );
  }