export function formatTime(totalSeconds) {
  if (isNaN(totalSeconds) || totalSeconds < 0) return "00:00:00";
  
  const d = Math.floor(totalSeconds / (3600 * 24));
  const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);

  const getStr = (val) => val.toString().padStart(2, '0');
  
  if (d > 0) {
    return `${d}d ${getStr(h)}h ${getStr(m)}m ${getStr(s)}s`;
  }
  return `${getStr(h)}h ${getStr(m)}m ${getStr(s)}s`;
}
