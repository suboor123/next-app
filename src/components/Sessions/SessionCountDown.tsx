import { Session } from "@/types/types";
import { useTimer } from "react-timer-hook";
type Props = {
  session: Session;
};

const SessionCountdown: React.FC<Props> = ({ session }) => {
  const curDate = new Date().getTime();
  const sessionStartDate = session.date + " " + session.sessionTiming.start;
  const sessionEndDate = session.date + " " + session.sessionTiming.end;

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: new Date(sessionStartDate),
    onExpire: () => console.warn("onExpire called"),
  });

  if (new Date(sessionEndDate).getTime() < curDate)
    return (
      <div className="bg-danger">
        <p>Session ended</p>
      </div>
    );

  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0)
    return (
      <div className="d-flex p-2 bg-success">
        <a href="" target="blank">
          Join Session
        </a>
      </div>
    );

  if (days === 0 && hours === 0 && minutes < 10)
    return (
      <div className="bg-danger">
        <span>{days}</span>:<span>{String(hours).padStart(2, "0")}</span>:
        <span>{String(minutes).padStart(2, "0")}</span>:
        <span>{String(seconds).padStart(2, "0")}</span>
      </div>
    );

  return (
    <div>
      <span>{days}</span>:<span>{String(hours).padStart(2, "0")}</span>:
      <span>{String(minutes).padStart(2, "0")}</span>:
      <span>{String(seconds).padStart(2, "0")}</span>
    </div>
  );
};

export default SessionCountdown;
