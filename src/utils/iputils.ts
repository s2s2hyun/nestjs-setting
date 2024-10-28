export function ip2long(ip: string): number {
  const multipliers = [0x1000000, 0x10000, 0x100, 1];

  let longValue = 0;
  ip.split('.').forEach((part, i) => {
    longValue += parseInt(part) * multipliers[i];
  });
  return longValue;
}
