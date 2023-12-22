import { Session } from "@/types/types";
import { useTimer } from "react-timer-hook";
import Button from "../button";
import { BsClock, BsFillPlayCircleFill } from "react-icons/bs";
import { ListContent } from "../list-article/SessionCard";

type Props = {
  session: ListContent;
};

const [x, y] = [100, 500];
const SessionCountdown: React.FC<Props> = ({ session }) => {
  const curDate = new Date().getTime();
  const sessionStartDate = session.date + " " + session.sessionTiming.start;
  const sessionEndDate = session.date + " " + session.sessionTiming.end;

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: new Date(sessionStartDate),
    onExpire: () => console.warn("onExpire called"),
  });

  const renderTimer = () => {
    let res = [];
    if(days !== 0)  {
      res.push(`${days} Days`);
    }
    if(hours !== 0) {
      res.push(`${hours} Hours`)
    }
    if(minutes !== 0) {
      res.push(`${minutes} Minutes`)
    }
    res.push(`${seconds} Seconds`)
    return res.join(' ')
  }

  if (new Date(sessionEndDate).getTime() < curDate)
    return (
      <div className="col-sm">
        <p>Session ended</p>
      </div>
    );

  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0)
    return (
      <div className="float-right">
          <Button
              type="secondary"
              onPress={() => {
                window.open(session.url, '_blank')
              }}
            >
              <BsFillPlayCircleFill style={{fontSize: '16px'}} /> Join Session
            </Button>
      </div>
    );

  if (days === 0 && hours === 0 && minutes < 10)
    return (
      <div className="bg-danger-timer">
        {renderTimer()}
      </div>
    );

  return (
    <div className="bg-timer">
     <div>{renderTimer()}</div>
    </div>
  );
};

export default SessionCountdown;
