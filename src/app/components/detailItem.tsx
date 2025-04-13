// app/components/detailItem.tsx
interface DetailItemProps {
    label: string;
    value: string | number;
  }
  
  export const DetailItem = ({ label, value }: DetailItemProps) => (
    <div className="bg-[var(--background-color)] p-4 rounded-sm">
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );