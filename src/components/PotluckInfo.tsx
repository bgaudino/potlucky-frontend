import { Potluck } from "../types";
import { formatTime, formatDate } from "../utils/datetime";
import Label from "./Label";

export default function PotluckInfo(props: { potluck: Potluck }) {
  const { potluck } = props;
  return (
    <div>
      <h1>{potluck?.name}</h1>
      <div className="grid">
        <p>
          <Label text="Description" />
          {potluck?.description}
        </p>
        <p>
          <Label text="Location" />
          {potluck?.location}
        </p>
        <p>
          <Label text="Date" />
          {formatDate(potluck?.date)}
        </p>
        <p>
          <Label text="Time" />
          {formatTime(potluck?.date)}
        </p>
        <p>
          <Label text="Host" />
          {potluck?.host.name}
        </p>
        <p>
          <Label text="Host Email" />
          {potluck?.host.email}
        </p>
      </div>
    </div>
  );
}
