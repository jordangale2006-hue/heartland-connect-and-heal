const getIowaOffsetFromArizona = () => {
  const iowaZone = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    timeZoneName: "short",
  }).formatToParts(new Date()).find((part) => part.type === "timeZoneName")?.value;

  return iowaZone === "CST" ? 1 : 2;
};

const formatHour = (hour: number) => {
  const normalized = hour % 24;
  const period = normalized >= 12 ? "pm" : "am";
  const display = normalized % 12 || 12;
  return `${display}${period}`;
};

const OfficeHours = ({ inverse = false }: { inverse?: boolean }) => {
  const offset = getIowaOffsetFromArizona();
  const textClass = inverse ? "text-primary-foreground/70" : "text-muted-foreground";

  return (
    <div className={`text-sm ${textClass} space-y-1`}>
      <p>Monday – Friday: 8am – 5pm Arizona</p>
      <p className="text-xs">Iowa: {formatHour(8 + offset)} – {formatHour(17 + offset)} Central (current equivalent)</p>
      <p>Saturday: 9am – 2pm Arizona</p>
      <p className="text-xs">Iowa: {formatHour(9 + offset)} – {formatHour(14 + offset)} Central (current equivalent)</p>
      <p>Sunday: Closed</p>
      <p className="text-xs">The scheduler displays appointments in your local time.</p>
    </div>
  );
};

export default OfficeHours;