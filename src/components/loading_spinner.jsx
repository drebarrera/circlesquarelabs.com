// app/loading.tsx
export default function LoadingSpinner({size, color}) {
  return (
    <div className="border-dashed rounded-full animate-spin" style={{height: size, width: size, borderColor: color, borderWidth: size / 4.5}}></div>
  );
}
  