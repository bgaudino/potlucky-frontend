export default function Label({ text }: { text: string }) {
  return (
    <span className="label">
      <strong>{text}:</strong>&nbsp;
    </span>
  );
}
