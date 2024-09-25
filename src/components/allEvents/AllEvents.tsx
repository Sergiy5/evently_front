// import { useState } from "react";
import { Container } from "../container/Container";
// import { FilterDate } from "../filters/FilterDate";
// import { FilterTypeEvent } from "../filters/FilterTypeEvent";
import { ListEvents } from "../listEvents/ListEvents";

interface AllEventsprops {}
export const AllEvents: React.FC<AllEventsprops> = () => {
  // const [evt, setEvt] = useState()

    return (
      <Container className={`flex flex-col gap-8`}>
        <h1>Усі події</h1>
        <div className="flex flex-col gap-4">
        {/* <FilterDate /> */}
        {/* <FilterTypeEvent setEvents={() => setEvt} /> */}
        </div>
        <ListEvents events={12} />
      </Container>
    );
};