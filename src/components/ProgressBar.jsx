
export default function ProgressBar({ timer}) {
  return <progress value={timer} max={3000} />;
}
